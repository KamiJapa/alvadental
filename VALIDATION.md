# Validação — 12/10/2026

## Ambiente e verificações executadas

- Prévia local: `http://127.0.0.1:4173`, build estático, navegador integrado do Codex para inspeção e interações.
- Auditoria complementar automatizada: Playwright com Chrome instalado, headless, e Lighthouse mobile. Ferramentas e screenshots fora do repositório. A conexão do Chrome ao localhost exigiu execução fora do sandbox.
- `npm run build`, `npm test` (4 testes), `node scripts/package.mjs`: aprovados.
- 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px: largura do documento igual à largura disponível, sem overflow horizontal.
- Seis especialidades: abertura, conteúdo, Tab dentro do dialog, Escape e restauração de foco aprovados.
- Seis imagens da galeria: abertura e carregamento; setas do teclado e fechamento aprovados.
- Seis FAQs: abrir/fechar por clique e Enter aprovados.
- Menu mobile, Escape, links internos e destinos de âncoras aprovados.
- Formulário: bloqueio de opções vazias e data passada, cinco etapas, revisão, copiar, voltar, editar, preservar escolhas e reiniciar aprovados. Texto com marcação HTML permaneceu texto literal.
- Cópia real pelo clipboard autorizada no contexto de teste; mensagem não foi enviada. Nenhum agendamento criado.
- Movimento reduzido: `scroll-behavior: auto` e reversão de GSAP. Conteúdo/FAQ e aviso de formulário disponíveis sem JS.
- Nenhum erro de console ou imagem quebrada nos testes automatizados.
- `npm install`: auditoria de 32 pacotes, zero vulnerabilidades reportadas.

## Correções decorrentes dos testes

Conflito do nome container com utilitário Tailwind; timeline em 320 px; preferência de movimento reduzido sobre estilo inline; contraste preservado durante animações; aviso sem JS; nome acessível do logotipo; contraste de números da seção experiência. Subconjunto Lucide substituiu catálogo completo no build.

## Lighthouse local

Última medição mobile antes do ajuste final de cor dos números: Performance **89**, Accessibility **96**, Best Practices **100**, SEO **92**. Condição: servidor local sem compressão e cache de produção. São medições reais desta execução, não garantias da hospedagem. Performance ficou um ponto abaixo da meta 90; resta oportunidade em entrega de imagens, cache e carregamento. Não foi feita auditoria integral com leitor de tela ou Safari/Firefox.

## Publicação

Workflow GitHub Pages preparado. Status público deve ser confirmado após push e ativação. As instruções exatas de ativação estão no README. Não há headers HTTP de produção confirmados nesta etapa.

## Orçamento

O ambiente expôs limites compartilhados da conta, sem consumo de créditos por tarefa. No início, 10% da janela de 5 horas e 17% da semanal estavam usados. Não é possível certificar um percentual exato de créditos desta tarefa. Uma única implementação, sem agentes paralelos e com testes dirigidos.
