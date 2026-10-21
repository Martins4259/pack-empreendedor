# Pack Empreendedor: Bloco 2

## Implementação

Seção “Conhecimento para quem quer ir mais longe” integrada imediatamente depois do carrossel, com o título e os dois parágrafos solicitados, sem acréscimos editoriais.

Componente de servidor reutilizável AudienceSection, sem dependências novas ou JavaScript de interação. CSS Module isola os estilos da nova seção. Foram reutilizados os tokens de azul, branco, texto auxiliar, espaçamento da seção e largura do container.

Em desktop a composição apresenta texto à esquerda e fotografia à direita, com alinhamento central e espaço entre colunas. Em mobile e tablet o texto precede a imagem, que respeita as margens existentes. Tipografia dos parágrafos entre 15 e 17 px, com entrelinha confortável. Não há card envolvendo o conjunto, ícones desnecessários, sombras, gradientes ou cores novas de interface.

A fotografia utiliza next/image, dimensões reservadas de 1440 × 960, carregamento sob demanda, sizes responsivo e texto alternativo. O enquadramento é 4:3 em desktop e 3:2 nas larguras menores, usando object-fit: cover para preservar as proporções do assunto. Bordas arredondadas de 20 a 24 px.

## Arquivos criados

- components/AudienceSection.tsx.
- components/AudienceSection.module.css.
- public/images/audience.webp.
- tests/audience.spec.ts.
- docs/screenshots/bloco-2/375.png.
- docs/screenshots/bloco-2/390.png.
- docs/screenshots/bloco-2/768.png.
- docs/screenshots/bloco-2/1024.png.
- docs/screenshots/bloco-2/1440.png.
- docs/screenshots/bloco-2/1920.png.
- docs/bloco-2.md, este relatório.

## Arquivos modificados

- app/page.tsx: somente importação e inclusão de AudienceSection após CourseCarousel, além de nova linha no fim do arquivo.
- docs/image-sources.json: inclusão da entrada audience, mantendo os dados das dez entradas anteriores. A serialização JSON também normalizou a formatação.
- scripts/download-images.mjs: tamanho próprio para a nova foto e altura dinâmica da folha de contato, para que o script suporte a décima primeira imagem.
- docs/screenshots/375.png, 390.png, 768.png, 1024.png, 1440.png e 1920.png: capturas completas atualizadas pelos testes anteriores.

Nenhuma alteração em dependências, estilos globais, cabeçalho, headline, botão de download, comportamento do carrossel, cards existentes, cursos ou configuração de distribuição.

## Fotografia e licença

Foto: “A Woman in Yellow Dress Sitting while Using Her Laptop”, de Thirdman, no Pexels. Retrata uma mulher trabalhando em um notebook em uma pequena loja de roupas.

- [Página original](https://www.pexels.com/photo/a-woman-in-yellow-dress-sitting-while-using-her-laptop-8484031/).
- [Licença Pexels](https://www.pexels.com/license/).
- Identificador: 8484031.
- Dimensão original informada pela fonte: 6720 × 4480.
- Arquivo local: public/images/audience.webp, 1440 × 960, 53.954 bytes.
- Página de origem e condições de uso consultadas nesta execução. A licença permite uso em websites e modificações, sem sugerir endosso das pessoas retratadas.
- Imagem inspecionada visualmente, sem marca d’água. Seu uso é editorial na composição da página e não apresenta a pessoa como cliente ou depoente.

## Testes executados

- npm run lint: aprovado, sem erros ou avisos.
- npm run typecheck: aprovado.
- npm run build: aprovado, incluindo geração estática da página inicial.
- npm run test:ui: aprovado, 15 testes em 41,8 segundos.
- node --check scripts/download-images.mjs: aprovado.

Os nove testes anteriores passaram integralmente, incluindo os seis layouts, menu acessível, movimento automático, pausa, loop, arraste por mouse, toque e movimento reduzido.

Os seis novos testes verificam, em 375, 390, 768, 1024, 1440 e 1920 px:

- Presença do título e dos dois parágrafos exatos.
- Ordem imediata após o carrossel pelo seletor #cursos + #para-quem.
- Carregamento e decodificação da imagem.
- Resolução responsiva suficiente para a área renderizada.
- Ausência de rolagem horizontal.
- Preservação de margens e proporções de recorte.
- Texto antes da imagem em telas menores.
- Texto à esquerda e imagem à direita a partir de 1024 px.
- Corpo de texto de pelo menos 15 px.
- Captura atualizada da seção.

Todas as seis capturas da seção foram abertas e inspecionadas visualmente.

## Capturas

- [375 px](screenshots/bloco-2/375.png).
- [390 px](screenshots/bloco-2/390.png).
- [768 px](screenshots/bloco-2/768.png).
- [1024 px](screenshots/bloco-2/1024.png).
- [1440 px](screenshots/bloco-2/1440.png).
- [1920 px](screenshots/bloco-2/1920.png).

## Problemas encontrados e corrigidos

O teste em 1920 px identificou que o sizes de 620 px ficava ligeiramente abaixo da largura efetiva da foto, de aproximadamente 627 px. O tamanho declarado para telas grandes foi ajustado a 640 px, e os quinze testes passaram na repetição.

A folha de contato do script de imagens tinha altura fixa para dez fotos. Foi preparada uma altura calculada pelo número de entradas para suportar a nova fotografia sem cortar a folha ou provocar erro em uma futura execução do script. A foto audience também preserva seus 1440 px na rotina de otimização.

## Preservação e limites

Comparações SHA-256 antes e depois confirmaram que Header.tsx, DownloadButton.tsx, CourseCarousel.tsx, CourseCard.tsx, data/courses.ts, lib/config.ts e .env.example permaneceram idênticos. Também permaneceram idênticos package.json, package-lock.json e src/App.tsx da aplicação ULPO. Nenhuma operação de escrita foi direcionada à aplicação ULPO.

Não houve commit, push, publicação ou alteração em variáveis de ambiente. As seções futuras não foram implementadas.

Validação de navegador realizada no Chromium, incluindo emulação de toque. Aparelhos físicos, Safari e Firefox não foram testados. O script de obtenção completa das imagens não foi reexecutado para evitar regravar as dez imagens anteriores; foi validada sua sintaxe, e a nova fotografia foi obtida e otimizada separadamente.

## Pendências

Nenhuma pendência funcional identificada no Bloco 2.

As pendências do Bloco 1, como décimo curso, arquivo de distribuição e validação de direitos, permanecem fora do escopo desta etapa. O alerta anterior da cadeia de ferramentas de lint não foi reavaliado nesta alteração.

