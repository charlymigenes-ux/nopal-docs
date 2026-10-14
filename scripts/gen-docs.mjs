// Generador de páginas (Architecture §2 y §5): referencia REST del core, fichas de plugin
// y matriz de plugins. Salida en ES (docs/) y EN (i18n/en/…/current/).
//
// Uso: NOPAL_SOURCES=<dir> node scripts/gen-docs.mjs   (requiere generated/routes.json)
//
// Todo lo que se escribe sale del manifiesto, el catálogo, el código (rutas) o de
// scripts/data/plugin-notes.json (notas verificadas con evidencia). Nada se inventa.
import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT, SOURCES, scope, notes, loadRoutes, readManifest, readCatalog,
  jsRegistryVersion, declaresAiTools, pluginDir,
} from './lib/common.mjs';

const DATA = loadRoutes();
const catalog = readCatalog();
const coreCommit = DATA.repos.nopal?.commit || 'desconocido';
const coreDate = DATA.repos.nopal?.date || '';
const OWNER = scope.github_owner;

const EN_ROOT = path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current');
const write = (locale, rel, content) => {
  const base = locale === 'es' ? path.join(ROOT, 'docs') : EN_ROOT;
  const f = path.join(base, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content.replace(/\r\n/g, '\n'));
};

// ---- textos ------------------------------------------------------------------------
const T = {
  es: {
    generated: 'Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.',
    verified: (c, d) => `Verificado contra \`nopal@${c}\` (${d}).`,
    access: { public: 'Pública', session: 'Sesión (admin u operador)', admin: 'Solo admin', device: 'Token de dispositivo' },
    cols: { method: 'Método', route: 'Ruta', access: 'Acceso', policy: 'Política', desc: 'Descripción' },
    field: 'Campo', value: 'Valor',
    none: '—', yes: 'Sí', no: 'No',
  },
  en: {
    generated: 'This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.',
    verified: (c, d) => `Verified against \`nopal@${c}\` (${d}).`,
    access: { public: 'Public', session: 'Session (admin or operator)', admin: 'Admin only', device: 'Device token' },
    cols: { method: 'Method', route: 'Route', access: 'Access', policy: 'Policy', desc: 'Description' },
    field: 'Field', value: 'Value',
    none: '—', yes: 'Yes', no: 'No',
  },
};

const esc = (s) =>
  String(s ?? '').replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, ' ');
const short = (s, n = 140) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);
const methodLabel = (m) => (m === 'WEBSOCKET' ? 'WS' : m);

function routeTable(locale, rows) {
  const t = T[locale];
  const lines = [
    `| ${t.cols.method} | ${t.cols.route} | ${t.cols.access} | ${t.cols.policy} | ${t.cols.desc} |`,
    '|---|---|---|---|---|',
  ];
  const order = { GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4, WEBSOCKET: 5 };
  const sorted = [...rows].sort((a, b) => a.path.localeCompare(b.path) || order[a.method] - order[b.method]);
  for (const r of sorted) {
    const pol = r.policy.length ? r.policy.map((p) => `\`${esc(p.replace('Action.', ''))}\``).join(', ') : t.none;
    lines.push(
      `| ${methodLabel(r.method)} | \`${esc(r.path)}\` | ${t.access[r.access]} | ${pol} | ${esc(short(r.summary)) || t.none} |`,
    );
  }
  return lines.join('\n');
}

function countByAccess(rows) {
  const c = { public: 0, session: 0, admin: 0, device: 0 };
  for (const r of rows) c[r.access]++;
  return c;
}

