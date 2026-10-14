// Métricas de salud documental (Architecture §10). Solo informa; no falla.
// Uso: node scripts/report-health.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ROOT, SOURCES, scope, walkDocs, loadRoutes } from './lib/common.mjs';

const data = loadRoutes();
const coreCommit = data.repos.nopal?.commit;
const rel = (base, f) => path.relative(base, f).replaceAll('\\', '/');

const ES = path.join(ROOT, 'docs');
const EN = path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current');
const pages = [...walkDocs(ES)].map((f) => ({ rel: rel(ES, f), fm: matter(fs.readFileSync(f, 'utf8')).data }));
const enPages = new Set([...walkDocs(EN)].map((f) => rel(EN, f)));

const published = pages.filter((p) => p.fm.stub !== true);
const withVerif = published.filter((p) => p.fm.verified_against && !String(p.fm.verified_against).startsWith('n/a'));
const current = withVerif.filter((p) => String(p.fm.verified_against).includes(`nopal@${coreCommit}`));
const noEn = published.filter((p) => !enPages.has(p.rel));
const stubs = pages.filter((p) => p.fm.stub === true);
const byStatus = {};
for (const p of pages) byStatus[p.fm.status] = (byStatus[p.fm.status] || 0) + 1;

const described = data.routes.filter((r) => r.summary).length;

// Plugins: ¿docs/ propio en su repo? ¿borrador en plugin-docs?
const REQUIRED = ['overview.md', 'installation.md', 'configuration.md', 'troubleshooting.md'];
let ownDocs = 0;
let drafts = 0;
for (const p of scope.plugins) {
  const own = path.join(SOURCES, p.repo, 'docs');
  if (fs.existsSync(own) && REQUIRED.every((f) => fs.existsSync(path.join(own, f)))) ownDocs++;
  const draft = path.join(ROOT, 'plugin-docs', p.repo, 'docs');
  if (REQUIRED.every((f) => fs.existsSync(path.join(draft, f)))) drafts++;
}

const pct = (a, b) => (b ? `${Math.round((100 * a) / b)} %` : 'n/a');
const lines = [
  `Salud documental — nopal@${coreCommit} (${data.repos.nopal?.date})`,
  '',
  `Páginas (ES): ${pages.length} · publicadas ${published.length} · esqueleto ${stubs.length}`,
  `Por estado: ${Object.entries(byStatus).map(([k, v]) => `${k} ${v}`).join(' · ')}`,
  `Verificadas contra el commit actual del core: ${current.length}/${withVerif.length} (${pct(current.length, withVerif.length)})`,
  `Páginas ES sin traducción EN: ${noEn.length}${noEn.length ? ' → ' + noEn.map((p) => p.rel).join(', ') : ''}`,
  `Rutas del core con descripción en el código: ${described}/${data.routes.length} (${pct(described, data.routes.length)})`,
  `Plugins con docs/ propio en su repositorio: ${ownDocs}/${scope.plugins.length}`,
  `Plugins con borrador de docs/ en plugin-docs: ${drafts}/${scope.plugins.length}`,
];
console.log(lines.join('\n'));
