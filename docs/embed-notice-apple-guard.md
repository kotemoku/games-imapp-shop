# 通達: アップルガード を imapp に連動させる依頼

> **送付先**: アップルガード 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 高（新規連携・**postMessage を一から実装**する必要あり）

## 1. お願い

imapp (https://imapp.shop) に アップルガード を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`apple-guard`**（`games.imapp.shop/apple-guard/`）
- game→host の source: **`'apple-guard'`**
- host→game の source は **`'imappt'`**（旧 `'imapp'` ではない。標準に従う）

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [ ] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [ ] 初期化完了で `parent.postMessage({source:'apple-guard', type:'ready'}, hostOrigin)`。
- [ ] host からの `{source:'imappt', type:'config', payload:{player}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [ ] 1ラウンド終了で `{source:'apple-guard', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない）
- [ ] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [ ] `game_over.payload` の数値は整数・常識的な値域。主スコア例:
      `{ score, wave?, survivalSec?, bestCombo?, player? }`

## 4. 固有の調査結果（imapp 側調査・要対応）

⚠️ **配信中ビルドには postMessage / parent 送信処理がまったく無い**。
- `postMessage` 文字列がビルドに含まれない / `parent.` 参照も無い。
- → 現状 imapp はゲーム結果を受け取る手段が一切ない。**新規実装が必須**
  （ツクルンが素 JS → Phaser4 で連携を足したのと同規模）。
- localStorage / IndexedDB / Web Audio / Service Worker を使う場合は申告してください
  （imapp は `sandbox="allow-scripts allow-same-origin"` で起動）。

## 5. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/apple-guard/AppleGuard.tsx`: `GameEmbedAdapter` を標準で宣言
- [ ] `page.tsx` + `AppleGuardClient.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/apple-guard/score` + `/checkin`
- [ ] migration: `apple_guard_scores` / `apple_guard_leaderboard` / `_my_stats` RPC /
      `shop_public_by_qr` に `apple_guard_enabled` 列
- [ ] env `NEXT_PUBLIC_APPLE_GUARD_GAME_URL` / `_ORIGIN`、maintenance フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 `_headers` の `/apple-guard/*` ブロック（既存）、README 配信テーブル（既存）

## 6. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「apple-guard 連携実装デプロイ済み」**と伝えてください。imapp 側 §5 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- 質問: imapp チーム (komok2009@gmail.com)
