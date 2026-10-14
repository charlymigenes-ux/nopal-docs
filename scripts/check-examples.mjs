// Ejemplos del tutorial (Standard §12): todo bloque de código con `title="ruta"` en una página
// debe ser idéntico al archivo examples/hello-nopal/<ruta>. Así el código que se muestra es
// el mismo que se probó.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walkDocs } from './lib/common.mjs';

const EXAMPLE = path.join(ROOT, 'examples', 'hello-nopal');
const dirs = [path.join(ROOT, 'docs'), path.join(ROOT, 'i18n')];
const errors = [];
let checked = 0;

const FENCE = /^```[a-zA-Z]*\s+title="([^"]+)"\s*\n([\s\S]*?)\n```$/gm;

for (const d of dirs) {
  for (const file of walkDocs(d)) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/');
    const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    for (const m of text.matchAll(FENCE)) {
      const [, title, body] = m;
      const source = path.join(EXAMPLE, title);
      if (!fs.existsSync(source)) {
        errors.push(`${rel}: el bloque "${title}" no tiene archivo en examples/hello-nopal/`);
        continue;
      }
      checked++;
      const expected = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n').replace(/\n+$/, '');
      if (body.replace(/\n+$/, '') !== expected) {
        errors.push(`${rel}: el bloque "${title}" difiere de examples/hello-nopal/${title}`);
      }
    }
  }
}

for (const e of errors) console.error(`✗ ${e}`);
console.log(`ejemplos: ${checked} bloques comprobados, ${errors.length} error(es)`);
if (errors.length) process.exit(1);
