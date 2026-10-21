# Entrega da fundação: Pack Empreendedor

Data: 19 de outubro de 2026.

## Resultado e preservação

Aplicação Next.js independente criada em pack-empreendedor/. A aplicação React/Vite ULPO existente foi preservada. Nenhuma publicação, commit ou push foi realizado. Prévia local iniciada em http://127.0.0.1:3100. A abertura do painel do navegador foi solicitada; o aplicativo retornou status queued.

## Arquivos criados

Todos os caminhos abaixo são relativos a pack-empreendedor/:

- package.json e package-lock.json: dependências e scripts independentes.
- tsconfig.json e next-env.d.ts: TypeScript e tipos do Next.js.
- next.config.ts: configuração e raiz explícita do Turbopack.
- postcss.config.mjs e eslint.config.mjs: Tailwind e lint.
- .gitignore e .env.example: exclusões e configuração segura.
- app/layout.tsx: Inter local, idioma pt-BR, SEO e Open Graph.
- app/page.tsx: composição da landing page.
- app/globals.css: tokens da paleta, espaçamento e estilos responsivos.
- components/Header.tsx: marca centralizada, navegação desktop e diálogo mobile.
- components/DownloadButton.tsx: CTA real ou desabilitado.
- components/CourseCard.tsx: imagem, título e descrição.
- components/CourseCarousel.tsx: Embla, controles e movimento.
- data/courses.ts: nove cursos e tipagem extensível.
- lib/config.ts: validação do endereço e registro de seções futuras.
- public/images/hero.webp, finance.webp, social.webp, team.webp, marketing.webp, service.webp, pricing.webp, business.webp, emotional.webp e cashflow.webp.
- scripts/download-images.mjs: obtenção e otimização reproduzível das fotografias.
- docs/image-sources.json: páginas individuais e licença do Pexels.
- docs/image-contact-sheet.png: contato visual das fotografias.
- docs/screenshots/375.png, 390.png, 768.png, 1024.png, 1440.png e 1920.png: capturas das seis larguras.
- playwright.config.ts e tests/landing.spec.ts: testes de navegador.
- README.md: execução, configuração e futura integração GitHub/Vercel.
- docs/entrega.md: este relatório.

## Funcionalidades

Cabeçalho branco, marca Impulso visualmente centralizada em todas as larguras testadas e layout predominantemente azul. Hero com headline e texto aprovados. CTA em destaque, sem formulário obrigatório.

Menu mobile com diálogo modal, foco inicial, ciclo de Tab e Shift+Tab, botão de fechar, Escape e restauração de foco. Links apontam somente para conteúdo existente.

Carrossel imediatamente abaixo do hero. Quatro cards em telas grandes, três em notebook, dois e parte do próximo em tablet, um e aproximadamente 25% do próximo em mobile. Loop, movimento lento da direita para a esquerda, pausa por hover e foco, controle explícito de pausa, arraste por mouse e toque e respeito a movimento reduzido. Retomada preparada para reinicialização responsiva e visibilidade da página.

Cards com altura uniforme, área de imagem 16:10, object-fit cover, recortes individuais, textos alternativos, dimensões reservadas e imagens responsivas com next/image. Fotografias locais distintas para cada curso, mais uma para o hero. Dez arquivos WebP somam 591.252 bytes.

Sem emojis, numeração decorativa, vínculos sugeridos com Sebrae, depoimentos, indicadores artificiais ou links legais fictícios. O décimo curso não foi inventado. As descrições estão identificadas como editoriais.

Download habilitado somente com URL HTTPS válida e PACK_REDISTRIBUTION_APPROVED=true. Ausência de configuração mantém o botão desabilitado e a pendência visível. A confirmação administrativa não substitui a revisão dos direitos dos materiais. Abrir uma URL de distribuição não é apresentado como confirmação de download concluído.

Seções futuras registradas em configuração, sem conteúdo fictício ou página de agradecimento que simule sucesso. Indexação bloqueada enquanto a página estiver em preparação. Origem pública e imagens sociais dependem de SITE_URL real.

## Testes executados

