import { DownloadButton } from "./DownloadButton";
import { MoveUpRight } from "lucide-react";
import styles from "./PackSection.module.css";

export function PackSection({ downloadUrl }: { downloadUrl: string | null }) {
  return (
    <section id="pacote" className={styles.section} aria-labelledby="pack-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.visual} role="img" aria-label="Prévia ilustrativa de um smartphone Android com a marca Impulso e o nome Pack Empreendedor na tela">
          <div className={styles.collection} aria-hidden="true">
            <div className={styles.phone}>
              <div className={styles.screen}>
                <span className={styles.camera} />
                <div className={styles.splash}>
                  <div className={styles.appLogo}><MoveUpRight strokeWidth={3} /><span>impulso<span>.</span></span></div>
                  <span className={styles.appName}>Pack Empreendedor</span>
                </div>
                <span className={styles.gestureBar} />
              </div>
            </div>
          </div>
          <p className={styles.caption}>Representação ilustrativa do aplicativo.</p>
        </div>
        <div className={styles.copy}>
          <h2 id="pack-title" className={styles.title}>Conhecimento para fazer seu negócio crescer</h2>
          <p className={styles.description}>Desenvolva habilidades importantes para o dia a dia da sua empresa. Com o Pack Empreendedor, você encontra cursos gratuitos sobre gestão, organização financeira, marketing e atendimento em um só aplicativo.</p>
          <p className={styles.support}>Tudo organizado para você aprender no seu ritmo, diretamente pelo celular.</p>
          <DownloadButton url={downloadUrl} statusId="pack-download-status" />
        </div>
      </div>
    </section>
  );
}


