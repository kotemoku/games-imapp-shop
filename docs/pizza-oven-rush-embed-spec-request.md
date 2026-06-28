# 仕様書依頼: ピザオーブンラッシュ imapp 埋め込み連携

> **送付先**: ピザオーブンラッシュ開発チーム
> **送付元**: imapp チーム
> **日付**: 2026-06-28

## 1. 何を頼んでいるか

imapp (https://imapp.shop) はあなたのゲームを **iframe で埋め込んで配信** したいと考えています。
すでに以下のゲームが同じ仕組みで接続済みです:

- バーガースタックラッシュ
- ふんべつ！パッカーパニック
- ツクルン (家具組み立てタイムアタック)
- こんぺい堂 (金平糖の時間管理アーケード)

これらと同等の連携を **ピザオーブンラッシュ** でも実現するため、
あなたのゲームの **postMessage 仕様書 (docs/embed-spec.md)** を提出してください。

接続できれば、以下が自動で動きます:
- imapp ユーザーがゲームをプレイ → スコア自動保存
- 店舗 QR コード経由でアクセス時 → その店のランキング集計
- 来店スタンプ機能 (gyotai-quiz 連携)

## 2. 出してほしい情報 (チェックリスト)

以下のいずれかの形で `docs/embed-spec.md` に書いてください。
**逆解析した結果 postMessage は確認できているが target が `"*"` で発火している** ため、
以下を確定的にしてもらう必要があります。

### 2.1 起動 URL パラメータ
imapp が iframe の src に付与するパラメータを定義してください。
- [ ] `embed=1` で埋め込みモードを ON にできるか?
- [ ] `player=<uid>` でプレイヤー識別子を渡せるか?
- [ ] `hostOrigin=<origin>` で postMessage の target origin を固定できるか? **← 最重要 (セキュリティ)**
- [ ] その他必須/任意パラメータ (難易度、ステージ ID など)

### 2.2 game → host メッセージ (送信側)
ゲームから親フレーム (imapp) に送るメッセージのスキーマ。

```ts
type GameToHost =
  | { source: 'pizza-oven-rush', type: 'ready' }
  | { source: 'pizza-oven-rush', type: 'game_over', payload: GameOverPayload }
  | ... // ほかにあれば
```

**特に確定してほしい点:**
- [ ] `source` フィールドの値 (固定文字列・他ゲームと衝突しない名前)
- [ ] `type` の網羅リスト (ready / game_over / save_score など)
- [ ] `game_over` payload のフィールド (score, level, time, など)
- [ ] **postMessage の `targetOrigin` は `hostOrigin` パラメータで受け取った値を使うこと** (`"*"` は **避けてほしい**)

### 2.3 host → game メッセージ (受信側があれば)
imapp 側からゲームに送る config メッセージのスキーマ。

```ts
type HostToGame =
  | { source: 'imapp', type: 'config', payload: { player: string | null } }
```

- [ ] `ready` を受け取ったら imapp が config を送る → ゲームはそれを受信して player 名を表示する、というフローでよいか?
- [ ] 不要なら「config 受信は不要」と明記してください

### 2.4 セキュリティ要件
imapp 側で `sandbox="allow-scripts allow-same-origin"` で iframe を起動します。
- [ ] localStorage / IndexedDB / Web Audio などを使う場合は明記してください
- [ ] CORS / Service Worker は使っていますか? (使っている場合は配信元 origin を教えてください)

## 3. 参考: 他ゲームの仕様書

すでに納品済みのゲームの仕様書を参照してください。

- `docs/packer-panic-embed-spec.md` (もしあれば)
- ツクルンの `tsukurun/docs/imappt-embed.md`

これらと **同じ構造** で書いてもらえれば imapp 側の組み込みが最短で済みます。

## 4. 期限と提出方法

- 提出方法: `games-imapp-shop/docs/pizza-oven-rush-embed-spec.md` として PR
- 期限: 仕様確定後 1 週間以内
- 質問は imapp チーム (komok2009@gmail.com) まで

## 5. 確認済みの現状 (imapp 側調査結果)

- ✅ `postMessage` 呼び出しが配信中 JS に確認できる
- ⚠️  target origin が `"*"` → 任意のページから iframe 経由でスコア偽装可能 (セキュリティ修正必須)
- ⚠️  メッセージ構造 (`source`/`type`/`payload`) が **逆解析だけでは確定できなかった**
- ⚠️  `CustomEvent('pizza-${p}')` の用途が不明 (内部イベントか postMessage 補助か?)

仕様書受領後、imapp 側で以下を順次実装します:
1. iframe ラッパー (`/app/games/pizza-oven-rush/PizzaOvenRush.tsx`)
2. スコア保存 API + Supabase テーブル
3. ランキング表示
4. 来店チェックイン (店舗 QR 連携)
5. /games 一覧への追加
