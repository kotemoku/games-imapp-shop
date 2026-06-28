# 通達: tsukurun 連携の標準化について

> **送付先**: tsukurun（つくチャレ）開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 低（**対応不要・FYI**）

## 要点

imapp 埋め込み連携の **正式契約を `docs/EMBED-CONTRACT.md` に明文化**しました。
**tsukurun は既に標準準拠**です。

```
host → game : { source:'imappt', type:'config', payload:{ player } }
game → host : { source:'tsukurun', type:'ready'|'config_ack'|'game_start'|'game_over' }
```

## あなたへのお願い

- **コード変更は不要**。
- 今後 source/type/終了イベント名（`game_over`）を**変えない**でください。
  変更が必要なら EMBED-CONTRACT.md を先に更新して調整。

## 背景

imapp 側は連携処理を単一コンポーネントに統一しました。標準は packer-panic / tsukurun です。
