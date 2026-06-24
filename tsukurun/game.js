const stages = [
  {
    id: "work-stool",
    name: "ワークスツール",
    difficulty: "NORMAL",
    assets: {
      sprite: "assets/pixel/work-stool-complete.png",
      diagram: "assets/pixel/work-stool-parts.png"
    },
    guide: {
      dimensions: "W420 × D320 × H460 mm",
      materials: ["座面板 420×320×18 mm：1枚", "脚材 40×40×440 mm：4本", "横桟材 30×40×340 mm：4本", "下棚板 340×240×15 mm：1枚", "木工用ビス・木工用接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "金づち・紙やすり", "保護メガネ・防じんマスク"],
      safety: "切断時は材料をクランプで固定し、刃の進行方向へ手を置かないでください。座る家具のため、完成後は接合部の緩みとがたつきを必ず確認してください。"
    },
    prep: [
      { id: "stool-legs", title: "脚材を切り出す", material: "40×40 mm 脚材", length: 440, pieces: 4, strokes: 8 },
      { id: "stool-rails", title: "横桟を切り出す", material: "30×40 mm 横桟材", length: 340, pieces: 4, strokes: 7 },
      { id: "stool-seat", title: "座面板を切り出す", material: "18 mm 座面板", length: 420, pieces: 1, strokes: 12 }
    ],
    tray: ["seat", "crossbar", "left-frame", "bolts", "shelf", "right-frame"],
    steps: [
      { part: "left-frame", title: "左脚を立てる", text: "左脚フレームを作業台に立て、向きを図面に合わせます。" },
      { part: "right-frame", title: "右脚を立てる", text: "右脚フレームを左脚と平行になるように配置します。" },
      { part: "crossbar", title: "横桟を通す", text: "左右の脚をつなぐ横桟を、中央の穴に差し込みます。" },
      { part: "shelf", title: "下棚を載せる", text: "横桟の上に下棚を載せ、四隅の位置を揃えます。" },
      { part: "seat", title: "座面を載せる", text: "木目の向きを確認し、フレームの上に座面を載せます。", action: "hammer" },
      { part: "bolts", title: "ボルトで固定", text: "4本の固定ボルトを対角線の順に締めて完成です。", action: "screw" }
    ],
    parts: [
      {
        id: "left-frame", name: "左脚フレーム", code: "P-02", icon: "leg left",
        art: '<path class="pixel-outline" d="M148 144h56v24h8v192h-8v24h-64v-24h8z"/><path class="pixel-metal-dark" d="M156 152h40v16h8v184h-16V176h-32z"/><path class="pixel-metal" d="M156 176h32v176h-32z"/><path class="pixel-highlight" d="M164 184h8v152h-8z"/><path class="pixel-orange" d="M140 360h64v16h-64z"/>'
      },
      {
        id: "right-frame", name: "右脚フレーム", code: "P-03", icon: "leg right",
        art: '<path class="pixel-outline" d="M396 144h56v24h8v192h8v24h-64v-24h-8z"/><path class="pixel-metal-dark" d="M404 152h40v16h8v184h-16V176h-32z"/><path class="pixel-metal" d="M412 176h32v176h-32z"/><path class="pixel-highlight" d="M420 184h8v152h-8z"/><path class="pixel-orange" d="M404 360h64v16h-64z"/>'
      },
      {
        id: "crossbar", name: "横桟", code: "P-04", icon: "crossbar",
        art: '<path class="pixel-outline" d="M180 304h240v40H180z"/><path class="pixel-metal-dark" d="M188 312h224v24H188z"/><path class="pixel-metal" d="M196 312h208v8H196z"/><path class="pixel-orange" d="M180 312h16v24h-16zM404 312h16v24h-16z"/>'
      },
      {
        id: "shelf", name: "下棚", code: "P-05", icon: "shelf",
        art: '<path class="pixel-outline" d="M180 248h240v8h24v48h-288v-48h24z"/><path class="pixel-wood" d="M180 256h240v8h16v24H164v-24h16z"/><path class="pixel-wood-dark" d="M164 288h272v8H164z"/><path class="pixel-wood-light" d="M196 264h64v8h-64zM284 264h104v8H284z"/>'
      },
      {
        id: "seat", name: "座面", code: "P-01", icon: "seat",
        art: '<path class="pixel-outline" d="M116 104h368v8h16v72h-16v16H116v-16h-16v-72h16z"/><path class="pixel-wood" d="M116 112h368v8h8v48H108v-48h8z"/><path class="pixel-wood-dark" d="M108 168h384v16H476v8H124v-8h-16z"/><path class="pixel-wood-light" d="M140 120h112v8H140zM276 120h176v8H276zM124 144h208v8H124z"/><path class="pixel-wood-line" d="M196 112h8v56h-8zM316 112h8v56h-8zM420 112h8v56h-8z"/>'
      },
      {
        id: "bolts", name: "固定ボルト", code: "P-06", icon: "bolts",
        art: '<path class="pixel-bolt-dark" d="M156 160h24v24h-24zM420 160h24v24h-24zM180 272h24v24h-24zM396 272h24v24h-24z"/><path class="pixel-bolt" d="M164 160h8v24h-8zM156 168h24v8h-24zM428 160h8v24h-8zM420 168h24v8h-24zM188 272h8v24h-8zM180 280h24v8h-24zM404 272h8v24h-8zM396 280h24v8h-24z"/>'
      }
    ]
  },
  {
    id: "mini-shelf",
    name: "ミニシェルフ",
    difficulty: "NORMAL+",
    assets: {
      sprite: "assets/pixel/mini-shelf-complete.png",
      diagram: "assets/pixel/mini-shelf-parts.png"
    },
    guide: {
      dimensions: "W600 × D240 × H720 mm",
      materials: ["側板 720×240×18 mm：2枚", "天板・底板 564×240×18 mm：各1枚", "中棚 564×230×18 mm：1枚", "背面補強材：2本", "木工用ビス・ダボ・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "棚は必ず水平な床へ置き、壁面への転倒防止固定を行ってください。切断面のささくれを研磨し、ビス位置には下穴を開けてください。"
    },
    prep: [
      { id: "shelf-sides", title: "側板を切り出す", material: "18 mm 側板", length: 720, pieces: 2, strokes: 11 },
      { id: "shelf-boards", title: "棚板を切り出す", material: "18 mm 棚板", length: 564, pieces: 3, strokes: 9 },
      { id: "shelf-braces", title: "背面補強材を切る", material: "背面補強材", length: 650, pieces: 2, strokes: 8 }
    ],
    tray: ["middle-board", "back-brace", "right-side", "top-board", "bottom-board", "left-side"],
    steps: [
      { part: "left-side", title: "左側板を立てる", text: "左側板のダボ穴を内側に向け、まっすぐ立てます。" },
      { part: "right-side", title: "右側板を立てる", text: "右側板を左側板と平行に揃えて配置します。" },
      { part: "bottom-board", title: "底板をはめる", text: "側板の一番下の溝へ底板を水平に差し込みます。" },
      { part: "middle-board", title: "中棚を入れる", text: "中央のダボ位置に合わせて中棚を取り付けます。" },
      { part: "top-board", title: "天板を載せる", text: "左右の側板の上へ天板を載せ、端を揃えます。", action: "hammer" },
      { part: "back-brace", title: "背面を固定", text: "背面の補強バーを交差させて、四隅を固定します。", action: "screw" }
    ],
    parts: [
      {
        id: "left-side", name: "左側板", code: "S-02", icon: "panel",
        art: '<path class="pixel-outline" d="M132 88h72v288h-72z"/><path class="pixel-wood-dark" d="M140 96h56v272h-56z"/><path class="pixel-wood" d="M148 104h40v256h-40z"/><path class="pixel-wood-light" d="M156 112h8v232h-8z"/>'
      },
      {
        id: "right-side", name: "右側板", code: "S-03", icon: "panel",
        art: '<path class="pixel-outline" d="M396 88h72v288h-72z"/><path class="pixel-wood-dark" d="M404 96h56v272h-56z"/><path class="pixel-wood" d="M412 104h40v256h-40z"/><path class="pixel-wood-light" d="M420 112h8v232h-8z"/>'
      },
      {
        id: "bottom-board", name: "底板", code: "S-04", icon: "shelf",
        art: '<path class="pixel-outline" d="M188 328h224v48H188z"/><path class="pixel-wood-dark" d="M196 336h208v32H196z"/><path class="pixel-wood" d="M204 336h192v16H204z"/>'
      },
      {
        id: "middle-board", name: "中棚", code: "S-05", icon: "shelf",
        art: '<path class="pixel-outline" d="M188 224h224v48H188z"/><path class="pixel-wood-dark" d="M196 232h208v32H196z"/><path class="pixel-wood" d="M204 232h192v16H204z"/>'
      },
      {
        id: "top-board", name: "天板", code: "S-01", icon: "seat",
        art: '<path class="pixel-outline" d="M116 64h368v64H116z"/><path class="pixel-wood-dark" d="M124 72h352v48H124z"/><path class="pixel-wood" d="M132 72h336v32H132z"/><path class="pixel-wood-light" d="M156 80h128v8H156zM308 80h128v8H308z"/>'
      },
      {
        id: "back-brace", name: "背面補強バー", code: "S-06", icon: "back",
        art: '<path class="pixel-outline" d="M204 136h24v24h24v24h24v24h24v24h24v24h24v24h24v24h24v24h-32v-24h-24v-24h-24v-24h-24v-24h-24v-24h-24v-24h-24v-24h-24zM372 136h24v24h-24v24h-24v24h-24v24h-24v24h-24v24h-24v24h-24v24h-24v-32h24v-24h24v-24h24v-24h24v-24h24v-24h24v-24h24z"/><path class="pixel-metal" d="M212 144h16v16h24v24h24v24h24v24h24v24h24v24h24v24h16v16h-24v-24h-24v-24h-24v-24h-24v-24h-24v-24h-24v-24h-24v-24h-8zM372 144h16v16h-16v24h-24v24h-24v24h-24v24h-24v24h-24v24h-24v16h-16v-24h24v-24h24v-24h24v-24h24v-24h24v-24h24v-24h16z"/>'
      }
    ]
  },
  {
    id: "cafe-chair",
    name: "カフェチェア",
    difficulty: "HARD",
    assets: {
      sprite: "assets/pixel/cafe-chair-complete.png",
      diagram: "assets/pixel/cafe-chair-parts.png"
    },
    guide: {
      dimensions: "W440 × D480 × H780 mm",
      materials: ["座枠材 30×45 mm：4本", "前脚材 40×40×430 mm：2本", "後脚・背柱材 40×40×760 mm：2本", "背板 360×100×18 mm：1枚", "座面板・クッション材：各1枚", "木工用ビス・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり・木工用のみ", "電動ドライバー・下穴ドリル", "金づち・クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "椅子には大きな荷重がかかります。接合強度と材料強度を専門家へ確認し、試し荷重を行うまで人が座らないでください。"
    },
    prep: [
      { id: "chair-front-legs", title: "前脚を切り出す", material: "40×40 mm 前脚材", length: 430, pieces: 2, strokes: 8 },
      { id: "chair-back-legs", title: "後脚・背柱を切る", material: "40×40 mm 後脚材", length: 760, pieces: 2, strokes: 12 },
      { id: "chair-rails", title: "座枠材を切り出す", material: "30×45 mm 座枠材", length: 380, pieces: 4, strokes: 7 },
      { id: "chair-back", title: "背板を切り出す", material: "18 mm 背板", length: 360, pieces: 1, strokes: 9 }
    ],
    tray: ["cushion", "front-legs", "backrest", "seat-frame", "chair-bolts", "back-frame"],
    steps: [
      { part: "back-frame", title: "背フレームを立てる", text: "背フレームの表裏を確認し、作業台へ立てます。" },
      { part: "seat-frame", title: "座枠を差し込む", text: "背フレーム中央のジョイントへ座枠を差し込みます。" },
      { part: "front-legs", title: "前脚を取り付ける", text: "左右の前脚を座枠の穴へ奥まで差し込みます。" },
      { part: "backrest", title: "背板を固定する", text: "カーブした背板を背フレーム上部へ取り付けます。", action: "hammer" },
      { part: "cushion", title: "クッションを載せる", text: "縫い目を後ろへ向け、座枠の中央へ載せます。" },
      { part: "chair-bolts", title: "全体を締める", text: "6本のボルトを対角線の順に締めて完成です。", action: "screw" }
    ],
    parts: [
      {
        id: "back-frame", name: "背フレーム", code: "C-02", icon: "leg left",
        art: '<path class="pixel-outline" d="M140 64h56v288h-56zM404 64h56v288h-56zM180 280h240v40H180z"/><path class="pixel-metal-dark" d="M148 72h40v272h-40zM412 72h40v272h-40zM188 288h224v24H188z"/><path class="pixel-metal" d="M156 80h16v248h-16zM420 80h16v248h-16zM204 288h192v8H204z"/>'
      },
      {
        id: "seat-frame", name: "座枠", code: "C-03", icon: "seat",
        art: '<path class="pixel-outline" d="M140 240h320v72H140z"/><path class="pixel-wood-dark" d="M148 248h304v56H148z"/><path class="pixel-wood" d="M156 248h288v32H156z"/><path class="pixel-wood-light" d="M180 256h104v8H180zM308 256h104v8H308z"/>'
      },
      {
        id: "front-legs", name: "左右の前脚", code: "C-04", icon: "leg right",
        art: '<path class="pixel-outline" d="M172 296h56v88h-56zM372 296h56v88h-56z"/><path class="pixel-metal-dark" d="M180 304h40v72h-40zM380 304h40v72h-40z"/><path class="pixel-metal" d="M188 312h16v56h-16zM388 312h16v56h-16z"/><path class="pixel-orange" d="M172 368h56v16h-56zM372 368h56v16h-56z"/>'
      },
      {
        id: "backrest", name: "背板", code: "C-01", icon: "panel",
        art: '<path class="pixel-outline" d="M156 88h288v104h-16v16H172v-16h-16z"/><path class="pixel-wood-dark" d="M164 96h272v88h-16v16H180v-16h-16z"/><path class="pixel-wood" d="M172 104h256v64h-16v16H188v-16h-16z"/><path class="pixel-wood-light" d="M196 112h112v8H196zM332 112h64v8h-64z"/>'
      },
      {
        id: "cushion", name: "座面クッション", code: "C-05", icon: "cushion",
        art: '<path class="pixel-outline" d="M164 216h272v16h16v64H148v-64h16z"/><path class="pixel-orange" d="M164 224h272v16h8v40H156v-40h8z"/><path class="pixel-wood-light" d="M188 232h96v8h-96z"/><path class="pixel-wood-dark" d="M156 280h288v8H156z"/>'
      },
      {
        id: "chair-bolts", name: "固定ボルト", code: "C-06", icon: "bolts",
        art: '<path class="pixel-bolt-dark" d="M164 280h24v24h-24zM412 280h24v24h-24zM164 112h24v24h-24zM412 112h24v24h-24z"/><path class="pixel-bolt" d="M172 280h8v24h-8zM164 288h24v8h-24zM420 280h8v24h-8zM412 288h24v8h-24zM172 112h8v24h-8zM164 120h24v8h-24zM420 112h8v24h-8zM412 120h24v8h-24z"/>'
      }
    ]
  },
  {
    id: "low-table",
    name: "ローテーブル",
    difficulty: "EXPERT",
    assets: {
      sprite: "assets/pixel/low-table-complete.png",
      diagram: "assets/pixel/low-table-parts.png"
    },
    guide: {
      dimensions: "W900 × D450 × H400 mm",
      materials: ["天板 900×450×24 mm：1枚", "脚材 40×40×376 mm：4本", "長幕板 820×80×18 mm：2枚", "短幕板 370×80×18 mm：2枚", "木工用ビス・ダボ・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "天板が広く重いため、運搬と組み立ては二人以上で行ってください。脚と幕板の接合は下穴を開けてビス留めし、完成後はがたつきと接合部の緩みを必ず確認してください。"
    },
    prep: [
      { id: "table-top", title: "天板を切り出す", material: "24 mm 天板", length: 900, pieces: 1, strokes: 14 },
      { id: "table-legs", title: "脚材を切り出す", material: "40×40 mm 脚材", length: 376, pieces: 4, strokes: 8 },
      { id: "table-aprons", title: "幕板を切り出す", material: "18 mm 幕板", length: 820, pieces: 4, strokes: 9 }
    ],
    tray: ["apron-back", "tabletop", "left-leg", "table-bolts", "apron-front", "right-leg"],
    steps: [
      { part: "left-leg", title: "左脚を組む", text: "左の2本脚をフレームにして、向きを図面に合わせます。" },
      { part: "right-leg", title: "右脚を組む", text: "右の2本脚を左脚と平行になるよう配置します。" },
      { part: "apron-back", title: "後幕板を渡す", text: "左右の脚の後ろ側に長い幕板を渡してつなぎます。" },
      { part: "apron-front", title: "前幕板を締める", text: "前側にも長幕板を渡し、ビスで脚を箱状に固めます。", action: "screw" },
      { part: "tabletop", title: "天板を載せる", text: "脚フレームの中央に天板を載せ、四辺の出を揃えます。", action: "hammer" },
      { part: "table-bolts", title: "天板を固定", text: "4隅のボルトを対角線の順に締めて完成です。", action: "screw" }
    ],
    parts: [
      {
        id: "left-leg", name: "左脚フレーム", code: "T-02", icon: "leg left",
        art: '<path class="pixel-outline" d="M112 196h28v176h-28zM188 196h28v176h-28z"/><path class="pixel-metal" d="M118 202h16v164h-16zM194 202h16v164h-16z"/><path class="pixel-highlight" d="M120 206h6v156h-6zM196 206h6v156h-6z"/><path class="pixel-orange" d="M112 356h28v16h-28zM188 356h28v16h-28z"/>'
      },
      {
        id: "right-leg", name: "右脚フレーム", code: "T-03", icon: "leg right",
        art: '<path class="pixel-outline" d="M384 196h28v176h-28zM460 196h28v176h-28z"/><path class="pixel-metal" d="M390 202h16v164h-16zM466 202h16v164h-16z"/><path class="pixel-highlight" d="M392 206h6v156h-6zM468 206h6v156h-6z"/><path class="pixel-orange" d="M384 356h28v16h-28zM460 356h28v16h-28z"/>'
      },
      {
        id: "apron-back", name: "後幕板", code: "T-05", icon: "crossbar",
        art: '<path class="pixel-outline" d="M140 196h320v30H140z"/><path class="pixel-wood-dark" d="M148 202h304v18H148z"/><path class="pixel-wood" d="M148 202h304v8H148z"/>'
      },
      {
        id: "apron-front", name: "前幕板", code: "T-04", icon: "crossbar",
        art: '<path class="pixel-outline" d="M140 210h320v34H140z"/><path class="pixel-wood" d="M148 218h304v18H148z"/><path class="pixel-wood-dark" d="M148 236h304v8H148z"/><path class="pixel-wood-light" d="M170 222h120v6H170zM320 222h120v6H320z"/>'
      },
      {
        id: "tabletop", name: "天板", code: "T-01", icon: "seat",
        art: '<path class="pixel-outline" d="M84 150h432v52H84z"/><path class="pixel-wood" d="M92 158h416v28H92z"/><path class="pixel-wood-dark" d="M84 186h432v16H84z"/><path class="pixel-wood-light" d="M120 162h160v6H120zM310 162h180v6H310z"/><path class="pixel-wood-line" d="M210 158h6v44h-6zM340 158h6v44h-6z"/>'
      },
      {
        id: "table-bolts", name: "固定ボルト", code: "T-06", icon: "bolts",
        art: '<path class="pixel-bolt-dark" d="M118 176h22v22h-22zM460 176h22v22h-22zM200 176h22v22h-22zM378 176h22v22h-22z"/><path class="pixel-bolt" d="M125 176h8v22h-8zM118 183h22v8h-22zM467 176h8v22h-8zM460 183h22v8h-22zM207 176h8v22h-8zM200 183h22v8h-22zM385 176h8v22h-8zM378 183h22v8h-22z"/>'
      }
    ]
  }
];

const penaltyMs = 3000;
const rankTable = {
  "work-stool": { s: 13000, a: 19000, b: 27000 },
  "mini-shelf": { s: 15000, a: 21000, b: 30000 },
  "cafe-chair": { s: 18000, a: 25000, b: 35000 },
  "low-table": { s: 16000, a: 23000, b: 32000 }
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sparkPalette = ["#f06b3f", "#b8d3c2", "#f0c37c", "#ffffff", "#596a66"];
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// ── imapp 組み込みブリッジ ──────────────────────────────────────────────
// imapp に iframe 埋め込みされたときに親(ホスト)と postMessage で連携する。
// 契約は burger / packer-panic と同じ:
//   host → game : { source:'imappt', type:'config', payload:{ player } }
//   game → host : { source:'tsukurun', type:'ready'|'game_start'|'game_over', payload }
// 単体配信時(iframe外)は postMessage を送らず、従来どおり動作する。
const SELF_SOURCE = "tsukurun";
const HOST_SOURCE = "imappt";
const SCORE_CAP = 600000; // タイムをポイント化する基準(=10分)。速いほど高得点。
const embedQuery = new URLSearchParams(location.search);
const embedConfig = {
  embed: embedQuery.get("embed") === "1" || embedQuery.has("imappt") || window.parent !== window,
  autostart: embedQuery.get("autostart") === "1",
  stageParam: embedQuery.get("stage"),
  player: embedQuery.get("player") || null,
  hostOrigin: embedQuery.get("hostOrigin") || "*"
};

// localStorage は埋め込み時に制限/例外となることがあるため必ず保護する。
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* 埋め込みで保存不可なら無視 */ } }
};

function postToHost(type, payload) {
  if (window.parent === window) return; // iframe 外では送らない
  try {
    window.parent.postMessage({ source: SELF_SOURCE, type, payload }, embedConfig.hostOrigin);
  } catch { /* 宛先 origin 不一致などは無視 */ }
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || typeof data !== "object" || data.source !== HOST_SOURCE) return;
  if (data.type === "config" && data.payload) {
    if (typeof data.payload.player === "string") embedConfig.player = data.payload.player;
    postToHost("config_ack", { player: embedConfig.player });
  }
});

