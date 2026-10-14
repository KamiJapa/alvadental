import { mkdir, copyFile, readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
await mkdir('assets/vendor', { recursive: true }); await mkdir('assets/fonts', { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) await copyFile(`node_modules/gsap/dist/${file}`, `assets/vendor/${file}`);
// Ship only the icon geometry used in the page, not the complete icon catalog.
const lucide = createRequire(import.meta.url)('lucide');
const html = await readFile('index.html', 'utf8');
const icons = Object.fromEntries([...new Set([...html.matchAll(/data-lucide="([^"]+)"/g)].map(m => m[1]))].map(name => [name, lucide[name.replace(/(^|-)([a-z])/g, (_, dash, letter) => letter.toUpperCase())]]));
await writeFile('assets/vendor/lucide.min.js', `/* Lucide ISC license: ../licenses/lucide.txt. Project-local subset renderer. */\nwindow.lucide={createIcons(){const icons=${JSON.stringify(icons)};document.querySelectorAll('[data-lucide]').forEach(el=>{const nodes=icons[el.dataset.lucide];if(!nodes)return;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const [k,v] of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'}))svg.setAttribute(k,v);nodes.forEach(([tag,attrs])=>{const child=document.createElementNS(svg.namespaceURI,tag);Object.entries(attrs).forEach(([k,v])=>child.setAttribute(k,v));svg.append(child)});el.replaceWith(svg)})}};`);
for (const [pkg, target, weight, style] of [['cormorant-garamond','cormorant',400,'normal'],['cormorant-garamond','cormorant',400,'italic'],['dm-sans','dm',400,'normal'],['dm-sans','dm',500,'normal']]) {
  const source = `node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-${style}.woff2`;
  await copyFile(source, `assets/fonts/${target}-latin-${weight}${style === 'italic' ? '-italic' : ''}.woff2`);
}
await mkdir('assets/licenses', { recursive: true });
for (const pkg of ['lucide','gsap','@fontsource/cormorant-garamond','@fontsource/dm-sans']) {
  const names = await readdir(`node_modules/${pkg}`); const license = names.find(n => /^licen[sc]e/i.test(n));
  if (license) await copyFile(`node_modules/${pkg}/${license}`, `assets/licenses/${pkg.replaceAll('/','-').replace('@','')}.txt`);
}
execFileSync(process.execPath, ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', 'css/input.css', '-o', 'css/style.css', '--minify'], { stdio: 'inherit' });
console.log('Produção pronta: CSS, fontes e bibliotecas locais.');
