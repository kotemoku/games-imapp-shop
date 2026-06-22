# Burger Stack Rush - init 受信 & 進行保存 (Flutter チーム作業依頼)

imapp 側で実装した「imapp との接続強化」機能を Flutter (Dart) 側で対応するための作業依頼です。

## ① init メッセージ受信 (= ユーザー名表示)

imapp の wrapper は、`ready` を受け取った直後に次の形式で **`init` メッセージ**を送信します:

```js
// host (imapp) → game
{
  source: 'imapp',
  type: 'init',
  payload: {
    userName: '○○さん' | null,   // ログイン中なら名前 (フルネーム/メール先頭)、未ログインなら null
    userId: '<uuid>' | null      // 将来用 (今は null 固定の可能性あり)
  }
}
```

### Dart 側の対応

`web/embed.js` で `window.addEventListener('message', ...)` を追加し、Dart に渡す:

```js
// burger_stack_rush/web/embed.js
(function () {
  window.addEventListener('message', function (e) {
    if (!e.data || e.data.source !== 'imapp') return;
    // origin 検証は parent が imapp.shop / imapp.pages.dev / localhost のいずれか
    var allowed = /^https:\/\/(imapp\.shop|.*\.imapp\.shop|imapp\.pages\.dev|.*\.imapp\.pages\.dev)$/.test(e.origin)
                || /^http:\/\/localhost:\d+$/.test(e.origin);
    if (!allowed) return;
    // Dart に渡すために window 上にキャッシュ
    window.__imappInit = e.data.payload;
    // Dart 側で待ち合わせている場合のフック
    if (typeof window.__onImappInit === 'function') {
      window.__onImappInit(e.data.payload);
    }
  });
})();
```

Dart 側で利用:

```dart
// main.dart の起動時
import 'dart:js' as js;
import 'dart:js_util' as js_util;

String? _readUserName() {
  final init = js_util.getProperty(js.context, '__imappInit');
  if (init == null) return null;
  return js_util.getProperty(init, 'userName') as String?;
}

// または、コールバックで受け取りたい場合
void _setupInitListener() {
  js.context['__onImappInit'] = (dynamic payload) {
    final userName = js_util.getProperty(payload, 'userName') as String?;
    // setState などで反映
  };
}
```

### 表示の例

- タイトル画面: 「○○さん、いらっしゃい！」
- 結果画面: 「○○さん、お疲れさま！」
- ユーザー名 null の場合は固定文言 (「いらっしゃい！」) にフォールバック

## ② 進行保存 (リロード後のレジューム) - 任意

imapp 側で「もう一度遊ぶ」ボタンは iframe をリロードするので、現状リロードでゲーム状態はリセットされます。
**ゲーム途中で離脱→戻ってきた時の継続**をやりたい場合の対応です:

### Dart 側

`SharedPreferences` (Flutter Web では localStorage に保存される) でゲーム状態を永続化:

```dart
import 'package:shared_preferences/shared_preferences.dart';

class GameState {
  int score;
  int served;
  int mistakes;
  int bestPerfectStreak;
  String difficulty;
  int elapsedMs;
  // ... 必要なフィールド

  Map<String, dynamic> toJson() => { /* ... */ };
  factory GameState.fromJson(Map<String, dynamic> j) => /* ... */;
}

Future<void> saveProgress(GameState state) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('burger_progress', jsonEncode(state.toJson()));
}

Future<GameState?> loadProgress() async {
  final prefs = await SharedPreferences.getInstance();
  final s = prefs.getString('burger_progress');
  if (s == null) return null;
  return GameState.fromJson(jsonDecode(s));
}

Future<void> clearProgress() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('burger_progress');
}
```

### 保存タイミング

- 1 秒に 1 回 (ゲーム中)
- visibilitychange イベントで画面が hidden になった時
- 終了時 (`result` 送信後) は clear

### 起動時

- localStorage に進行データがあれば「続きから遊ぶ?」ダイアログを出す
  - はい → restore
  - いいえ → clear して新規開始

## ③ embed.js の現状確認

`burger_stack_rush/web/embed.js` (現状 984 bytes) を確認し、上記 ① の listener を追加。
ファイルが小さいなら既存内容に追記する形で OK。

## ④ 動作確認

1. `flutter build web --release --base-href /burger/`
2. `build/web/` を `games-imapp-shop/burger/` に上書きコピー、commit、push
3. `https://imapp.shop/games/burger-stack-rush` にログイン状態でアクセス
4. ゲーム画面で「○○さん」が表示されれば init 受信成功
5. (② 実装時) ゲーム途中でブラウザを閉じて再アクセス → 続きダイアログが出ること
