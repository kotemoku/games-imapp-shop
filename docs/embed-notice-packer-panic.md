# 通達: packer-panic 連携の標準化について

> **送付先**: packer-panic 開発担当
> **送付元**: imapp チーム
> **日付**: 2026-06-28
> **重要度**: 低（**対応不要・FYI**）

## 要点

imapp 埋め込み連携の **正式契約を `docs/EMBED-CONTRACT.md` として明文化**しました。
そして **packer-panic の契約をその「標準（リファレンス）」に採用**しました。

```
host → game : { source:'imappt', type:'config', payload:{ player, difficulty? } }
game → host : { source:'packer-panic', type:'ready'|'config_ack'|'game_start'|'game_over' }
```

## あなたへのお願い

- **コード変更は不要**。現状が基準です。
- 今後この契約を**勝手に変えない**でください（変える場合は EMBED-CONTRACT.md を
  先に更新し、全ゲーム・imapp と調整）。

## 背景

imapp 側は連携処理を単一コンポーネント (`app/games/_embed/GameEmbed.tsx`) に統一しました。
burger / konpeito には歴史的方言が残っており、これらを packer-panic 標準へ寄せていきます。
