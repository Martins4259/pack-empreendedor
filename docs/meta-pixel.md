# Verificação do Meta Pixel

Pixel: `1469158415094350`. `DownloadApp` representa intenção de download, nunca instalação ou download concluído.

## Conferência local

Com `npm run dev` ativo, execute `node scripts/verify-meta-pixel.mjs`. O teste intercepta a Meta e o destino do APK no navegador, sem transmitir eventos reais nem alterar a URL configurada. Para outra prévia, configure `PIXEL_TEST_URL` no ambiente.

## Meta Pixel Helper e Testar Eventos

1. Abra a página com a extensão oficial Meta Pixel Helper, sem bloqueadores, em um perfil de teste. Antes de aceitar marketing, não deve haver carregamento do Pixel nem eventos. Recusar deve manter esse estado, inclusive após recarregar.
2. Abra Preferências de privacidade e aceite marketing. Confira o ID acima e apenas um PageView. Navegue entre as páginas legais: deve ocorrer um PageView por mudança de endereço, sem reinicialização na navegação interna. Links de âncora não contam como nova página.
3. Clique uma vez em cada botão de download habilitado. Confira um DownloadApp por clique. Botões desabilitados não devem emitir eventos. Use um ambiente de teste e considere que o link real pode baixar o APK.
4. Revogue a autorização em Preferências de privacidade. Novos cliques não devem emitir eventos, mas devem continuar usando normalmente o endereço configurado do APK.
5. No Gerenciador de Eventos da Meta, selecione a fonte de dados correspondente ao ID acima, abra Testar Eventos e use o endereço da página acessível pelo navegador de teste. Confirme PageView e DownloadApp após consentir. Verifique também se regras automáticas configuradas na conta não criam eventos adicionais.

A verificação automatizada usa uma implementação simulada da biblioteca Meta. Recebimento real, extensões, bloqueadores, permissões da conta e configuração de campanhas exigem validação no navegador com acesso à conta Meta. Não há fallback de imagem noscript, pois ele contornaria a autorização prévia. Sem JavaScript, esta integração não rastreia.

O cliente deve revisar a política de privacidade e confirmar finalidades, responsáveis, condições de compartilhamento/transferência e retenção aplicáveis antes de publicar. Nada é publicado automaticamente por esta integração.
