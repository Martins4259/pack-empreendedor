import Image from "next/image";
import styles from "./AudienceSection.module.css";

export function AudienceSection() {
  return (
    <section id="para-quem" className={styles.section} aria-labelledby="audience-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="audience-title" className={styles.title}>
            Conhecimento para quem quer ir mais longe
          </h2>
          <p className={styles.lead}>
            Se você está começando a empreender ou já tem uma empresa, Sebrae ajuda você a encontrar conhecimentos importantes para administrar melhor seu negócio.
          </p>
          <p className={styles.support}>
            Aprenda sobre finanças, marketing, atendimento e desenvolvimento profissional, de forma organizada e no seu ritmo.
          </p>
        </div>
        <Image
          className={styles.photo}
          src="/images/audience.webp"
          alt="Mulher de vestido amarelo trabalhando em um notebook em uma pequena loja de roupas"
          width={1440}
          height={960}
          sizes="(min-width: 1440px) 640px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
        />
      </div>
    </section>
  );
}



