import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <a className="skip-link" href="#documento">Pular para o conteúdo</a>
    <main id="documento" className={`container ${styles.document}`}>
      <Link href="/" className={styles.back}>Voltar à página inicial</Link>
      <p className="eyebrow">PACK EMPREENDEDOR</p>
      <h1>{title}</h1>
      <aside className={styles.notice} aria-label="Situação do documento">
        <strong>Documento sujeito a confirmação e revisão jurídica</strong>
        <p>As pendências abaixo precisam ser preenchidas pelo responsável pelo projeto e pelo desenvolvedor antes da disponibilização do aplicativo. Este texto não confirma práticas ainda não verificadas.</p>
      </aside>
      <div className={styles.content}>{children}</div>
      <nav className={styles.navigation} aria-label="Informações legais">
        <Link href="/politica-de-privacidade">Política de privacidade</Link>
        <Link href="/termos-de-uso">Termos de uso</Link>
        <Link href="/">Página inicial</Link>
      </nav>
    </main>
  </>;
}
