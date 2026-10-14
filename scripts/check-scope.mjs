// Guardia de alcance (Standard §2): ninguna página pública menciona lo excluido o diferido.
// Los términos vienen de scripts/data/scope.json. Los documentos normativos que declaran
// el alcance están exentos.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, scope, walkDocs } from './lib/common.mjs';

const terms = scope.forbidden_terms_in_public_pages;
const exempt = new Set(scope.forbidden_terms_exempt_paths);
const dirs = [path.join(ROOT, 'docs'), path.join(ROOT, 'i18n')];
const errors = [];

for (const d of dirs) {
  for (const file of walkDocs(d)) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/');
    if (exempt.has(rel)) continue;
    const text = fs.readFileSync(file, 'utf8').toLowerCase();
    for (const t of terms) {
      if (text.includes(t.toLowerCase())) errors.push(`${rel}: menciona "${t}", fuera de alcance (Standard §2)`);
    }
  }
}

for (const e of errors) console.error(`✗ ${e}`);
console.log(`alcance: ${errors.length} error(es)`);
if (errors.length) process.exit(1);
