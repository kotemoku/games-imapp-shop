/**
 * Service Worker — プリキャッシュ + stale-while-revalidate（SPEC §9 / P5-3）。
 * PRECACHE_URLS はビルド後スクリプト（scripts/build-sw.mjs）が dist/ を走査して注入する。
 * アセットは全てプロシージャル生成のため、キャッシュ対象はコードと manifest のみで軽量。
 */
/* eslint-disable no-undef */
const CACHE_VERSION = "591eecf3da5d";
const CACHE_NAME = `kemonomichi-${CACHE_VERSION}`;
// 未置換（build-sw.mjs 未実行）でも SW が ReferenceError で死なないよう、有効なJSにしておく
const PRECACHE_URLS = [
  "./",
  "./assets/index-DxwpDmpQ.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // クーポンAPI等はキャッシュしない
  if (url.pathname.startsWith("/api/")) return;

  // stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: url.pathname.endsWith("/") || url.pathname.endsWith(".html") });
      const network = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => undefined);
      if (cached) {
        void network;
        return cached;
      }
      const res = await network;
      if (res) return res;
      // オフラインで未キャッシュ → ナビゲーションはトップへフォールバック
      if (req.mode === "navigate") {
        const top = await cache.match("./index.html");
        if (top) return top;
      }
      return new Response("offline", { status: 503 });
    }),
  );
});
