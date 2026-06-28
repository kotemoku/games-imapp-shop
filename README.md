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
| `/burger/` | Burger Stack Rush | `burger_stack_rush` (Flutter) |
| `/packer-panic/` | ふんべつ！パッカーパニック | `packer-panic` (Web) |
| `/tsukurun/` | ツクルン (家具組み立てタイムアタック) | `つくチャレ-phaser` (Phaser4 + Vite) |
| `/pizza-oven-rush/` | ピザ・オーブン・ラッシュ | `pizza-oven-rush` (Phaser4 + Vite) |
| `/apple-guard/` | アップルガード 〜りんごの木をまもれ〜 | `apple-guard` (Phaser4 + Vite) |
| `/bakery-rush/` | やきたて！ベーカリーラッシュ | `ベーカリーラッシュ` (単一HTML / Canvas) ※imapp 未公開（配信のみ） |
| `/donut-donaru/` | ドーナツどーなる | `teraia-donut-rush` (Phaser4 + Vite) ※imapp 未公開（配信のみ・実機テスト用） |
| `/konpeito/` | こんぺい堂 | `こんぺい堂` (Phaser4 + Vite) — 円形の釜で金平糖を育てて出荷する時間管理アーケード |

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

1. Flutter 側で `flutter build web --release --base-href /<game-key>/` でビルド
2. `build/web/` の中身を `c:/Users/komok/Desktop/games-imapp-shop/<game-key>/` に丸ごとコピー
3. `_headers` に `/<game-key>/*` ブロックを追加 (burger と同じパターン)
4. `git add . && git commit -m "deploy: <game-key> vYYYY-MM-DD" && git push`
   → Pages が自動デプロイ

## `_headers` の中身

- `Content-Security-Policy: frame-ancestors ...` で **imapp.shop からのみ iframe 可** に制限
  (clickjacking 防止)
- 不変アセット (main.dart.js / canvaskit / assets) は 1 年キャッシュ
- index.html / SW / manifest は no-cache (バージョン差し替え事故防止)

許可したいプレビュー環境を増やす場合は `_headers` の `frame-ancestors` 行に追記。

## imapp 側の対応

- ルート: `/games/burger-stack-rush` (imapp Next.js 内)
- env (imapp の Workers Secrets / `.env.local`):
  ```
  NEXT_PUBLIC_BURGER_GAME_URL=https://games.imapp.shop/burger/
  NEXT_PUBLIC_BURGER_GAME_ORIGIN=https://games.imapp.shop
  ```
- スコア保存 API: `POST /api/games/burger-stack-rush/score`
- DB: `public.burger_stack_rush_scores` (migration 069)