// ---- API REST del core -----------------------------------------------------------------
const AREAS = {
  'status.py': ['Estado y preajustes', 'Status and presets'],
  'dashboard.py': ['Panel de control', 'Dashboard'],
  'devices.py': ['Dispositivos', 'Devices'],
  'printers.py': ['Impresoras Klipper / Moonraker', 'Klipper / Moonraker printers'],
  'marlin_printers.py': ['Impresoras Marlin', 'Marlin printers'],
  'bambu_printers.py': ['Impresoras Bambu Lab', 'Bambu Lab printers'],
  'elegoo_printers.py': ['Impresoras Elegoo', 'Elegoo printers'],
  'flashforge_printers.py': ['Impresoras FlashForge', 'FlashForge printers'],
  'laser.py': ['Láser y CNC (GRBL)', 'Laser and CNC (GRBL)'],
  'models.py': ['Biblioteca de modelos y G-code', 'Model and G-code library'],
  'upload.py': ['Subida de archivos', 'File upload'],
  'console.py': ['Consola y macros', 'Console and macros'],
  'ai.py': ['NOPAL Intelligence (IA)', 'NOPAL Intelligence (AI)'],
  'auth.py': ['Autenticación y usuarios', 'Authentication and users'],
  'system.py': ['Sistema', 'System'],
  'config_backup.py': ['Respaldos de configuración', 'Configuration backups'],
  'logs.py': ['Registros (visor)', 'Logs (viewer)'],
  'logging_config.py': ['Configuración de registros', 'Logging configuration'],
  'plugins.py': ['Galería de plugins', 'Plugin gallery'],
  'notifications.py': ['Notificaciones', 'Notifications'],
  'main.py': ['Aplicación (raíz)', 'Application (root)'],
};

function genCoreApi(locale) {
  const t = T[locale];
  const es = locale === 'es';
  const rows = DATA.routes.filter((r) => r.repo === 'nopal');
  const c = countByAccess(rows);
  const files = [...new Set(rows.map((r) => path.basename(r.file)))].sort();
  const parts = [];
  parts.push(`---
title: ${es ? 'API REST del core' : 'Core REST API'}
sidebar_label: ${es ? 'API REST del core' : 'Core REST API'}
audience: reference
type: reference
status: implemented
verified_against: "nopal@${coreCommit} (${coreDate})"
generated: true
${es ? '' : `source_commit: "${coreCommit}"\n`}---

# ${es ? 'API REST del core' : 'Core REST API'}

:::note
${t.generated}
${t.verified(coreCommit, coreDate)}
:::

${es
    ? `Inventario de las rutas de NOPAL obtenido por **análisis estático** del código (decoradores \`@router.*\` y dependencias de acceso). No se ejecuta NOPAL. El acceso mostrado es el declarado en la ruta; una comprobación de rol dentro del cuerpo de una función no se detecta.`
    : `Inventory of NOPAL's routes obtained by **static analysis** of the code (\`@router.*\` decorators and access dependencies). NOPAL is not run. The access shown is the one declared on the route; a role check inside a function body is not detected.`}

${es ? '## Cómo leer el acceso' : '## How to read access'}

| ${es ? 'Valor' : 'Value'} | ${es ? 'Significado' : 'Meaning'} |
|---|---|
| ${t.access.public} | ${es ? 'Sin sesión. Solo login, primer arranque y la página principal.' : 'No session. Login, first-run setup and the main page only.'} |
| ${t.access.session} | ${es ? 'Requiere sesión iniciada; el rol se relee del registro de usuarios en cada petición.' : 'Requires a logged-in session; the role is re-read from the user registry on every request.'} |
| ${t.access.admin} | ${es ? 'Requiere el rol `admin`. El rol de operador se guarda internamente como `operador`.' : 'Requires the `admin` role. The operator role is stored internally as `operador`.'} |
| ${t.cols.policy} | ${es ? 'Rutas ya migradas a la Authorization Policy (ADR-006): consultan la acción indicada antes de ejecutar. El resto usa solo el rol.' : 'Routes already migrated to the Authorization Policy (ADR-006): they check the listed action before running. The rest use the role only.'} |

${es ? '## Resumen' : '## Summary'}

| ${es ? 'Acceso' : 'Access'} | ${es ? 'Rutas' : 'Routes'} |
|---|---:|
| ${t.access.public} | ${c.public} |
| ${t.access.session} | ${c.session} |
| ${t.access.admin} | ${c.admin} |
| **${es ? 'Total' : 'Total'}** | **${rows.length}** |
`);
  for (const f of files) {
    const area = AREAS[f] || [f, f];
    const fr = rows.filter((r) => path.basename(r.file) === f);
    parts.push(`\n## ${area[es ? 0 : 1]}\n\n\`backend/${f === 'main.py' ? '' : 'api/'}${f}\` · ${fr.length} ${es ? 'rutas' : 'routes'}\n\n${routeTable(locale, fr)}\n`);
  }
  write(locale, '06-referencia/api-rest-core.md', parts.join('\n'));
}

