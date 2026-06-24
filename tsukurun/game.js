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
      materials: ["座面板 直径320×18 mm：1枚", "座面クッション材：1枚", "脚材 40×40×440 mm：4本", "足置きリング材：1本", "木工用ビス・木工用接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "金づち・紙やすり", "保護メガネ・防じんマスク"],
      safety: "切断時は材料をクランプで固定し、刃の進行方向へ手を置かないでください。座る家具のため、完成後は接合部の緩みとがたつきを必ず確認してください。"
    },
    prep: [
      { id: "stool-legs", title: "脚材を切り出す", material: "40×40 mm 脚材", length: 440, pieces: 4, strokes: 8 },
      { id: "stool-ring", title: "リング材を切り出す", material: "曲げ木リング材", length: 1100, pieces: 1, strokes: 10 },
      { id: "stool-seat", title: "座面材を切り出す", material: "18 mm 座面材", length: 320, pieces: 1, strokes: 12 }
    ],
    tray: ["seat", "ring", "cushion", "legs"],
    steps: [
      { part: "legs", title: "脚を組む", text: "4本の脚を作業台に立て、向きをそろえます。" },
      { part: "ring", title: "足置きリングを通す", text: "脚の下部に足置きリングをはめ込み、脚を安定させます。", action: "screw" },
      { part: "seat", title: "座面を載せる", text: "脚フレームの上に座面を載せ、四隅の位置を合わせます。", action: "hammer" },
      { part: "cushion", title: "クッションを敷く", text: "座面の上に座面クッションを載せて完成です。" }
    ],
    parts: [
      { id: "legs", name: "脚 ×4", code: "P-01", img: "assets/pixel/parts/work-stool/legs.png" },
      { id: "ring", name: "足置きリング", code: "P-02", img: "assets/pixel/parts/work-stool/ring.png" },
      { id: "seat", name: "座面", code: "P-03", img: "assets/pixel/parts/work-stool/seat.png" },
      { id: "cushion", name: "座面クッション", code: "P-04", img: "assets/pixel/parts/work-stool/cushion.png" }
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
      materials: ["側板 720×240×18 mm：2枚", "天板・底板 564×240×18 mm：各1枚", "棚板 564×230×18 mm：3枚", "背板 ベニヤ 564×690×5.5 mm：1枚", "木工用ビス・ダボ・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "棚は必ず水平な床へ置き、壁面への転倒防止固定を行ってください。切断面のささくれを研磨し、ビス位置には下穴を開けてください。"
    },
    prep: [
      { id: "shelf-sides", title: "側板を切り出す", material: "18 mm 側板", length: 720, pieces: 2, strokes: 11 },
      { id: "shelf-boards-cut", title: "棚板を切り出す", material: "18 mm 棚板", length: 564, pieces: 3, strokes: 9 },
      { id: "shelf-tb", title: "天板・底板を切る", material: "18 mm 天板・底板", length: 564, pieces: 2, strokes: 9 }
    ],
    tray: ["top-board", "side-boards", "back-panel", "bottom-board", "shelf-boards"],
    steps: [
      { part: "side-boards", title: "側板を立てる", text: "左右の側板を平行に立て、ダボ穴を内側に向けます。" },
      { part: "bottom-board", title: "底板をはめる", text: "側板の一番下の溝へ底板を水平に差し込みます。", action: "screw" },
      { part: "shelf-boards", title: "棚板を入れる", text: "ダボ位置に合わせて3枚の棚板を取り付けます。" },
      { part: "top-board", title: "天板を載せる", text: "左右の側板の上へ天板を載せ、端をそろえます。", action: "hammer" },
      { part: "back-panel", title: "背板を固定", text: "背面に背板をはめ、四隅を固定して完成です。" }
    ],
    parts: [
      { id: "side-boards", name: "側板 ×2", code: "S-01", img: "assets/pixel/parts/mini-shelf/side-boards.png" },
      { id: "bottom-board", name: "底板", code: "S-02", img: "assets/pixel/parts/mini-shelf/bottom-board.png" },
      { id: "shelf-boards", name: "棚板 ×3", code: "S-03", img: "assets/pixel/parts/mini-shelf/shelf-boards.png" },
      { id: "top-board", name: "天板", code: "S-04", img: "assets/pixel/parts/mini-shelf/top-board.png" },
      { id: "back-panel", name: "背板", code: "S-05", img: "assets/pixel/parts/mini-shelf/back-panel.png" }
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
      materials: ["後脚・背柱材 40×40×760 mm：2本", "前脚材 40×40×430 mm：2本", "横桟・貫材 30×45 mm：4本", "背もたれ・背板スラット材：一式", "座面板・クッション材：各1枚", "木工用ビス・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり・木工用のみ", "電動ドライバー・下穴ドリル", "金づち・クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "椅子には大きな荷重がかかります。接合強度と材料強度を専門家へ確認し、試し荷重を行うまで人が座らないでください。"
    },
    prep: [
      { id: "chair-back-legs", title: "後脚を切り出す", material: "40×40 mm 後脚材", length: 760, pieces: 2, strokes: 12 },
      { id: "chair-front-legs", title: "前脚を切り出す", material: "40×40 mm 前脚材", length: 430, pieces: 2, strokes: 8 },
      { id: "chair-rails", title: "横桟・貫を切り出す", material: "30×45 mm 横桟・貫材", length: 380, pieces: 4, strokes: 7 },
      { id: "chair-back", title: "背板スラットを切る", material: "背板スラット材", length: 360, pieces: 1, strokes: 9 }
    ],
    tray: ["cushion", "back-legs", "backrest", "rails", "front-legs", "back-slats"],
    steps: [
      { part: "back-legs", title: "後脚を立てる", text: "背の高い後脚2本を作業台に立てます。" },
      { part: "front-legs", title: "前脚を立てる", text: "前脚2本を後脚と平行に立てます。" },
      { part: "rails", title: "横桟・貫でつなぐ", text: "4本の横桟・貫で前後の脚をつなぎ、座枠を作ります。", action: "screw" },
      { part: "backrest", title: "背もたれを付ける", text: "後脚の上部に背もたれフレームを取り付けます。", action: "hammer" },
      { part: "back-slats", title: "背板スラットを入れる", text: "背もたれの中へ背板スラットを差し込みます。" },
      { part: "cushion", title: "クッションを載せる", text: "座枠の上に座面クッションを載せて完成です。" }
    ],
    parts: [
      { id: "back-legs", name: "後脚 ×2", code: "C-01", img: "assets/pixel/parts/cafe-chair/back-legs.png" },
      { id: "front-legs", name: "前脚 ×2", code: "C-02", img: "assets/pixel/parts/cafe-chair/front-legs.png" },
      { id: "rails", name: "横桟・貫 ×4", code: "C-03", img: "assets/pixel/parts/cafe-chair/rails.png" },
      { id: "backrest", name: "背もたれ", code: "C-04", img: "assets/pixel/parts/cafe-chair/backrest.png" },
      { id: "back-slats", name: "背板スラット", code: "C-05", img: "assets/pixel/parts/cafe-chair/back-slats.png" },
      { id: "cushion", name: "座面クッション", code: "C-06", img: "assets/pixel/parts/cafe-chair/cushion.png" }
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
      materials: ["天板 900×450×24 mm：1枚", "脚材 40×40×376 mm：4本", "長辺フレーム 820×80×18 mm：2枚", "短辺フレーム 370×80×18 mm：2枚", "木工用ビス・ダボ・接着剤：適量"],
      tools: ["メジャー・差し金・鉛筆", "のこぎり または 丸のこ", "電動ドライバー・下穴ドリル", "クランプ・紙やすり", "保護メガネ・防じんマスク"],
      safety: "天板が広く重いため、運搬と組み立ては二人以上で行ってください。脚とフレームの接合は下穴を開けてビス留めし、完成後はがたつきと接合部の緩みを必ず確認してください。"
    },
    prep: [
      { id: "table-top", title: "天板を切り出す", material: "24 mm 天板", length: 900, pieces: 1, strokes: 14 },
      { id: "table-legs", title: "脚材を切り出す", material: "40×40 mm 脚材", length: 376, pieces: 4, strokes: 8 },
      { id: "table-frames", title: "フレーム材を切る", material: "18 mm フレーム材", length: 820, pieces: 4, strokes: 9 }
    ],
    tray: ["tabletop", "legs", "short-frames", "long-frames"],
    steps: [
      { part: "legs", title: "脚を立てる", text: "4本の脚を作業台に立て、向きをそろえます。" },
      { part: "long-frames", title: "長辺フレームを渡す", text: "長辺フレーム2本で脚の長い面をつなぎます。", action: "screw" },
      { part: "short-frames", title: "短辺フレームを渡す", text: "短辺フレーム2本で残りの面をつなぎ、箱状に組みます。" },
      { part: "tabletop", title: "天板を載せる", text: "フレームの中央に天板を載せ、四辺の出をそろえて完成です。", action: "hammer" }
    ],
    parts: [
      { id: "legs", name: "脚 ×4", code: "T-01", img: "assets/pixel/parts/low-table/legs.png" },
      { id: "long-frames", name: "長辺フレーム ×2", code: "T-02", img: "assets/pixel/parts/low-table/long-frames.png" },
      { id: "short-frames", name: "短辺フレーム ×2", code: "T-03", img: "assets/pixel/parts/low-table/short-frames.png" },
      { id: "tabletop", name: "天板", code: "T-04", img: "assets/pixel/parts/low-table/tabletop.png" }
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
  // 新しいドット絵パーツ画像を表示。旧 SVG/CSS アイコンから差し替え。
  return `<span class="part-sprite"><img src="${part.img}" alt="" loading="lazy"></span>`;
}

function renderStage() {
  const stage = currentStage();
  const stageNumber = String(currentStageIndex + 1).padStart(2, "0");
  const totalStages = String(stages.length).padStart(2, "0");

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
  // 組立図は完成見本(complete画像)を使う。正しいパーツを選ぶたび濃くなり、
  // 完成で全体がはっきり現れる(位置は furniture-reference にぴったり一致)。
  elements.furnitureArt.innerHTML = "";

  // 手順数がステージで変わるため、進捗トラックを動的に生成して再取得する。
  const stepTrackEl = $("#stepTrack");
  if (stepTrackEl) {
    stepTrackEl.innerHTML = stage.steps.map(() => "<span></span>").join("");
    elements.tracks = $$("#stepTrack span");
  }

  elements.partsGrid.innerHTML = stage.tray.map((partId, index) => {
    const part = getPart(partId);
    return `<button class="part-card" type="button" data-part="${part.id}" disabled>
      <span class="part-key">${index + 1}</span>${iconMarkup(part)}
      <span class="part-name">${part.name}</span><span class="part-code">${part.code}</span>
    </button>`;
  }).join("");

  partButtons().forEach((button) => button.addEventListener("click", () => selectPart(button)));
  updateBuildReveal();
}

// 組立図(完成見本)を進捗(stepIndex / 総手順)に応じて徐々に濃くする。
function updateBuildReveal() {
  const ref = elements.furnitureSprite ? elements.furnitureSprite.closest(".furniture-reference") : null;
  if (!ref) return;
  const total = currentSteps().length || 1;
  const progress = Math.min(stepIndex / total, 1);
  // 0手順=ゴースト(.18) → 完成(.96)。is-complete 時の CSS と一致させる。
  ref.style.opacity = String(0.18 + 0.78 * progress);
}

// 取り付けたパーツ画像を組立図の上で一瞬ポップさせる演出。
function popInstalledPart(part) {
  if (reducedMotion.matches || !part) return;
  const img = document.createElement("img");
  img.className = "bp-pop";
  img.src = part.img;
  img.alt = "";
  elements.blueprint.appendChild(img);
  setTimeout(() => img.remove(), 720);
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
  stepIndex += 1;
  combo += 1;
  if (combo > bestCombo) bestCombo = combo;
  elements.currentStep.textContent = stepIndex;
  elements.tracks.forEach((track, index) => {
    track.classList.toggle("is-done", index < stepIndex);
    track.classList.remove("is-current");
  });
  updateBuildReveal();
  popInstalledPart(getPart(selectedPart));
  spawnParticles(button, 12);
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
  updateBuildReveal();
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
  updateBuildReveal();
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
