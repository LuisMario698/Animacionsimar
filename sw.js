// Copia sin conexión de la presentación para el monitor del stand.
// - La página (index.html) se pide primero a la red, para recibir actualizaciones; si no hay
//   internet o tarda más de 4 s, se usa la última copia guardada.
// - Three.js, GSAP y las tipografías (URL con versión fija) se sirven desde la copia guardada y,
//   si no están, se piden a la red y se guardan.
const CACHE = 'simar-keynote-v2';
const PRECACHE = [
  './',
  'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
  'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;700&family=Atkinson+Hyperlegible+Next:ital,wght@0,300;0,400;0,700;0,800;1,400&display=swap',
];
const EXTERNOS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  // Cada recurso por separado: si uno falla (sin red), los demás igual se guardan
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(PRECACHE.map((u) => c.add(u).catch(() => {})))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

// Sólo se guardan respuestas correctas: un error de la red nunca reemplaza la copia buena
const guardar = async (req, res) => {
  if (res && res.ok) { const c = await caches.open(CACHE); await c.put(req, res.clone()); }
  return res;
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const red = fetch(req).then((res) => guardar(req, res));
      const espera = new Promise((r) => setTimeout(r, 4000, null));
      try {
        const res = await Promise.race([red, espera]);
        if (res && res.ok) return res;
      } catch (err) { /* sin red: se usa la copia */ }
      const copia = (await caches.match(req, { ignoreSearch: true })) || (await caches.match('./'));
      return copia || red;
    })());
    return;
  }

  if (EXTERNOS.includes(url.hostname) || url.origin === self.location.origin) {
    e.respondWith((async () => {
      const copia = await caches.match(req);
      if (copia) return copia;
      // jsDelivr y Google Fonts permiten CORS: así se puede comprobar que la respuesta es correcta
      const pedir = EXTERNOS.includes(url.hostname) ? new Request(req.url, { mode: 'cors', credentials: 'omit' }) : req;
      return guardar(req, await fetch(pedir));
    })());
  }
});
