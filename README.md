# Pack Empreendedor

Aplicação independente preservando o projeto ULPO existente. Next.js App Router, TypeScript, Tailwind CSS, Lucide e Embla.

## Uso

Node.js 22.18 ou superior. Nesta pasta, execute `npm install` e `npm run dev`. Acesse http://127.0.0.1:3100.

Validações: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:ui`.

## Estrutura

- app: página inicial, layout, metadados, estilos e tokens.
- components: cabeçalho, download, card e carrossel reutilizáveis.
- data/courses.ts: catálogo dos dez cursos confirmados.
- config/app-download.ts: configuração única para habilitar o download e definir o link externo.
- lib/config.ts: validação do endereço e registro das seções futuras.
- public/images: fotografias WebP locais.
- docs: fontes de imagens e relatório de validação.
- tests: testes responsivos e de interação.

## Distribuição externa do APK

Edite somente `config/app-download.ts` para controlar os quatro botões existentes:

```ts
export const appDownload = {
  enabled: false,
  apkUrl: "",
};
```

1. Receba o APK e confirme com o desenvolvedor sua origem, assinatura, integridade e autorização de distribuição. Teste a instalação e a abertura em um Android real compatível.
2. Publique o APK preferencialmente no GitHub Releases do cliente. Copie o link HTTPS direto do arquivo, não o endereço da página do release. Qualquer URL externa HTTPS válida é aceita.
3. Cole o link real entre as aspas de `apkUrl` e altere `enabled` para `true`. Gere uma nova build e publique a atualização do site para aplicar a configuração.
4. Para desativar, altere `enabled` para `false`; você também pode esvaziar `apkUrl`. Gere uma nova build e atualize o site. Os quatro botões voltarão ao estado “Aplicativo em preparação.”.
5. Para uma nova versão do APK, valide e publique o novo arquivo, substitua apenas `apkUrl` pelo novo link direto e atualize a build do site.

A validação aceita somente endereços absolutos HTTPS sem credenciais. Ela não verifica a existência ou a segurança do APK nem realiza requisições durante a build. Os botões apontam diretamente ao endereço externo, sem assets locais, rotas, proxies ou redirecionamentos internos. As antigas variáveis de ambiente de download não são utilizadas.

Configure `SITE_URL` com a origem pública real. A indexação permanece desabilitada até concluir a preparação.

## Etapas futuras

O registro futureSections prepara público, pacote completo, instruções, FAQ, chamada final, informações institucionais e agradecimento. Não há blocos vazios nem página de sucesso fictícia. Adicionar cada seção somente com conteúdo confirmado.

Antes de publicar: validar o APK real, URL, direitos de redistribuição, certificados e condições reais. Adicionar contato, termos e privacidade reais. Revisar indexação e metadados.

GitHub: versionar esta pasta incluindo package-lock.json. Vercel: escolher pack-empreendedor como Root Directory e o preset Next.js. Nenhuma publicação foi realizada ou configurada.


