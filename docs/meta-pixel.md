# Verificação do Meta Pixel

Pixel: `1469158415094350`. `DownloadApp` representa intenção de download, nunca instalação ou download concluído.

## Conferência local

Com `npm run dev` ativo, execute `node scripts/verify-meta-pixel.mjs`. O teste intercepta a Meta e o destino do APK no navegador, sem transmitir eventos reais nem alterar a URL configurada. Para outra prévia, configure `PIXEL_TEST_URL` no ambiente.

## Meta Pixel Helper e Testar Eventos

1. Abra a página com a extensão oficial Meta Pixel Helper, sem bloqueadores, em um perfil de teste. Antes de aceitar marketing, não deve haver carregamento do Pixel nem eventos. Recusar deve manter esse estado, inclusive após recarregar.
2. Abra Configurações de cookies (no rodapé) e aceite marketing. Confira o ID acima e apenas um PageView. Navegue entre as páginas legais: deve ocorrer um PageView por mudança de endereço, sem reinicialização na navegação interna. Links de âncora não contam como nova página.
3. Clique uma vez em cada botão de download habilitado. Confira um DownloadApp por clique. Botões desabilitados não devem emitir eventos. Use um ambiente de teste e considere que o link real pode baixar o APK.
4. Revogue a autorização em Configurações de cookies (no rodapé). Novos cliques não devem emitir eventos, mas devem continuar usando normalmente o endereço configurado do APK.
5. No Gerenciador de Eventos da Meta, selecione a fonte de dados correspondente ao ID acima, abra Testar Eventos e use o endereço da página acessível pelo navegador de teste. Confirme PageView e DownloadApp após consentir. Verifique também se regras automáticas configuradas na conta não criam eventos adicionais.

A verificação automatizada usa uma implementação simulada da biblioteca Meta. Recebimento real, extensões, bloqueadores, permissões da conta e configuração de campanhas exigem validação no navegador com acesso à conta Meta. Não há fallback de imagem noscript, pois ele contornaria a autorização prévia. Sem JavaScript, esta integração não rastreia.

O cliente deve revisar a política de privacidade e confirmar finalidades, responsáveis, condições de compartilhamento/transferência e retenção aplicáveis antes de publicar. Nada é publicado automaticamente por esta integração.

## Diagnóstico de inicialização e preferências

Nesta versão do Next.js, `next/script` chama `onReady` do script inline antes de `document.body.appendChild(el)` (`node_modules/next/dist/client/script.js`). A integração anterior dependia desse callback e de um efeito React: ambos podiam consultar `__packMetaInitialized` antes da execução do bootstrap. Ao atrasar a inserção em 700 ms no navegador real, o código anterior terminou com o Pixel inicializado, mas `eventCount: 0` e sem PageView.

A inicialização agora emite `pack:meta-pixel-ready` após configurar o Pixel. O componente escuta esse sinal e também verifica o caso em que o bootstrap terminou antes do efeito. O controle de deduplicação continua separado do consentimento. O aviso aguarda a leitura da preferência salva antes de aparecer, evitando reapresentação durante a hidratação.

O botão flutuante foi substituído por “Configurações de cookies” no rodapé. O painel informa Aceitos ou Recusados, permite alterar a escolha e devolve o foco ao controle do rodapé.

Teste com biblioteca real: `node scripts/verify-meta-pixel-real.mjs`. As requisições da Meta não são simuladas; a navegação do APK é cancelada apenas no navegador de teste para evitar baixar o arquivo. O relatório fica em `test-results/meta-pixel-real.json` (ignorado pelo Git). Por padrão o teste reproduz o atraso de 700 ms; defina `PIXEL_RACE_DELAY=0` para testar sem atraso. `PIXEL_TEST_URL` permite apontar para uma prévia local de produção.

O teste real usa identificação normal do Chrome, pois a configuração pública da Meta contém filtragem de bots e o Chromium identificado como headless carregava a biblioteca, mas não transmitia `/tr/`. Nos testes de 390 e 1440 px, o endpoint real respondeu HTTP 200 para PageView e DownloadApp, com uma requisição lógica por ação (redirecionamentos HTTP não são contados como eventos duplicados). Foram verificados consentimento prévio, recusa e revogação, persistência, recarga, navegação interna e abertura pelo rodapé. HTTP 200 comprova transporte; a apresentação no Gerenciador de Eventos ainda precisa ser conferida na conta Meta e pode depender de suas regras e processamento.
