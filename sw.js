const CACHE = 'headsup-v4';
const FILES = ['./', 'index.html', 'manifest.json', 'decks.json', 'icon.svg', 'app-icon-192.png', 'app-icon-512.png', 'app-icon-maskable-512.png', 'apple-touch-icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c =>
    Promise.allSettled(FILES.map(f => c.add(new Request(f, { cache: 'reload' }))))
  ).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network-first: always try for the latest files, fall back to the saved copy
// when offline or when the network takes longer than 3 seconds.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request, { cache: 'no-cache' }).then(r => {
      if (r && r.ok) c.put(e.request, r.clone());
      return r;
    });
    net.catch(() => {});
    const slow = new Promise(res => setTimeout(() => res(null), 3000));
    try {
      const r = await Promise.race([net, slow]);
      if (r) return r;
      if (hit) return hit;
      return await net;
    } catch (err) {
      return hit || (e.request.mode === 'navigate' ? await c.match('index.html') : Response.error());
    }
  })());
});
