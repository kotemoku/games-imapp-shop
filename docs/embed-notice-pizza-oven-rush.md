# 通達: ピザオーブンラッシュ を imapp に連動させる依頼

> **送付先**: ピザオーブンラッシュ 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 中（postMessage は存在するが **target origin と構造の確定が必要**）

## 1. お願い

imapp (https://imapp.shop) に ピザオーブンラッシュ を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を標準に合わせて確定**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`pizza-oven-rush`**（`games.imapp.shop/pizza-oven-rush/`）
- game→host の source: **`'pizza-oven-rush'`**
- host→game の source は **`'imappt'`**（旧 `'imapp'` ではない。標準に従う）

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [ ] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [ ] 初期化完了で `parent.postMessage({source:'pizza-oven-rush', type:'ready'}, hostOrigin)`。
- [ ] host からの `{source:'imappt', type:'config', payload:{player}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [ ] 1ラウンド終了で `{source:'pizza-oven-rush', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない。`game_over` に一本化）
- [ ] 送信は常に `parent.postMessage(msg, hostOrigin)`。**`'*'` は使わない**（現状の最大の問題点）。
- [ ] `game_over.payload` の数値は整数・常識的な値域。主スコア例:
      `{ score, level?, time?, player? }`

## 4. 固有の調査結果（imapp 側調査・要対応）

- ✅ `postMessage` 呼び出しは配信中 JS に存在する。
- ⚠️ **target origin が `'*'`** → 任意のページから iframe 経由でスコア偽装可能。
      **`hostOrigin` 固定に修正必須**（§3）。
- ⚠️ メッセージ構造（`source`/`type`/`payload`）が逆解析だけでは確定できなかった。
      → §3 のとおり確定してください。
- ⚠️ `CustomEvent('pizza-${p}')` の用途が不明（内部イベントか postMessage 補助か）。
      連携には不要なら残してよいが、host への通知は §3 の postMessage に統一すること。
- [ ] localStorage / IndexedDB / Web Audio / Service Worker を使う場合は申告してください
      （imapp は `sandbox="allow-scripts allow-same-origin"` で起動）。

## 5. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/pizza-oven-rush/PizzaOvenRush.tsx`: `GameEmbedAdapter` を標準で宣言
- [ ] `page.tsx` + `PizzaOvenRushClient.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/pizza-oven-rush/score` + `/checkin`
- [ ] migration: `pizza_oven_rush_scores` / `pizza_oven_rush_leaderboard` / `_my_stats` RPC /
      `shop_public_by_qr` に `pizza_oven_rush_enabled` 列
- [ ] env `NEXT_PUBLIC_PIZZA_OVEN_RUSH_GAME_URL` / `_ORIGIN`、maintenance フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 `_headers` の `/pizza-oven-rush/*` ブロック（既存）、README 配信テーブル（既存）

## 6. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「pizza-oven-rush 連携実装デプロイ済み」**と伝えてください。imapp 側 §5 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- 質問: imapp チーム (komok2009@gmail.com)
