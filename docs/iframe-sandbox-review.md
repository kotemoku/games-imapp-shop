# iframe sandbox 属性の見直し依頼 (Flutter / Web ゲームチーム向け)

imapp のセキュリティ監査 (2026-06-24) で M-1 として指摘された件です。
**実装の確認と必要なら sandbox の緩和を求めません** — 逆に「より厳しくしたい」
ので、各ゲームでブラウザ機能の利用状況を教えてほしいという依頼です。

## 背景

imapp は 3 つの外部 Web ゲームを iframe で埋め込んでいます:

- Burger Stack Rush (Flutter Web)
- Packer Panic (Vite/Phaser)
- Tsukurun (素の HTML/CSS/JS)

現在 3 つの iframe すべてに次の sandbox を指定しています:

```html
<iframe sandbox="allow-scripts allow-same-origin" ...>
```

## 問題

MDN / WHATWG 仕様では **`allow-scripts` + `allow-same-origin` の同時指定は危険**
と明示的に警告されています。理由:

- iframe 内のスクリプトが自分自身の `<iframe>` 要素にアクセスして `sandbox`
  属性を削除/変更できるため、sandbox の保護が実質無効化されます
- ゲームコードが何らかの理由 (依存ライブラリの汚染、CDN ファイル差し替え等)
  で悪意のあるコードを含んだ場合、imapp 側の Cookie / セッションにアクセス
  される可能性があります (深度防御として sandbox が機能しない)

## 確認してほしいこと

各ゲームについて、次のうち **どれを使っているか** 教えてください。
`allow-same-origin` が必須かどうかが判断できます。

| 機能 | 必要なら `allow-same-origin` 必須 |
|------|---------|
| localStorage (自分のオリジン配下) を読み書きする | ✅ 必須 |
| Cookie (自分のオリジン配下) を読み書きする | ✅ 必須 |
| IndexedDB を使う | ✅ 必須 |
| 自分のオリジン配下の static ファイル (画像/JSON) を fetch する | ❌ 不要 (`fetch()` は通常動く) |
| 自分のオリジン以外への CORS 許可済み API を fetch する | ❌ 不要 |
| WebGL/WebAudio を使う | ❌ 不要 |
| Web Worker を起動する | ❌ 不要 |
| Service Worker を登録する | ✅ 必須 |
| クリップボード操作 | ❌ 不要 |

## 代替案 (もし `allow-same-origin` 不要なら)

iframe の `sandbox` を次のいずれかに変更したいです:

### 案 A: スクリプトのみ (推奨)
```html
<iframe sandbox="allow-scripts" ...>
```
ゲームは普通に動くが、自分のオリジンの storage / cookie へのアクセスは
ブラウザに「null origin」扱いされて拒否されます。

### 案 B: ゲーム本体に必要な機能だけ追加
```html
<iframe sandbox="allow-scripts allow-forms allow-popups" ...>
```
具体的に必要な機能を指示してくれれば、最小権限で組みます。

## 各ゲームへの個別質問

### Burger Stack Rush (Flutter Web)
- Flutter のデフォルトでは Service Worker (`flutter_service_worker.js`) が
  登録されますが、imapp の iframe 経由で起動した時に **本当に SW 登録が
  必要ですか**?
  - 必要なら `allow-same-origin` 維持
  - 不要なら案 A に変更可
- localStorage で何を保存していますか? (ハイスコア / 設定 / その他)

### Packer Panic (Vite/Phaser)
- ローカルランキング (localStorage) を保存していますが、imapp embed モード
  (`?embed=1`) では imapp 側で集計するので、localStorage 保存はスキップ
  しても問題ないですか?
- そうなら `allow-same-origin` を外せます

### Tsukurun (素の HTML/CSS/JS)
- localStorage は使っていますか?
- 使っていなければ案 A に変更したいです

## 回答方法

このファイルにコメントを書き加えるか、各ゲームのリポジトリの README に
追記してください。回答が来次第 imapp 側の `app/games/*/Tsukurun.tsx` 等
iframe ラッパーの `sandbox` を変更します。

---

## 参考リンク

- MDN `<iframe>`: https://developer.mozilla.org/docs/Web/HTML/Element/iframe#sandbox
- WHATWG HTML spec sandbox: https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox
