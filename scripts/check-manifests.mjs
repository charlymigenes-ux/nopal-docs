// Validador de manifiestos (Standard §6.4 y §18).
// - Cada nopal-plugin.json cumple los campos requeridos y su id coincide con el catálogo.
// - La versión del manifiesto, del catálogo y del JS coincide.  → aviso (error con --strict)
// - `python_requires` coincide entre manifiesto y catálogo.      → aviso (error con --strict)
import fs from 'node:fs';
import path from 'node:path';
import { scope, readManifest, readCatalog, jsRegistryVersion, pluginDir } from './lib/common.mjs';

const strict = process.argv.includes('--strict');
const REQUIRED = ['schema_version', 'id', 'name', 'version', 'publisher', 'category', 'description', 'permissions', 'compatibility', 'frontend'];
const errors = [];
const warnings = [];
const catalog = readCatalog();

for (const p of scope.plugins) {
  const m = readManifest(p);
  const tag = `[${p.id}]`;
  if (!m) { errors.push(`${tag} falta nopal-plugin.json en ${pluginDir(p)}`); continue; }

  for (const k of REQUIRED) if (m[k] === undefined) errors.push(`${tag} manifiesto sin campo \`${k}\``);
  if (m.id !== p.id) errors.push(`${tag} el id del manifiesto es "${m.id}"`);
  if (!/^\d+\.\d+\.\d+$/.test(m.version || '')) errors.push(`${tag} versión no SemVer: "${m.version}"`);
  if (!Array.isArray(m.permissions)) errors.push(`${tag} permissions debe ser una lista`);
  for (const key of ['script', 'style']) {
    const f = m.frontend?.[key];
    if (f && !fs.existsSync(path.join(pluginDir(p), f))) errors.push(`${tag} frontend.${key} apunta a un archivo inexistente: ${f}`);
  }
  if (m.backend?.entry && !fs.existsSync(path.join(pluginDir(p), m.backend.entry))) {
    errors.push(`${tag} backend.entry apunta a un archivo inexistente: ${m.backend.entry}`);
  }

  const cat = catalog.find((c) => c.id === m.id);
  if (!cat) {
    errors.push(`${tag} no figura en plugin_catalog.json`);
  } else {
    if (cat.version !== m.version) warnings.push(`${tag} versión: manifiesto ${m.version} ≠ catálogo ${cat.version}`);
    if ((cat.python_requires || null) !== (m.python_requires || null)) {
      warnings.push(`${tag} python_requires: manifiesto ${m.python_requires || '—'} ≠ catálogo ${cat.python_requires || '—'}`);
    }
    if (cat.repo_url && !cat.repo_url.replace(/\.git$/, '').endsWith(`/${p.repo}`)) warnings.push(`${tag} repo_url del catálogo no coincide con ${p.repo}`);
  }
  const jsv = jsRegistryVersion(p, m);
  if (jsv && jsv !== m.version) warnings.push(`${tag} versión: manifiesto ${m.version} ≠ JS ${jsv}`);
  if (!jsv) warnings.push(`${tag} no se pudo leer la versión del registro JS`);
}

for (const w of warnings) console.log(`${strict ? '✗' : 'aviso'}  ${w}`);
for (const e of errors) console.error(`✗ ${e}`);
console.log(`manifiestos: ${scope.plugins.length} plugins, ${errors.length} error(es), ${warnings.length} aviso(s)`);
if (errors.length || (strict && warnings.length)) process.exit(1);
