# Burger Stack Rush - カーソルが画面下にはみ出る不具合 (Flutter 確認依頼)

## 症状

- 利用者報告 (2026-06-22): ハンバーガーの食材を選ぶカーソルが
  画面下 (スコアボード・ボタンより下) にはみ出ていて見えない
- 環境: iPhone Safari (推定)、imapp wrapper 経由
  (https://imapp.shop/games/burger-stack-rush)

## imapp 側でやった対応

iframe の幅サイズ計算を `width: min(100%, 480px, calc((100dvh - 60px) * 9/19))`
に変更。9:19 縦長を維持しつつ、viewport が縦に短い端末でも下端が viewport
を超えないよう制約を追加。

→ これで多くの端末では解決するはずですが、Flutter 側の内部レイアウト
（カーソル位置の絶対座標計算など）に依存する問題なら、依然として残る可能性あり。

## Flutter 側で確認してほしい点

1. **カーソル / 選択 UI の y 座標**
   - 食材選択カーソルの y 位置を `MediaQuery.of(context).size.height` 基準に
     パーセンテージで計算しているか
   - もしハードコードのピクセル値で位置決めしているなら、画面が縮小された
     時にはみ出る → 相対座標に修正

2. **SafeArea / Padding**
   - 一番下の要素 (食材アイコン群) が `SafeArea(bottom: true)` で囲まれているか
   - iPhone のホームバー領域に食い込んでいる可能性も

3. **viewport meta** (`web/index.html`)
   - `viewport-fit=cover` を含んでいるか
   - 現状: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`
   - 追加候補: `viewport-fit=cover` (iOS のセーフエリア対応)

4. **描画キャンバスサイズ**
   - Flutter が `LayoutBuilder` でコンテナサイズを取って描画してるなら問題なし
   - 固定 size = Size(360, 760) 等で計算してるなら、はみ出る端末あり

## 再現確認手順

1. iPhone Safari で https://imapp.shop/games/burger-stack-rush を開く
2. プレイ中に画面最下部のカーソル位置を観察
3. 既に修正済み (imapp 側) でも、別端末でテストして同様の症状があれば
   上記 1〜4 をチェック

## 連絡先

bug 残ったら issue 報告お願いします。
