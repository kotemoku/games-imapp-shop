# 通達: 番台奉行（仮） を imapp に連動させる依頼

> **送付先**: 番台奉行（仮）開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-29
> **重要度**: 中（新規連携）

## 1. お願い

imapp (https://imapp.shop) に 番台奉行（仮） を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**してください。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**してください。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせること。

- game-key（＝配信パス）: **`bandai-bugyo`**（`games.imapp.shop/bandai-bugyo/`）
- game→host の source: **`'bandai-bugyo'`**
- host→game の source は **`'imappt'`**（旧 `'imapp'` ではない。標準に従う）

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）

- [ ] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [ ] 初期化完了で `parent.postMessage({source:'bandai-bugyo', type:'ready'}, hostOrigin)`。
- [ ] host からの `{source:'imappt', type:'config', payload:{player}}` を受信。
      `event.origin === hostOrigin` を検証。`player` を反映。
- [ ] 1ラウンド終了で `{source:'bandai-bugyo', type:'game_over', payload:{...スコア...}}` を送信。
      （`result` 等の別名にしない。`game_over` に一本化）
- [ ] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [ ] `game_over.payload` の数値は整数・常識的な値域。主スコア例: `{ score, ..., player? }`

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たせば、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/bandai-bugyo/BandaiBugyo.tsx`: `GameEmbedAdapter` を標準で宣言
- [ ] `page.tsx` + `BandaiBugyoClient.tsx`（結果ダイアログ・スコア保存・来店チェックインパネル）
- [ ] `/api/games/bandai-bugyo/score` + `/checkin`
- [ ] migration: `bandai_bugyo_scores` / `bandai_bugyo_leaderboard` / `_my_stats` RPC /
      `shop_public_by_qr` に `bandai_bugyo_enabled` 列
- [ ] env `NEXT_PUBLIC_BANDAI_BUGYO_GAME_URL` / `_ORIGIN`、maintenance フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 `_headers` の `/bandai-bugyo/*` ブロック、README 配信テーブルに追記

## 5. P8 連携の取り決め（番台奉行 2026-06-29 回答 反映）

### P8-1 スコア/ランキング・P8-3 店舗別ランキング → 確定
- 標準 `game_over` を実装する方針で合意。imapp 側がスコア保存・ランキングを担う。
- **Supabase 認証情報はゲームに渡さない**（imapp がサーバ側で保存。RLS/サンドボックス前提）。
- 店舗別は起動 URL の `shop=<qr_token>` を imapp が付与 → 自動で店舗別集計。ゲーム側追加作業なし。

### P8-2 クーポン→本人プッシュ → 方針確定・追加バックエンド不要（前提あり）
- **宛先**: プレイした本人のみ（一斉配信ではない）。
- **トリガー**: 1営業日クリア（＋ハイスコア更新）。**判定はゲーム側(client)で完結**。
- **方針**: 新規発行エンドポイントは作らない。「クリア→特典案内→購読」を既存フローに繋ぐ。

imapp 側の事実（調査済み）:
- 既存「来店チェックイン→特典」のトリガーは **店頭で店の合言葉(daily passcode)入力**であり、
  ゲームのクリアでは発火しない。両者は別物。
- よって **クリアそのものでサーバが固有クーポンを発行することはしない**（サンドボックスの
  ゲーム申告に基づく報酬発行は偽装リスクのため不可）。
- 代わりに、クリア後の「特典案内」CTA から imapp の既存フローへ送る:
  - **購読** = `/subscribe?shop=<qr_token>`（Web Push。push トークンのみ・メール不要＝PII最小）。
    ＝番台奉行の言う「レシートQR購読」は、この購読 QR をレシートに刷る運用で実現。
  - **店頭特典** = 結果画面に標準で付く「来店チェックイン」パネル（合言葉→会員証スタンプ→特典）。
    bandai-bugyo を連携すれば自動で付く。

→ この理解なら **追加バックエンドなしで P8-2 を満たす**。番台奉行の「導線を繋ぐだけ」と一致。

### ⏳ 確認待ち（これが返れば P8 確定）
1. 「達成報酬」は **既存の購読/来店チェックインへの“案内”で足りる**か？
   （足りる＝追加実装ゼロ／クリア固有クーポンのサーバ発行が必要＝方針変更・新規EPが必要）
2. 「レシートQR購読」は **`/subscribe?shop=<qr_token>` をレシートに刷る理解でOK**か？
   違う場合は仕様を提示のこと。

## 6. 完了の定義 / 連絡

ゲーム側 §3 を満たしたビルドをデプロイしたら、imapp に
**「bandai-bugyo 連携実装デプロイ済み」**と伝えてください。imapp 側 §4 を実施して公開します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- 質問: imapp チーム (komok2009@gmail.com)
