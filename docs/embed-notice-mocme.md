# 通達: MOCME（モクメ） を imapp に連動させる依頼

> **送付先**: MOCME（モクメ） 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-07
> **重要度**: 中（新規連携）

## 1. お願い

imapp (https://imapp.shop) に MOCME（モクメ） を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`mocme`**（`games.imapp.shop/mocme/`）
- game→host の source: **`'mocme'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [ ] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [ ] 初期化完了で `parent.postMessage({source:'mocme', type:'ready'}, hostOrigin)`。
- [ ] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [ ] 1ラウンド終了で `{source:'mocme', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
- [ ] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [ ] `game_over.payload` の数値は整数・常識的な値域（imapp スコア API が弾く）。
- [ ] **配信規約（games-imapp-shop README「配信規約」参照）に従う**:
      差し替わる素材は内容ハッシュ名（`public/` に同名で置かない）。
      `_headers` には `/mocme/assets/*` の1ルールだけ追加し、
      `node scripts/check-headers.mjs` を通す。

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/mocme/<Name>.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準なら hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `<Name>Client.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/mocme/score` + `/checkin`
- [ ] migration: `mocme_scores` テーブル / `mocme_leaderboard` / `_my_stats` RPC / `shop_public_by_qr` に `mocme_enabled` 列
- [ ] env `NEXT_PUBLIC_<X>_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 README 配信テーブルに追記、`_headers` に `/mocme/assets/*` の1ルールを追加
      （README「配信規約」参照。`scripts/check-headers.mjs` が追加漏れを検出する）

## 5. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「mocme 連携実装デプロイ済み」**と伝えてください。imapp 側 §4 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`

---

## 付録: 新ゲームのソースrepoに置くポインタ・スタブ

新ゲームのソースリポジトリ直下に **`EMBED.md`** として以下を貼る。
**全文コピーは禁止**（正本がズレる）。これは正本を指すだけのポインタ。
`mocme` だけ置換する。

```markdown
# imapp 連携について
このゲームの imapp 埋め込み契約は、games-imapp-shop リポジトリの
docs/EMBED-CONTRACT.md が正本（唯一の仕様）。
自分宛ての指示は同 docs/embed-notice-mocme.md を参照。
方言を作らず標準（packer-panic / tsukurun）に従うこと。
```
