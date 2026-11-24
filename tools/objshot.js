// Fotografía un objeto del banco (tools/banco/banco.html) desde varias vistas.
// Uso: node tools/objshot.js <modulo.js> <salida-base> ["az,el,dist,t" ...]
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [mod, out, ...views] = process.argv.slice(2);
  if (!views.length) views.push('30,15,6,0', '-35,10,6,0', '90,35,7,0');
  const banco = path.join(__dirname, 'banco', 'banco.html');
  const rel = path.relative(path.dirname(banco), path.resolve(mod));
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }); const logs = [];
  page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));
  let n = 0;
  for (const v of views) {
    const [az, el, dist, t] = v.split(',').map(Number);
    await page.goto('file://' + banco + '?' + new URLSearchParams({ m: rel, az, el, dist, t: t || 0 }));
    await page.waitForFunction(() => window.__ready, null, { timeout: 120000 });
    const e = await page.evaluate(() => window.__error || null); if (e) logs.push('[buildObject] ' + e);
    const f = `${out}_${n++}.png`; await page.screenshot({ path: f }); console.log('vista', v, '->', f);
  }
  console.log(logs.length ? [...new Set(logs)].join('\n') : 'sin errores'); await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
