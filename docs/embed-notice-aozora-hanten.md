<!-- embed-onboarding-TEMPLATE.md から生成（2026-07-14） -->

# 通達: あおぞら飯店メニューバトル を imapp に連動させる依頼

> **送付先**: あおぞら飯店メニューバトル 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-14
> **重要度**: 中（新規連携）

## 1. お願い

imapp (https://imapp.shop) に あおぞら飯店メニューバトル を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`aozora-hanten`**（`games.imapp.shop/aozora-hanten/`）
- game→host の source: **`'aozora-hanten'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [x] **単独リポジトリで開発している**（`github.com/kotemoku/aozora-hanten`・private。
      ローカルは Desktop 直下 `chuka-tactics-kit`）。
- [x] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `parent.postMessage({source:'aozora-hanten', type:'ready'}, hostOrigin)`。
- [x] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [x] 1ラウンド終了で `{source:'aozora-hanten', type:'game_over', payload:{...スコア...}}` を送信。
      payload: `{ score, clearedWaves, survivorsHp, victory }`（score = クリアウェーブ×100＋残HP×10・整数）。
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] `game_over.payload` の数値は整数・常識的な値域（score 上限 ~450）。
- [x] **配信規約に従う**: assets は内容ハッシュ名のみ（immutable）。
      差し替わる素材（カード絵・アイコン）は `/cards/` `/icon/` に配置し `/assets/` に置かない。
      `_headers` は `/aozora-hanten/assets/*` の1ルールのみ（`check-headers.mjs` 通過済み）。

実装箇所: ソースリポジトリ `src/imapp.ts`（ブリッジ）、`src/scenes/BootScene.ts`（ready）、
`src/scenes/BattleScene.ts`（game_start / game_over）。

## 4. imapp 側でやること（imapp チーム担当・FYI）

**現状は「配信のみ・未公開」**（`lib/games/deployedGames.ts` に published: false で登録済み）。
公開時にゲーム側は §3 済みなので、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/aozora-hanten/AozoraHanten.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準: hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `AozoraHantenClient.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/aozora-hanten/score` + `/checkin`
- [ ] migration: `aozora_hanten_scores` テーブル / leaderboard / _my_stats RPC（店舗有効化は `shop_games` INSERT のみ）
- [ ] `lib/games/maintenance.ts` フラグ、`/games`・`/admin/games`・`/subscribe` の一覧に追加

## 5. 完了の定義 / 連絡

ゲーム側 §3 実装済みビルドは **2026-07-14 デプロイ済み**（`aozora-hanten/` 配信中）。
公開判断が出たら imapp 側 §4 を実施して公開する。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
