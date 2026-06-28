/*
 * sw.js — こんぺい堂 の Service Worker（パッカーパニック準拠）。
 *
 * 目的：PWA としてインストール可能にし、2回目以降の起動を高速化＆オフラインでも遊べるようにする。
 * 方針：
 *   - 同一オリジンの GET のみ扱う（外部 API・別オリジンは素通し）。
 *   - ナビゲーション（HTML）は network-first（最新を優先、失敗時はキャッシュの index へ）。
 *   - 静的アセット（JS/CSS/画像/音）は stale-while-revalidate（即返し＋裏で更新）。
 * バンドル名はビルド毎にハッシュが変わるため、固定リストを precache せず実行時に貯める。
 * CACHE_VERSION を上げると旧キャッシュを破棄する。
 */
const CACHE_VERSION = 'konpeito-v2';
const CACHE_NAME = `konpeito-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

let isUpdate = false;

self.addEventListener('install', (event) => {
  isUpdate = !!self.registration.active;
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(PRECACHE_URLS.map((url) => cache.add(url).catch(() => undefined))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('konpeito-') && k !== CACHE_NAME)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
      if (isUpdate) {
        const wins = await self.clients.matchAll({ type: 'window' });
        for (const c of wins) {
          if (typeof c.navigate === 'function') {
            c.navigate(c.url).catch(() => undefined);
          }
        }
      }
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'reload' })
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('./index.html'))),
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const network = fetch(request)
          .then((res) => {
            if (res && res.status === 200) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    ),
  );
});
