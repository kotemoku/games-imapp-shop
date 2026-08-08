# 花いろづけ — 花屋さん向けスタジオ 仕様/依頼（imapp ホスト）

> 花屋さんが「アレンジ写真をアップ → 自動で線画化 → メタ情報を入力」して、塗り絵アプリに
> アレンジを追加できるようにする。**フォームは imapp 側にホスト**（認証・ストレージ・店舗管理が
> imapp にあるため）。ゲーム側（hana-irozuke）は**線画化コンポーネント**と**配信契約**を提供する。
> 正本の連携契約は games-imapp-shop/docs/EMBED-CONTRACT.md。本書はその content 拡張。

## 1. 目的とゴール

- 花屋さん（店舗＝`store_id`）が、自分のアレンジ写真を登録 → 塗り絵ページ（線画）が自動生成 →
  登録者がそのアレンジを塗って遊び、気に入ったらオーダー（`reserve_intent`）できる。
- 説明・花材・価格は**花屋さん本人が入力**（事実ベース／ゲーム側は創作しない）。

## 2. データモデル（arrangement レコード・per store）

```
arrangement {
  id           string   // 店内で一意（例: 2026-0007）
  store_id     string
  title        string
  florist_note string   // 花屋さんの説明（任意）
  flowers      string[] // 使用花材の和名（任意）
  season       string   // 例 "通年" "春" 任意
  price        number?  // 参考価格（円）任意
  orderable    boolean  // true でオーダー導線
  lineart_url  string   // 花屋さんがアップした線画PNG（白地に黒線）
  photo_url    string?  // 実写（詳細表示用・任意）
  created_at   number
  published    boolean  // 公開フラグ
}
```

PII は持たない。`store_id` は店舗識別のみ。

## 3. 花屋さん向けフォーム（imapp 側 UI）

**線画は花屋さんが用意してアップロードする**（§4）。サーバ側での自動変換は行わない。

1. **線画アップロード**（png。花屋さんが写真を線画化した塗り絵ページ）。出力仕様：**白地・黒線・
   長辺 ~1024〜1536px**。プレビューを表示。
2. （任意）**実写アップロード**（詳細表示用の色写真）。無ければ詳細は線画を表示。
3. メタ入力：**題名 / 花材 / 説明 / 季節 / 参考価格 / オーダー可否**。
4. 「公開」で `published:true`。店内一覧で並べ替え・非公開・削除。

## 4. 線画は花屋さんが用意する（自動変換はしない）

- **方針**：写真→線画の変換は**花屋さんが行い、完成した線画を直接アップロード**する。
  GPT クラスの作品的な線は**生成AI（ChatGPT 等）**で作れる。花屋さんがそれで線画化して上げるのが確実。
- **なぜサーバ自動変換にしないか**：ローカルの古典手法（エッジ検出）では GPT クラスに届かない
  （密・ノイズ・器が出ない）。GPT クラスを自動でやるには生成API（gpt-image 等・従量課金、1枚 数円〜
  数十円）を imapp サーバで叩く構成が要る。**当面は花屋さんアップロードで十分**なので採用しない。
- **任意の補助ツール（ゲーム側同梱・使わなくてよい）**：`scripts/lineart_ai.py`
  （LineartDetector ＋ 適応的二値化で均一線 ＋ rembg で切り抜き境界を器アウトラインに）。無料・自動だが
  **GPT クラスには届かない**。手早く下線画が欲しい花屋さん向けのフォールバック。`scripts/lineart.py` は簡易版。
- 将来、サーバ側で自動線画化（生成API）を入れたくなったら §3-1 を「写真アップ→自動線画」に差し替える。

## 5. 配信契約（アプリへどう届くか）

アプリは `?embed=1&...&shop=<store_id>` で起動する（EMBED-CONTRACT §2 / 既に `?shop=` 対応済み）。
その店舗の公開アレンジを**アプリが取得**する。方式はどちらか：

- **(A) 読み取り API（推奨）**：`GET /api/games/hana-irozuke/arrangements?shop=<id>` →
  公開アレンジの配列（§2 のうち id/title/florist_note/flowers/season/price/orderable/lineart_url/photo_url）。
  PII なし・公開情報のみ。アプリは Preload で取得して一覧・塗り絵に使う。
- (B) postMessage config で注入：`config.payload.arrangements`（件数が少ない店向け・URLは §6 の CORS 必須）。

**未指定/取得失敗時**はアプリ同梱の既定アレンジ（`data/arrangements.json`）にフォールバック。

## 6. ⚠️ 画像の CORS（必須・塗り絵の保存/共有が壊れないため）

- 塗り絵はキャンバスに線画を描いて `toDataURL()` で保存/共有する。**線画・実写を別オリジン
  （imapp ストレージ）から読むと、CORS 応答が無いと canvas が汚染され `toDataURL` が失敗する。**
- したがって `lineart_url` / `photo_url` の配信は **`Access-Control-Allow-Origin`（`games.imapp.shop` 許可、
  または `*`）を付与**し、アプリは `<img crossorigin="anonymous">` で読む。R2/Supabase Storage は CORS 設定可。

## 7. ゲーム側（hana-irozuke）の対応

- 現状：同梱の `data/arrangements.json` ＋ `public/arrangements/lineart|photo` を読む（デモ/初期コンテンツ）。
- 追加予定（API 確定後）：Preload で `?shop=` の読み取りAPIを叩き、動的にアレンジ一覧を差し込む
  seam を実装（画像は crossOrigin で読み、canvas 汚染を避ける）。契約が固まり次第すぐ対応する。
- オーダーは既存の `reserve_intent`（`prepCard={arrangement_id,title,flowers}`）をそのまま使う。

## 8. 依頼（imapp チームへ）

1. §3 の花屋さん向けフォーム（店舗admin）＝**線画アップロード＋（任意）実写アップロード＋メタ入力**、
   と §2 の保存（Supabase 等・per store）。**サーバ側の線画自動変換は不要**（花屋さんが線画を用意）。
2. §5(A) の読み取りAPI ＋ §6 の CORS 付き画像配信。
3. 確定したら「arrangements API 稼働」と連絡 → ゲーム側 §7 の seam を実装。
