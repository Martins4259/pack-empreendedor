import { ArrowUpRight } from "lucide-react";
import styles from "./ClosingSections.module.css";

type FooterProps = {
  contact?: { label: string; href: string };
  privacyUrl?: string;
  termsUrl?: string;
};
const links = [
  { href: "#inicio", label: "O aplicativo" },
  { href: "#cursos", label: "Os cursos" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#pacote", label: "Conheça o aplicativo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#perguntas", label: "Perguntas frequentes" },
];

export function SiteFooter({ contact, privacyUrl, termsUrl }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.identity}>
            <a href="#inicio" className={styles.brand} aria-label="Impulso, início">impulso.</a>
            <p>Pack Empreendedor. Aplicativo gratuito para Android com conteúdos sobre empreendedorismo e gestão para desenvolver seu negócio.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <h2 className={styles.footerHeading}>Explore o aplicativo</h2>
            <ul className={styles.footerLinks}>{links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
          <div>
            <h2 className={styles.footerHeading}>Contato institucional</h2>
            {contact ? <a className={styles.contact} href={contact.href}>{contact.label}</a> : <p className={styles.pending}>Canal de contato em definição.</p>}
            <h2 className={`${styles.footerHeading} ${styles.legalHeading}`}>Informações legais</h2>
            <ul className={styles.legalLinks}>
              <li>{privacyUrl ? <a href={privacyUrl}>Política de privacidade</a> : <span>Política de privacidade<small>Em preparação</small></span>}</li>
              <li>{termsUrl ? <a href={termsUrl}>Termos de uso</a> : <span>Termos de uso<small>Em preparação</small></span>}</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}><p>Impulso · Pack Empreendedor</p><a href="#inicio">Voltar ao início<ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}


