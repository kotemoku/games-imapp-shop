# 通達: こんぺい堂 連携の正規化のお願い

> **送付先**: こんぺい堂 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 中（**要対応・ただし急がない／無停止で移行**）

## 要点

imapp 埋め込み連携の正式契約を `docs/EMBED-CONTRACT.md` に定めました。
こんぺい堂は **2点だけ標準から外れている**ので、次に game.js を触るタイミングで
標準へ寄せてください。**今すぐ壊れているわけではありません**（imapp 側アダプタで
吸収済み）。

| 項目 | 現状（こんぺい堂） | 標準 |
|---|---|---|
| host→game の source | `'imapp'` | **`'imappt'`** |
| 終了イベント | `game_over` と `save_score` の二種 | **`game_over` 一本** |

## 無停止の移行手順（この順番を厳守）

ゲーム側だけ先に旧仕様を消すと、imapp が現行アダプタで送る `source:'imapp'` を
受け取れず config が届かなくなります。必ず下記の順で。

1. **【こんぺい堂】** host→game の config 受信を、`source` が `'imappt'` **と**
   `'imapp'` の**両方**で通るようにする（OR 条件にするだけ）。
   送信は `game_over` に一本化（当面 `save_score` も併発で可）。
   → リビルド＆ `npm run deploy`（dist → games-imapp-shop/konpeito/ 同期）。
2. **【imapp】** こちらでアダプタを `hostSource:'imapp'→'imappt'`、
   `terminalTypes:['game_over']` に変更（`app/games/konpeito/Konpeito.tsx`）。
3. **【こんぺい堂】** 安定後、`'imapp'` 受信と `save_score` 送信を削除。

ステップ1ができたら imapp に「konpeito 両対応デプロイ済み」と伝えてください。
こちらで2を実施します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装: imapp リポジトリ `docs/game-embed.md` / `app/games/konpeito/Konpeito.tsx`
