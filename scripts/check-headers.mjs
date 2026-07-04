/**
 * check-headers.mjs — _headers の健全性チェック（デプロイ前ガードレール）。
 *
 * Cloudflare Pages は _headers のルールを最大100個までしか読まず、
 * 超過分は「黙って」無視する（113ルールで後方ゲームのルールが消えた実績あり）。
 * 各ゲームの deploy スクリプトから push 前に呼ぶこと:
 *   node scripts/check-headers.mjs   （exit 0 = OK / exit 1 = NG）
 *
 * チェック内容:
 *  1. ルール数（パス行）が上限に対して安全域（90以下）か
 *  2. 行長 2000 文字以内（Pages の行上限）
 *  3. 規約の中核ルール（/:game/index.html 等）が存在するか
 *  4. ヘッダ行がパス行の外に迷子になっていないか（インデント構文の破れ）
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HEADERS_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "_headers");
const RULE_SOFT_LIMIT = 90; // Pages 上限は100。余裕を持って90で止める
const LINE_LIMIT = 2000;

const REQUIRED_RULES = [
  "/*",
  "/:game/index.html",
  "/:game/assets/*",
  "/:game/sw.js",
  "/:game/manifest.webmanifest",
  "/:game/icons/*",
];

const lines = readFileSync(HEADERS_PATH, "utf8").split(/\r?\n/);
const errors = [];

let ruleCount = 0;
let currentRule = null;
const seenRules = new Set();

lines.forEach((line, i) => {
  const no = i + 1;
  if (line.length > LINE_LIMIT) {
    errors.push(`L${no}: 行長 ${line.length} が上限 ${LINE_LIMIT} を超過`);
  }
  const trimmed = line.trim();
  if (trimmed === "" || trimmed.startsWith("#")) return;

  if (/^\S/.test(line) && trimmed.startsWith("/")) {
    // パス行（ルール）
    ruleCount++;
    currentRule = trimmed;
    seenRules.add(trimmed);
  } else if (/^\s+\S/.test(line)) {
    // ヘッダ行
    if (!currentRule) {
      errors.push(`L${no}: パス行に属さないヘッダ行: ${trimmed}`);
    }
    if (!trimmed.startsWith("!") && !trimmed.includes(":")) {
      errors.push(`L${no}: ヘッダ行に ':' がない: ${trimmed}`);
    }
  } else {
    errors.push(`L${no}: 解釈できない行: ${trimmed}`);
  }
});

for (const rule of REQUIRED_RULES) {
  if (!seenRules.has(rule)) {
    errors.push(`規約の中核ルールが見つからない: ${rule}`);
  }
}

if (ruleCount > RULE_SOFT_LIMIT) {
  errors.push(
    `ルール数 ${ruleCount} が安全域 ${RULE_SOFT_LIMIT} を超過（Pages 上限100、超過分は黙って無視される）。` +
      " 例外ルールを規約ルールへ統合するか、_middleware への移行を検討すること。",
  );
}

if (errors.length > 0) {
  console.error(`[check-headers] NG (${errors.length}件):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`[check-headers] OK — ルール数 ${ruleCount}/${RULE_SOFT_LIMIT}（Pages上限100）`);
