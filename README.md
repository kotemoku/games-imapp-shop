# games.imapp.shop

imapp に iframe で埋め込む Flutter Web ゲームの静的配信プロジェクト。
Cloudflare Pages で `games.imapp.shop` カスタムドメインを当てる。

> ⚠️ **連携を実装・変更する前に必読**: imapp 埋め込みの postMessage 契約は
> [`docs/EMBED-CONTRACT.md`](docs/EMBED-CONTRACT.md) が唯一の正本。新規ゲームも
> 既存の修正も必ずこの標準（packer-panic / tsukurun が基準）に従う。ゲームごとの
> 方言を作らない。各ゲーム宛ての個別通達は `docs/embed-notice-<game>.md`。
>
> 🆕 **新ゲームを連動させるとき**: [`docs/embed-onboarding-TEMPLATE.md`](docs/embed-onboarding-TEMPLATE.md)
> をコピーして `docs/embed-notice-<game-key>.md` を作り、`<game-key>`/`<ゲーム名>` を
> 埋めるだけ。通達は毎回これ一手順で共通化する。

## 配信中のゲーム

| パス | ゲーム | リポジトリ |
|------|--------|-----------|
| `/burger/` | Burger Stack Rush | `burger_stack_rush` (Phaser4 + Vite。旧 Flutter から移行済) |
| `/packer-panic/` | ふんべつ！パッカーパニック | `packer-panic` (Web) |
| `/tsukurun/` | ツクルン (家具組み立てタイムアタック) | `つくチャレ-phaser` (Phaser4 + Vite) |
| `/pizza-oven-rush/` | ピザ・オーブン・ラッシュ | `pizza-oven-rush` (Phaser4 + Vite) |
| `/apple-guard/` | アップルガード 〜りんごの木をまもれ〜 | `apple-guard` (Phaser4 + Vite) |
| `/bakery-rush/` | やきたて！ベーカリーラッシュ | `ベーカリーラッシュ-phaser` (Phaser4 + Vite) ※imapp 未公開（配信のみ） |
| `/donut-donaru/` | ドーナツどーなる | `teraia-donut-rush` (Phaser4 + Vite) ※imapp 未公開（配信のみ・実機テスト用） |
| `/konpeito/` | こんぺい堂 | `こんぺい堂` (Phaser4 + Vite) — 円形の釜で金平糖を育てて出荷する時間管理アーケード |
| `/donut-rush/` | できたて！ドーナツラッシュ | `ドーナツラッシュ-phaser` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— ベーカリーラッシュと同エンジンの落ちものマッチ |
| `/takoyaki-rush/` | アツアツ！たこ焼きラッシュ | `たこ焼きラッシュ-phaser` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— ベーカリーラッシュと同エンジンの落ちものマッチ |
| `/bandai-bugyo/` | 番台奉行（仮） 〜ふろマナー奮闘記〜 | `ばんだいさん` (Phaser4 + Vite) — 銭湯マナー周知の監視＆さばき型アーケード。標準 game_over 連携実装済み |
| `/burger-eleven/` | バーガーイレブン | `burger-eleven` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— 食材3つ揃いで看板バーガーを引き当てる連動プロモ・スロット。`/burger/`(Flutter)とは別ゲーム |
| `/tarcoon-cartoon/` | TarCoon☆CarToon | `タークゥーンカートゥーン` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— burger-eleven 派生の別ゲーム。キャラ表情3つ揃いの手動ストップ式プロモ・スロット |
| `/mocairn/` | モッケルン | `ツミキクズシ` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— 同色の積み木を3つ繋いで上の色・大きい積み木に進化させるマッチ。source=mocairn |
| `/kamajan/` | 釜雀（かまじゃん） | `kamajan` (Phaser4 + Vite) — 回転銅釜に牌を落とし同種3枚連結→四面子＋雀頭で和了を狙う物理パズル。EMBED-CONTRACT §1〜§3 標準準拠（source=kamajan / config / game_over）。imapp 側 §4 実施待ち |
| `/satotsugi/` | 里継（さとつぎ） | `里山ツクール` (Phaser4 + Vite) ※imapp 未公開（配信のみ・PWA対応）— 京都・南丹市天引の実データ地形で里山を再生する箱庭シム。横画面・スマホ対応 |
| `/kemonomichi/` | あしあと探索隊 | `あしあと探索隊` (Phaser4 + Vite モノレポ・PWA対応) ※imapp 未公開（配信のみ）— 山の動物の足あとスライドパズル×3択クイズ×図鑑。縦画面。`?store=<id>` で店舗モード（未公開のため imapp 連携は未接続・クーポンはスタブ） |

