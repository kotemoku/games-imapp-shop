/* 焚き火 -takibi- Service Worker
 * 方針: アプリシェル＋アセットをプリキャッシュしてオフラインでも焚ける。
 *       HTMLはネットワーク優先（更新即反映）、アセットはキャッシュ優先。
 *       更新時は VERSION を上げる（デプロイスクリプト運用）。 */
const VERSION = 'takibi-20260820-083718';
const CORE = [
  './',
  'manifest.webmanifest',
  'assets/base.png',
  'assets/fire01.png', 'assets/fire02.png', 'assets/fire03.png', 'assets/fire04.png', 'assets/fire05.png',
  'assets/fire06.png', 'assets/fire07.png', 'assets/fire08.png', 'assets/fire09.png', 'assets/fire10.png',
  'assets/loop1.mp3',
  'assets/icon-192.png', 'assets/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // HTML（ナビゲーション）はネットワーク優先 → オフライン時はキャッシュ
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put('./', copy));
          return res;
        })
        .catch(() => caches.match('./'))
    );
    return;
  }

  // アセットはキャッシュ優先 → なければ取得してキャッシュ
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});

