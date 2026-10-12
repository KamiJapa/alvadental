# ALVA DENTAL

Landing page editorial de odontologia contemporânea. **Marca e clínica fictícias, exclusivamente para portfólio.** Não oferece consultas, diagnósticos, atendimento ou reservas reais.

Repositório: https://github.com/KamiJapa/alvadental — branch `main`.

## Experiência

Doze seções: header, hero, essência, seis especialidades, experiência, jornada, filosofia, galeria, solicitação demonstrativa, FAQ, convite final e rodapé. Inclui menu responsivo com Escape, detalhes em dialog nativo, lightbox com setas/teclado e restauração de foco, FAQ nativo e formulário em cinco etapas com edição, retorno, reinício e cópia.

## Stack e identidade

HTML5, Tailwind CSS compilado, CSS autoral, JavaScript ES modules, Lucide e GSAP/ScrollTrigger. Node serve apenas ao desenvolvimento/build/testes. Sem React, backend, banco, analytics ou CDN de produção.

Porcelana `#F7F6F2`, floresta `#263C35`, sálvia `#82978B`, areia `#D9CBB8`, grafite `#353B38`, branco e verde-claro `#E7EDE7`. Cormorant Garamond nos títulos, DM Sans na interface, fontes WOFF2 locais. Monograma geométrico original. Imagens arquitetônicas conceituais geradas por IA, locais em WebP, com dimensões, lazy loading e versões responsivas.

## Estrutura

```text
index.html                 conteúdo, semântica, SEO e dialogs
css/input.css              Tailwind e design system autoral
css/style.css              CSS compilado e minificado
js/config.js               configuração central de WhatsApp
js/appointment.js          estado, validação e resumo da solicitação
js/main.js                 navegação, galeria, especialidades e animações
assets/images/             seis imagens, variantes WebP e imagem social
assets/icons/              monograma, assinatura e favicon
assets/fonts/              fontes locais
assets/vendor/             GSAP, ScrollTrigger e Lucide locais
assets/licenses/           licenças redistribuídas
scripts/                   build, servidor local e preparação do deploy
tests/                     testes unitários de datas e mensagem
.github/workflows/pages.yml CI e publicação estática
```

## Executar e compilar

Requer Node.js 24 e npm. A página publicada não precisa de Node.

```sh
npm ci
npm run build
npm test
npm run dev
```

Abra http://127.0.0.1:4173. Use um servidor HTTP: módulos ES não funcionam corretamente em `file://`. O build copia dependências/fontes/licenças e compila Tailwind; não usa Tailwind Play CDN. `npm run build` é necessário após editar CSS. Para preparar somente arquivos públicos: `node scripts/package.mjs` (saída `_site/`, ignorada pelo Git).

## Editar conteúdo e imagens

Textos institucionais estão em `index.html`; descrições ampliadas, em `js/main.js`; opções do formulário, em `js/appointment.js`. Mantenha a natureza fictícia explícita. Não acrescente profissionais, CRO, depoimentos, avaliações ou promessas inventadas.

Substitua imagens em `assets/images/`, mantenha as versões de 640/1280 px e ajuste `srcset`, `sizes`, dimensões e textos alternativos. Atualize `LICENSE-ASSETS.md` com origem e autorização. O conjunto atual tem seis imagens independentes, sem fotos de pacientes. Nenhuma paisagem representa uma localização real da ALVA.

## Solicitação demonstrativa e WhatsApp

1. Área de interesse, incluindo “Ainda não sei”.
2. Manhã, tarde ou sem preferência.
3. Data futura (a partir de amanhã, calendário local do visitante).
4. Primeiro nome (40 caracteres) e mensagem (300), opcionais.
5. Revisão, edição, cópia e reinício.

Não são mostrados horários disponíveis. Nenhuma reserva é criada. Falha de permissão de clipboard seleciona o texto e apresenta instrução de cópia manual. Os dados ficam somente na memória/DOM da página, sem `localStorage`, cookies, fetch, telemetria ou logs pessoais.

