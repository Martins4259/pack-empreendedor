import { Download, FolderOpen, BookOpen } from "lucide-react";
import styles from "./DownloadStepsSection.module.css";

const items = [
  {
    icon: Download,
    title: "Baixe gratuitamente",
    description: "Faça o download do aplicativo para seu celular Android.",
  },
  {
    icon: FolderOpen,
    title: "Instale em poucos passos",
    description: "Abra o APK e siga as orientações de instalação do Android.",
  },
  {
    icon: BookOpen,
    title: "Desenvolva suas habilidades",
    description: "Explore os cursos disponíveis e aprenda conforme sua rotina.",
  },
];

export function DownloadStepsSection() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="download-steps-title">
      <div className="container">
        <div className={styles.intro}>
          <h2 id="download-steps-title" className={styles.title}>Comece a aprender em poucos passos</h2>
          <p className={styles.description}>Baixe o aplicativo gratuito para Android, siga as orientações de instalação e explore os cursos disponíveis.</p>
        </div>
        <ul className={styles.items}>
          {items.map(({ icon: Icon, title, description }) => (
            <li key={title} className={styles.item}>
              <Icon className={styles.icon} size={28} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.itemDescription}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


