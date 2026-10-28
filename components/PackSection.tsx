import { DownloadButton } from "./DownloadButton";
import Image from "next/image";
import styles from "./PackSection.module.css";

export function PackSection({ downloadUrl, showDownload = true }: { downloadUrl: string | null; showDownload?: boolean }) {
  return (
    <section id="pacote" className={styles.section} aria-labelledby="pack-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.visual} role="img" aria-label="Representação ilustrativa de um smartphone Android com a marca Sebrae na tela">
          <div className={styles.collection} aria-hidden="true">
            <div className={styles.phone}>
              <div className={styles.screen}>
                <span className={styles.camera} />
                <div className={styles.splash}>
                  <div className={styles.appLogo}><Image src="/images/logo-oficial.png" alt="" width={640} height={312} sizes="(min-width: 1024px) 160px, 136px" /></div>                </div>
                <span className={styles.gestureBar} />
              </div>
            </div>
          </div>
          <p className={styles.caption}>Representação ilustrativa do aplicativo.</p>
        </div>
        <div className={styles.copy}>
          <h2 id="pack-title" className={styles.title}>Conhecimento para fazer seu negócio crescer</h2>
          <p className={styles.description}>Desenvolva habilidades importantes para o dia a dia da sua empresa. Com o Sebrae, você encontra cursos gratuitos sobre gestão, organização financeira, marketing e atendimento em um só aplicativo.</p>
          <p className={styles.support}>Tudo organizado para você aprender no seu ritmo, diretamente pelo celular.</p>
          {showDownload && <DownloadButton url={downloadUrl} statusId="pack-download-status" />}
        </div>
      </div>
    </section>
  );
}


