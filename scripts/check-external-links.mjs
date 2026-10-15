// Enlaces externos (Standard §18): comprueba que las URL http(s) de las páginas respondan.
// Solo avisa por defecto: la red es inestable y un servicio caído no debe romper el build.
// Uso: node scripts/check-external-links.mjs [--strict]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walkDocs } from './lib/common.mjs';

const strict = process.argv.includes('--strict');
const IGNORE = /^https?:\/\/(localhost|tu-dominio|your-domain|127\.0\.0\.1|0\.0\.0\.0|<)/;
const URL_RE = /https?:\/\/[^\s)<>\]"'`]+/g;

const dirs = [path.join(ROOT, 'docs'), path.join(ROOT, 'i18n'), path.join(ROOT, 'plugin-docs')];
const found = new Map(); // url -> [páginas]
for (const d of dirs) {
  for (const file of walkDocs(d)) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/');
    const text = fs.readFileSync(file, 'utf8');
    for (let m of text.matchAll(URL_RE)) {
      const url = m[0].replace(/[.,;:!?]+$/, '');
      if (IGNORE.test(url) || url.includes('<') || url.includes('&lt;') || url.includes('{')) continue;
      if (!found.has(url)) found.set(url, new Set());
      found.get(url).add(rel);
    }
  }
}

async function probe(url) {
  const opts = { redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'user-agent': 'nopal-docs-link-check' } };
  try {
    let r = await fetch(url, { ...opts, method: 'HEAD' });
    if (r.status === 405 || r.status === 403 || r.status === 400) r = await fetch(url, { ...opts, method: 'GET' });
    return r.status;
  } catch (e) {
    return `error: ${e.cause?.code || e.name}`;
  }
}

const urls = [...found.keys()].sort();
const bad = [];
let ok = 0;
for (let i = 0; i < urls.length; i += 6) {
  const batch = urls.slice(i, i + 6);
  const res = await Promise.all(batch.map(probe));
  batch.forEach((u, j) => {
    const s = res[j];
    if (typeof s === 'number' && s < 400) ok++;
    else bad.push({ url: u, status: s, pages: [...found.get(u)] });
  });
}

for (const b of bad) console.log(`${strict ? '✗' : 'aviso'}  ${b.status}  ${b.url}\n        en: ${b.pages.slice(0, 3).join(', ')}`);
console.log(`enlaces externos: ${urls.length} únicos, ${ok} responden, ${bad.length} con problema`);
if (strict && bad.length) process.exit(1);
