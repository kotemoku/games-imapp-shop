/* sw.js — 防災マップをオフラインで開けるようにする service worker。
 *
 * これは scripts/build-sw.mjs が dist/web/sw.js に書き出す**雛形**。
 * __PRECACHE__ と __VERSION__ はビルド時に埋まる（ハッシュ付きの資産名は
 * ビルドごとに変わるので、手で書けない）。
 *
 * 正本は docs/bousai-plan.md §2（PWA）と §4 Phase 3。
 *
 * 置き場所は配信ルート（/sw.js）。scope はその配下すべてになるが、
 * **このワーカーが自分で持つのは防災マップの資産と地図タイルだけ**。
 * それ以外の要求には手を出さない（respondWith を呼ばない）ので、
 * イベントや店舗のページは今までどおりネットワークから最新が出る。
 * ここを広げると、配信し直しても古いページが出続ける事故になる。
 */
const VERSION = "fdbfbe00147a";
const SHELL = "ktn-bousai-shell-" + VERSION;
const TILES = "ktn-tiles-v1"; // タイルは版をまたいで持ち越す（描き直す理由が無い）
const META_URL = "./__sw-meta";

/** ビルド時に列挙した、防災マップに要るファイル（配信ルートからの相対）。 */
const PRECACHE = [
  "./bousai/index.html",
  "./bousai/manifest.webmanifest",
  "./site-header.css",
  "./icons/favicon-32.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/bousai-DGHmgiIg.js",
  "./assets/maplibre-gl-9UNWPgFo.css",
  "./assets/maplibre-gl-aIYBzkuZ.js",
  "./assets/maplibre-gl-shared.mjs",
  "./assets/maplibre-gl-worker.mjs",
  "./assets/pin-BA2ccSJA.js",
  "./assets/pin-Cmz58_rk.css"
];

/** 地図タイルの出所（航空写真など、まだ地理院に頼るもの）。見た範囲だけ端末に置く。 */
const TILE_HOSTS = ["cyberjapandata.gsi.go.jp", "protomaps.github.io"]; // 後者はラテン字形の PBF

/**
 * 防災マップの地図本体（docs/bousai-plan.md §2: OSM→PMTiles、自ドメイン）。
 * 3市町ぶんを1ファイルに切り出してある。**install では取らない** ── 数十MBを
 * install に含めると、殻が入るまで地図が出ない。activate 後に裏で取り込み、
 * 取り込めるまではネットから Range で部分読みする（初回3秒の条件・§1-2）。
 */
const ARCHIVE = "./bousai/kyototamba.pmtiles";
const ARCHIVE_CACHE = "ktn-bousai-archive-v1";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    // 1つでも落ちたら install 失敗＝古い版が生き続ける。**黙って半端に入れない。**
    await cache.addAll(PRECACHE);
    await cache.put(META_URL, new Response(JSON.stringify({ version: VERSION, cachedAt: new Date().toISOString() }),
      { headers: { "content-type": "application/json" } }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // 前の版の殻は捨てる。タイルは残す。
    for (const k of await caches.keys()) {
      if (k.startsWith("ktn-bousai-shell-") && k !== SHELL) await caches.delete(k);
    }
    await self.clients.claim();
    // 地図本体を裏で入れる。待たない（失敗しても殻は生きている）。
    event.waitUntil(precacheOnce().catch(() => {}));
  })());
});

const archiveUrl = () => new URL(ARCHIVE, self.location.href).href;

/** 走っている取り込み。**同時に2本走らせない**（19MB を二重に落とすことになる）。 */
let precaching = null;
function precacheOnce() {
  if (!precaching) precaching = precacheArchive().finally(() => { precaching = null; });
  return precaching;
}

/** 地図本体を丸ごと端末に置く。既にあれば何もしない。進み具合はページへ知らせる。 */
async function precacheArchive() {
  const cache = await caches.open(ARCHIVE_CACHE);
  if (await cache.match(archiveUrl())) return;
  const res = await fetch(archiveUrl(), { cache: "no-store" });
  if (!res.ok || !res.body) throw new Error("archive fetch failed: " + res.status);
  const total = Number(res.headers.get("content-length") || 0);
  const reader = res.body.getReader();
  const chunks = []; let got = 0, lastTold = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); got += value.byteLength;
    if (got - lastTold > 1_000_000) { lastTold = got; tell({ type: "ktn:archive", got, total }); }
  }
  const blob = new Blob(chunks, { type: "application/octet-stream" });
  await cache.put(archiveUrl(), new Response(blob, {
    headers: { "content-type": "application/octet-stream", "content-length": String(blob.size), "etag": '"' + VERSION + '"' },
  }));
  tell({ type: "ktn:archive", got: blob.size, total: blob.size, done: true });
}

async function tell(msg) {
  for (const c of await self.clients.matchAll({ includeUncontrolled: true })) c.postMessage(msg);
}

/** 端末にある地図本体（無ければ null）。SW は落とされることがあるので、毎回 cache から。 */
let archiveBuf = null;
async function archiveBytes() {
  if (archiveBuf) return archiveBuf;
  const cache = await caches.open(ARCHIVE_CACHE);
  const hit = await cache.match(archiveUrl());
  if (!hit) return null;
  archiveBuf = await hit.arrayBuffer();
  return archiveBuf;
}

