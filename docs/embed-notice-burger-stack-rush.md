# 通達: バーガースタックラッシュ 連携の正規化のお願い

> **送付先**: burger-stack-rush 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 中〜高（**要対応・最初期実装ゆえ差分が最大／無停止で移行**）

## 要点

imapp 埋め込み連携の正式契約を `docs/EMBED-CONTRACT.md` に定めました。
burger は一番最初に作られたため、**3点が標準から外れています**。次の改修機会に
標準へ寄せてください。**今は壊れていません**（imapp 側アダプタで吸収済み）。

| 項目 | 現状（burger） | 標準 |
|---|---|---|
| host→game の source | `'imapp'` | **`'imappt'`** |
| host→game の type | `'init'` | **`'config'`** |
| host→game の payload | `{ userName, userId }` | **`{ player }`** |
| 終了イベント | `'result'` | **`'game_over'`** |

## 無停止の移行手順（この順番を厳守）

1. **【burger】**
   - host→game 受信を `{source:'imappt', type:'config'}` **にも**対応
     （旧 `{source:'imapp', type:'init'}` も当面残す＝OR 条件）。
     `config.payload.player` を読む（旧 `userName/userId` も当面フォールバック）。
   - 終了時に `game_over` を**追加**送信（旧 `result` も当面併発で可）。
     payload は現状の `{score, served, mistakes, bestPerfectStreak, difficulty}` のままでOK。
   → リビルド＆デプロイ。
2. **【imapp】** こちらでアダプタを標準へ変更
   （`hostSource:'imappt'` / `configType:'config'` / `terminalTypes:['game_over']`）。
   `app/games/burger-stack-rush/`。
3. **【burger】** 安定後、旧 `imapp`/`init`/`result` を削除。

ステップ1ができたら imapp に「burger 両対応デプロイ済み」と伝えてください。
こちらで2を実施します。

## 参考

- 正式契約: `docs/EMBED-CONTRACT.md`
- imapp 側実装: imapp リポジトリ `docs/game-embed.md` / `app/games/burger-stack-rush/BurgerStackRush.tsx`
