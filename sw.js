const CACHE = 'dcs-pilot-v5';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/jPub%20reference%20cards%20printable.pdf',
  './assets/cas_pdf_pages/page_1.png',
  './assets/cas_pdf_pages/page_2.png',
  './assets/cas_pdf_pages/page_3.png',
  './assets/cas_pdf_pages/page_4.png',
  './assets/cas_pdf_pages/page_5.png',
  './assets/cas_pdf_pages/page_6.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/load_sheet.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only cache same-origin GET requests
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(resp => {
        // Don't cache non-2xx or opaque responses
        if (!resp || resp.status !== 200 || resp.type === 'opaque') return resp;
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return resp;
      });
    })
  );
});
