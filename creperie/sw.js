/* アプリシェルのキャッシュ（キオスク・PWA 用の最小構成）
 * - ナビゲーション/HTML: ネットワーク優先（デプロイ即反映・オフライン時のみキャッシュ）
 * - その他同一オリジン: キャッシュ優先（assets は内容ハッシュ名なので安全） */
const CACHE = 'creperie-v1';
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // フォント等の外部はブラウザキャッシュに任せる
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || Response.error()))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});
