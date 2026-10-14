// Validador de rutas (Standard §7 y §18).
// 1) Toda ruta mencionada en una página ESCRITA (no generada, no rfc, no stub) debe existir en el código.
// 2) Toda ruta del inventario aparece en la referencia generada (garantiza que está al día).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ROOT, scope, loadRoutes, walkDocs, normalizeRoute } from './lib/common.mjs';

const data = loadRoutes();
const known = new Set(data.routes.map((r) => normalizeRoute(r.path)));

// Rutas del plugin de ejemplo del tutorial (examples/hello-nopal): no son de NOPAL, pero el tutorial las cita.
const exampleRouter = path.join(ROOT, 'examples', 'hello-nopal', 'backend', 'router.py');
if (fs.existsSync(exampleRouter)) {
  for (const m of fs.readFileSync(exampleRouter, 'utf8').matchAll(/@router\.\w+\("([^"]+)"/g)) known.add(normalizeRoute(m[1]));
}
const errors = [];

for (const file of walkDocs(path.join(ROOT, 'docs'))) {
  const rel = path.relative(path.join(ROOT, 'docs'), file).replaceAll('\\', '/');
  // Los documentos normativos describen reglas, no rutas de la API.
  if (scope.forbidden_terms_exempt_paths.includes(`docs/${rel}`)) continue;
  const { data: fm, content } = matter(fs.readFileSync(file, 'utf8'));
  if (fm.generated === true || fm.stub === true || fm.status === 'rfc' || rel.startsWith('07-rfc/')) continue;
  // Rutas entre acentos graves que empiezan por /api/ (con o sin método delante).
  for (const m of content.matchAll(/`(?:(?:GET|POST|PUT|PATCH|DELETE|WS)\s+)?(\/api\/[^\s`?]+)/g)) {
    const route = normalizeRoute(m[1].replace(/<[^>]+>/g, '{}'));
    // Se admite un prefijo (p. ej. `/api/pricing`) si alguna ruta real empieza por él.
    // Rutas retiradas del código que una guía de migración menciona a propósito (scope.json).
    if ((scope.removed_routes_documented || []).includes(route)) continue;
    const ok = known.has(route) || [...known].some((k) => k.startsWith(`${route}/`));
    if (!ok) errors.push(`${rel}: la ruta \`${m[1]}\` no existe en el código`);
  }
}

// Frescura de la referencia generada.
const core = path.join(ROOT, 'docs/06-referencia/api-rest-core.md');
if (fs.existsSync(core)) {
  const text = fs.readFileSync(core, 'utf8');
  const missing = data.routes.filter((r) => r.repo === 'nopal' && !text.includes(`\`${r.path}\``));
  for (const r of missing) errors.push(`api-rest-core.md no incluye ${r.method} ${r.path}: regenera con npm run gen`);
} else {
  errors.push('falta docs/06-referencia/api-rest-core.md: ejecuta npm run gen');
}

// Métrica de salud documental (Architecture §10): rutas con descripción en el código.
const described = data.routes.filter((r) => r.summary).length;
console.log(`descripción en el código: ${described}/${data.routes.length} rutas (${Math.round((100 * described) / data.routes.length)} %)`);

for (const e of errors) console.error(`✗ ${e}`);
console.log(`rutas: ${known.size} rutas conocidas, ${errors.length} error(es)`);
if (errors.length) process.exit(1);