- npm run lint: aprovado, sem erros ou avisos na última execução.
- npm run typecheck: aprovado.
- npm run build: aprovado. Página inicial gerada estaticamente, sem os avisos iniciais de raiz e metadataBase.
- npm run test:ui: última execução aprovada, 9 testes em 29,1 segundos.
- Seis testes de layout: 375, 390, 768, 1024, 1440 e 1920 pixels.
- Verificados por asserções: ausência de overflow horizontal, centro geométrico da marca, proporção de cards por breakpoint, visibilidade parcial do próximo no mobile, alturas uniformes, imagens 16:10, CTA desabilitado, nove cards e ausência de emojis.
- Verificadas abertura e navegação do menu com teclado, ciclo reverso de foco, Escape, botão de fechar e links.
- Verificados movimento automático, pausa, arraste por mouse, navegação em loop, movimento reduzido e gesto de toque em contexto mobile Chromium.
- Sem erros JavaScript de página nos testes de layout. Carregamento das imagens visíveis verificado.
- Cinco cenários de configuração executados com Node: ausência de URL, ausência de aprovação, esquema javascript, HTTP e HTTPS aprovado. Todos passaram. Os endereços de exemplo ficaram restritos ao teste, sem requisições ou uso na interface.
- Revisão visual das fotografias e capturas desktop, tablet e mobile.
- npm audit --omit=dev --json: zero vulnerabilidades de produção.

Limites: testes de navegador executados no Chromium, com toque emulado. Não foram testados aparelhos físicos, Safari ou Firefox. Não existe arquivo real para testar download concluído. Os testes da aplicação ULPO original não foram executados, pois ela não foi alterada.

## Problemas encontrados e corrigidos

- Limite de tamanho de comandos do Windows: gravação dividida em lotes menores.
- Caminhos de imagens no Windows: script ajustado com fileURLToPath.
- Recorte de marketing ocultava o notebook: posição ajustada para preservar o assunto.
- Link de pular conteúdo aparecia em capturas após rolagem: ocultação corrigida mantendo acesso por foco.
- Ciclo reverso de foco no diálogo: wrap de Tab e Shift+Tab implementado e retestado.
- Teste tentava usar hover em card continuamente móvel: interação passou a usar coordenadas estáveis do viewport.
- Raiz ambígua do Next.js devido a múltiplos lockfiles: raiz explícita.
- Metadados sociais sem origem definitiva: não são emitidos com URL fictícia.
- Aviso de lint no PostCSS: exportação nomeada.
- Recorte mobile ajustado para não exceder a exposição solicitada do próximo card.
- Medição do recorte em subpixels: arredondamento do teste a uma casa decimal.
- Descoberta de testes oscilou sem configuração explícita: script passou a selecionar playwright.config.ts; última execução encontrou e aprovou os nove testes.

## Pendências

- Definir o décimo curso.
- Fornecer arquivo único, formato e URL real.
- Confirmar direitos de redistribuição de todos os materiais de terceiros.
- Confirmar condições reais de acesso, certificados e suporte.
- Fornecer contato institucional, termos e política de privacidade.
- Definir domínio e SITE_URL, revisar metadados e liberar indexação somente quando apropriado.
- Auditoria completa reportou cinco entradas de severidade alta na mesma cadeia de dependências de desenvolvimento do eslint-config-next: plugin Next, fast-glob, micromatch e braces. A versão mais recente consultada de braces foi 3.0.3, ainda afetada por GHSA-vfj7-8cjw-p6xm. Nenhuma versão corrigida foi encontrada; o downgrade incompatível sugerido por npm audit não foi aplicado. A dependência não integra o runtime de produção. Monitorar correção upstream antes de colocar a cadeia de desenvolvimento em uso com entradas não confiáveis.
- Git na raiz existente retornou “this operation must be run in a work tree”; nenhuma tentativa de reparar metadados ou alterar o histórico foi feita.

## Próximos passos

Revisar a prévia e confirmar os conteúdos pendentes. Inserir o décimo curso no array existente. Validar a distribuição e os direitos antes de configurar as duas variáveis que habilitam o CTA. Implementar as seções adicionais com fatos confirmados. Validar em navegadores e aparelhos adicionais. Somente depois preparar GitHub/Vercel e publicação, utilizando esta subpasta como Root Directory.

