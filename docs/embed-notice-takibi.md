# 通達: 焚き火 -takibi- を imapp に連動させる依頼

> **送付先**: 焚き火 -takibi- 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-14
> **重要度**: 中（新規連携・現在は imapp 未公開＝配信のみ）

## 1. お願い

imapp (https://imapp.shop) に 焚き火 -takibi- を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`takibi`**（`games.imapp.shop/takibi/`）
- game→host の source: **`'takibi'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [x] **単独リポジトリで開発している**（1 タイトル = 1 git リポジトリ・GitHub private・
      リポジトリ名は `takibi` と同名。他ゲームとの相乗り禁止 → EMBED-CONTRACT §0）。
- [x] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `parent.postMessage({source:'takibi', type:'ready'}, hostOrigin)`。
- [x] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [x] 1ラウンド終了で `{source:'takibi', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
      ※ takibi のラウンド定義: **点火 → 熾火到達**。payload は
      `{ score, timeToEmberSec, logs, damped }`（score = 熾火到達までの秒数・整数）。
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] `game_over.payload` の数値は整数・常識的な値域（imapp スコア API が弾く）。
- [x] **配信規約（games-imapp-shop README「配信規約」参照）に従う**:
      単一 HTML・外部アセットなし（音・映像とも全てランタイム生成）。
      `_headers` には `/takibi/assets/*` の1ルールだけ追加し、
      `node scripts/check-headers.mjs` を通す。

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/takibi/<Name>.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準なら hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `<Name>Client.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/takibi/score` + `/checkin`
- [ ] migration: `takibi_scores` テーブル / `takibi_leaderboard` / `_my_stats` RPC / `shop_public_by_qr` に `takibi_enabled` 列
- [ ] env `NEXT_PUBLIC_TAKIBI_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 README 配信テーブルに追記、`_headers` に `/takibi/assets/*` の1ルールを追加
      （README「配信規約」参照。`scripts/check-headers.mjs` が追加漏れを検出する）

※ score のランキング方向に注意: takibi の score は「熾火到達までの秒数」なので **小さいほど上位**。

## 5. 完了の定義 / 連絡

ゲーム側 §3 は実装・デプロイ済み（2026-07-14）。ただし**当面は imapp 未公開（配信のみ）**とする。
公開判断が出たら imapp 側 §4 を実施して公開する。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