const elements = {
  timer: $("#timer"),
  currentStep: $("#currentStep"),
  stepTotalLabel: $("#stepTotalLabel"),
  missCount: $("#missCount"),
  bestTime: $("#bestTime"),
  instructionNumber: $("#instructionNumber"),
  instructionTitle: $("#instructionTitle"),
  instructionText: $("#instructionText"),
  startModal: $("#startModal"),
  resultModal: $("#resultModal"),
  homeModal: $("#homeModal"),
  rankingModal: $("#rankingModal"),
  rankingButton: $("#rankingButton"),
  closeRankingButton: $("#closeRankingButton"),
  rankingTabs: $("#rankingTabs"),
  rankingList: $("#rankingList"),
  resultRankingList: $("#resultRankingList"),
  playerName: $("#playerName"),
  saveScoreButton: $("#saveScoreButton"),
  scoreRegisterMessage: $("#scoreRegisterMessage"),
  actionModal: $("#actionModal"),
  actionCard: $("#actionCard"),
  actionKicker: $("#actionKicker"),
  actionTitle: $("#actionTitle"),
  actionInstruction: $("#actionInstruction"),
  actionFeedback: $("#actionFeedback"),
  actionButton: $("#actionButton"),
  actionCheckButton: $("#actionCheckButton"),
  actionTapCount: $("#actionTapCount"),
  actionTapGoal: $("#actionTapGoal"),
  actionCountLabel: $("#actionCountLabel"),
  tapScene: $("#tapScene"),
  pixelSaw: $("#pixelSaw"),
  sceneHammer: $("#sceneHammer"),
  sceneDriver: $("#sceneDriver"),
  cutMark: $("#cutMark"),
  sceneNail: $("#sceneNail"),
  sceneDent: $("#sceneDent"),
  sceneScrew: $("#sceneScrew"),
  sceneScrewHead: $("#sceneScrewHead"),
  sceneCrack: $("#sceneCrack"),
  guideModal: $("#guideModal"),
  guideButton: $("#guideButton"),
  printGuideButton: $("#printGuideButton"),
  closeGuideButton: $("#closeGuideButton"),
  guideStage: $("#guideStage"),
  guideTitle: $("#guideTitle"),
  guideDimensions: $("#guideDimensions"),
  guideStageArt: $("#guideStageArt"),
  guideMaterials: $("#guideMaterials"),
  guideTools: $("#guideTools"),
  guideSteps: $("#guideSteps"),
  guideSafety: $("#guideSafety"),
  startButton: $("#startButton"),
  retryButton: $("#retryButton"),
  nextButton: $("#nextButton"),
  homeButton: $("#homeButton"),
  manualHomeButton: $("#manualHomeButton"),
  brandHome: $("#brandHome"),
  stageSelect: $("#stageSelect"),
  partsGrid: $("#partsGrid"),
  furnitureArt: $("#furnitureArt"),
  furnitureSprite: $("#furnitureSprite"),
  furnitureName: $("#furnitureName"),
  furnitureTitle: $("#furnitureTitle"),
  assemblyLabel: $("#assemblyLabel"),
  manualFurnitureName: $("#manualFurnitureName"),
  manualStageLabel: $("#manualStageLabel"),
  manualStageArt: $("#manualStageArt"),
  manualArtCaption: $("#manualArtCaption"),
  manualNumber: $(".manual-file-icon span"),
  resultLabel: $(".result-label"),
  resultTitle: $("#resultTitle"),
  tracks: $$("#stepTrack span"),
  blueprint: $("#blueprint"),
  completedStamp: $("#completedStamp"),
  penaltyToast: $("#penaltyToast"),
  comboPopup: $("#comboPopup"),
  difficultyLabel: $("#difficultyLabel"),
  soundToggle: $("#soundToggle"),
  manualConfirm: $("#manualConfirm"),
  manualStepCount: $("#manualStepCount"),
  manualConfirmText: $("#manualConfirmText"),
  manualSteps: $("#manualSteps")
};

