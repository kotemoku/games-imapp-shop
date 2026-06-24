(() => {
  'use strict';

  // imapp など埋め込みホストへ、ゲームのライフサイクル/スコアを postMessage で通知する。
  // ホスト側は window.addEventListener('message', e => { if (e.data.source === 'burger-stack-rush') ... })
  // で受け取れる。受信オリジンの検証はホスト側で行うこと。
  function post(type, payloadJson) {
    try {
      const payload = payloadJson ? JSON.parse(payloadJson) : {};
      const message = { source: 'burger-stack-rush', type: type, payload: payload };
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
      }
      // 同一ウィンドウ内のリスナー（デバッグや同梱ホスト）向けにも発火。
      window.dispatchEvent(new CustomEvent('burger-' + type, { detail: payload }));
    } catch (e) {
      console.error('burgerBridge post failed', e);
    }
  }

  // iframe 埋め込み（imapp内）か、単体プレイ（直アクセス）かを判定。
  function isEmbedded() {
    try {
      return window.self !== window.top;
    } catch (e) {
      // クロスオリジンで top にアクセスできない＝埋め込みとみなす。
      return true;
    }
  }

  // このゲームの正規URL（クエリ等を除いたもの）。アドレス表示・共有用。
  function gameUrl() {
    try {
      return window.location.origin + window.location.pathname;
    } catch (e) {
      return '';
    }
  }

  // 外部URLを新しいタブで開く（imapp登録ページ等）。
  function openExternal(url) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      console.error('openExternal failed', e);
    }
  }

  // テキスト（URL）をクリップボードへコピー。共有が使えれば共有。
  function copyLink(text) {
    try {
      if (navigator.share) {
        navigator.share({ url: text }).catch(() => {});
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {
      console.error('copyLink failed', e);
    }
  }

  window.burgerBridge = Object.freeze({
    post,
    isEmbedded,
    gameUrl,
    openExternal,
    copyLink,
  });
})();
