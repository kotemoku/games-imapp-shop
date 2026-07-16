# imapp 埋め込み連携 — 正式契約 (EMBED-CONTRACT)

> **これが唯一の正本。** 新しくゲームを imapp に連携する／既存ゲームの連携を直す
> ときは、必ずこの契約に従うこと。ゲームごとに方言を作らない。

`games.imapp.shop/<game-key>/` に配信されるゲームは、imapp (https://imapp.shop) に
iframe で埋め込まれ、`postMessage` で双方向通信する。

---

## 0. リポジトリ規約（開発の前提・全タイトル共通）

- **1 タイトル = 1 の単独 git リポジトリ**で開発する（GitHub private、リポジトリ名は
  `<game-key>` と同名）。複数ゲームを 1 フォルダ / 1 リポジトリに相乗りさせない —
  コミット・ロールバック・履歴の巻き戻しが他タイトルを巻き込むため。
- 本リポジトリ（games-imapp-shop）は**ビルド成果物の配信置き場**。ゲームのソースは
  ここにコミットしない。接続は「ソースリポジトリでビルド → 成果物を
  `games-imapp-shop/<game-key>/` にコピー → commit/push」の一方向のみ。
- 生成物（`node_modules/` `dist/` `build/` 等）はソースリポジトリでは `.gitignore` する。

---

## 1. 標準契約（新規・正規化はすべてこれ）

リファレンス実装は **packer-panic / tsukurun**。

```
host → game : { source: 'imappt',     type: 'config',
                payload: { player: string|null, difficulty?: 'easy'|'normal'|'hard' } }

game → host : { source: '<game-key>', type: 'ready' | 'config_ack' | 'game_start' | 'game_over',
                payload?: ... }
```

| 方向 | type | いつ | payload |
|---|---|---|---|
| game→host | `ready` | ゲーム初期化完了時（1回） | 任意（version 等） |
| host→game | `config` | host が `ready` を受けたら送る | `{ player, difficulty? }` |
| game→host | `config_ack` | config 受信確認（任意） | `{ player, ... }` |
| game→host | `game_start` | 1ラウンド開始時（任意） | `{ difficulty, ... }` |
| game→host | **`game_over`** | **1ラウンド終了時（必須）** | スコア等（下記） |

- `<game-key>` は配信パスと完全一致させる（例 `/packer-panic/` → `'packer-panic'`）。
- 終了イベントは **`game_over` の 1 種類だけ**。`result` や `save_score` 等の別名を作らない。
- `game_over.payload` はゲーム固有でよいが、imapp 側スコア API の値域に収まる整数で。

## 2. 起動 URL パラメータ（imapp が付与）

```
https://games.imapp.shop/<game-key>/?embed=1&imapp=1&player=<uid>&hostOrigin=https://imapp.shop
```

- `hostOrigin` を `postMessage` の **送信先 origin に必ず使う**（`'*'` 禁止）。
- `player` は表示名/識別子。host→game の `config.payload.player` でも上書きされる。

## 3. セキュリティ不変条件（ゲーム側も守る）

- 受信時: `event.origin` が `hostOrigin` と一致しないメッセージは捨てる。
- 受信時: `data.source === 'imappt'` を確認（他 iframe の誤配を弾く）。
- 送信時: `parent.postMessage(msg, hostOrigin)`。ワイルドカード `'*'` は使わない。
- imapp は iframe を `sandbox="allow-scripts allow-same-origin"` で読み込む。
- imapp は iframe に `allow="autoplay; gyroscope; accelerometer"` を付与する。
  → ゲームは **端末傾き（DeviceOrientation / DeviceMotion）と音声自動再生を使える**。
  これ以外の Permissions-Policy 機能（camera 等）が必要なら imapp チームに申請すること。

## 4. 連携の現状（2026-07-02 時点。配信バンドルの実測に基づく）

| ゲーム | 連携 | game source | host→game source | config type | 終了 type | 標準準拠 |
|---|---|---|---|---|---|---|
| **packer-panic** | ✅ | `packer-panic` | `imappt` | `config` | `game_over` | ✅ 基準 |
| tsukurun | ✅ | `tsukurun` | `imappt` | `config` | `game_over` | ✅ |
| konpeito | ✅ | `konpeito` | ⚠️ `imapp` (両対応未着手) | `config` | `game_over`/`save_score` | ❌ 要正規化 |
| burger-stack-rush | ✅ | `burger-stack-rush` | ⚠️ `imapp` | ⚠️ `init` | ⚠️ `result` | ❌ 要正規化 ※`postMessage(…,'*')` 使用=§3違反 |
| ormary-life | 配信のみ | `ormary-life` | `imappt` | `config` | `game_over` | ✅ |
| donut-donaru | 配信のみ | `donut-donaru` | `imappt` | `config` | `game_over` | ✅ |
| donut-rush | 配信のみ | `donut-rush` | `imappt` | `config` | `game_over` | ✅ |
| takoyaki-rush | 配信のみ | `takoyaki-rush` | `imappt` | `config` | `game_over` | ✅ |
| bandai-bugyo | 配信(実装済) | `bandai-bugyo` | `imappt` | `config` | `game_over` | ✅ |
| mocairn | 配信のみ | `mocairn` | `imappt` | `config` | `game_over` | ✅ |
| pizza-oven-rush | 未連携 | — | — | — | — | （新規実装＝標準で） |
| apple-guard | 未連携 | — | — | — | — | （新規実装＝標準で） |
| burger-eleven | 未連携 | — | — | — | — | （新規実装＝標準で） |

imapp 側は単一コンポーネント `app/games/_embed/GameEmbed.tsx` ＋アダプタで、上記方言を
吸収済み（imapp のコードは統一済み）。ただしワイヤー上の方言は残っているので、
konpeito / burger は下記手順でゲーム側を標準へ寄せる。

---

## 5. 正規化指示（konpeito / burger-stack-rush）

⚠️ **無停止で移行するため、必ず「ゲーム側で両対応 → imapp 側でフリップ → 旧削除」の
順で行う。** ゲームだけ先に旧仕様を消すと、imapp が現行アダプタで送る旧メッセージを
受け取れず壊れる。

### konpeito（差分は小さい）

1. **ゲーム側**: host→game の config 受信で `source` を `'imappt'` **と** `'imapp'` の
   **両方**受け付けるようにする。送信側 `game_over` はそのまま。`save_score` は
   `game_over` に一本化（当面は両方出してよい）。→ リビルド＆ `npm run deploy`。
2. **imapp 側**: `app/games/konpeito/Konpeito.tsx` のアダプタを
   `hostSource: 'imapp'` → `'imappt'`、`terminalTypes: ['game_over']` に変更。
3. **ゲーム側**: 安定後、`'imapp'` 受信と `save_score` 送信を削除。

### burger-stack-rush（差分が大きい＝最優先で正規化価値あり）

1. **ゲーム側**:
   - host→game 受信を `{source:'imappt', type:'config'}` **にも**対応（旧 `imapp`/`init`
     も当面残す）。`config.payload` から `player` を読む。
   - 終了時に `game_over` を**追加**送信（旧 `result` も当面残す）。
     payload は現状の `{score, served, mistakes, bestPerfectStreak, difficulty}` のままでよい。
   → リビルド＆デプロイ。
2. **imapp 側**: `BurgerStackRush.tsx` のアダプタを標準
   （`hostSource:'imappt'` / `configType:'config'` / `terminalTypes:['game_over']`）へ。
   併せて `BurgerStackRushClient.tsx` の `onResult` を `onGameOver` 命名に寄せると尚良い。
3. **ゲーム側**: 安定後、旧 `imapp`/`init`/`result` を削除。

---

## 6. 新規ゲームを足すとき（pizza-oven-rush / apple-guard ほか）

§1〜§3 をそのまま実装すれば完了。方言を作らないこと。

**通達は共通テンプレを使う**:

1. `docs/embed-onboarding-TEMPLATE.md` を `docs/embed-notice-<game-key>.md` にコピー。
2. `<game-key>` と `<ゲーム名>` を全置換、日付を整える。
3. コミット＆push し、対象ゲームのセッション/開発者に「読んで」と伝える。
4. 新ゲームのソースrepo直下に、テンプレ末尾「付録」のポインタ・スタブ
   （`EMBED.md`）を置く。全文コピーではなくポインタだけ（正本は1本に保つ）。

→ 仕様はこの EMBED-CONTRACT.md にしか書かない。通達テンプレに仕様を写経しないこと
（写経するとコピーが増えて正本が崩れる）。imapp 側の追加手順は imapp リポジトリ
`docs/game-embed.md`。

---

## 7. 予約・通知の拡張（非スコア型／来店予約が目的のアプリ）

スコアではなく **来店予約が目的**のアプリ（例: `kyou-no-bres` ＝今日のブレス）向けの拡張。
§1〜§3 の標準はそのまま守り、下記メッセージだけを足す。方言ではなく **この §7 が正**。

**役割分担（不変条件）**

- **予約の書き込みは imapp が唯一の経路。** ゲームは「予約したい」を送るだけで、実入力
  （日時・氏名・連絡先など）は **imapp 画面が描画・受付・確定する**。ゲームは予約フォームを
  持たない／DB に書かない／外部フォーム・LINE・電話へ橋渡ししない。
- 未購読プレイヤーは **購読 → 購読者として予約**。`notify_pref` が購読開始のトリガ。
- ゲームは `reservation_confirmed` を受けたら **演出するだけ**（礼状・きらめき等）。

| 方向 | type | いつ | payload |
|---|---|---|---|
| game→host | `reserve_intent` | ユーザーが「予約に進む」を押した | `{ item?: string, menu?: string, quantity?: number, note?: string, prepCard?: {...} }`（`item`/`quantity`/`note` は予約フォームの**編集可能な初期値**。host は untrusted 扱いで、予約の確定は host が著作。prepCard は PII 最小） |
| game→host | `notify_pref` | 通知/購読の許諾トグル | `{ enabled: boolean }` |
| host→game | `reservation_confirmed` | imapp 側で予約が確定した | `{ ... }`（任意・ゲームは演出のみ） |

- host は `reserve_intent` を受けたら **imapp の予約 UI（未購読なら購読ゲート → 予約フォーム）** を開く。
- host は `notify_pref{enabled:true}` を受けたら **購読開始フロー**へ入れてよい。
- `game_over` は「1日のブレスを組み終えた区切り」として送ってよい（`payload.score` ＝ 置いた石数の
  象徴整数）。スコアAPIの値域に収まる整数で。
- 対象店は **`reservation_enabled` フラグ**で有効化。OFF 店では host は `reserve_intent` を無視/非表示に。
- ゲームは §3 のセキュリティ不変条件（origin/source 検証・`hostOrigin` 送信・`'*'` 禁止）を予約系
  メッセージにも適用する。
- これらに未対応でもゲームは破綻しない（埋め込み外・非対応時はローカルにフォールバック表示）。

> 現状の実装状況: `kyou-no-bres` はゲーム側が §7 を送出・受信する実装済み。imapp 側の
> 受け口（予約 UI・購読ゲート・`reservation_confirmed` 返送・`reservation_enabled` 列）は本 §7 を正として実装する。

---

## 8. シェア・外部リンク・分析の拡張（任意・2026-07-16 確定）

- **Web Share API**: imapp の iframe は全ゲーム共通で `allow="web-share"` 済み。
  ゲーム内シェアボタンはそのまま動く（ユーザー操作起点必須）。
- **外部リンク**: どちらでも可。
  - game→host `{ source:'<game-key>', type:'open_url', payload:{ url } }`
    → host が新規タブで開く。**https 以外は無視される**。
  - ゲーム側アダプタ申請で `target="_blank"` 直接遷移も可（imapp チームに依頼:
    extraSandbox 設定。kyou-no-bres は設定済み）。
- **匿名分析**: game→host `{ source:'<game-key>', type:'analytics', payload:{ event, ...fields } }`
  - `event` は `^[a-z0-9_]{1,40}$`、fields 合計 4KB まで。**PII を入れないこと**。
  - 店舗コンテキスト（`?shop=` 起動）のときだけ記録される。
- **notify_pref**: `{ enable | enabled: boolean }` どちらの表記でも可。
  true=購読フロー起動、false=無操作（ack のみ）。応答は
  host→game `{ type:'notify_pref_ack', payload:{ subscribed } }`。
- **reserve_intent の準備カード**: `payload.prepCard = { topStones?, mood?, wrist?,
  interest?, birthday? }` を送ると imapp の予約シートの伝言欄に整形表示される。