// ---- Fichas de plugin ---------------------------------------------------------------------
const pluginInfo = scope.plugins.map((p) => {
  const m = readManifest(p);
  if (!m) throw new Error(`Sin nopal-plugin.json en ${pluginDir(p)}`);
  const cat = catalog.find((c) => c.id === m.id) || null;
  return {
    plugin: p,
    manifest: m,
    cat,
    jsVersion: jsRegistryVersion(p, m),
    aiTools: declaresAiTools(p),
    routes: DATA.routes.filter((r) => r.repo === p.repo),
    commit: DATA.repos[p.repo]?.commit || '',
    hasDocsDir: fs.existsSync(path.join(pluginDir(p), 'docs')),
    hasTests: fs.existsSync(path.join(pluginDir(p), 'tests')),
  };
});

function drift(i) {
  const out = [];
  const mv = i.manifest.version;
  if (i.cat && i.cat.version !== mv) out.push({ where: 'plugin_catalog.json', value: i.cat.version });
  if (i.jsVersion && i.jsVersion !== mv) out.push({ where: 'NopalPluginRegistry (JS)', value: i.jsVersion });
  if (i.cat && (i.cat.python_requires || null) !== (i.manifest.python_requires || null)) {
    out.push({ where: 'python_requires (catálogo)', value: i.cat.python_requires || '—', field: 'python_requires' });
  }
  return out;
}

const prefixOf = (routes) => {
  const set = new Set(routes.map((r) => '/' + r.path.split('/').filter(Boolean).slice(0, 2).join('/')));
  return [...set].sort();
};

