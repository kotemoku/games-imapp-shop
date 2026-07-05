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
| `/burger-shateki/` | バーガー射的 | `バーガーショット/burger-shateki` (Phaser4 + Vite) ※imapp 未公開（配信のみ）— 狙いのバーガーだけを撃ち抜く全20射の反射神経射的。BURGERELEVEN 向け第2弾。横画面。ゲーム側は EMBED-CONTRACT 標準（source=burger-shateki / config / game_over）実装済み・imapp 側は未接続 |
| `/creperie/` | La Crêperie du Coin（花街のクレープリー） | `D'or/creperie` (TypeScript + Vite ＋ Phaser4 エンジン層・PWA対応) ※imapp 未公開（配信のみ）— 京都・花街のビストロでクレープ職人修行（生地広げ/焼き/盛り付け/三角・四方折り/ワイン注ぎ/マリアージュ→卒業で営業3モード連結）。横画面。ゲーム側は EMBED-CONTRACT 標準（source=creperie / config / game_over）実装済み・imapp 側 §4 未実施。assets は内容ハッシュ名のみ（immutable） |

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
3. `_headers` の【各ゲーム assets】に **1ルールだけ**追加（下記「配信規約」）
4. `node scripts/check-headers.mjs` が通ることを確認（deploy スクリプト経由なら自動実行。
   assets ルールの追加漏れも検出される）
5. `git add . && git commit -m "deploy: <game-key> vYYYY-MM-DD" && git push`
   → Pages が自動デプロイ

## 配信規約（`_headers`）— 新ゲーム必読

Cloudflare Pages の `_headers` は **100ルール上限**（超過分は黙って無視される。
実際に113ルールで後方ゲームのルールが消える事故が起きた）。このため
ゲームごとの反復ルールを廃止し、**「共通ルール + ゲームあたり assets 1ルール」**に統一した。

**自動で適用されるもの（追記不要）:**

| 対象 | 挙動 | 由来 |
|---|---|---|
| 全パスの CSP（`frame-ancestors` = imapp 配下のみ iframe 可） | 自動 | `/*` 共通ルール |
| `/<game>/manifest.webmanifest` | no-cache | `/:game/` 共通ルール |
| `/<game>/index.html` ほか HTML | 毎回再検証（`max-age=0`） | Pages の既定 |
| `/<game>/sw.js` | 4hキャッシュだが**実害なし**（ブラウザのSW更新チェックはHTTPキャッシュを既定でバイパス） | Pages の既定 |
| アイコン・その他静的ファイル | 4hキャッシュ（`max-age=14400`）で妥協 | Pages の既定 |

**ゲームごとに書くもの（assets の1ルールのみ）:**

- assets/ に「同名で差し替わる素材」がある → `no-cache, must-revalidate`（多数派・安全側）
- assets/ が**内容ハッシュ名のみ**（Vite の src import 徹底）→ `public, max-age=31536000, immutable`
  （tsukurun / kemonomichi 参照。新規ゲームはこちらを推奨 — 差し替わる素材は
  `public/` に同名で置かず src から import してハッシュ名にすること）

**⚠️ 実測で確認済みの落とし穴（2026-07-04 検証）:**

- `:placeholder` を含む動的ルールは **js/png 等の静的アセットには効かない**
  （manifest.webmanifest のような非アセット系パスのみ有効）。assets のルールは
  必ずゲームごとの完全一致パス（`/<game>/assets/*`）で書くこと
- Pages は複数ルールがマッチするとヘッダを**カンマ結合**する。深いパスで上書きする
  場合は `! Cache-Control` で一度解除してから設定（tsukurun の assets/pixel/ 参照）
- **imapp.shop ゾーンの Browser Cache TTL（4時間）が、png/js 等のキャッシュ対象拡張子で
  origin の `no-cache` を `max-age=14400` に底上げする**（Cf-Cache-Status付き応答で確認済み。
  immutable の1年は 4h より長いのでそのまま通る）。つまり `no-cache` 指定のゲームでも
  ブラウザには最大4時間キャッシュされる。sw.js のルールが「効かない」ように見えたのも同因。
  完全に no-cache にしたい場合は Cloudflare ダッシュボードで
  **Cache Rule（hostname = games.imapp.shop → Browser TTL: Respect origin）** を追加する
  （ゾーン全体の Browser Cache TTL 変更は imapp.shop 本体に影響するため非推奨）。
- 追記したら必ず `node scripts/check-headers.mjs`（ルール数90超・追加漏れで fail）

## imapp 側の対応

- ルート: `/games/burger-stack-rush` (imapp Next.js 内)
- env (imapp の Workers Secrets / `.env.local`):
  ```
  NEXT_PUBLIC_BURGER_GAME_URL=https://games.imapp.shop/burger/
  NEXT_PUBLIC_BURGER_GAME_ORIGIN=https://games.imapp.shop
  ```
- スコア保存 API: `POST /api/games/burger-stack-rush/score`
- DB: `public.burger_stack_rush_scores` (migration 069)