let currentStageIndex = 0;
let stepIndex = 0;
let misses = 0;
let startedAt = 0;
let finishedAt = 0;
let timerFrame = null;
let playing = false;
let soundEnabled = true;
let audioContext = null;
let noiseBuffer = null;
let bgmTimer = null;
let bgmStep = 0;
let toastTimer = null;
let pendingPartButton = null;
let actionMode = null;
let actionTapCount = 0;
let actionResetTimer = null;
let actionSource = "assembly";
let prepIndex = 0;
let currentPrepTask = null;
let cutPieces = 0;
let cutStrokes = 0;
let cutPointerId = null;
let cutLastX = 0;
let cutTravel = 0;
let pendingScore = null;
let rankingStageIndex = 0;
let combo = 0;
let bestCombo = 0;

const actionConfig = {
  cut: {
    kicker: "PROCESS / CUT",
    title: "寸法どおりに切る",
    instruction: "ノコギリを何度も動かして、材料を最後まで切断しよう。",
    button: "材料の上をスワイプ",
    ready: "材料の上を左右に大きくスワイプしよう"
  },
  hammer: {
    required: 4,
    kicker: "PROCESS / HAMMER",
    title: "金づちで固定する",
    instruction: "金づちで叩き、釘の頭が木材と同じ高さになったら止めよう。",
    button: "金づちで叩く",
    ready: "釘の高さをよく見よう"
  },
  screw: {
    required: 6,
    kicker: "PROCESS / TIGHTEN",
    title: "ネジを締める",
    instruction: "ドライバーを回し、ネジの頭が木材と同じ高さになったら止めよう。",
    button: "ドライバーを回す",
    ready: "ネジの沈み具合をよく見よう"
  }
};