function genPluginSheet(locale, i) {
  const t = T[locale];
  const es = locale === 'es';
  const { manifest: m, plugin: p } = i;
  const c = countByAccess(i.routes);
  const repoUrl = `https://github.com/${OWNER}/${p.repo}`;
  const list = (a) => (a && a.length ? a.join(', ') : t.none);
  const d = drift(i);
  const maturity = m.version.startsWith('0.') ? (es ? 'preliminar (0.x)' : 'preview (0.x)') : es ? 'estable (≥ 1.0)' : 'stable (≥ 1.0)';
  const body = [];
  body.push(`---
title: ${m.name}
sidebar_label: ${m.name}
audience: user
type: reference
status: implemented
verified_against: "nopal@${coreCommit}; ${p.repo}@${i.commit}"
generated: true
plugin_id: ${m.id}
plugin_version: "${m.version}"
${es ? '' : `source_commit: "${i.commit}"\n`}---

# ${m.name}

:::note
${t.generated}
${es ? 'Fuentes' : 'Sources'}: \`nopal-plugin.json\`, ${es ? 'código del plugin y' : 'plugin code and'} \`plugin_catalog.json\` (\`${p.repo}@${i.commit}\`, \`nopal@${coreCommit}\`).
:::

${m.description}

## ${es ? 'Ficha' : 'Summary'}

| ${t.field} | ${t.value} |
|---|---|
| id | \`${m.id}\` |
| ${es ? 'Versión (manifiesto)' : 'Version (manifest)'} | ${m.version} |
| ${es ? 'Madurez' : 'Maturity'} | ${maturity} |
| ${es ? 'Categoría' : 'Category'} | ${m.category} |
| ${es ? 'Publicador' : 'Publisher'} | ${m.publisher} |
| ${es ? 'Compatibilidad' : 'Compatibility'} | ${list(m.compatibility)} |
| ${es ? 'Python mínimo (`python_requires`)' : 'Minimum Python (`python_requires`)'} | ${m.python_requires ? `\`${m.python_requires}\`` : es ? 'sin requisito propio (hereda el del core)' : 'no own requirement (inherits the core\'s)'} |
| ${es ? 'Backend' : 'Backend'} | ${m.backend?.entry ? `\`${m.backend.entry}\`` : es ? 'No tiene (solo interfaz)' : 'None (UI only)'} |
| ${es ? 'Interfaz' : 'UI'} | \`${m.frontend?.script || '—'}\` · ${es ? 'sección' : 'section'} \`${m.frontend?.section || '—'}\` |
| ${es ? 'Repositorio' : 'Repository'} | [${p.repo}](${repoUrl}) |
| ${es ? 'Pruebas propias' : 'Own tests'} | ${i.hasTests ? t.yes : t.no} |
| ${es ? 'Carpeta `docs/` propia' : 'Own `docs/` folder'} | ${i.hasDocsDir ? t.yes : t.no} |

## ${es ? 'Permisos declarados' : 'Declared permissions'}

${es
    ? 'Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.'
    : 'These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.'}

${(m.permissions || []).map((x) => `- ${x}`).join('\n') || `- ${t.none}`}
`);

  if (d.length) {
    body.push(`## ${es ? 'Desfase de versiones' : 'Version drift'}

${es
    ? 'El manifiesto debería ser la fuente de verdad (Standard §6.4). Se detectan valores distintos en:'
    : 'The manifest should be the source of truth (Standard §6.4). Different values are found in:'}

| ${es ? 'Dónde' : 'Where'} | ${es ? 'Valor encontrado' : 'Value found'} | ${es ? 'Manifiesto' : 'Manifest'} |
|---|---|---|
${d.map((x) => `| ${x.where} | ${x.value} | ${x.field === 'python_requires' ? m.python_requires || '—' : m.version} |`).join('\n')}
`);
  }

  if (i.aiTools) {
    body.push(`## NOPAL Intelligence\n\n${es ? 'Este plugin declara `AI_TOOLS` (punto de extensión **experimental**).' : 'This plugin declares `AI_TOOLS` (**experimental** extension point).'}\n`);
  }

  if (i.routes.length) {
    body.push(`## ${es ? 'API del plugin' : 'Plugin API'}

${es ? 'Prefijo(s) de ruta' : 'Route prefix(es)'}: ${prefixOf(i.routes).map((x) => `\`${x}\``).join(', ')} · ${i.routes.length} ${es ? 'rutas' : 'routes'} (${t.access.session}: ${c.session}; ${t.access.admin}: ${c.admin}; ${t.access.public}: ${c.public}).

