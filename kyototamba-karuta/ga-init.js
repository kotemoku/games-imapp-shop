// アクセス解析（Google アナリティクス 4）の初期化。
// ここの MEASUREMENT_ID に GA4 の測定ID（G-XXXXXXXXXX）を入れて deploy すると、
// ゲーム本体＋全ページ（about / ads / legal / shops）で計測が始まる。
// 空文字のあいだは何も読み込まない（= 解析オフ。プライバシーポリシー§3と連動）。
// 送信するのは閲覧ページと操作イベントのみ。氏名等の個人情報・GPS位置情報は送らない。
(function () {
  var MEASUREMENT_ID = ""; // ← GA4 測定IDをここに（例 "G-ABC123XYZ"）
  if (!MEASUREMENT_ID) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
})();