const currentStage = () => stages[currentStageIndex];
const currentSteps = () => currentStage().steps;
const partButtons = () => $$(".part-card");
const assemblyParts = () => $$(".assembly-part");

function getPart(partId) {
  return currentStage().parts.find((part) => part.id === partId);
}

function formatTime(milliseconds) {
  const safeTime = Math.max(0, milliseconds);
  const minutes = Math.floor(safeTime / 60000);
  const seconds = Math.floor((safeTime % 60000) / 1000);
  const hundredths = Math.floor((safeTime % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

function getElapsed() {
  const end = finishedAt || performance.now();
  return end - startedAt;
}

function getTotal() {
  return getElapsed() + misses * penaltyMs;
}

function updateTimer() {
  elements.timer.textContent = formatTime(getTotal());
  if (playing) timerFrame = requestAnimationFrame(updateTimer);
}

function bestKey(stageIndex = currentStageIndex) {
  return `tsukurun-best-${stages[stageIndex].id}`;
}

function getBestTime(stageIndex = currentStageIndex) {
  const stored = Number(store.get(bestKey(stageIndex)));
  if (stored > 0) return stored;
  if (stageIndex === 0) {
    const legacyBest = Number(store.get("tsukurun-best"));
    return legacyBest > 0 ? legacyBest : null;
  }
  return null;
}

function updateBestDisplay() {
  const best = getBestTime();
  elements.bestTime.textContent = best ? formatTime(best) : "--:--.--";
}

function rankingKey(stageIndex = currentStageIndex) {
  return `tsukurun-ranking-${stages[stageIndex].id}`;
}

function getRanking(stageIndex = currentStageIndex) {
  try {
    const records = JSON.parse(store.get(rankingKey(stageIndex)) || "[]");
    if (!Array.isArray(records)) return [];
    return records
      .filter((record) => record && typeof record.name === "string" && Number.isFinite(record.time))
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
  } catch {
    return [];
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function rankingRows(records, limit = 10) {
  if (!records.length) return '<li class="ranking-empty">まだ記録がありません<br>最初の職人になろう</li>';
  return records.slice(0, limit).map((record, index) => `<li>
    <span class="ranking-position">${String(index + 1).padStart(2, "0")}</span>
    <span>${escapeHtml(record.name)}</span>
    <strong class="ranking-time">${formatTime(record.time)}</strong>
    <span class="ranking-misses">MISS ${record.misses}</span>
  </li>`).join("");
}

function renderResultRanking() {
  elements.resultRankingList.innerHTML = rankingRows(getRanking(), 3);
}

function renderRanking(stageIndex = rankingStageIndex) {
  rankingStageIndex = stageIndex;
  elements.rankingTabs.innerHTML = stages.map((stage, index) => `<button class="ranking-tab${index === rankingStageIndex ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === rankingStageIndex}" data-ranking-stage="${index}">${stage.name}</button>`).join("");
  elements.rankingList.innerHTML = rankingRows(getRanking(rankingStageIndex));
  $$(".ranking-tab").forEach((button) => button.addEventListener("click", () => renderRanking(Number(button.dataset.rankingStage))));
}

function openRanking() {
  rankingStageIndex = currentStageIndex;
  renderRanking();
  elements.homeModal.classList.remove("is-open");
  elements.homeModal.setAttribute("aria-hidden", "true");
  elements.rankingModal.classList.add("is-open");
  elements.rankingModal.setAttribute("aria-hidden", "false");
  elements.closeRankingButton.focus();
}

function closeRanking() {
  elements.rankingModal.classList.remove("is-open");
  elements.rankingModal.setAttribute("aria-hidden", "true");
  renderHome();
  elements.homeModal.classList.add("is-open");
  elements.homeModal.setAttribute("aria-hidden", "false");
  elements.rankingButton.focus();
}

function saveScore() {
  if (!pendingScore) return;
  const name = elements.playerName.value.trim().slice(0, 8) || "PLAYER";
  const records = getRanking();
  records.push({ name, time: pendingScore.time, misses: pendingScore.misses, savedAt: Date.now() });
  records.sort((a, b) => a.time - b.time);
  store.set(rankingKey(), JSON.stringify(records.slice(0, 10)));
  store.set("tsukurun-player-name", name);
  pendingScore = null;
  elements.playerName.value = name;
  elements.playerName.disabled = true;
  elements.saveScoreButton.disabled = true;
  elements.scoreRegisterMessage.textContent = "ランキングに登録しました！";
  renderResultRanking();
  playTone("complete");
}

function iconMarkup(part) {
  const inner = part.icon === "bolts" ? "<i></i><i></i><i></i><i></i>" : "<i></i>";
  return `<span class="part-icon icon-${part.icon}">${inner}</span>`;
}

function renderStage() {
  const stage = currentStage();
  const stageNumber = String(currentStageIndex + 1).padStart(2, "0");
  const totalStages = String(stages.length).padStart(2, "0");
  const ground = '<g class="ground-guide" aria-hidden="true"><path d="M104 376h392v8H104zM144 360h312v8H144zM168 392h264v8H168z"/><path d="M296 56h8v344M64 216h472v8"/></g>';

  elements.furnitureName.textContent = stage.name;
  elements.furnitureTitle.textContent = `組み立て中の${stage.name}`;
  if (elements.difficultyLabel) elements.difficultyLabel.textContent = stage.difficulty;
  elements.assemblyLabel.textContent = `ASSEMBLY ${stageNumber} / ${totalStages}`;
  elements.manualFurnitureName.textContent = stage.name;
  elements.manualStageLabel.textContent = `ASSEMBLY MANUAL ${stageNumber} / ${totalStages}`;
  elements.manualNumber.textContent = stageNumber;
  if (elements.furnitureSprite) {
    elements.furnitureSprite.src = stage.assets?.sprite || "";
  }
  if (elements.manualStageArt) {
    elements.manualStageArt.src = stage.assets?.diagram || stage.assets?.sprite || "";
    elements.manualStageArt.alt = `${stage.name}の部品展開図ドット絵`;
  }
  if (elements.manualArtCaption) {
    elements.manualArtCaption.textContent = `${stage.name}の部品展開図を見て、使うパーツの形を覚えよう。`;
  }
  elements.furnitureArt.innerHTML = ground + stage.parts.map((part) => `<g class="assembly-part" data-part="${part.id}">${part.art}</g>`).join("");
  elements.partsGrid.innerHTML = stage.tray.map((partId, index) => {
    const part = getPart(partId);
    return `<button class="part-card" type="button" data-part="${part.id}" disabled>
      <span class="part-key">${index + 1}</span>${iconMarkup(part)}
      <span class="part-name">${part.name}</span><span class="part-code">${part.code}</span>
    </button>`;
  }).join("");

  partButtons().forEach((button) => button.addEventListener("click", () => selectPart(button)));
}

function renderHome() {
  elements.stageSelect.innerHTML = stages.map((stage, index) => {
    const best = getBestTime(index);
    const sprite = stage.assets?.sprite;
    const stageArt = sprite
      ? `<span class="stage-select-art has-sprite art-${stage.id}" aria-hidden="true"><img src="${sprite}" alt=""></span>`
      : `<span class="stage-select-art art-${stage.id}" aria-hidden="true"><i></i></span>`;
    return `<button class="stage-select-button" type="button" data-stage-index="${index}">
      <span class="stage-select-number">STAGE ${String(index + 1).padStart(2, "0")}</span>
      ${stageArt}
      <span><strong>${stage.name}</strong><span class="stage-select-meta"><span>${stage.difficulty}</span><b>${best ? formatTime(best) : "NO RECORD"}</b></span></span>
    </button>`;
  }).join("");

  $$(".stage-select-button").forEach((button) => {
    button.addEventListener("click", () => prepareStage(Number(button.dataset.stageIndex)));
  });
}

function renderManual() {
  const prep = currentStage().prep || [];
  const totalSteps = prep.length + currentSteps().length;
  elements.manualStepCount.textContent = totalSteps;
  elements.manualConfirmText.textContent = `全${totalSteps}工程を確認しました`;
  const prepMarkup = prep.map((task, index) => {
    const arrow = index < totalSteps - 1 ? '<span class="manual-arrow" aria-hidden="true">&gt;</span>' : "";
    return `<div class="manual-step manual-prep-step">
      <span class="manual-step-number">PREP ${String(index + 1).padStart(2, "0")}</span>
      <span class="manual-prep-icon" aria-hidden="true"><i></i></span>
      <div class="manual-step-copy"><strong>${task.title}</strong><small>${task.length} mm × ${task.pieces}本</small><span class="manual-action-badge">SWIPE SAW</span></div>
      ${arrow}
    </div>`;
  }).join("");
  const assemblyMarkup = currentSteps().map((step, index) => {
    const part = getPart(step.part);
    const globalIndex = prep.length + index;
    const arrow = globalIndex < totalSteps - 1 ? '<span class="manual-arrow" aria-hidden="true">&gt;</span>' : "";
    const actionBadge = step.action ? `<span class="manual-action-badge">${actionConfig[step.action].kicker.replace("PROCESS / ", "")}</span>` : "";
    return `<div class="manual-step">
      <span class="manual-step-number">STEP ${String(index + 1).padStart(2, "0")}</span>
      ${iconMarkup(part)}
      <div class="manual-step-copy"><strong>${step.title}</strong><small>${part.name}を使う</small>${actionBadge}</div>
      ${arrow}
    </div>`;
  }).join("");
  elements.manualSteps.innerHTML = prepMarkup + assemblyMarkup;
}

function updateInstruction() {
  const step = currentSteps()[stepIndex];
  if (!step) return;
  elements.instructionNumber.textContent = String(stepIndex + 1).padStart(2, "0");
  elements.instructionTitle.textContent = step.title;
  elements.instructionText.textContent = step.text;
  elements.currentStep.textContent = stepIndex;
  elements.stepTotalLabel.textContent = `/ ${currentSteps().length}`;

  elements.tracks.forEach((track, index) => {
    track.classList.toggle("is-done", index < stepIndex);
    track.classList.toggle("is-current", index === stepIndex);
  });
}

function ensureAudio() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
  if (!noiseBuffer) {
    noiseBuffer = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * .25), audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  }
  return audioContext;
}

function playNoise({ duration = .08, frequency = 1200, gainValue = .05, type = "bandpass", q = 1 }) {
  if (!soundEnabled) return;
  const context = ensureAudio();
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const now = context.currentTime;
  source.buffer = noiseBuffer;
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = q;
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(.001, now + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(now);
  source.stop(now + duration);
}

function playOscillator({ frequency, endFrequency = frequency, duration = .1, gainValue = .04, type = "sine", delay = 0 }) {
  if (!soundEnabled) return;
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(.001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playTone(type) {
  if (!soundEnabled) return;
  if (type === "correct") {
    playOscillator({ frequency: 420 + stepIndex * 35, endFrequency: 650 + stepIndex * 35, duration: .12, gainValue: .055, type: "triangle" });
  } else if (type === "wrong") {
    playOscillator({ frequency: 150, endFrequency: 82, duration: .18, gainValue: .06, type: "square" });
  } else {
    [330, 495, 660].forEach((frequency, index) => playOscillator({ frequency, endFrequency: frequency * 1.03, duration: .28, gainValue: .045, type: "triangle", delay: index * .07 }));
  }
}

function playToolSound(tool) {
  if (!soundEnabled) return;
  if (tool === "cut") {
    playNoise({ duration: .105, frequency: 2300, gainValue: .065, type: "bandpass", q: 1.8 });
    playOscillator({ frequency: 190, endFrequency: 135, duration: .07, gainValue: .018, type: "sawtooth" });
  } else if (tool === "hammer") {
    playNoise({ duration: .055, frequency: 850, gainValue: .11, type: "highpass", q: .6 });
    playOscillator({ frequency: 118, endFrequency: 72, duration: .12, gainValue: .095, type: "sine" });
    playOscillator({ frequency: 1280, endFrequency: 760, duration: .09, gainValue: .025, type: "triangle" });
  } else if (tool === "screw") {
    playNoise({ duration: .075, frequency: 1100, gainValue: .035, type: "bandpass", q: 2.2 });
    playOscillator({ frequency: 145, endFrequency: 105, duration: .09, gainValue: .045, type: "sawtooth" });
  }
}

function playBgmStep() {
  if (!soundEnabled || !playing) return;
  const bassNotes = [110, 110, 146.83, 110, 164.81, 146.83, 123.47, 98];
  const note = bassNotes[bgmStep % bassNotes.length];
  playOscillator({ frequency: note, endFrequency: note, duration: .24, gainValue: .013, type: "triangle" });
  if (bgmStep % 2 === 0) playOscillator({ frequency: note * 2, endFrequency: note * 2, duration: .09, gainValue: .006, type: "square" });
  if (bgmStep % 4 === 0) playNoise({ duration: .035, frequency: 180, gainValue: .012, type: "lowpass" });
  bgmStep += 1;
}

function startBgm() {
  if (!soundEnabled || bgmTimer) return;
  bgmStep = 0;
  playBgmStep();
  bgmTimer = setInterval(playBgmStep, 310);
}

function stopBgm() {
  clearInterval(bgmTimer);
  bgmTimer = null;
}

function showPenalty() {
  clearTimeout(toastTimer);
  elements.penaltyToast.classList.add("is-visible");
  toastTimer = setTimeout(() => elements.penaltyToast.classList.remove("is-visible"), 1100);
}

function addMiss(label = "違うパーツです") {
  misses += 1;
  combo = 0;
  elements.missCount.textContent = misses;
  elements.penaltyToast.innerHTML = `${label} <strong>+3秒</strong>`;
  showPenalty();
  playTone("wrong");
}

function spawnParticles(originEl, count = 14, palette = sparkPalette) {
  if (reducedMotion.matches || !originEl) return;
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "fx-particle";
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.5;
    const distance = 36 + Math.random() * 64;
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.left = `${cx}px`;
    particle.style.top = `${cy}px`;
    particle.style.background = palette[index % palette.length];
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 720);
  }
}

function spawnConfetti(count = 64) {
  if (reducedMotion.matches) return;
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "fx-confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = sparkPalette[index % sparkPalette.length];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
    piece.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3400);
  }
}

function showCombo(count) {
  if (!elements.comboPopup) return;
  elements.comboPopup.textContent = `COMBO ×${count}`;
  elements.comboPopup.classList.remove("is-pop");
  void elements.comboPopup.offsetWidth;
  elements.comboPopup.classList.add("is-pop");
  playOscillator({ frequency: 520 + Math.min(count, 8) * 40, endFrequency: 880, duration: .14, gainValue: .045, type: "square" });
}

function syncSoundToggle() {
  elements.soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  elements.soundToggle.setAttribute("aria-label", `効果音を${soundEnabled ? "オフ" : "オン"}にする`);
  elements.soundToggle.innerHTML = `<span aria-hidden="true">${soundEnabled ? "♪" : "×"}</span> SOUND ${soundEnabled ? "ON" : "OFF"}`;
}

function updateTapScene() {
  const config = actionConfig[actionMode];
  if (actionMode === "cut") {
    const strokeProgress = currentPrepTask ? Math.min(cutStrokes / currentPrepTask.strokes, 1) : 0;
    elements.actionTapCount.textContent = cutPieces;
    elements.actionTapGoal.textContent = currentPrepTask ? `/ ${currentPrepTask.pieces} 本` : "本";
    elements.actionCountLabel.textContent = "CUT PIECES";
    elements.cutMark.style.height = `${strokeProgress * 40}px`;
    return;
  }
  const progress = Math.min(actionTapCount / config.required, 1);
  const overflow = Math.max(0, actionTapCount - config.required);
  elements.actionTapCount.textContent = actionTapCount;
  elements.actionTapGoal.textContent = "回";
  elements.actionCountLabel.textContent = "TAP COUNT";
  // Full progress drives the fastener flush; the tool tracks it so contact stays aligned.
  const sink = progress * 54;
  elements.sceneNail.style.transform = `translate(-50%, ${sink}px)`;
  elements.sceneDent.style.transform = `translateX(-50%) scale(${Math.min(overflow, 3)})`;
  elements.sceneScrew.style.transform = `translate(-50%, ${sink}px)`;
  elements.sceneScrewHead.style.transform = `rotate(${actionTapCount * 90}deg)`;
  elements.sceneCrack.style.opacity = overflow > 0 ? "1" : "0";
  elements.sceneHammer.style.transform = `translate(-50%, ${sink}px)`;
  elements.sceneDriver.style.transform = `translate(-50%, ${sink}px)`;
}

function resetTapAction() {
  clearTimeout(actionResetTimer);
  actionTapCount = 0;
  cutPieces = 0;
  cutStrokes = 0;
  cutTravel = 0;
  elements.actionButton.disabled = false;
  elements.actionCheckButton.disabled = false;
  elements.actionButton.classList.remove("is-tapping");
  elements.actionFeedback.textContent = actionConfig[actionMode].ready;
  elements.actionFeedback.className = "action-feedback";
  updateTapScene();
}

function startAction(step, button, source = "assembly") {
  const config = actionConfig[step.action];
  pendingPartButton = button;
  actionMode = step.action;
  actionSource = source;
  actionTapCount = 0;
  cutPieces = 0;
  cutStrokes = 0;
  cutTravel = 0;
  clearTimeout(actionResetTimer);
  elements.actionCard.dataset.action = actionMode;
  elements.actionKicker.textContent = config.kicker;
  elements.actionTitle.textContent = actionMode === "cut" && currentPrepTask ? `${currentPrepTask.title}：${currentPrepTask.pieces}本` : config.title;
  elements.actionInstruction.textContent = actionMode === "cut" && currentPrepTask ? `${currentPrepTask.material}を ${currentPrepTask.length} mm で切断。材料の上を左右にスワイプします。` : config.instruction;
  elements.actionButton.querySelector("span").textContent = config.button;
  elements.actionButton.disabled = false;
  elements.actionButton.hidden = actionMode === "cut";
  elements.actionCheckButton.hidden = false;
  elements.actionCheckButton.textContent = actionMode === "cut" ? "切った本数を確定" : "仕上がりを確認";
  elements.actionCheckButton.disabled = false;
  elements.actionFeedback.textContent = actionMode === "cut" ? "材料を横に大きくスワイプしよう" : config.ready;
  elements.actionFeedback.className = "action-feedback";
  elements.pixelSaw.style.left = "50%";
  updateTapScene();
  elements.actionModal.classList.add("is-open");
  elements.actionModal.setAttribute("aria-hidden", "false");
  if (actionMode === "cut") elements.tapScene.focus();
  else elements.actionButton.focus();
}

function failAction(message) {
  addMiss("加工ミス");
  elements.actionButton.disabled = true;
  elements.actionCheckButton.disabled = true;
  elements.actionFeedback.textContent = `${message} +3秒`;
  elements.actionFeedback.className = "action-feedback is-error";
  actionResetTimer = setTimeout(resetTapAction, 850);
}

function completeAction() {
  elements.actionButton.disabled = true;
  elements.actionCheckButton.disabled = true;
  elements.actionFeedback.textContent = actionSource === "prep" ? "必要な材料が揃いました！" : "成功！ パーツを取り付けます";
  elements.actionFeedback.className = "action-feedback is-success";
  playTone("correct");
  setTimeout(() => {
    elements.actionModal.classList.remove("is-open");
    elements.actionModal.setAttribute("aria-hidden", "true");
    const completedSource = actionSource;
    actionMode = null;
    if (completedSource === "prep") {
      prepIndex += 1;
      if (prepIndex < currentStage().prep.length) setTimeout(startPrepAction, 260);
      else setTimeout(beginAssembly, 260);
    } else {
      installPart(pendingPartButton);
      pendingPartButton = null;
    }
  }, 420);
}

function tapTool() {
  if (!actionMode || actionMode === "cut" || elements.actionButton.disabled) return;
  const config = actionConfig[actionMode];
  actionTapCount += 1;
  playToolSound(actionMode);
  elements.actionButton.classList.remove("is-tapping");
  elements.actionCard.classList.remove("is-tool-tapping");
  void elements.actionButton.offsetWidth;
  elements.actionButton.classList.add("is-tapping");
  elements.actionCard.classList.add("is-tool-tapping");
  updateTapScene();

  if (actionTapCount < config.required) {
    elements.actionFeedback.textContent = actionMode === "hammer" ? "釘がまだ出ています" : "ネジがまだ浮いています";
  } else if (actionTapCount === config.required) {
    elements.actionFeedback.textContent = "見た目を確認して止めよう";
    elements.actionFeedback.className = "action-feedback is-success";
  } else {
    elements.actionFeedback.textContent = actionMode === "hammer" ? "木材がへこんでいる…" : "締めすぎて木材にひびが…";
    elements.actionFeedback.className = "action-feedback is-error";
  }
}

function checkTapFinish() {
  if (!actionMode) return;
  if (actionMode === "cut") {
    const required = currentPrepTask.pieces;
    if (cutPieces < required) {
      failAction(`${currentPrepTask.material}が${required - cutPieces}本足りません`);
    } else if (cutPieces > required) {
      failAction(`${currentPrepTask.material}を${cutPieces - required}本多く切りました`);
    } else {
      completeAction();
    }
    return;
  }
  const required = actionConfig[actionMode].required;
  if (actionTapCount < required) {
    failAction(actionMode === "hammer" ? "釘が出たままです" : "ネジが浮いています");
  } else if (actionTapCount > required) {
    failAction(actionMode === "hammer" ? "叩きすぎて木材がへこみました" : "締めすぎて木材が割れました");
  } else {
    completeAction();
  }
}

function registerCutStroke() {
  if (actionMode !== "cut" || !currentPrepTask) return;
  cutStrokes += 1;
  playToolSound("cut");
  elements.actionCard.classList.remove("is-tool-tapping");
  void elements.actionCard.offsetWidth;
  elements.actionCard.classList.add("is-tool-tapping");
  if (cutStrokes >= currentPrepTask.strokes) {
    cutPieces += 1;
    cutStrokes = 0;
    elements.actionFeedback.textContent = `${currentPrepTask.material}を${cutPieces}本切断しました`;
    elements.actionFeedback.className = cutPieces === currentPrepTask.pieces ? "action-feedback is-success" : "action-feedback";
  } else {
    elements.actionFeedback.textContent = `切断中… あと${currentPrepTask.strokes - cutStrokes}ストローク`;
  }
  updateTapScene();
}

function moveSawWithPointer(event) {
  if (actionMode !== "cut" || cutPointerId !== event.pointerId) return;
  const bounds = elements.tapScene.getBoundingClientRect();
  const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
  // 往復で切れるよう、向きに関係なく移動距離（絶対値）で加算する。
  cutTravel += Math.abs(event.clientX - cutLastX);
  cutLastX = event.clientX;
  elements.pixelSaw.style.left = `${12 + (x / bounds.width) * 76}%`;
  const strokeDistance = Math.max(64, bounds.width * .32);
  let guard = 0;
  while (cutTravel >= strokeDistance && guard < 3) {
    cutTravel -= strokeDistance;
    guard += 1;
    registerCutStroke();
  }
  if (cutTravel > strokeDistance) cutTravel = strokeDistance;
}

function startPrepAction() {
  currentPrepTask = currentStage().prep[prepIndex];
  elements.currentStep.textContent = `P${prepIndex + 1}`;
  elements.stepTotalLabel.textContent = `/ ${currentStage().prep.length} PREP`;
  elements.instructionNumber.textContent = `P${String(prepIndex + 1).padStart(2, "0")}`;
  elements.instructionTitle.textContent = currentPrepTask.title;
  elements.instructionText.textContent = `${currentPrepTask.material}を${currentPrepTask.length} mmで${currentPrepTask.pieces}本用意します。`;
  elements.tracks.forEach((track) => track.classList.remove("is-done", "is-current"));
  startAction({ action: "cut" }, null, "prep");
}

function beginAssembly() {
  currentPrepTask = null;
  actionSource = "assembly";
  elements.stepTotalLabel.textContent = `/ ${currentSteps().length}`;
  partButtons().forEach((button) => { button.disabled = false; });
  updateInstruction();
}

function installPart(button) {
  const selectedPart = button.dataset.part;
  button.classList.add("is-used");
  const installedArt = document.querySelector(`.assembly-part[data-part="${selectedPart}"]`);
  installedArt.classList.add("is-visible");
  stepIndex += 1;
  combo += 1;
  if (combo > bestCombo) bestCombo = combo;
  elements.currentStep.textContent = stepIndex;
  elements.tracks.forEach((track, index) => {
    track.classList.toggle("is-done", index < stepIndex);
    track.classList.remove("is-current");
  });
  spawnParticles(installedArt, 12);
  if (combo >= 2) showCombo(combo);
  playTone(stepIndex === currentSteps().length ? "complete" : "correct");

  if (stepIndex === currentSteps().length) finishGame();
  else updateInstruction();
}

function selectPart(button) {
  if (!playing || actionMode || button.classList.contains("is-used")) return;
  const expectedPart = currentSteps()[stepIndex].part;
  const selectedPart = button.dataset.part;

  if (selectedPart !== expectedPart) {
    addMiss("違うパーツです");
    button.classList.remove("is-wrong");
    void button.offsetWidth;
    button.classList.add("is-wrong");
    elements.blueprint.classList.remove("is-shaking");
    void elements.blueprint.offsetWidth;
    elements.blueprint.classList.add("is-shaking");
    return;
  }

  const step = currentSteps()[stepIndex];
  if (step.action) startAction(step, button);
  else installPart(button);
}

function getRank(total) {
  const threshold = rankTable[currentStage().id] || { s: 12000, a: 18000, b: 26000 };
  if (total < threshold.s) return { letter: "S", message: "迷いのない手つき。マイスター級です。" };
  if (total < threshold.a) return { letter: "A", message: "いい手際です。現場でも頼られる速さ。" };
  if (total < threshold.b) return { letter: "B", message: "しっかり完成。次は手順を先読みしよう。" };
  return { letter: "C", message: "完成が第一歩。もう一度ならもっと速い。" };
}

function renderGuide() {
  const stage = currentStage();
  const guide = stage.guide;
  elements.guideStage.textContent = `STAGE ${String(currentStageIndex + 1).padStart(2, "0")} CLEAR REWARD`;
  elements.guideTitle.textContent = `${stage.name} 制作手順書`;
  elements.guideDimensions.textContent = guide.dimensions;
  if (elements.guideStageArt) {
    elements.guideStageArt.src = stage.assets?.diagram || stage.assets?.sprite || "";
    elements.guideStageArt.alt = `${stage.name}の部品展開図ドット絵`;
  }
  elements.guideMaterials.innerHTML = guide.materials.map((item) => `<li>${item}</li>`).join("");
  elements.guideTools.innerHTML = guide.tools.map((item) => `<li>${item}</li>`).join("");
  const prepGuide = stage.prep.map((task) => `<li><strong>${task.title}</strong>${task.material}を${task.length} mmで${task.pieces}本切り出す。</li>`).join("");
  const assemblyGuide = stage.steps.map((step) => `<li><strong>${step.title}</strong>${step.text}</li>`).join("");
  elements.guideSteps.innerHTML = prepGuide + assemblyGuide;
  elements.guideSafety.textContent = guide.safety;
}

function openGuide() {
  renderGuide();
  elements.resultModal.classList.remove("is-open");
  elements.resultModal.setAttribute("aria-hidden", "true");
  elements.guideModal.classList.add("is-open");
  elements.guideModal.setAttribute("aria-hidden", "false");
  elements.printGuideButton.focus();
}

function closeGuide() {
  elements.guideModal.classList.remove("is-open");
  elements.guideModal.setAttribute("aria-hidden", "true");
  elements.resultModal.classList.add("is-open");
  elements.resultModal.setAttribute("aria-hidden", "false");
  elements.guideButton.focus();
}

function finishGame() {
  playing = false;
  stopBgm();
  finishedAt = performance.now();
  cancelAnimationFrame(timerFrame);
  updateTimer();
  elements.completedStamp.classList.add("is-visible");
  elements.blueprint.classList.add("is-complete");
  elements.instructionNumber.textContent = "OK";
  elements.instructionTitle.textContent = "組み立て完了";
  elements.instructionText.textContent = "すべてのパーツが正しい手順で取り付けられました。";
  partButtons().forEach((button) => { button.disabled = true; });

  const raw = getElapsed();
  const total = getTotal();
  const best = getBestTime();
  const isRecord = !best || total < best;
  if (isRecord) store.set(bestKey(), String(total));

  const rank = getRank(total);
  const isLastStage = currentStageIndex === stages.length - 1;
  const comboNote = misses === 0 ? " ノーミス達成！" : bestCombo >= 3 ? ` 最大${bestCombo}連続！` : "";
  $("#rankLetter").textContent = rank.letter;
  $("#resultMessage").textContent = rank.message + comboNote;
  $("#finalTime").textContent = formatTime(total);
  $("#rawTime").textContent = formatTime(raw);
  $("#finalMisses").textContent = misses;
  $("#penaltyTime").textContent = `+${(misses * 3).toFixed(2)}`;
  $("#newRecord").hidden = !isRecord;
  pendingScore = { time: total, misses };
  elements.playerName.value = store.get("tsukurun-player-name") || "PLAYER";
  elements.playerName.disabled = false;
  elements.saveScoreButton.disabled = false;
  elements.scoreRegisterMessage.textContent = "8文字まで入力できます";
  renderResultRanking();
  elements.resultLabel.textContent = `STAGE ${String(currentStageIndex + 1).padStart(2, "0")} COMPLETE`;
  elements.resultTitle.textContent = `${currentStage().name} 完成！`;
  elements.nextButton.querySelector("span").textContent = isLastStage ? "全ステージクリア・最初へ" : "次のステージへ";
  updateBestDisplay();

  // imapp(ホスト)へ結果を通知。タイムをポイント化(速いほど高得点)して送る。
  const points = Math.max(0, Math.min(1000000, Math.round(SCORE_CAP - total)));
  postToHost("game_over", {
    stageId: currentStage().id,
    region: null,
    score: points,
    timeMs: Math.round(total),
    rawTimeMs: Math.round(raw),
    misses,
    maxCombo: bestCombo,
    rank: rank.letter,
    difficulty: currentStage().difficulty,
    player: embedConfig.player
  });

  spawnConfetti(rank.letter === "S" ? 96 : 64);
  setTimeout(() => {
    elements.resultModal.classList.add("is-open");
    elements.resultModal.setAttribute("aria-hidden", "false");
    elements.nextButton.focus();
  }, 750);
}

function resetGame() {
  stepIndex = 0;
  prepIndex = 0;
  currentPrepTask = null;
  misses = 0;
  combo = 0;
  bestCombo = 0;
  startedAt = performance.now();
  finishedAt = 0;
  playing = true;
  startBgm();
  elements.timer.textContent = "00:00.00";
  elements.currentStep.textContent = "0";
  elements.missCount.textContent = "0";
  elements.completedStamp.classList.remove("is-visible");
  elements.blueprint.classList.remove("is-shaking", "is-complete");
  assemblyParts().forEach((part) => part.classList.remove("is-visible"));
  partButtons().forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-used", "is-wrong");
  });
  updateTimer();
  postToHost("game_start", {
    stageId: currentStage().id,
    difficulty: currentStage().difficulty,
    player: embedConfig.player
  });
  if (currentStage().prep?.length) setTimeout(startPrepAction, 280);
  else beginAssembly();
}

