/*
 * sw.js — ふんべつ！パッカーパニック の Service Worker。
 *
 * 目的：PWA としてインストール可能にし、2回目以降の起動を高速化＆オフラインでも遊べるようにする。
 * 方針：
 *   - 同一オリジンの GET のみ扱う（外部 API・別オリジンは素通し）。
 *   - ナビゲーション（HTML）は network-first（最新を優先、失敗時はキャッシュの index へ）。
 *   - 静的アセット（JS/CSS/画像/音）は stale-while-revalidate（即返し＋裏で更新）。
 * バンドル名はビルド毎にハッシュが変わるため、固定リストを precache せず実行時に貯める。
 * CACHE_VERSION を上げると旧キャッシュを破棄する。
 */
const CACHE_VERSION = 'pp-v1';
const CACHE_NAME = `packer-panic-${CACHE_VERSION}`;

// 最低限の app shell（sw.js の場所＝アプリのルート基準で解決される相対パス）。
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      // 1件でも 404 で addAll 全体が失敗しないよう個別に試みる。
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('packer-panic-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // 別オリジンは素通し

  // HTML ナビゲーション：network-first → オフライン時はキャッシュの app shell。
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) => hit || caches.match('./index.html')),
        ),
    );
    return;
  }

  // 静的アセット：stale-while-revalidate。
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
