/*
 * imapp 埋め込み連携ブリッジ (EMBED-CONTRACT §1〜§3 準拠)
 * -------------------------------------------------------------
 * games.imapp.shop/morse-spy/ に配信され、imapp (https://imapp.shop) に
 * iframe で埋め込まれたときだけ有効になる postMessage ブリッジ。
 * 仕様の正本は games-imapp-shop リポジトリ docs/EMBED-CONTRACT.md。
 * 方言を作らず packer-panic / tsukurun と同じ標準に合わせている。
 *
 * Dart 側からは window 上の以下のフラット関数だけを呼ぶ:
 *   imappEmbedEnabled()          -> boolean  埋め込み中か
 *   imappEmbedReady()            -> void     初期化完了を host に通知 (ready)
 *   imappEmbedGameOver(s, g)     -> void     ラウンド終了を host に通知 (game_over)
 *   imappEmbedPlayer()           -> string|null  表示名 (URL or config 由来)
 *
 * 埋め込み外 (通常配信 / PWA 単体) では全関数が安全な no-op になる。
 */
(function () {
  'use strict';

  var GAME_KEY = 'morse-spy';

  var params = new URLSearchParams(window.location.search);
  var hostOrigin = params.get('hostOrigin');
  var isEmbedFlag = params.get('embed') === '1' || params.get('imapp') === '1';

  // hostOrigin は postMessage の送信先 origin にそのまま使うため、
  // https:// もしくは http://localhost 以外は信用しない（'*' は使わない）。
  var originOk =
    typeof hostOrigin === 'string' &&
    (/^https:\/\/[^/]+$/.test(hostOrigin) ||
      /^http:\/\/localhost:\d+$/.test(hostOrigin) ||
      /^http:\/\/127\.0\.0\.1:\d+$/.test(hostOrigin));

  var embedded = isEmbedFlag && originOk;

  // 表示名。まず URL の player を初期値にし、後から届く config で上書きする。
  var player = params.get('player') || null;

  function post(type, payload) {
    if (!embedded) return;
    try {
      var msg = { source: GAME_KEY, type: type };
      if (payload !== undefined) msg.payload = payload;
      window.parent.postMessage(msg, hostOrigin);
    } catch (e) {
      /* 送信失敗は致命ではない — ゲームは埋め込み外同様に動き続ける */
    }
  }

  // host → game の受信。§3 のセキュリティ不変条件を満たす。
  window.addEventListener('message', function (e) {
    if (!embedded) return;
    if (e.origin !== hostOrigin) return; // origin 厳格一致
    var d = e.data;
    if (!d || d.source !== 'imappt') return; // 他 iframe の誤配を弾く

    if (d.type === 'config') {
      var p = d.payload || {};
      if (typeof p.player === 'string' && p.player.length > 0) {
        player = p.player;
      }
      // 受信確認（任意）
      post('config_ack', { player: player });
      // Dart 側が待っていればフック（config は非同期で届きうる）
      if (typeof window.__imappOnConfig === 'function') {
        try { window.__imappOnConfig(player); } catch (err) { /* noop */ }
      }
    }
  });

  // ---- Dart から呼ぶフラット API ----
  window.imappEmbedEnabled = function () { return embedded; };

  window.imappEmbedReady = function () {
    post('ready', { version: '1', game: GAME_KEY });
  };

  // 1ラウンド終了。score は必須・整数、gained は今回の増分（任意）。
  window.imappEmbedGameOver = function (score, gained) {
    var s = Math.max(0, Math.floor(Number(score) || 0));
    var g = Math.max(0, Math.floor(Number(gained) || 0));
    post('game_over', { score: s, gained: g });
  };

  window.imappEmbedPlayer = function () { return player; };
})();
