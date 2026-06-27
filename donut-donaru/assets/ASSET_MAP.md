# アセット対応表（切り抜き・リサイズ・リネーム済み）

> 元画像（ChatGPT生成 41枚）は配信対象外の `art_originals/`（プロジェクト直下・gitignore）に退避。`manifest.json` に元ファイル名を保存。
> 共通処理: 疑似チェッカー背景を透過キーイング → 余白タイト切り抜き → 縮小。全 PNG・透過（全画面モックを除く）。

## donut/（A. ドーナツ 24×24・透過）
| ファイル | 元 | 内容 |
|---|---|---|
| A1_raw.png | raw_01 | 焼き色: 生 |
| A1_golden.png | raw_02 | 焼き色: きつね色 |
| A1_overfried.png | raw_03 | 焼き色: 揚げ過ぎ |
| A1_burnt.png | raw_04 | 焼き色: 黒焦げ |
| A2_plain.png | raw_05 | 味付け: プレーン |
| A2_choco.png | raw_06 | 味付け: チョコ |
| A2_strawberry.png | raw_07 | 味付け: 苺 |
| A2_matcha.png | raw_08 | 味付け: 抹茶 |
| A2_custard.png | raw_09 | 味付け: カスタード |
| A2_sugar.png | raw_10 | 味付け: シュガー |

## equip/（B. 調理設備）
| ファイル | 元 | 内容・備考 |
|---|---|---|
| B1_hopper.png | raw_23 | ホッパー 通常（高さ20） |
| B1_hopper_drop.png | raw_24 | ホッパー 投下時 |
| B2_fryer.png | raw_27 | 3レーンフライヤー。**注意: 元絵は横3槽レイアウト。ゲームは縦3レーン落下式なので向き要調整** |
| B3_fx_0..4.png | raw_28 | 油はね・泡・煙 5種（高さ16） |
| B4_smoke_0..1.png | raw_26 | 黒焦げの煙 2種 |
| oven_window.png | raw_13 | 揚げ表示窓（用途未確定・要確認） |

## season/ shelf/
| ファイル | 元 | 内容 |
|---|---|---|
| season/C1_station.png | raw_29 | 味付け台（フレーバーディスペンサー） |
| shelf/D1_shelf.png | raw_12 | 陳列棚フレーム6列 |

## customer/（E. 客）
| ファイル | 元 | 内容・備考 |
|---|---|---|
| E1_female.png | raw_15 | 女性客 スプライトシート（6フレーム・27×40） |
| E1_man.png | raw_16 | 男性客（6フレーム・24×40） |
| E1_coatman.png | raw_19 | コート男性客（6フレーム・24×40） |
| E3_oldwoman.png | raw_17 | 老婆=picky強調（5フレーム・20×40） |
| E2_bubble_0..1.png | raw_18 | 指名吹き出し 2種 |
| E5_fx_0..2.png | raw_21 | 満足/怒りエフェクト（ハート・コイン・怒りマーク） |

> 客シートのフレーム寸法は `customer/_frames.json`。Phaser: `load.spritesheet(key, path, {frameWidth, frameHeight})`。
> ポーズ順: 歩き×2 / 待ち×2 / 満足（キラ）/ 怒り（マーク）。

## ui/（F. UI/HUD、D-4 警告、E-4 ゲージ）
| ファイル | 元 | 内容 |
|---|---|---|
| F1_score.png | raw_32 | スコア表示フレーム |
| F2_reputation.png | raw_34 | 評判メーター |
| F3_slow_states.png | raw_35 | スローレバー 5状態（参照1枚・要手動分割 or 動的描画） |
| F4_pause.png | raw_36 | ポーズボタン |
| F5_logo.png | raw_37 | タイトルロゴ |
| F6_start.png | raw_38 | スタート画面（448×252・全画面） |
| F7_result_jam.png | raw_39 | 結果: 詰まり（448×252） |
| F7_result_reputation.png | raw_40 | 結果: 評判切れ（448×252） |
| F8_combo_examples.png | raw_41 | コンボ 2/3/4 例（参照1枚・本番は動的数字） |
| D4_warn_0..1.png | raw_14 | 警告アイコン2種（在庫少/危険） |
| E4_patience_0..2.png | raw_20 | 我慢ゲージ 緑/黄/赤 |

## bg/
| ファイル | 元 | 内容 |
|---|---|---|
| G1_shop.png | raw_33 | 店内背景（ロゴ入り・448×252） |

## 未採用（_raw に保管）
| 元 | 理由 |
|---|---|
| raw_11 | 全部入り参照シート（個別アセットで代替済み） |
| raw_22 / raw_25 / raw_30 | 味付け済みドーナツの陳列「列」表示。A2個別で代替可。棚演出用に流用可 |

## 既知の要確認点
1. **B2_fryer の向き**: 元絵は横3槽。ゲームは縦3レーン落下式 → 回転 or 縦レイアウトの描き直し検討。
2. **oven_window (raw_13)**: 仕様の対応アセットが不明。ショーケース(§10)寄りなら core 不要。
3. **F3_slow / F8_combo**: ラベル付き連結のため自動分割不可。状態別が必要なら手動切り出し。
</content>
