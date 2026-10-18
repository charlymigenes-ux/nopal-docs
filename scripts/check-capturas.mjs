// Capturas (Standard §11): las imágenes referenciadas existen y tienen nombre válido;
// además informa de qué capturas de capturas/LISTA_DE_CAPTURAS.md aún faltan.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walkDocs } from './lib/common.mjs';

const NAME = /^[a-z0-9]+(-[a-z0-9]+)+-\d+\.\d+\.\d+(-[a-z0-9.]+)?\.png$/; // area-vista-version.png
const IMG_REF = /\/img\/capturas\/(es|en)\/([^)\s"'>]+)/g;
const errors = [];

for (const dir of ['docs', 'i18n']) {
  for (const file of walkDocs(path.join(ROOT, dir))) {
    const rel = path.relative(ROOT, file).split(path.sep).join('/');
    for (const m of fs.readFileSync(file, 'utf8').matchAll(IMG_REF)) {
      const [, lang, name] = m;
      if (!NAME.test(name)) errors.push(`${rel}: nombre de captura no válido "${name}" (area-vista-version.png)`);
      if (!fs.existsSync(path.join(ROOT, 'static/img/capturas', lang, name))) errors.push(`${rel}: falta static/img/capturas/${lang}/${name}`);
    }
  }
}

// Qué falta de la lista (informativo)
const list = fs.readFileSync(path.join(ROOT, 'capturas/LISTA_DE_CAPTURAS.md'), 'utf8');
const wanted = [...list.matchAll(/^\|\s*\d+\s*\|\s*`([a-z0-9-]+)`/gm)].map((m) => m[1]);
let missing = 0;
for (const lang of ['es', 'en']) {
  const dir = path.join(ROOT, 'static/img/capturas', lang);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.png')) : [];
  const absent = wanted.filter((w) => !files.some((f) => f.startsWith(`${w}-`)));
  missing += lang === 'es' ? absent.length : 0;
  // En inglés, una captura sin versión propia se sustituye por la de español (el pie de figura lo dice).
  if (lang === 'es') console.log(`capturas es: ${wanted.length - absent.length}/${wanted.length}${absent.length ? ` · faltan: ${absent.join(', ')}` : ''}`);
  else console.log(`capturas en: ${wanted.length - absent.length}/${wanted.length} con versión propia (el resto usa la de español)`);
}
for (const e of errors) console.error(`✗ ${e}`);
console.log(`capturas: ${errors.length} error(es)`);
if (errors.length) process.exit(1);
