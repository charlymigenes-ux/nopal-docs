// Paridad ES/EN (Standard §9 y §18).
// Español es la fuente: informa qué páginas no tienen traducción y cuáles
// tienen un front-matter de traducción incompleto. Por ahora solo avisa;
// pasa a error cuando se cierre la fase F8 (usar --strict).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const strict = process.argv.includes('--strict');
const ES = path.resolve('docs');
const EN = path.resolve('i18n/en/docusaurus-plugin-content-docs/current');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(md|mdx)$/.test(e.name) ? [p] : [];
  });
}

const rel = (base, f) => path.relative(base, f).replaceAll('\\', '/');
const esPages = new Map(walk(ES).map((f) => [rel(ES, f), matter(fs.readFileSync(f, 'utf8')).data]));
const enPages = new Map(walk(EN).map((f) => [rel(EN, f), matter(fs.readFileSync(f, 'utf8')).data]));

const problems = [];
let translated = 0;
for (const [page, data] of esPages) {
  if (data.stub === true) continue; // los esqueletos no se traducen
  if (!enPages.has(page)) {
    problems.push(`sin traducción EN: ${page}`);
    continue;
  }
  translated++;
  if (!enPages.get(page).source_commit) problems.push(`EN sin source_commit: ${page}`);
}
for (const page of enPages.keys()) {
  if (!esPages.has(page)) problems.push(`EN huérfana (no existe en ES): ${page}`);
}

const total = [...esPages.values()].filter((d) => d.stub !== true).length;
console.log(`i18n: ${translated}/${total} páginas no-esqueleto con traducción EN`);
for (const p of problems) console.log(`  ${strict ? '✗' : '·'} ${p}`);
if (strict && problems.length) process.exit(1);
