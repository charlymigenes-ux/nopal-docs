// Historial de cambios del core, generado desde su historial de git (Standard §15).
// Salida: docs/08-proyecto/changelog.md y su versión EN.
//
// No es un changelog curado: agrupa los mensajes de commit (Conventional Commits) por versión
// y tipo. Requiere el historial COMPLETO del repo `nopal` (no un clon superficial).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SOURCES, scope } from './lib/common.mjs';

const repo = path.join(SOURCES, 'nopal');
const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();

if (Number(git('rev-list', '--count', 'HEAD')) < 50) {
  console.error('El clon de nopal es superficial: se necesita el historial completo (npm run fetch).');
  process.exit(1);
}

// Límites de versión: el commit que fijó cada versión en el archivo VERSION.
// Antes del primero = 1.1.0 (y desarrollo previo); después = 1.2.0-alpha.
const BOUNDARY = '90745ec'; // "release-1.1.0" (2026-07-15)
const boundaryTs = Number(git('show', '-s', '--format=%ct', BOUNDARY));

const forbidden = [...scope.forbidden_terms_in_public_pages.map((t) => t.toLowerCase()), 'tuna'];

const head = git('log', '-1', '--format=%h\t%cs').split('\t');
const rows = git('log', '--no-merges', '--format=%h\x1f%cs\x1f%ct\x1f%s')
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [hash, date, ts, subject] = line.split('\x1f');
    return { hash, date, ts: Number(ts), subject };
  });

let omitted = 0;
const commits = rows.filter((r) => {
  const hit = forbidden.some((t) => r.subject.toLowerCase().includes(t));
  if (hit) omitted++;
  return !hit;
});

const TYPE = /^(feat|fix|docs|chore|style|ci|test|refactor|perf|build|revert|wip)(?:\(([^)]*)\))?(!)?:\s*(.+)$/i;
function classify(c) {
  const m = c.subject.match(TYPE);
  if (!m) return { ...c, type: 'other', scope: '', text: c.subject, breaking: /BREAKING/i.test(c.subject) };
  return { ...c, type: m[1].toLowerCase(), scope: m[2] || '', text: m[4], breaking: Boolean(m[3]) || /BREAKING/i.test(c.subject) };
}
const items = commits.map(classify);

const LABELS = {
  es: {
    title: 'Historial de cambios',
    generated: 'Página **generada** desde el historial de git de `nopal`. No la edites a mano.',
    intro: (n, h, d) => `Agrupa los mensajes de commit (${n} cambios, hasta \`${h}\`, ${d}) por versión y tipo. **No es un changelog curado**: los textos son los de los commits, en el idioma en que se escribieron. NOPAL aún no publica versiones etiquetadas (ver [versionado](./versionado-y-soporte.md)).`,
    omitted: (n) => `Se omiten ${n} cambios de componentes cuya documentación está diferida.`,
    versions: {
      alpha: 'Sin publicar',
      v11: 'Sin etiqueta',
    },
    types: {
      breaking: 'Cambios incompatibles',
      feat: 'Añadido',
      fix: 'Corregido',
      change: 'Cambiado',
      docs: 'Documentación',
      ci: 'CI y pruebas',
      chore: 'Mantenimiento',
      other: 'Otros',
    },
    nogroup: 'General',
    since: 'desde',
    until: 'hasta',
  },
  en: {
    title: 'Change history',
    generated: 'This page is **generated** from `nopal`\'s git history. Do not edit it by hand.',
    intro: (n, h, d) => `Groups the commit messages (${n} changes, up to \`${h}\`, ${d}) by version and type. **It is not a curated changelog**: the texts are the commits\' own, in the language they were written in. NOPAL does not publish tagged releases yet (see [versioning](./versionado-y-soporte.md)).`,
    omitted: (n) => `${n} changes to components whose documentation is deferred are omitted.`,
    versions: {
      alpha: 'Unreleased',
      v11: 'Untagged',
    },
    types: {
      breaking: 'Breaking changes',
      feat: 'Added',
      fix: 'Fixed',
      change: 'Changed',
      docs: 'Documentation',
      ci: 'CI and tests',
      chore: 'Maintenance',
      other: 'Other',
    },
    nogroup: 'General',
    since: 'from',
    until: 'to',
  },
};

const GROUP = { feat: 'feat', fix: 'fix', refactor: 'change', style: 'change', perf: 'change', revert: 'change', docs: 'docs', ci: 'ci', test: 'ci', build: 'ci', chore: 'chore', wip: 'other', other: 'other' };
const ORDER = ['breaking', 'feat', 'fix', 'change', 'docs', 'ci', 'chore', 'other'];

const esc = (s) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

function bucket(list, locale, key, name, version) {
  if (!list.length) return '';
  const L = LABELS[locale];
  const dates = list.map((c) => c.date).sort();
  const out = [`## ${version} — ${L.versions[key]} (${dates[0]} → ${dates[dates.length - 1]}, ${list.length})\n`];
  const groups = Object.fromEntries(ORDER.map((k) => [k, []]));
  for (const c of list) {
    if (c.breaking) groups.breaking.push(c);
    groups[GROUP[c.type]].push(c);
  }
  for (const k of ORDER) {
    const g = groups[k];
    if (!g.length) continue;
    out.push(`### ${L.types[k]} (${g.length})\n`);
    const byScope = new Map();
    for (const c of g) {
      const s = c.scope || '';
      if (!byScope.has(s)) byScope.set(s, []);
      byScope.get(s).push(c);
    }
    const scopes = [...byScope.keys()].sort((a, b) => (a === '' ? 1 : b === '' ? -1 : a.localeCompare(b)));
    for (const s of scopes) {
      out.push(`**${s || L.nogroup}**\n`);
      for (const c of byScope.get(s).sort((a, b) => b.ts - a.ts)) {
        out.push(`- ${esc(c.text)} (\`${c.hash}\`, ${c.date})`);
      }
      out.push('');
    }
  }
  return out.join('\n');
}

for (const locale of ['es', 'en']) {
  const L = LABELS[locale];
  const alpha = items.filter((c) => c.ts > boundaryTs);
  const v11 = items.filter((c) => c.ts <= boundaryTs);
  const body = `---
title: ${L.title}
sidebar_label: ${L.title}
audience: reference
type: reference
status: implemented
verified_against: "nopal@${head[0]} (${head[1]})"
generated: true
sidebar_position: 2
${locale === 'es' ? '' : `source_commit: "${head[0]}"\n`}---

# ${L.title}

:::note
${L.generated}
:::

${L.intro(items.length, head[0], head[1])}${omitted ? `\n\n${L.omitted(omitted)}` : ''}

${bucket(alpha, locale, 'alpha', 'alpha', '1.2.0-alpha.1')}
${bucket(v11, locale, 'v11', 'v11', '1.1.0')}
`;
  const base = locale === 'es' ? path.join(ROOT, 'docs') : path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current');
  const f = path.join(base, '08-proyecto', 'changelog.md');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, body.replace(/\r\n/g, '\n'));
}
console.log(`changelog: ${items.length} cambios (${omitted} omitidos), hasta ${head[0]}`);
