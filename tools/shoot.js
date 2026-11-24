// Abre la keynote en Chromium sin ventana (SwiftShader) y toma capturas en los tiempos indicados.
// Uso: node tools/shoot.js <index.html> <carpeta con node_modules de three y gsap> <salida> <t1,t2,...> [ancho]
const path = require('path');
const fs = require('fs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [file, deps, outDir, times, width] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const W = parseInt(width || '1600', 10);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: W, height: Math.round(W * 9 / 16) }, deviceScaleFactor: 1 });
  const logs = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));
  await page.route('https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js', (r) => r.fulfill({ path: path.join(deps, 'node_modules/three/build/three.min.js'), contentType: 'application/javascript' }));
  await page.route('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', (r) => r.fulfill({ path: path.join(deps, 'node_modules/gsap/dist/gsap.min.js'), contentType: 'application/javascript' }));
  await page.route('http://simar.test/', (r) => r.fulfill({ path: path.resolve(file), contentType: 'text/html; charset=utf-8' }));
  const t0 = Date.now();
  await page.goto('http://simar.test/', { waitUntil: 'load', timeout: 120000 });
  await page.waitForFunction(() => window.__simar || !document.getElementById('error').hidden, null, { timeout: 300000 });
  console.log('lista en', Date.now() - t0, 'ms');
  const err = await page.evaluate(() => document.getElementById('error').hidden ? null : document.getElementById('errorMsg').textContent);
  if (err) console.log('ERROR:', err);
  await page.evaluate(() => { window.__simar.pause(); const g = document.getElementById('grain'); if (g) g.style.display = 'none'; });
  for (const t of times.split(',').map(Number)) {
    await page.evaluate((tt) => { window.__simar.seek(tt); window.__simar.renderNow(); }, t);
    await page.waitForTimeout(200);
    await page.locator('#stage').screenshot({ path: path.join(outDir, `t${String(t).replace('.', '_')}.png`) });
  }
  const uniq = [...new Set(logs)].filter((l) => !/deprecated|KHR_parallel|GPU stall|fonts\.g/.test(l));
  console.log(uniq.length ? uniq.slice(0, 30).join('\n') : 'sin errores');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
