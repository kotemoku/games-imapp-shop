# 厨房背景画像 統合仕様 (Flutter 側依頼)

調理シーンの背景を、現在の単色 (おそらく `#74C4D6` 系の water-blue ベタ) から
**厨房イラスト**に差し替えるための作業依頼。

## ① 背景画像 (静的配信側で配置済み)

- **配置先パス (リポ)**: `burger/assets/assets/scene/kitchen.png`
- **配信 URL**: `https://games.imapp.shop/burger/assets/assets/scene/kitchen.png`
  ※ ただし Flutter で `AssetImage` 経由で読む場合は `assets/scene/kitchen.png` 指定 (`burger/assets/` 配下を `assets/` として展開する Flutter 規約)。

## ② pubspec.yaml への追加 (Flutter プロジェクト側)

`burger_stack_rush/pubspec.yaml` に追記:

```yaml
flutter:
  assets:
    - assets/ingredients/
    - assets/scene/      # ← 追加
```

## ③ Dart 側コード変更例

調理シーンの背景を描いている Widget の `Container(color: ...)` を Image に差し替え:

```dart
// before:
Container(color: const Color(0xFF74C4D6))

// after (案 A: 推奨):
Container(
  color: const Color(0xFF74C4D6),   // 画像が乗らない上半分は壁色で塗る
  child: const Align(
    alignment: Alignment.bottomCenter,
    child: Image(
      image: AssetImage('assets/scene/kitchen.png'),
      fit: BoxFit.fitWidth,            // 横幅フィット、縦は元アスペクトを維持
      width: double.infinity,
    ),
  ),
)
```

`Stack` の最下層にこの Container を置き、その上に既存の食材スプライト / HUD を重ねる構成にしてください。

## ④ 画像仕様 (PNG)

**実際に配置済みの画像** (`burger/assets/assets/scene/kitchen.png`):

| 項目 | 値 |
|------|----|
| 解像度 | 1484 × 1060 px |
| **アスペクト比** | **約 7:5 (横長)** ← ゲーム viewport 9:19 (縦長) との不一致あり |
| フォーマット | PNG / 8-bit RGB |
| ファイルサイズ | 約 1.0 MB |
| ベース色 | `#74C4D6` (背景の青) |

### アスペクト不一致への対処 (重要)

ゲーム viewport は 9:19 縦長、背景は 7:5 横長のため、そのまま `BoxFit.cover` で
貼ると左右が大きくクリップされ、サイドのキャビネット類が見えなくなる。

推奨レイアウト案 (Flutter チーム判断):

#### 案 A: 下寄せ + fitWidth (おすすめ)
```dart
DecorationImage(
  image: AssetImage('assets/scene/kitchen.png'),
  fit: BoxFit.fitWidth,
  alignment: Alignment.bottomCenter,
)
```
- 横幅にフィット、縦は元画像 (~720px 相当に縮小) が画面下半分に配置
- 上半分は `Color(0xFF74C4D6)` で塗りつぶし (画像の壁色とつながる)
- 厨房全体が見えてゲーム HUD は上の青空エリアに自然に乗る

#### 案 B: BoxFit.cover (フルブリード)
```dart
DecorationImage(
  image: AssetImage('assets/scene/kitchen.png'),
  fit: BoxFit.cover,
  alignment: Alignment.center,
)
```
- 画面いっぱい埋める。左右が削れ、調理台部分のみ大きく見える
- ピクセルアートが大きく見える分、シーン理解は犠牲に

#### 案 C: 縦長 (9:16) に再エクスポート
画像作者に縦長版を依頼する場合の理想形。元画像の壁部分を上に伸ばし、
床部分を下に伸ばすだけで対応可。新画像で差し替え。

**推奨は案 A**。下記コード差し替え例も A を前提。

## ⑤ 安全領域 (重要)

ゲームの UI / 食材スプライトが背景上に重なります。デザインの **中央 65% は控えめ** にして、
HUD と食材表示の邪魔をしないこと:

```
┌──────────────────────────┐
│  上部 (壁・棚)              │  ← 装飾 OK
├──────────────────────────┤
│                          │
│  中央 (調理エリア)          │  ← 鉄板程度の控えめな装飾、彩度低めに
│                          │
├──────────────────────────┤
│  下部 (カウンター・床)       │  ← 装飾 OK
└──────────────────────────┘
```

## ⑥ 動作確認

1. `flutter build web --release --base-href /burger/`
2. `build/web/` を `games-imapp-shop/burger/` に上書きコピー (kitchen.png は既に commit 済み)
3. `git add . && git commit -m "feat(burger): kitchen background" && git push`
4. Cloudflare Pages が自動デプロイ → `https://games.imapp.shop/burger/` で確認

## ⑦ ライセンス注意

参考画像を直接利用する場合、二次利用可能なライセンスか確認すること。
不明な場合は自前生成 (AI / 自作) で代替を推奨。
