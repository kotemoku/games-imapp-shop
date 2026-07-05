# 通達: La Crêperie du Coin（花街のクレープリー） を imapp に連動させる依頼

> **送付先**: La Crêperie du Coin（花街のクレープリー） 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-05
> **重要度**: 中（新規連携）

## 1. お願い

imapp (https://imapp.shop) に La Crêperie du Coin を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`creperie`**（`games.imapp.shop/creperie/`）
- game→host の source: **`'creperie'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [x] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `parent.postMessage({source:'creperie', type:'ready'}, hostOrigin)`。
- [x] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [x] 1ラウンド終了で `{source:'creperie', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
      - 修行: `{mode:'training', event:<種目>, score:0..1000, graduated}`
      - 営業: `{mode:'service', service:<lunch|guests|rush>, score, served, lost, tips, coupon}`
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] `game_over.payload` の数値は整数・常識的な値域（imapp スコア API が弾く）。
- [x] **配信規約（games-imapp-shop README「配信規約」参照）に従う**:
      assets は内容ハッシュ名のみ → `_headers` に `/creperie/assets/*` の immutable 1ルールを追加済み。
      `node scripts/check-headers.mjs` を通す。

**2026-07-05: ゲーム側 §3 実装済みビルドを配信デプロイ済み（iframe親↔子のヘッドレス
スモークで ready/config/config_ack/偽ソース拒否/game_start/game_over を検証済み）。
imapp 側 §4 は未実施＝imapp 未公開（配信のみ）。**

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/creperie/Creperie.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準: hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `CreperieClient.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/creperie/score` + `/checkin`
- [ ] migration: `creperie_scores` テーブル / `creperie_leaderboard` / `_my_stats` RPC / `shop_public_by_qr` に `creperie_enabled` 列
- [ ] env `NEXT_PUBLIC_CREPERIE_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 README 配信テーブルに追記、`_headers` に `/creperie/assets/*` の1ルールを追加
      （→ どちらも 2026-07-05 実施済み）

## 5. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「creperie 連携実装デプロイ済み」**と伝えてください。imapp 側 §4 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
