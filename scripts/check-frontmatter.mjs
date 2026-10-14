// Validador de front-matter (Standard §5, §17, §18 y Anexo A).
// Uso: node scripts/check-frontmatter.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve('docs');
const AUDIENCES = ['user', 'admin', 'developer', 'reference'];
const TYPES = ['tutorial', 'how-to', 'reference', 'explanation', 'rfc'];
const STATUSES = ['implemented', 'convention', 'experimental', 'rfc', 'deprecated'];
// Secciones donde, por el Standard §5/§16, solo cabe contenido de cierto nivel.
const USER_FACING = ['01-usuario', '02-administracion'];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(md|mdx)$/.test(e.name) ? [p] : [];
  });
}

const errors = [];
const warnings = [];

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const err = (m) => errors.push(`${rel}: ${m}`);

  if (!data.title) err('falta `title`');
  if (!AUDIENCES.includes(data.audience)) err(`\`audience\` inválido: ${data.audience}`);
  if (!TYPES.includes(data.type)) err(`\`type\` inválido: ${data.type}`);
  if (!STATUSES.includes(data.status)) err(`\`status\` inválido: ${data.status}`);

  const isStub = data.stub === true;
  if (!isStub && data.status !== 'rfc' && !data.verified_against) {
    err('falta `verified_against` (obligatorio salvo stub o rfc)');
  }
  if (isStub && /```|\/api\/|GET |POST /.test(content)) {
    err('una página `stub` no puede contener código ni rutas de API');
  }

  // RFC solo en 07-rfc y 07-rfc solo RFC.
  const inRfc = rel.startsWith('07-rfc/');
  if (data.status === 'rfc' && !inRfc) err('las páginas `rfc` deben vivir en docs/07-rfc/');
  if (inRfc && data.status !== 'rfc') err('toda página de 07-rfc debe tener `status: rfc`');
  if (inRfc && !content.includes('<StatusBanner')) {
    err('las páginas RFC deben mostrar <StatusBanner status="rfc" /> (Standard §5)');
  }

  // Nada rfc enlazado desde Usuario/Administración (Standard §18).
  if (USER_FACING.some((s) => rel.startsWith(`${s}/`)) && /\]\(\/?(\.\.\/)*07-rfc/.test(content)) {
    err('Usuario/Administración no deben enlazar a RFC');
  }
}

for (const w of warnings) console.warn(`aviso  ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} error(es) de front-matter:\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(`front-matter OK (${walk(ROOT).length} páginas)`);