/**
 * Range 要求に、端末のファイルから **206 を自分で切り出して** 返す。
 *
 * Cache API は Range を知らない ── cache.match は常に全体を返す。pmtiles の読み手は
 * 「200 で Content-Length が要求より大きい」と見ると Byte Serving 非対応として投げる
 * （node_modules/pmtiles FetchSource.getBytes）。だから自分で切る。
 */
function sliceResponse(buf, rangeHeader) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || "");
  const size = buf.byteLength;
  let start = 0, end = size - 1;
  if (m) {
    if (m[1] === "" && m[2] !== "") { start = Math.max(0, size - Number(m[2])); }
    else { start = Number(m[1] || 0); if (m[2] !== "") end = Math.min(size - 1, Number(m[2])); }
  }
  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "content-range": `bytes */${size}` } });
  }
  const body = buf.slice(start, end + 1);
  return new Response(body, {
    status: m ? 206 : 200,
    headers: {
      "content-type": "application/octet-stream",
      "content-length": String(body.byteLength),
      "accept-ranges": "bytes",
      "etag": '"' + VERSION + '"',
      ...(m ? { "content-range": `bytes ${start}-${end}/${size}` } : {}),
    },
  });
}

const isTile = (url) => TILE_HOSTS.includes(url.hostname);
const inShell = (url) => url.origin === self.location.origin && PRECACHE_SET.has(url.pathname);
// 基準は **self.location（この sw.js の場所）**。self.registration.scope は
// スクリプトの評価時点では使えず、「script evaluation failed」で登録ごと落ちた
// （2026-09-03 実測）。ルート配置なので、場所＝scope で同じ。
const BASE = self.location.href;
const PRECACHE_SET = new Set(PRECACHE.map((p) => new URL(p, BASE).pathname));
// ページは /bousai/ という**ディレクトリの形**で要求される（index.html は付かない）。
// 列挙は index.html で持っているので、その形も殻として認める。
for (const p of [...PRECACHE_SET]) if (p.endsWith("/index.html")) PRECACHE_SET.add(p.slice(0, -"index.html".length));
const PAGE = new URL("bousai/index.html", BASE).href;

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // 地図本体（PMTiles）: 端末にあれば Range を自分で切って返す。無ければネットへ通す
  // （配信先は両方とも 206 を返す。裏の取り込みが終わるまでの間だけ）。
  if (url.origin === self.location.origin && url.href.split("?")[0] === archiveUrl()) {
    event.respondWith((async () => {
      let buf = await archiveBytes();
      // まだ無ければ、取り込みを**待ってから**切る。配信先へ Range を通しても
      // 本番（Cloudflare Pages）は 200 で 19MB 全体を返すので、通す意味が無い
      // （2026-09-03 実測）。待つあいだページは白いが、二重に落とすよりよい。
      if (!buf) {
        try { await precacheOnce(); } catch { /* 下で 504 */ }
        buf = await archiveBytes();
      }
      if (buf) return sliceResponse(buf, req.headers.get("range"));
      return new Response("", { status: 504, statusText: "offline: archive not cached" });
    })());
    return;
  }

  // 地図タイル: 端末にあればそれ、無ければ取って置く。
  // 圏外のときは、以前に一度でも表示した範囲だけが描ける（そこが限界。§2）。
  if (isTile(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(TILES);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch {
        return new Response("", { status: 504, statusText: "offline: tile not cached" });
      }
    })());
    return;
  }

  // 防災マップの殻: ページ本体はネット優先（配信し直しをすぐ反映）、
  // それ以外の資産は名前にハッシュが入っているので端末優先で足りる。
  if (inShell(url)) {
    const isPage = url.pathname.endsWith("/bousai/index.html") || url.pathname.endsWith("/bousai/");
    event.respondWith((async () => {
      const cache = await caches.open(SHELL);
      if (isPage) {
        try {
          const res = await fetch(req);
          // /bousai/ で来ても index.html の鍵で持つ（1つに寄せる）
          if (res.ok) cache.put(PAGE, res.clone());
          return res;
        } catch {
          return (await cache.match(PAGE)) || new Response("offline", { status: 503 });
        }
      }
      return (await cache.match(req)) || fetch(req);
    })());
    return;
  }
  // それ以外は触らない。
});

// ページから「いまの状態」を聞かれたとき用。
self.addEventListener("message", (event) => {
  if (event.data === "ktn:meta") {
    event.waitUntil((async () => {
      const cache = await caches.open(SHELL);
      const m = await cache.match(META_URL);
      const meta = m ? await m.json() : null;
      const tiles = await caches.open(TILES);
      const n = (await tiles.keys()).length;
      const arc = await (await caches.open(ARCHIVE_CACHE)).match(archiveUrl());
      const archiveBytesN = arc ? Number(arc.headers.get("content-length") || 0) : 0;
      event.source?.postMessage({ type: "ktn:meta", meta, tiles: n, archive: archiveBytesN });
      // 無ければ改めて取りに行く（activate 時に失敗していた・途中で落とされた、など）
      if (!arc) precacheOnce().catch(() => {});
    })());
  }
});
