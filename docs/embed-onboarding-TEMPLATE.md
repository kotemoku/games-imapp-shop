<!-- ===================================================================
  新ゲームを imapp に連動させるときの通達テンプレ。

  使い方:
    1. このファイルを docs/embed-notice-<game-key>.md にコピー。
    2. 下の <GAME-KEY> と <ゲーム名> を全置換。
    3. 「重要度」と日付だけ整える。本文の仕様は触らない（正本を指すだけ）。
    4. コミット＆push → 対象ゲームのセッション/開発者に「読んで」と伝える。
    5. 新ゲームのソースrepo直下に、末尾「付録」のポインタ・スタブ(EMBED.md)を置く。
       ※ 全文コピーではなくポインタだけ。正本は1本(EMBED-CONTRACT.md)に保つ。

  ※ 仕様そのものは EMBED-CONTRACT.md にしか書かない。ここに仕様を写経しないこと。
==================================================================== -->

# 通達: <ゲーム名> を imapp に連動させる依頼

> **送付先**: <ゲーム名> 開発担当
> **送付元**: imapp チーム
> **日付**: YYYY-MM-DD
> **重要度**: 中（新規連携）

## 1. お願い

imapp (https://imapp.shop) に <ゲーム名> を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`<game-key>`**（`games.imapp.shop/<game-key>/`）
- game→host の source: **`'<game-key>'`**

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [ ] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [ ] 初期化完了で `parent.postMessage({source:'<game-key>', type:'ready'}, hostOrigin)`。
- [ ] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [ ] 1ラウンド終了で `{source:'<game-key>', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
- [ ] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [ ] `game_over.payload` の数値は整数・常識的な値域（imapp スコア API が弾く）。

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/<game-key>/<Name>.tsx`: `GameEmbedAdapter` を 1 つ宣言（標準なら hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `<Name>Client.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/<game-key>/score` + `/checkin`
- [ ] migration: `<game-key>_scores` テーブル / `<game-key>_leaderboard` / `_my_stats` RPC / `shop_public_by_qr` に `<game-key>_enabled` 列
- [ ] env `NEXT_PUBLIC_<X>_GAME_URL` / `_ORIGIN`、`lib/games/maintenance.ts` フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 `_headers` に `/<game-key>/*` ブロック、README 配信テーブルに追記

## 5. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「<game-key> 連携実装デプロイ済み」**と伝えてください。imapp 側 §4 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`

---

## 付録: 新ゲームのソースrepoに置くポインタ・スタブ

新ゲームのソースリポジトリ直下に **`EMBED.md`** として以下を貼る。
**全文コピーは禁止**（正本がズレる）。これは正本を指すだけのポインタ。
`<game-key>` だけ置換する。

```markdown
# imapp 連携について
このゲームの imapp 埋め込み契約は、games-imapp-shop リポジトリの
docs/EMBED-CONTRACT.md が正本（唯一の仕様）。
自分宛ての指示は同 docs/embed-notice-<game-key>.md を参照。
方言を作らず標準（packer-panic / tsukurun）に従うこと。
```
