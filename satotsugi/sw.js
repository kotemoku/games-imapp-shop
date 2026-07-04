// 里継 PWA Service Worker。
// 方針: ナビゲーション(index.html)=ネット優先（更新事故防止）、その他同一オリジンGET=キャッシュ優先。
// デプロイのたびに VER を上げると旧キャッシュを掃除する。
const VER = 'satotsugi-2026-07-04-2';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('satotsugi-') && k !== VER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => { const c = r.clone(); caches.open(VER).then((x) => x.put(req, c)); return r; })
        .catch(() => caches.match(req)),
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      if (r.ok) { const c = r.clone(); caches.open(VER).then((x) => x.put(req, c)); }
      return r;
    })),
  );
});
