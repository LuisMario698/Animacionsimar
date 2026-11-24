// Comprueba que cada instante se vea igual llegando desde atrás o desde adelante.
// Uso: node tools/seekcheck.js <index.html> <deps> [t1,t2,...]
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [file, deps, list] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }); const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.route('https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js', (r) => r.fulfill({ path: path.join(deps, 'node_modules/three/build/three.min.js') }));
  await page.route('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', (r) => r.fulfill({ path: path.join(deps, 'node_modules/gsap/dist/gsap.min.js') }));
  await page.route('http://simar.test/', (r) => r.fulfill({ path: path.resolve(file), contentType: 'text/html; charset=utf-8' }));
  await page.goto('http://simar.test/');
  await page.waitForFunction(() => window.__simar, null, { timeout: 300000 });
  const dur = await page.evaluate(() => { window.__simar.pause(); const g = document.getElementById('grain'); if (g) g.style.display = 'none'; return window.__simar.duration || 87; });
  const shot = async (from, t) => {
    await page.evaluate(([a, b]) => { window.__simar.seek(a); window.__simar.renderNow(); window.__simar.seek(b); window.__simar.renderNow(); }, [from, t]);
    await page.waitForTimeout(100);
    return page.locator('#stage').screenshot();
  };
  const times = list ? list.split(',').map(Number) : Array.from({ length: 22 }, (_, i) => +(1.3 + i * (dur - 2) / 21).toFixed(2));
  let bad = 0;
  for (const t of times) { const a = await shot(dur - 0.01, t), b = await shot(Math.max(0, t - 0.01), t); const ok = a.equals(b); if (!ok) bad++; console.log(t.toFixed(2), ok ? 'igual' : 'DIFERENTE'); }
  console.log('diferencias:', bad, '· errores:', errs.length ? errs : 'ninguno');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
