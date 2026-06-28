# 仕様書依頼: アップルガード imapp 埋め込み連携

> **送付先**: アップルガード開発チーム
> **送付元**: imapp チーム
> **日付**: 2026-06-28

## 1. 何を頼んでいるか

imapp (https://imapp.shop) はあなたのゲームを **iframe で埋め込んで配信** したいと考えています。
すでに以下のゲームが同じ仕組みで接続済みです:

- バーガースタックラッシュ
- ふんべつ！パッカーパニック
- ツクルン (家具組み立てタイムアタック)
- こんぺい堂 (金平糖の時間管理アーケード)

これらと同等の連携を **アップルガード** でも実現するため、
**埋め込み API (postMessage) の実装を追加** していただきたい、というのが本依頼です。

## 2. 確認済みの現状 (imapp 側調査結果)

⚠️ **アップルガードの配信中ビルドには postMessage / parent への送信処理がまったく実装されていません**。
- `postMessage` 文字列がビルドに含まれない
- `parent.` への参照も無い
- → 現状では imapp 側からゲーム結果を受け取る手段が一切ない

このため、**新規実装** が必要です (ツクルンが素 JS から Phaser4 に作り直したときの追加と同じ規模)。

## 3. 出してほしい情報・実装してほしい機能

### 3.1 起動 URL パラメータ
imapp が iframe の src に付与するパラメータを定義してください。
- [ ] `embed=1` で埋め込みモードを ON にする (UI 簡略化、自動スタートなど)
- [ ] `player=<uid>` でプレイヤー識別子を受け取る (任意、表示用)
- [ ] `hostOrigin=<origin>` で postMessage の target origin を受け取る **← セキュリティ必須**

### 3.2 game → host メッセージ (新規実装してほしい)
ゲームから親フレーム (imapp) に送るメッセージのスキーマを決めてください。
推奨パターン (他ゲームと統一):

```ts
type GameToHost =
  | { source: 'apple-guard', type: 'ready' }
  | { source: 'apple-guard', type: 'config_ack', payload: { player: string | null } }
  | { source: 'apple-guard', type: 'game_over', payload: GameOverPayload }

type GameOverPayload = {
  score: number,            // 主スコア (リンゴ獲得数 or ダメージ回避数 など)
  // 補助メトリクス (あれば):
  // wave: number,
  // survivalSec: number,
  // bestCombo: number,
  player?: string | null,
}
```

**実装上の注意:**
- [ ] `source` は **`"apple-guard"` 固定** (他ゲームと衝突しない名前)
- [ ] postMessage の `targetOrigin` は **必ず起動 URL の `hostOrigin` パラメータの値を使う** (`"*"` は使わない)
- [ ] ゲーム開始時に `ready` を送り、imapp 側の config を受け取れる状態にしてから本編に入る

### 3.3 host → game メッセージ (推奨実装)

```ts
type HostToGame =
  | { source: 'imapp', type: 'config', payload: { player: string | null } }
```

- [ ] `ready` 受信後、imapp が config を返します
- [ ] ゲーム側で player 名を画面に表示できると望ましい

### 3.4 セキュリティ要件
imapp 側で `sandbox="allow-scripts allow-same-origin"` で iframe を起動します。
- [ ] localStorage / IndexedDB / Web Audio などを使う場合は明記してください
- [ ] CORS / Service Worker は使っていますか?

## 4. 仕様書の提出形式

`games-imapp-shop/docs/apple-guard-embed-spec.md` として、上記の決定事項を書いた md を PR してください。
他ゲーム (例: ツクルン `tsukurun/docs/imappt-embed.md`) と同じ構造で OK です。

## 5. 期限とコミュニケーション

- 提出方法: PR
- 期限: 新規実装込みのため、2 週間程度を想定
- 質問は imapp チーム (komok2009@gmail.com) まで
- 必要であればテスト用の imapp スタブページを用意できます

## 6. 受領後の流れ

仕様書 + 実装が揃い次第、imapp 側で以下を順次対応します:
1. iframe ラッパー (`/app/games/apple-guard/AppleGuard.tsx`)
2. スコア保存 API + Supabase テーブル
3. ランキング表示
4. 来店チェックイン (店舗 QR 連携)
5. /games 一覧への追加
