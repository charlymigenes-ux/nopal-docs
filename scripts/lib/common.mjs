// Utilidades compartidas por los generadores y validadores.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const scope = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/data/scope.json'), 'utf8'));
export const notes = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/data/plugin-notes.json'), 'utf8'));

// Directorio con un checkout por repositorio. `NOPAL_SOURCES` lo sobrescribe.
export const SOURCES = path.resolve(process.env.NOPAL_SOURCES || path.join(ROOT, '.sources'));
export const ROUTES_JSON = path.join(ROOT, 'generated', 'routes.json');

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function exists(...p) {
  return fs.existsSync(path.join(...p));
}

export function loadRoutes() {
  if (!fs.existsSync(ROUTES_JSON)) {
    throw new Error(`Falta ${ROUTES_JSON}. Ejecuta: npm run gen:routes`);
  }
  return readJson(ROUTES_JSON);
}

export function pluginDir(plugin) {
  return path.join(SOURCES, plugin.repo);
}

export function readManifest(plugin) {
  const f = path.join(pluginDir(plugin), 'nopal-plugin.json');
  return fs.existsSync(f) ? readJson(f) : null;
}

export function readCatalog() {
  const f = path.join(SOURCES, 'nopal', 'backend', 'plugin_catalog.json');
  return fs.existsSync(f) ? readJson(f) : [];
}

/** Versión que el JS del plugin escribe en NopalPluginRegistry[id] = { …, version }. */
export function jsRegistryVersion(plugin, manifest) {
  const script = manifest?.frontend?.script;
  if (!script) return null;
  const f = path.join(pluginDir(plugin), script);
  if (!fs.existsSync(f)) return null;
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/NopalPluginRegistry\[[^\]]+\]\s*=\s*\{[^}]*version\s*:\s*([^,}\s]+)/);
  if (!m) return null;
  const token = m[1].trim();
  const lit = token.match(/^['"]([^'"]+)['"]$/);
  if (lit) return lit[1];
  const decl = src.match(new RegExp(`(?:const|let|var)\\s+${token}\\s*=\\s*['"]([^'"]+)['"]`));
  return decl ? decl[1] : null;
}

/** ¿El backend del plugin declara AI_TOOLS (punto de extensión experimental)? */
export function declaresAiTools(plugin) {
  const backend = path.join(pluginDir(plugin), 'backend');
  if (!fs.existsSync(backend)) return false;
  const stack = [backend];
  while (stack.length) {
    const d = stack.pop();
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.name.endsWith('.py') && /^\s*AI_TOOLS\s*=/m.test(fs.readFileSync(p, 'utf8'))) return true;
    }
  }
  return false;
}

export function* walkDocs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkDocs(p);
    else if (/\.(md|mdx)$/.test(e.name)) yield p;
  }
}

export function normalizeRoute(p) {
  return p.replace(/\{[^}]+\}/g, '{}').replace(/\/+$/, '');
}

// Lo excluido del alcance se reconoce por huella: SHA-256 de cada palabra (minúsculas, partiendo
// por todo lo que no sea letra o cifra). Así scope.json no nombra lo que no debe nombrarse.
import crypto from 'node:crypto';
const FORBIDDEN = new Set(scope.forbidden_token_hashes);
export function forbiddenTokens(text) {
  const hits = new Set();
  for (const tok of String(text).toLowerCase().split(/[^a-z0-9]+/)) {
    if (tok && FORBIDDEN.has(crypto.createHash('sha256').update(tok).digest('hex'))) hits.add(tok);
  }
  return [...hits];
}