function resetReadyState() {
  playing = false;
  stopBgm();
  cancelAnimationFrame(timerFrame);
  clearTimeout(actionResetTimer);
  pendingPartButton = null;
  actionMode = null;
  actionSource = "assembly";
  prepIndex = 0;
  currentPrepTask = null;
  cutPointerId = null;
  cutPieces = 0;
  cutStrokes = 0;
  elements.actionModal.classList.remove("is-open");
  elements.actionModal.setAttribute("aria-hidden", "true");
  stepIndex = 0;
  misses = 0;
  elements.timer.textContent = "00:00.00";
  elements.currentStep.textContent = "0";
  elements.stepTotalLabel.textContent = `/ ${currentSteps().length}`;
  elements.missCount.textContent = "0";
  elements.completedStamp.classList.remove("is-visible");
  elements.blueprint.classList.remove("is-shaking", "is-complete");
  elements.instructionNumber.textContent = "00";
  elements.instructionTitle.textContent = "手順書を確認";
  elements.instructionText.textContent = "手順を覚え、準備ができたらスタートしてください。";
  elements.tracks.forEach((track) => track.classList.remove("is-done", "is-current"));
  partButtons().forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-used", "is-wrong");
  });
  assemblyParts().forEach((part) => part.classList.remove("is-visible"));
}

