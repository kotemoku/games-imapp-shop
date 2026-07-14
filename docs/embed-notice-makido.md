# 通達: 薪道 -MAKIDO- を imapp に連動させる依頼

> **送付先**: 薪道 -MAKIDO- 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-14
> **重要度**: 中（新規連携・現在は imapp 未公開＝配信のみ）

## 1. お願い

imapp (https://imapp.shop) に 薪道 -MAKIDO- を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`makido`**（`games.imapp.shop/makido/`）
- game→host の source: **`'makido'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [x] **単独リポジトリで開発している**（1 タイトル = 1 git リポジトリ・GitHub private・
      リポジトリ名は `makido`。ローカルは Desktop 直下 `makibi/`）。
- [x] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `parent.postMessage({source:'makido', type:'ready'}, hostOrigin)`。
- [x] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を表示に反映し `config_ack` を返す。
- [x] 1ラウンド終了で `{source:'makido', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
      ※ makido のラウンド定義: **火入れ（転生）**。インクリメンタルゲームのため周回＝ラウンド。payload は
      `{ score, okibi, logs_split, prestiges }`（score = その周回で獲得した薪・整数・**大きいほど上位**）。
- [x] 周回の初スイングで `game_start` を送信（任意イベント）。
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] `game_over.payload` の数値は整数・常識的な値域（imapp スコア API が弾く）。
- [x] `?store=<id>` の店舗モード対応（店名バッジ・差し色。store_id は識別子のみ・PII 非保持）。
- [x] **配信規約（games-imapp-shop README「配信規約」参照）に従う**:
      Vite `base:'./'`・アセットは content-hash（音は Web Audio ランタイム合成で外部音源なし）。
      `_headers` には `/makido/assets/*` の1ルールだけ追加し、
      `node scripts/check-headers.mjs` を通す。

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/makido/<Name>.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準: hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `<Name>Client.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/makido/score` + `/checkin`
- [ ] migration: `makido_scores` テーブル / `makido_leaderboard` / `_my_stats` RPC / `shop_games` 行
- [ ] env `NEXT_PUBLIC_MAKIDO_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加

※ score のランキング方向: makido の score は「周回で獲得した薪」なので **大きいほど上位**（takibi と逆）。
※ インクリメンタルのため `game_over` の頻度は低い（火入れ時のみ）。セッション内で発火しないことも普通にある。

## 5. 完了の定義 / 連絡

ゲーム側 §3 は実装・デプロイ済み（2026-07-14）。ただし**当面は imapp 未公開（配信のみ）**とする。
公開判断が出たら imapp 側 §4 を実施して公開する。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- ゲーム側の実装詳細: makido リポジトリ `docs/imapp-integration.md`
