#!/usr/bin/env node
// ============================================================
// deploy-game.mjs — ゲーム1タイトルのワンコマンドデプロイ
//
//   node scripts/deploy-game.mjs <game-key> <ビルド成果物dir> [--immutable|--no-cache] [--no-push]
//
// 例:
//   node scripts/deploy-game.mjs kamajan ../kamajan/dist
//
// やること（手作業のデプロイ手順を1コマンド化・事故防止）:
//   1. game-key の形式と成果物 (index.html) を検証
//   2. games-imapp-shop/<game-key>/ を成果物で丸ごと置き換え
//   3. _headers に /<game-key>/assets/* ルールが無ければ追加
//      （assets が内容ハッシュ名のみなら immutable、それ以外は no-cache を自動判定。
//        --immutable / --no-cache で明示指定も可）
//   4. node scripts/check-headers.mjs で 100ルール上限ガード
//   5. git add → commit "deploy: <game-key> vYYYY-MM-DD" → push（--no-push で省略）
// ============================================================
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function die(msg) {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
}
function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const [key, distArg] = args.filter((a) => !a.startsWith("--"));

if (!key || !distArg) {
  console.log("usage: node scripts/deploy-game.mjs <game-key> <dist-dir> [--immutable|--no-cache] [--no-push]");
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(key)) die(`game-key が不正: ${key}（小文字英数とハイフンのみ）`);
if (key === "docs" || key === "scripts") die(`game-key に予約名は使えない: ${key}`);

const dist = path.resolve(distArg);
if (!fs.existsSync(path.join(dist, "index.html"))) die(`成果物に index.html が見つからない: ${dist}`);
if (fs.existsSync(path.join(dist, "node_modules"))) die("成果物に node_modules が混入している。ビルド出力 (dist/) を指定すること");

// ---------- 1. 配信ディレクトリ置き換え ----------
const target = path.join(ROOT, key);
if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(dist, target, { recursive: true });
console.log(`✔ ${key}/ を置き換え (${fs.readdirSync(target).length} entries)`);

// ---------- 2. _headers ルール確保 ----------
const headersPath = path.join(ROOT, "_headers");
let headers = fs.readFileSync(headersPath, "utf8");
const ruleLine = `/${key}/assets/*`;
if (!headers.includes(ruleLine)) {
  // キャッシュ方式の決定: 明示フラグ > 自動判定（assets が全て内容ハッシュ名なら immutable）
  let immutable;
  if (flags.has("--immutable")) immutable = true;
  else if (flags.has("--no-cache")) immutable = false;
  else {
    const assetsDir = path.join(target, "assets");
    const files = fs.existsSync(assetsDir)
      ? fs.readdirSync(assetsDir).filter((f) => fs.statSync(path.join(assetsDir, f)).isFile())
      : [];
    immutable = files.length > 0 && files.every((f) => /[-.][0-9a-fA-F]{8,}\./.test(f));
  }
  const value = immutable
    ? "Cache-Control: public, max-age=31536000, immutable"
    : "Cache-Control: no-cache, must-revalidate";
  headers = headers.trimEnd() + `\n${ruleLine}\n  ${value}\n`;
  fs.writeFileSync(headersPath, headers);
  console.log(`✔ _headers に追加: ${ruleLine} (${immutable ? "immutable" : "no-cache"})`);
} else {
  console.log(`✔ _headers ルールは既存: ${ruleLine}`);
}

// ---------- 3. ルール数ガード ----------
run("node scripts/check-headers.mjs");

// ---------- 4. commit & push ----------
const today = new Date().toISOString().slice(0, 10);
run(`git add "${key}" _headers`);
try {
  execSync(`git diff --cached --quiet`, { cwd: ROOT });
  console.log("✔ 変更なし（コミット不要）");
} catch {
  run(`git commit -m "deploy: ${key} v${today}"`);
  if (flags.has("--no-push")) {
    console.log("✔ コミット完了（--no-push のため push は省略）");
  } else {
    run("git push");
    console.log(`\n✅ ${key} v${today} デプロイ完了（Pages が自動反映）`);
  }
}
