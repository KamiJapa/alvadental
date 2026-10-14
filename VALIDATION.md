# Validação da ALVA DENTAL

## Implementação e testes

- Doze seções, seis especialidades interativas, seis imagens conceituais, galeria com lightbox, FAQ e formulário demonstrativo em cinco etapas.
- Build de produção, quatro testes unitários e empacotamento aprovados.
- Testes de interface em 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px: sem overflow horizontal.
- Menu mobile, âncoras, modais, Escape, restauração de foco, galeria por teclado e seis FAQs aprovados.
- Formulário: validações de escolhas e datas, revisão, cópia, retorno, edição e reinício aprovados. Conteúdo livre permaneceu texto literal.
- Movimento reduzido e conteúdo/FAQ sem JavaScript verificados.
- Nenhum erro de console ou imagem quebrada nos testes automatizados.
- Auditoria final axe: zero violações nos critérios automáticos WCAG testados. Não equivale à certificação integral de acessibilidade.
- Auditoria de dependências durante a implementação: zero vulnerabilidades reportadas.

## Lighthouse

Medição mobile local em 12/10/2026, antes do último ajuste de contraste: Performance **89**, Accessibility **96**, Best Practices **100**, SEO **92**. As pontuações não garantem os resultados da hospedagem. Performance ficou um ponto abaixo da meta; cache, compressão e entrega de imagens são oportunidades adicionais. Não houve validação integral em Safari, Firefox ou leitores de tela.

## GitHub e publicação

Código publicado na main em 14/10/2026. Commit da implementação: `41cb4edcdce68a48ed743d3b8c8e42d2ebfb331e`.

[Workflow verificado](https://github.com/KamiJapa/alvadental/actions/runs/38638402414): instalação, testes, build e empacotamento aprovados. A etapa de configuração do Pages falhou com `Get Pages site failed / Not Found`: GitHub Pages ainda não habilitado. A URL esperada retornou HTTP 404 em 14/10/2026. O site não foi confirmado online; headers HTTP de produção não foram certificados.

Para ativar:

1. Abra [Settings → Pages](https://github.com/KamiJapa/alvadental/settings/pages) na conta proprietária.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Em **Actions → Validate and deploy ALVA → Run workflow**, selecione **main** e execute.
4. Aguarde sucesso, confira `https://kamijapa.github.io/alvadental/` e ative **Enforce HTTPS**, se disponível.

## Limites

A clínica é fictícia, as imagens são conceituais e nenhum agendamento ou envio real é realizado. O limite exato de 70% de créditos não pôde ser verificado porque não há medição de créditos por tarefa disponível.

