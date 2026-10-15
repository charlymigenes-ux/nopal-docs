// Guardia de alcance (Standard §2): ninguna página pública menciona lo excluido o diferido.
// Las huellas de lo excluido vienen de scripts/data/scope.json.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, scope, walkDocs, forbiddenTokens } from './lib/common.mjs';

const exempt = new Set(scope.forbidden_exempt_paths);
const dirs = [path.join(ROOT, 'docs'), path.join(ROOT, 'i18n')];
const errors = [];

for (const d of dirs) {
  for (const file of walkDocs(d)) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/');
    if (exempt.has(rel)) continue;
    const hits = forbiddenTokens(fs.readFileSync(file, 'utf8'));
    for (const t of hits) errors.push(`${rel}: menciona "${t}", fuera de alcance (Standard §2)`);
  }
}

for (const e of errors) console.error(`✗ ${e}`);
console.log(`alcance: ${errors.length} error(es)`);
if (errors.length) process.exit(1);
