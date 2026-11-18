// Publie le site sur GitHub Pages : build statique sous /portfolio/, puis push du dossier out/
// sur la branche gh-pages du dépôt (pas besoin de GitHub Actions).
// Usage : npm run deploy
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });
const out = join(process.cwd(), 'out');
const remote = execSync('git remote get-url origin').toString().trim();

run('npm test');
rmSync(out, { recursive: true, force: true });
run('npm run build', { env: { ...process.env, NEXT_PUBLIC_BASE_PATH: '/portfolio', MSYS_NO_PATHCONV: '1' } });
writeFileSync(join(out, '.nojekyll'), '');

// Dépôt jetable dans out/ : un seul commit poussé de force sur gh-pages
run('git init -q -b gh-pages', { cwd: out });
run('git add -A', { cwd: out });
run('git commit -q -m "Déploiement du portfolio"', { cwd: out });
run(`git push -f "${remote}" gh-pages`, { cwd: out });
rmSync(join(out, '.git'), { recursive: true, force: true });
console.log('\nPublié : https://mazounirayan.github.io/portfolio/');