## デプロイ手順

### 初回セットアップ

1. このフォルダを GitHub にプッシュ
   ```bash
   cd c:/Users/komok/Desktop/games-imapp-shop
   git init
   git add .
   git commit -m "init: games.imapp.shop scaffold"
   gh repo create games-imapp-shop --public --source=. --push
   ```
2. Cloudflare Pages → 「Create a project」→ GitHub 連携 → このリポジトリ選択
3. ビルド設定:
   - Framework preset: **None**
   - Build command: (空欄)
   - Build output directory: `/`
4. デプロイ完了後、**Custom domains** で `games.imapp.shop` を追加
   (DNS は Cloudflare 管理ドメインなので 1 クリックで設定される)

### ゲームを追加 / 更新

1. ゲーム側でビルド（Vite: `base: "./"` / Flutter: `--base-href /<game-key>/`）
2. 成果物を `games-imapp-shop/<game-key>/` に丸ごとコピー
3. **`_headers` の編集は原則不要**（下記「配信規約」の標準構成なら共通ルールが自動適用される）
4. `node scripts/check-headers.mjs` が通ることを確認（deploy スクリプト経由なら自動実行）
5. `git add . && git commit -m "deploy: <game-key> vYYYY-MM-DD" && git push`
   → Pages が自動デプロイ

## 配信規約（`_headers` 共通ルール）— 新ゲーム必読

Cloudflare Pages の `_headers` は **100ルール上限**（超過分は黙って無視される。
実際に113ルールで後方ゲームのルールが消える事故が起きた）。このため
ゲームごとにルールを書くのを廃止し、`/:game/...` プレースホルダの共通ルールに一本化した。

**標準構成（これに従えば `_headers` への追記ゼロ）:**

| パス | 自動適用されるキャッシュ |
|---|---|
| `/<game>/index.html` | no-cache（差し替え事故防止） |
| `/<game>/assets/*` | no-cache（同名差し替え素材を持つゲームが多数派のため安全側） |
| `/<game>/sw.js` `manifest.webmanifest` `icons/*` | no-cache（SW更新事故防止） |
| ルート直下の `favicon.png` `apple-touch-icon.png` `icon-192/512*.png` `icon.svg` `logo.png/jpg` | no-cache |

**新ゲームの約束事:**

- アイコン類は極力 `/<game>/icons/` 配下に置く（ルート直下の名前一覧を増やさない）
- 差し替わる画像素材は Vite の src から import して**内容ハッシュ名**にする
  （`public/` に同名で置かない）。全アセットがハッシュ名なら【例外】で
  `assets/*` を immutable 長期キャッシュに上書きできる（tsukurun / kemonomichi 参照）
- 例外を書くときは必ず `! Cache-Control` で共通ルールを解除してから設定する
  （Pages は複数マッチ時にヘッダを**カンマ結合**するため、解除しないと壊れる）
- 追記したら `node scripts/check-headers.mjs` を実行（ルール数90超で fail）
- 全パス共通の CSP（`frame-ancestors` = imapp 配下のみ iframe 可）は `/*` で適用済み。
  プレビュー環境を増やす場合は `/*` の `frame-ancestors` 行に追記

## imapp 側の対応

- ルート: `/games/burger-stack-rush` (imapp Next.js 内)
- env (imapp の Workers Secrets / `.env.local`):
  ```
  NEXT_PUBLIC_BURGER_GAME_URL=https://games.imapp.shop/burger/
  NEXT_PUBLIC_BURGER_GAME_ORIGIN=https://games.imapp.shop
  ```
- スコア保存 API: `POST /api/games/burger-stack-rush/score`
- DB: `public.burger_stack_rush_scores` (migration 069)
