import { mkdir, cp } from 'node:fs/promises';
await mkdir('_site', { recursive: true });
for (const item of ['index.html', 'robots.txt', '.nojekyll', 'assets', 'css/style.css', 'js']) {
  await cp(item, `_site/${item}`, { recursive: true });
}
