<!-- ===================================================================
  新ゲームを imapp に連動させるときの通達。
  embed-onboarding-TEMPLATE.md を複製し hana-irozuke / 花いろづけ を置換したもの。
  ※ 仕様そのものは EMBED-CONTRACT.md にしか書かない。ここに写経しない（正本を指すだけ）。
==================================================================== -->

# 通達: 花いろづけ を imapp に連動させる依頼

> **送付先**: imapp チーム（imapp 側 §4 実施担当）
> **送付元**: 花いろづけ 開発担当
> **日付**: 2026-07-21
> **重要度**: 中（新規連携・**§7 予約拡張を含む**）

## 1. お願い

imapp (https://imapp.shop) に 花いろづけ を **iframe で埋め込んで配信**したい。
ゲーム側の埋め込み連携 (postMessage) は **実装済み**（下記 §3）。
imapp 側 §4 を実施して公開してください。

**このゲームの性格**：花を束ねて色を塗る**のんびり創作＋来店予約型**。
競争スコアのゲームではない。`game_over.score` は「花束の本数」の**象徴整数**で、
順位付けは engagement（作った花束の数など）として**ソフトに**扱ってほしい。
`config.difficulty` は使わない（無視でよい）。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3（標準）＋ §7（予約）＋ §8（分析/シェア）** を正とする。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせている。§7 の先行実装は
`kyou-no-bres`（今日のブレス）。それに倣う。

- game-key（＝配信パス）: **`hana-irozuke`**（`games.imapp.shop/hana-irozuke/`）
- game→host の source: **`'hana-irozuke'`**

## 3. ゲーム側の実装状況（EMBED-CONTRACT §1〜§3・§7・§8 準拠・実装済み）

- [x] 起動 URL `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `{source:'hana-irozuke', type:'ready'}` を送信。
- [x] host の `{source:'imappt', type:'config', payload:{player}}` を受信（`event.origin===hostOrigin` 検証）。
      `player` を反映（タイトルに「ようこそ、○○さん」）。`config_ack` を返す。
- [x] 作品保存を1区切りとして `{source:'hana-irozuke', type:'game_over', payload:{score, flowers}}` を送信。
      **score = 本数の象徴整数**（スキル指標ではない）。
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] **§7 `reserve_intent`**：作った花束を「お店で相談」。
      `{menu:"花いろづけの花束", quantity, note, prepCard:{count, flowers:[{name,color,count}]}}` を送信。
      予約フォームはゲーム側に**持たない**（実入力は imapp 側が受け付ける想定）。
- [x] **§8**：`analytics('creation_saved')`（PII なし）／ 花束画像の Web Share。

> 実測ログ（ゲーム側スモーク）: `ready` → `config_ack(player)` → `reserve_intent` を確認済み。
> `reserve_intent.payload.note` 例: `"バラ（白）×1"`、`prepCard.flowers` は花材＋色＋本数。

## 4. imapp 側でやること（★このゲームの実施依頼）

標準ゲームのコピー＋**§7 予約の受け口**が要点。`kyou-no-bres` の実装が最も近い参照先。

**標準（§1〜§3）**
- [ ] `app/games/hana-irozuke/HanaIrozuke.tsx`: `GameEmbedAdapter` を1つ宣言
      （標準：`hostSource:'imappt'` / `configType:'config'` / `terminalTypes:['game_over']`）。
- [ ] `page.tsx` + `HanaIrozukeClient.tsx`：**結果は「作品を保存しました」を主**に。
      競争ランキングは任意（出すなら「作った花束の数」等のソフトな指標で）。
- [ ] `/api/games/hana-irozuke/score` + `/checkin`。
- [ ] migration：`hana_irozuke_scores` テーブル / `hana_irozuke_leaderboard` /
      `hana_irozuke_my_stats` RPC / `shop_public_by_qr` に `hana_irozuke_enabled` 列。
- [ ] env `NEXT_PUBLIC_HANAIROZUKE_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ。
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加。

**§7 予約（このゲーム固有・要対応）**
- [ ] `reserve_intent` を受けたら **imapp の予約 UI**（未購読なら購読ゲート → 予約フォーム）を開く。
      `payload.prepCard`（花材＋色＋本数）を予約シートの**伝言欄に整形表示**。
      予約の確定は host が著作（payload は untrusted 扱い）。
- [ ] 予約確定後に `{source:'imappt', type:'reservation_confirmed', payload}` を返送
      （ゲームは演出のみ）。
- [ ] `shop_public_by_qr` に **`reservation_enabled`** 列（対象店のみ予約導線を有効化）。
      OFF 店では `reserve_intent` を無視/非表示に。
- [ ] `notify_pref{enabled:true}` で購読フローへ（`notify_pref_ack{subscribed}` を返す）。

**§8 分析/シェア**
- [ ] `analytics`（`creation_saved`）を `?shop=` 起動時に記録（PII なし・fields 4KB まで）。
- [ ] Web Share は共通の `allow="web-share"` で動く（追加不要）。

**配信（games-imapp-shop 側）**
- [ ] `_headers` に `/hana-irozuke/assets/*` の**1ルールのみ**追加（**`no-cache, must-revalidate`**）。
      理由：`assets/flowers`・`assets/masks` が**同名の花PNG**（内容ハッシュではない）。
      ゲーム側の `npm run deploy` は `deploy-game.mjs … --no-cache` を渡す。
- [ ] README 配信テーブルに `/hana-irozuke/` を追記。

## 5. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイ（`npm run deploy -- --run --push`）したら、imapp に
**「hana-irozuke 連携実装デプロイ済み」**と伝える。imapp 側 §4（特に §7 予約の受け口）を実施して公開。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`（§1-3 標準 / §7 予約 / §8 分析・シェア）
- §7 先行実装: `docs/embed-notice-kyou-no-bres.md`（今日のブレス）
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- ゲーム側設計: `hana-irozuke` リポジトリ `docs/SPEC_hana-irozuke.md` §13