${routeTable(locale, i.routes)}
`);
  } else {
    body.push(`## ${es ? 'API del plugin' : 'Plugin API'}\n\n${es ? 'Este plugin **no tiene backend**: no expone rutas.' : 'This plugin has **no backend**: it exposes no routes.'}\n`);
  }

  const pn = notes[m.id] || [];
  if (pn.length) {
    body.push(`## ${es ? 'Notas verificadas' : 'Verified notes'}

${pn.map((n) => `- ${n[locale]} <small>(${es ? 'evidencia' : 'evidence'}: \`${n.evidence}\`)</small>`).join('\n')}
`);
  }

  body.push(`## ${es ? 'Más información' : 'More information'}

- [README ${es ? 'del plugin' : 'of the plugin'}](${repoUrl}#readme)
`);
  write(locale, `03-plugins/${m.id}.md`, body.join('\n'));
}

// ---- Matriz de plugins -----------------------------------------------------------------------
function genMatrix(locale) {
  const t = T[locale];
  const es = locale === 'es';
  const rows = pluginInfo.map((i) => {
    const m = i.manifest;
    const c = i.routes.length;
    return `| [${m.name}](./${m.id}.md) | \`${m.id}\` | ${m.version} | ${m.category} | ${(m.compatibility || []).join(', ')} | ${m.python_requires ? `\`${m.python_requires}\`` : t.none} | ${m.backend?.entry ? c : es ? 'sin backend' : 'no backend'} | ${drift(i).length ? '⚠️' : '✅'} |`;
  });
  const driftRows = pluginInfo.flatMap((i) => drift(i).map((x) => `| \`${i.manifest.id}\` | ${x.where} | ${x.value} | ${x.field === 'python_requires' ? i.manifest.python_requires || '—' : i.manifest.version} |`));
  const soon = catalog.filter((c) => c.availability && c.availability !== 'available');
  const body = `---
title: ${es ? 'Matriz de plugins' : 'Plugin matrix'}
sidebar_label: ${es ? 'Matriz de plugins' : 'Plugin matrix'}
audience: reference
type: reference
status: implemented
verified_against: "nopal@${coreCommit} (${coreDate})"
generated: true
sidebar_position: 1
${es ? '' : `source_commit: "${coreCommit}"\n`}---

# ${es ? 'Matriz de plugins' : 'Plugin matrix'}

:::note
${t.generated}
${t.verified(coreCommit, coreDate)}
:::

${es ? 'Plugins oficiales, con los datos de su manifiesto `nopal-plugin.json`.' : 'Official plugins, with the data from their `nopal-plugin.json` manifest.'}

| ${es ? 'Plugin' : 'Plugin'} | id | ${es ? 'Versión' : 'Version'} | ${es ? 'Categoría' : 'Category'} | ${es ? 'Compatibilidad' : 'Compatibility'} | Python | ${es ? 'Rutas' : 'Routes'} | ${es ? 'Versiones coherentes' : 'Versions consistent'} |
|---|---|---|---|---|---|---|---|
${rows.join('\n')}

${es ? '⚠️ = el manifiesto, el catálogo y el JS del plugin no coinciden (ver abajo).' : '⚠️ = the manifest, the catalog and the plugin JS do not match (see below).'}

## ${es ? 'Desfases de versión' : 'Version drift'}

${driftRows.length
    ? `| Plugin | ${es ? 'Dónde' : 'Where'} | ${es ? 'Valor encontrado' : 'Value found'} | ${es ? 'Manifiesto' : 'Manifest'} |\n|---|---|---|---|\n${driftRows.join('\n')}`
    : es ? 'Sin desfases.' : 'No drift.'}

${es
    ? 'Mientras no exista una fuente única de metadatos (ver RFC), el catálogo y el JS duplican la versión del manifiesto.'
    : 'Until a single source of metadata exists (see RFC), the catalog and the JS duplicate the manifest version.'}

## ${es ? 'Anunciados en el catálogo (aún no disponibles)' : 'Listed in the catalog (not yet available)'}

${soon.length
    ? soon.map((s) => `- **${s.name}** (\`${s.id}\`, ${s.version}) — ${es ? 'estado' : 'status'}: \`${s.availability}\`. ${es ? 'No es un plugin instalable hoy.' : 'Not an installable plugin today.'}`).join('\n')
    : es ? 'Ninguno.' : 'None.'}
`;
  write(locale, '03-plugins/matriz-de-plugins.md', body);
}

// ---- ejecutar ------------------------------------------------------------------------------------
for (const locale of ['es', 'en']) {
  genCoreApi(locale);
  genMatrix(locale);
  for (const i of pluginInfo) genPluginSheet(locale, i);
}
console.log(`Generado: 1 referencia, 1 matriz y ${pluginInfo.length} fichas (ES+EN) desde nopal@${coreCommit}`);