function prepareStage(stageIndexToOpen) {
  elements.homeModal.classList.remove("is-open");
  elements.homeModal.setAttribute("aria-hidden", "true");
  elements.rankingModal.classList.remove("is-open");
  elements.rankingModal.setAttribute("aria-hidden", "true");
  elements.guideModal.classList.remove("is-open");
  elements.guideModal.setAttribute("aria-hidden", "true");
  currentStageIndex = stageIndexToOpen;
  renderStage();
  renderManual();
  updateBestDisplay();
  resetReadyState();
  elements.manualConfirm.checked = false;
  elements.startButton.disabled = true;
  elements.startButton.querySelector("span").textContent = "手順書を確認してください";
  elements.startModal.classList.add("is-open");
  elements.startModal.setAttribute("aria-hidden", "false");
  elements.manualConfirm.focus();
}

function startGame() {
  if (!elements.manualConfirm.checked) return;
  if (soundEnabled) ensureAudio();
  elements.startModal.classList.remove("is-open");
  elements.startModal.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    resetGame();
    partButtons()[0].focus();
  }, 250);
}

function closeResultAndOpen(stageIndexToOpen) {
  elements.resultModal.classList.remove("is-open");
  elements.resultModal.setAttribute("aria-hidden", "true");
  setTimeout(() => prepareStage(stageIndexToOpen), 250);
}

