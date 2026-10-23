import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidade | Pack Empreendedor",
  description: "Informações de privacidade e pontos que dependem de confirmação sobre o site e o aplicativo Pack Empreendedor.",
};

export default function PrivacyPage() {
  return <LegalPage title="Política de privacidade">
    <section><h2>Responsável e abrangência</h2>
      <p>Este documento trata do site e do aplicativo Android Pack Empreendedor. A identificação do responsável pelo tratamento de dados, seus dados institucionais e o canal de privacidade estão pendentes de confirmação pelo cliente. A marca provisória Impulso não substitui essa identificação.</p>
    </section>
    <section><h2>Dados pessoais e finalidades</h2>
      <p>A landing page atual não apresenta formulário de cadastro obrigatório para o download. Isso não significa ausência de tratamento de dados no site, na infraestrutura de hospedagem, no distribuidor do arquivo ou no aplicativo.</p>
      <p>A confirmar pelo cliente e pelo desenvolvedor: quais dados são tratados, como são obtidos, para quais finalidades e com quais bases legais. Também devem ser informados eventuais registros técnicos, cookies, armazenamento no dispositivo, permissões Android e ferramentas de análise, caso existam.</p>
    </section>
    <section><h2>Compartilhamento e serviços externos</h2>
      <p>Quando habilitado, o download encaminhará diretamente ao endereço externo configurado para o APK. O tratamento realizado nesse destino deverá ser consultado nas informações do respectivo fornecedor.</p>
      <p>A confirmar: os fornecedores efetivamente utilizados, os dados compartilhados, as finalidades, os papéis de cada participante e eventuais transferências internacionais. Não há confirmação de serviços integrados ao aplicativo nesta etapa.</p>
    </section>
    <section><h2>Conservação e segurança</h2>
      <p>Os critérios de conservação e eliminação e as medidas de segurança precisam ser definidos conforme o tratamento real e as obrigações aplicáveis. O cliente e o desenvolvedor devem confirmar essas informações, inclusive o procedimento para incidentes. Não são declarados prazos de retenção nem garantias absolutas de segurança.</p>
    </section>
    <section><h2>Direitos dos titulares</h2>
      <p>A LGPD prevê, nas condições aplicáveis, confirmação e acesso aos dados, correção, informações sobre compartilhamento, portabilidade, anonimização, bloqueio ou eliminação de dados irregulares ou excessivos, além de revogação do consentimento e eliminação dos dados tratados com essa base, observadas as exceções legais. Também prevê oposição e revisão de decisões automatizadas nos casos legais.</p>
      <p>O procedimento para receber e atender solicitações, com verificação adequada da identidade, deve ser confirmado pelo responsável. Consulte a <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm">Lei Geral de Proteção de Dados Pessoais</a>.</p>
    </section>
    <section><h2>Contato e atualização deste documento</h2>
      <p>O canal de privacidade e a identificação do encarregado, quando aplicável, ainda não foram fornecidos. Cabe ao cliente disponibilizar um contato real e aprovar este documento após confirmar as práticas do site e do aplicativo com o desenvolvedor. Alterações relevantes deverão ser refletidas nesta página sempre que houver mudanças no tratamento de dados.</p>
    </section>
  </LegalPage>;
}
