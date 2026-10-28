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
import closingStyles from "./ClosingSections.module.css";
import { pack } from "@/lib/config";
export function LandingPage({ showDownloads = true }: { showDownloads?: boolean }) {
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header downloadUrl={pack.downloadUrl} showDownload={showDownloads} informational={!showDownloads} />
    <main id="conteudo">
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" />Sebrae</p>
            <h1 id="hero-title">{showDownloads ? <>Baixe grátis o app com <span><strong className="hero-number">10</strong> cursos para desenvolver seu negócio!</span></> : <>Conheça conteúdos para desenvolver seu negócio</>}</h1>
            <p className="hero-description">{showDownloads ? "Aprenda sobre gestão, finanças, marketing, vendas e atendimento com conteúdos gratuitos organizados em um aplicativo simples e fácil de usar, feito para quem deseja evoluir como empreendedor." : "Esta página é apenas informativa. Não vendemos cursos, produtos ou serviços. Para conhecer os conteúdos, acesse o site oficial do Sebrae Goiás."}</p>
            {showDownloads && <DownloadButton url={pack.downloadUrl} helperText="Gratuito para Android. Fácil de baixar e sem cadastro obrigatório." />}
            {!showDownloads && <a className="button primary" href="https://bibliotecadigital.sebraego.com.br/sebrae-go/conteudos">Acesse o site oficial</a>}
            <div className="hero-benefits"><span><BookOpen size={17} aria-hidden="true" />Conhecimento para empreender</span><span><UserRoundCheck size={17} aria-hidden="true" />{showDownloads ? "Sem cadastro obrigatório" : "Página informativa, sem vendas"}</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><Image src="/images/hero.webp" alt="Profissionais colaborando no planejamento de um negócio em um escritório" fill priority sizes="(min-width: 1024px) 46vw, 90vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} /></div>
            <div className="photo-caption"><FolderDown size={29} strokeWidth={1.5} aria-hidden="true" /><div><span>Conhecimento para o seu negócio.</span><p>Empreendedorismo, gestão, marketing e vendas.</p></div></div>
            <span className="visual-label">Sebrae</span>
          </div>
        </div>
        <div className="container hero-foot"><span>Conhecimento para desenvolver seu negócio.</span><a href="#cursos">Conheça o conteúdo <ArrowDown size={16} aria-hidden="true" /></a></div>
      </section>
      <CourseCarousel informational={!showDownloads} />
      <AudienceSection />
      {showDownloads && <PackSection downloadUrl={pack.downloadUrl} />}
      {showDownloads && <DownloadStepsSection />}      {showDownloads && <FaqSection />}
      {showDownloads ? <FinalCallToAction downloadUrl={pack.downloadUrl} /> : <section id="site-oficial" className={closingStyles.cta} aria-labelledby="official-title"><div className={`container ${closingStyles.ctaContent}`}><h2 id="official-title" className={closingStyles.title}>Para conhecer, acesse o site oficial!</h2><p className={closingStyles.ctaDescription}>Não vendemos nada. Esta página tem finalidade exclusivamente informativa. Consulte os conteúdos e as condições de participação diretamente no site oficial do Sebrae Goiás.</p><a className="button primary" href="https://bibliotecadigital.sebraego.com.br/sebrae-go/conteudos">Saiba mais no site oficial</a></div></section>}
    </main>
    <SiteFooter informational={!showDownloads} privacyUrl="/politica-de-privacidade" termsUrl="/termos-de-uso" />
  </>;
}






