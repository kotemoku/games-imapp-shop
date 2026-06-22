(() => {
  'use strict';

  function download(bytes, fileName, text) {
    try {
      const blob = new Blob([bytes], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'burger-score.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (e) {
      console.error('burgerShare download failed', e);
    }
  }

  // 可能なら Web Share API（画像つき）を使い、無理ならダウンロードにフォールバック。
  async function shareImage(bytes, fileName, text) {
    try {
      const file = new File([bytes], fileName || 'burger-score.png', {
        type: 'image/png',
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: text });
        return true;
      }
    } catch (e) {
      // 共有がキャンセル/失敗したらダウンロードに切り替える。
    }
    download(bytes, fileName, text);
    return false;
  }

  window.burgerShare = Object.freeze({ download, shareImage });
})();
