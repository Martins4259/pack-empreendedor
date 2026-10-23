import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de uso | Pack Empreendedor",
  description: "Finalidade educacional, condições de utilização e pendências de confirmação do Pack Empreendedor.",
};

export default function TermsPage() {
  return <LegalPage title="Termos de uso">
    <section><h2>Identificação do responsável</h2>
      <p>A identificação legal do responsável pelo Pack Empreendedor, seus dados institucionais e o contato de atendimento ainda precisam ser fornecidos pelo cliente. Impulso é a marca provisória apresentada no projeto.</p>
    </section>
    <section><h2>Finalidade educacional</h2>
      <p>O projeto apresenta um aplicativo Android gratuito com conteúdos sobre empreendedorismo e gestão. Os materiais têm finalidade educacional. Não há promessa de resultados comerciais, renda, certificação ou atendimento especializado.</p>
      <p>O aplicativo Android está disponível. Consulte as instruções de instalação e as condições técnicas correspondentes à versão distribuída.</p>
    </section>
    <section><h2>Condições de utilização</h2>
      <p>O acesso anunciado é gratuito e sem cadastro obrigatório. O cliente e o desenvolvedor devem manter atualizadas as informações sobre compatibilidade Android, permissões solicitadas e instruções de instalação e acesso aos conteúdos.</p>
      <p>A utilização deve respeitar a legislação e os direitos de terceiros. As condições de acesso, reprodução e uso dos materiais devem ser informadas conforme suas licenças reais; o acesso gratuito não implica autorização irrestrita de cópia ou redistribuição.</p>
    </section>
    <section><h2>Direitos autorais e licenciamento</h2>
      <p>As autorizações para disponibilizar os cursos e demais materiais precisam ser confirmadas pelo responsável antes da publicação do APK. Devem ser identificados os titulares dos direitos, as atribuições exigidas e as condições de licença de cada conteúdo.</p>
      <p>Este documento não concede direitos sobre materiais de terceiros nem declara vínculo institucional com seus autores. Certificados, quando existentes, dependem das condições comprovadas de cada curso.</p>
    </section>
    <section><h2>Responsabilidades e limites</h2>
      <p>As decisões de negócio exigem avaliação do contexto de cada pessoa. O conteúdo educacional não assegura um resultado específico. Isso não afasta deveres de informação, segurança e qualidade nem responsabilidades previstas na legislação aplicável.</p>
      <p>Não se estabelece exclusão geral de responsabilidade ou renúncia a direitos. Permanecem preservados os direitos do usuário, inclusive os previstos no <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">Código de Defesa do Consumidor</a>, quando aplicável.</p>
    </section>
    <section><h2>Atualizações, privacidade e contato</h2>
      <p>As condições de atualização do aplicativo e dos conteúdos e o canal de suporte estão pendentes de confirmação pelo cliente e pelo desenvolvedor. Não há prazo de suporte ou atualização anunciado neste documento.</p>
      <p>Os termos devem ser revisados quando as condições reais forem definidas ou alteradas, com comunicação adequada das mudanças relevantes. O tratamento de dados e suas pendências estão descritos na política de privacidade disponível na navegação abaixo.</p>
    </section>
  </LegalPage>;
}
