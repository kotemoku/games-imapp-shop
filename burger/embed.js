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

  window.burgerBridge = Object.freeze({ post });
})();