Em `js/config.js`, `WHATSAPP_NUMBER = ''` mantém o modo demo. Somente após autorização de uma clínica real, configure DDI+DDD+número (apenas dígitos). O link abre `wa.me` com mensagem preparada **somente após clique explícito**; o envio depende da pessoa no WhatsApp. A configuração não transforma este projeto em sistema de reservas. Revise também todos os textos de demonstração, privacidade e responsabilidade antes de adaptação real.

## Acessibilidade e movimento

HTML semântico, um h1, skip link, foco visível, labels, fieldsets/legends, mensagens live, progresso, diálogos nativos com foco contido e restaurado, Escape, controles por teclado e FAQ `details/summary`. Respeita `prefers-reduced-motion` tanto no CSS quanto em GSAP matchMedia. Animações opcionais e sem scroll hijacking. Sem JavaScript, conteúdo e FAQ permanecem acessíveis, a galeria abre as imagens diretamente e o formulário explica a necessidade de JS. Auditoria automática não equivale à certificação integral WCAG 2.2 AA.

## SEO

`lang=pt-BR`, title e description do briefing, Open Graph, Twitter Card, favicon, headings e textos alternativos. Nenhum schema representa a marca fictícia como estabelecimento real. URL social preparada para GitHub Pages; canonical só deve ser incluído após confirmação da publicação definitiva.

## Segurança: sete verificações

1. **HTTPS:** usar GitHub Pages com Enforce HTTPS. Redirecionamento e headers devem ser verificados na URL publicada, não inferidos da configuração.
2. **Credenciais:** nenhuma chave/token em código; `.env*`, node_modules e caches ignorados. Não é necessária credencial no navegador.
3. **Validação:** opções permitidas, datas reais futuras, limites de caracteres; dados livres inseridos por `textContent`/`value`, sem HTML dinâmico. Revalidação da data antes de copiar/abrir WhatsApp.
4. **Antispam:** não aplicável à versão sem backend. Antes de criar endpoint, implementar validação no servidor, rate limiting e controles proporcionais; não confiar somente no navegador.
5. **Políticas:** CSP em meta restringe scripts, imagens e fontes à própria origem, `connect-src 'none'`, `form-action 'none'`, `object-src 'none'`. `style-src 'unsafe-inline'` é necessário para estilos de animação GSAP. Referrer-Policy também está em meta. GitHub Pages não permite configurar headers arbitrários por arquivo `_headers`. Em host compatível, adicionar `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Content-Type-Options: nosniff`, CSP por header com `frame-ancestors 'none'` e HSTS após validar HTTPS (e subdomínios antes de `includeSubDomains`). Não afirmar que essas políticas são headers ativos sem inspeção HTTP.
6. **Dependências:** versões controladas no package-lock, instalação via `npm ci`; auditoria npm executada na implementação. Reexecutar `npm audit` ao atualizar.
7. **Auditoria final:** links internos, scripts/fontes/imagens locais, ausência de envio do formulário, erros do console, teclado, responsividade e estados de erro/revisão devem ser conferidos antes de cada publicação.

## GitHub Pages

Workflow valida testes, compila, monta `_site/` e publica com actions oficiais. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**. Em **Actions → Validate and deploy ALVA → Run workflow → main**, execute caso o push anterior tenha ocorrido antes da ativação. Depois ative **Enforce HTTPS**, se disponível. URL esperada: https://kamijapa.github.io/alvadental/.

O status verificado desta entrega e resultados medidos ficam em `VALIDATION.md`. Não confundir a URL esperada com publicação confirmada.

## Limitações e adaptação real

Sem atendimento real, endereço físico, telefone, profissionais, CRO ou redes sociais. Email `.example` é texto demonstrativo, sem envio. Mensagens não têm persistência. Não há calendário de disponibilidade. Testes automatizados não substituem avaliação com tecnologias assistivas e dispositivos reais. Antes de uso comercial, revisar publicidade odontológica, responsabilidade profissional, licenciamento e privacidade conforme normas brasileiras aplicáveis.

Créditos e fontes: [LICENSE-ASSETS.md](./LICENSE-ASSETS.md). Créditos de IA por tarefa não foram disponibilizados pelo ambiente; o percentual exato de 70% não pode ser certificado.

