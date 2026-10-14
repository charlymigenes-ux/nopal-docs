// Clona o actualiza (solo lectura) los repositorios públicos incluidos en el alcance.
// Destino: .sources/ (ignorado por git) o NOPAL_SOURCES.
// No ejecuta ningún código de los repositorios descargados.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { SOURCES, scope } from './lib/common.mjs';

const OWNER = scope.github_owner;
fs.mkdirSync(SOURCES, { recursive: true });

for (const repo of scope.included_repos) {
  const dir = path.join(SOURCES, repo);
  const full = (scope.full_history_repos || []).includes(repo); // el changelog necesita el historial completo
  const url = `https://github.com/${OWNER}/${repo}.git`;
  if (fs.existsSync(path.join(dir, '.git'))) {
    console.log(`actualizando ${repo}`);
    if (full) {
      const shallow = execFileSync('git', ['-C', dir, 'rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true';
      execFileSync('git', ['-C', dir, 'fetch', ...(shallow ? ['--unshallow'] : []), 'origin'], { stdio: 'inherit' });
    } else {
      execFileSync('git', ['-C', dir, 'fetch', '--depth', '1', 'origin'], { stdio: 'inherit' });
    }
    execFileSync('git', ['-C', dir, 'reset', '--hard', 'FETCH_HEAD'], { stdio: 'inherit' });
  } else {
    console.log(`clonando ${repo}`);
    execFileSync('git', ['clone', ...(full ? [] : ['--depth', '1']), url, dir], { stdio: 'inherit' });
  }
}
console.log(`Fuentes en ${SOURCES}`);
