/* sw.js — オフライン対応の軽量 Service Worker（ランタイム・キャッシュ）。
 * Vite ビルドはアセット名にハッシュが付くため、事前リストではなく
 * 「取得したものを都度キャッシュする」cache-first 戦略にする。
 * index.html / sw.js / manifest はネットワーク優先で更新事故を防ぐ。 */
const CACHE = 'bakery-rush-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isNav =
    req.mode === 'navigate' ||
    /\/(index\.html|sw\.js|manifest\.webmanifest)$/.test(url.pathname);

  if (isNav) {
    // ネットワーク優先（落ちたらキャッシュ）。最新の index/SW を確実に取り込む。
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req)),
    );
    return;
  }

  // それ以外（ハッシュ付きアセット・画像）はキャッシュ優先。
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        }),
    ),
  );
});
