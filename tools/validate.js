// node tools/validate.js
// Catches data mistakes that a syntax check can't see: bad severities, duplicate
// refs, unclosed code fences, unknown {TOKENS}, missing asset files.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

const SEVERITIES = ["critical", "high", "medium", "low", "info"];
const LEVELS = ["working", "pending", "learning"];
const TOKENS = ["YEAR", "NEXT_YEAR", "INTERN_YEAR", "TODAY", "FILEDATE", "MONTH", "NAME", "HANDLE"];

// const declarations aren't properties of globalThis, so re-export them explicitly
let data;
try {
  const src = fs.readFileSync(path.join(ROOT, "assets/js/casefiles.js"), "utf8");
  const ctx = {};
  vm.runInNewContext(
    src + "\n;globalThis.__d={SUBJECT,CREDENTIALS,CAPABILITIES,CASES,FIELD_NOTES};",
    ctx
  );
  data = ctx.__d;
} catch (e) {
  console.error("FATAL: casefiles.js failed to load\n  " + e.message);
  process.exit(1);
}

const { SUBJECT, CREDENTIALS, CAPABILITIES, CASES, FIELD_NOTES } = data;

// walk every string so token and fence checks cover writeups too
const strings = [];
(function walk(v, at) {
  if (typeof v === "string") return strings.push([at, v]);
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${at}[${i}]`));
  if (v && typeof v === "object") return Object.entries(v).forEach(([k, x]) => walk(x, `${at}.${k}`));
})(data, "");

for (const [at, s] of strings) {
  for (const m of s.matchAll(/\{([A-Z_]+)\}/g)) {
    if (!TOKENS.includes(m[1])) err(`unknown token {${m[1]}} at ${at}`);
  }
  const fences = (s.match(/```/g) || []).length;
  if (fences % 2) err(`unclosed code fence at ${at}`);
}

// SUBJECT
["name", "handle", "role", "track", "line", "status"].forEach((k) => {
  if (!SUBJECT[k]) err(`SUBJECT.${k} is empty`);
});
const fileCheck = (rel, label) => {
  if (!rel || rel.startsWith("⟨")) return;
  if (!fs.existsSync(path.join(ROOT, rel))) warn(`${label} points at a missing file: ${rel}`);
};
fileCheck(SUBJECT.photo, "SUBJECT.photo");
fileCheck(SUBJECT.links && SUBJECT.links.resume, "SUBJECT.links.resume");

// CAPABILITIES
CAPABILITIES.forEach((g, gi) => {
  if (!g.group) err(`CAPABILITIES[${gi}] has no group name`);
  (g.items || []).forEach((it, i) => {
    if (!LEVELS.includes(it.level)) {
      err(`bad level "${it.level}" on ${g.group} / ${it.name} (use ${LEVELS.join(" | ")})`);
    }
    if (!it.name) err(`CAPABILITIES[${gi}].items[${i}] has no name`);
  });
});

// CASES
const ids = new Map();
const caseNos = new Map();
const refs = new Map();
CASES.forEach((c, i) => {
  const where = c.id || `CASES[${i}]`;
  ["id", "title", "kind", "blurb"].forEach((k) => {
    if (!c[k]) err(`${where}: missing ${k}`);
  });
  if (ids.has(c.id)) err(`duplicate case id "${c.id}"`);
  ids.set(c.id, true);
  if (c.caseNo) {
    if (caseNos.has(c.caseNo)) err(`duplicate caseNo "${c.caseNo}"`);
    caseNos.set(c.caseNo, true);
  }
  const hasF = Array.isArray(c.findings) && c.findings.length;
  const hasS = Array.isArray(c.sections) && c.sections.length;
  if (!hasF && !hasS) err(`${where}: needs either findings[] or sections[]`);
  if (hasF && hasS) warn(`${where}: has both findings[] and sections[], only findings render`);

  (c.findings || []).forEach((f, fi) => {
    const fw = f.ref || `${where}.findings[${fi}]`;
    ["ref", "title", "severity"].forEach((k) => {
      if (!f[k]) err(`${fw}: missing ${k}`);
    });
    if (f.severity && !SEVERITIES.includes(String(f.severity).toLowerCase())) {
      err(`${fw}: bad severity "${f.severity}" (use ${SEVERITIES.join(" | ")})`);
    }
    if (refs.has(f.ref)) err(`duplicate finding ref "${f.ref}"`);
    refs.set(f.ref, true);
    // claiming credit with an empty status is the one mistake that actually costs an offer
    if (f.credit && c.status && !c.status.credited) {
      warn(`${fw}: has credit text but case status.credited is false`);
    }
  });

  (c.sections || []).forEach((s, si) => {
    if (!s.head) err(`${where}.sections[${si}]: missing head`);
    if (!s.body) err(`${where}.sections[${si}]: missing body`);
  });
});

// assets referenced by index.html
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
[...html.matchAll(/(?:href|src)="(assets\/[^"]+)"/g)].forEach((m) => {
  if (!fs.existsSync(path.join(ROOT, m[1]))) err(`index.html references missing file: ${m[1]}`);
});

// ids the scripts expect to find, minus the ones app.js renders itself
const appjs = fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8");
const generated = new Set([...appjs.matchAll(/id="([a-z-]+)"/g)].map((m) => m[1]));
[...appjs.matchAll(/\$\("#([a-z-]+)"\)/g)].forEach((m) => {
  const id = m[1];
  if (!html.includes(`id="${id}"`) && !generated.has(id)) {
    err(`app.js looks up #${id} but nothing creates it`);
  }
});

const placeholders = (JSON.stringify(data).match(/⟨/g) || []).length;

console.log("");
errors.forEach((e) => console.log("  ERROR  " + e));
warns.forEach((w) => console.log("  WARN   " + w));
if (!errors.length && !warns.length) console.log("  clean");
console.log("");
console.log(`  ${CASES.length} cases, ${refs.size} findings, ${placeholders} placeholders left`);
console.log(`  ${errors.length} error(s), ${warns.length} warning(s)`);
console.log("");
process.exit(errors.length ? 1 : 0);
