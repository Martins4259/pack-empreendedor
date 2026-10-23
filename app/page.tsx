import Image from "next/image";
import { ArrowDown, BookOpen, FolderDown, UserRoundCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { DownloadButton } from "@/components/DownloadButton";
import { CourseCarousel } from "@/components/CourseCarousel";
import { AudienceSection } from "@/components/AudienceSection";
import { PackSection } from "@/components/PackSection";
import { DownloadStepsSection } from "@/components/DownloadStepsSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCallToAction } from "@/components/FinalCallToAction";
import { SiteFooter } from "@/components/SiteFooter";
import { pack } from "@/lib/config";
export default function Home() {
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header downloadUrl={pack.downloadUrl} />
    <main id="conteudo">
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" />Sebrae</p>
            <h1 id="hero-title">Baixe grátis o app com <span><strong className="hero-number">10</strong> cursos para desenvolver seu negócio!</span></h1>
            <p className="hero-description">Aprenda sobre gestão, finanças, marketing, vendas e atendimento com conteúdos gratuitos organizados em um aplicativo simples e fácil de usar, feito para quem deseja evoluir como empreendedor.</p>
            <DownloadButton url={pack.downloadUrl} helperText="Gratuito para Android. Fácil de baixar e sem cadastro obrigatório." />
            <div className="hero-benefits"><span><BookOpen size={17} aria-hidden="true" />Conhecimento para empreender</span><span><UserRoundCheck size={17} aria-hidden="true" />Sem cadastro obrigatório</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><Image src="/images/hero.webp" alt="Profissionais colaborando no planejamento de um negócio em um escritório" fill priority sizes="(min-width: 1024px) 46vw, 90vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} /></div>
            <div className="photo-caption"><FolderDown size={29} strokeWidth={1.5} aria-hidden="true" /><div><span>Conhecimento para o seu negócio.</span><p>Empreendedorismo, gestão, marketing e vendas.</p></div></div>
            <span className="visual-label">Sebrae</span>
          </div>
        </div>
        <div className="container hero-foot"><span>Conhecimento para desenvolver seu negócio.</span><a href="#cursos">Conheça o conteúdo <ArrowDown size={16} aria-hidden="true" /></a></div>
      </section>
      <CourseCarousel />
      <AudienceSection />
      <PackSection downloadUrl={pack.downloadUrl} />
      <DownloadStepsSection />      <FaqSection />
      <FinalCallToAction downloadUrl={pack.downloadUrl} />
    </main>
    <SiteFooter privacyUrl="/politica-de-privacidade" termsUrl="/termos-de-uso" />
  </>;
}






