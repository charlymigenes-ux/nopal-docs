// Genera la versión EN del tutorial a partir de una plantilla con la prosa traducida y los
// bloques de código tomados de examples/hello-nopal/ (los mismos que se probaron).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/common.mjs';

const template = fs.readFileSync(path.join(ROOT, 'scripts/data/tutorial-en.template.md'), 'utf8');
const output = template.replace(/\{\{([^}]+)\}\}/g, (_, rel) => {
  const f = path.join(ROOT, 'examples', 'hello-nopal', rel);
  return fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').replace(/\n+$/, '');
});
const target = path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current/05-desarrolladores/tutorial-primer-plugin.md');
fs.writeFileSync(target, output);
console.log(`tutorial EN generado: ${path.relative(ROOT, target)}`);
