# 通達: MORSE SPY を imapp に連動させる依頼

> **送付先**: MORSE SPY 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-07-21
> **重要度**: 中（新規連携・ゲーム側 §1〜§3 実装済み。公開前に Firebase 別オリジン対応が必要）

## 1. お願い

imapp (https://imapp.shop) に MORSE SPY を **iframe で埋め込んで配信**したい。
既に burger / packer-panic / tsukurun / konpeito が同じ仕組みで接続済み。
**埋め込み連携 (postMessage) を実装**する（→ 済み。§3 参照）。

## 2. 従う契約（これだけ読めばよい）

👉 **`docs/EMBED-CONTRACT.md` の §1〜§3 をそのまま実装**する。
方言を作らず、標準（packer-panic / tsukurun が基準）に合わせる。

- game-key（＝配信パス）: **`morse-spy`**（`games.imapp.shop/morse-spy/`）
- game→host の source: **`'morse-spy'`**
- host→game の source は **`'imappt'`**（標準）

## 3. ゲーム側チェックリスト（EMBED-CONTRACT §1〜§3 準拠）— 実装状況

MORSE SPY は Flutter Web。ブリッジは `web/embed.js`＋Dart ファサード
`lib/core/embed/imapp_embed.dart` で実装済み。

- [x] **単独リポジトリで開発**（`morse_spy`・GitHub private・game-key と対応）。
- [x] 起動 URL の `?embed=1&imapp=1&player=&hostOrigin=` を読む。`hostOrigin` を保持。
- [x] 初期化完了で `parent.postMessage({source:'morse-spy', type:'ready'}, hostOrigin)`
      （`lib/main.dart` の初回フレーム後）。
- [x] host からの `{source:'imappt', type:'config', payload:{player, difficulty?}}` を受信。
      `event.origin === hostOrigin` を検証。`player` をコードネーム初期値に反映。
- [x] 1ラウンド終了で `{source:'morse-spy', type:'game_over', payload:{score, gained}}` を送信。
      **`score` = プレイヤーの累積 XP**（単調増加の整数）。解読・GHOST 任務・送信など
      XP が入るたびに送出する（`lib/features/xp/domain/xp_service.dart` の `awardXp` が唯一の増加点）。
- [x] 送信は常に `parent.postMessage(msg, hostOrigin)`。`'*'` は使わない。
- [x] `game_over.payload` は整数・常識的な値域（累積 XP）。
- [x] **localStorage / IndexedDB / Web Audio を使用**（Firebase 匿名認証・SharedPreferences・
      モールス音再生）。imapp の `sandbox="allow-scripts allow-same-origin"` で動作する想定。

## 4. imapp 側でやること（imapp チーム担当・FYI）

ゲーム側が §3 を満たしたので、imapp 側は既存ゲームのコピーで完結する:

- [ ] `app/games/morse-spy/MorseSpy.tsx`: `GameEmbedAdapter` を標準で宣言
      （hostSource:'imappt' / configType:'config' / terminalTypes:['game_over']）
- [ ] `page.tsx` + `MorseSpyClient.tsx`（結果ダイアログ・スコア保存）
- [ ] `/api/games/morse-spy/score` + `/checkin`
- [ ] migration: `morse_spy_scores` / `morse_spy_leaderboard` / `_my_stats` RPC /
      `shop_public_by_qr` に `morse_spy_enabled` 列
- [ ] env `NEXT_PUBLIC_MORSE_SPY_GAME_URL` / `_ORIGIN`、maintenance フラグ
- [ ] `/games`・`/admin/games`・`/subscribe` の一覧に追加
- [ ] 配信側 README 配信テーブルに追記（済）、`_headers` に `/morse-spy/assets/*` の1ルール（済）

## 5. ⚠️ 公開前の前提条件（Firebase 別オリジン — 連携担当の作業）

MORSE SPY は他の配信ゲームと違い **Firebase バックエンド**（匿名認証 / Firestore /
App Check reCAPTCHA Enterprise）を持つ。`games.imapp.shop` は `morse-spy.web.app` と
**別オリジン**のため、公開前に以下が必要:

1. Firebase Console → Authentication → **承認済みドメインに `games.imapp.shop` を追加**。
2. **App Check の reCAPTCHA Enterprise サイトキーを `games.imapp.shop` で許可**（または
   同ドメイン用サイトキーを発行し、ビルド時 `--dart-define=RECAPTCHA_SITE_KEY=...` で渡す）。
3. Firestore セキュリティルール・CORS は Firebase 側が origin 非依存のため通常追加不要だが、
   App Check 未対応のままだと Firestore/Auth が拒否される。

これらは Firebase コンソール作業のため imapp/配信リポジトリ側では完結しない。

## 6. 完了の定義 / 連絡

§5 を満たしたビルド（`--base-href /morse-spy/`）を `games-imapp-shop/morse-spy/` に
デプロイしたら、imapp に **「morse-spy 連携実装デプロイ済み」**と伝える。imapp 側 §4 を
実施して公開する。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- ゲーム側実装ポインタ: `morse_spy/EMBED.md`
- imapp 側実装の地図: imapp リポジトリ `docs/game-embed.md`
- 質問: imapp チーム (komok2009@gmail.com)
