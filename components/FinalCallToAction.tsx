import { DownloadButton } from "./DownloadButton";
import styles from "./ClosingSections.module.css";

export function FinalCallToAction({ downloadUrl }: { downloadUrl: string | null }) {
  return (
    <section id="download" className={styles.cta} aria-labelledby="final-download-title">
      <div className={`container ${styles.ctaContent}`}>
        <h2 id="final-download-title" className={styles.title}>Invista no seu conhecimento. Desenvolva seu negócio.</h2>
        <p className={styles.ctaDescription}>Tenha conteúdos gratuitos sobre empreendedorismo e gestão reunidos em um aplicativo simples, feito para acompanhar sua evolução profissional.</p>
        <div className={styles.ctaButton}><DownloadButton url={downloadUrl} statusId="final-download-status" helperText="Gratuito para Android. Sem cadastro obrigatório." /></div>
      </div>
    </section>
  );
}