function retryGame() {
  closeResultAndOpen(currentStageIndex);
}

function goToNextStage() {
  closeResultAndOpen((currentStageIndex + 1) % stages.length);
}

function openHome(event) {
  if (event) event.preventDefault();
  playing = false;
  stopBgm();
  cancelAnimationFrame(timerFrame);
  clearTimeout(actionResetTimer);
  actionMode = null;
  elements.startModal.classList.remove("is-open");
  elements.startModal.setAttribute("aria-hidden", "true");
  elements.resultModal.classList.remove("is-open");
  elements.resultModal.setAttribute("aria-hidden", "true");
  elements.actionModal.classList.remove("is-open");
  elements.actionModal.setAttribute("aria-hidden", "true");
  elements.guideModal.classList.remove("is-open");
  elements.guideModal.setAttribute("aria-hidden", "true");
  elements.rankingModal.classList.remove("is-open");
  elements.rankingModal.setAttribute("aria-hidden", "true");
  renderHome();
  elements.homeModal.classList.add("is-open");
  elements.homeModal.setAttribute("aria-hidden", "false");
  setTimeout(() => $(".stage-select-button").focus(), 250);
}

elements.startButton.addEventListener("click", startGame);
elements.retryButton.addEventListener("click", retryGame);
elements.nextButton.addEventListener("click", goToNextStage);
elements.rankingButton.addEventListener("click", openRanking);
elements.closeRankingButton.addEventListener("click", closeRanking);
elements.saveScoreButton.addEventListener("click", saveScore);
elements.playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveScore();
});
elements.guideButton.addEventListener("click", openGuide);
elements.closeGuideButton.addEventListener("click", closeGuide);
elements.printGuideButton.addEventListener("click", () => window.print());
elements.homeButton.addEventListener("click", openHome);
elements.manualHomeButton.addEventListener("click", openHome);
elements.brandHome.addEventListener("click", openHome);
elements.tapScene.addEventListener("pointerdown", (event) => {
  if (actionMode !== "cut") return;
  cutPointerId = event.pointerId;
  cutLastX = event.clientX;
  cutTravel = 0;
  elements.tapScene.setPointerCapture(event.pointerId);
});
elements.tapScene.addEventListener("pointermove", moveSawWithPointer);
elements.tapScene.addEventListener("pointerup", (event) => {
  if (cutPointerId !== event.pointerId) return;
  cutPointerId = null;
  cutTravel = 0;
});
elements.tapScene.addEventListener("pointercancel", () => {
  cutPointerId = null;
  cutTravel = 0;
});
elements.tapScene.addEventListener("keydown", (event) => {
  if (actionMode !== "cut" || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  registerCutStroke();
});
elements.actionButton.addEventListener("click", tapTool);
elements.actionCheckButton.addEventListener("click", checkTapFinish);
elements.manualConfirm.addEventListener("change", () => {
  const isReady = elements.manualConfirm.checked;
  elements.startButton.disabled = !isReady;
  elements.startButton.querySelector("span").textContent = isReady ? "タイムアタック開始" : "手順書を確認してください";
});
elements.soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  store.set("tsukurun-sound", soundEnabled ? "on" : "off");
  syncSoundToggle();
  if (soundEnabled) {
    playTone("correct");
    if (playing) startBgm();
  } else {
    stopBgm();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (elements.rankingModal.classList.contains("is-open")) closeRanking();
    else if (elements.guideModal.classList.contains("is-open")) closeGuide();
    else if (elements.startModal.classList.contains("is-open")) openHome();
    else if (elements.resultModal.classList.contains("is-open")) openHome();
    return;
  }
  if (!playing || actionMode || event.repeat) return;
  const number = Number(event.key);
  const buttons = partButtons();
  if (number >= 1 && number <= buttons.length) selectPart(buttons[number - 1]);
});

soundEnabled = store.get("tsukurun-sound") !== "off";
syncSoundToggle();
renderStage();
renderManual();
resetReadyState();
updateBestDisplay();
renderHome();

// imapp(ホスト)へ読み込み完了を通知。?stage= 指定があれば該当ステージを解決。
function resolveStageIndex(param) {
  if (!param) return 0;
  const byId = stages.findIndex((stage) => stage.id === param);
  if (byId >= 0) return byId;
  const n = Number(param);
  return Number.isInteger(n) && n >= 0 && n < stages.length ? n : 0;
}
postToHost("ready", { stages: stages.map((stage) => ({ id: stage.id, name: stage.name })) });
// autostart=1 の埋め込みではタイトルを飛ばして指定ステージを即開始する。
if (embedConfig.embed && embedConfig.autostart) {
  prepareStage(resolveStageIndex(embedConfig.stageParam));
  elements.manualConfirm.checked = true;
  startGame();
}
