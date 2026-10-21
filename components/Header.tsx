"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, MoveUpRight } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import styles from "./Header.module.css";
const links = [{ href: "#inicio", label: "O aplicativo" }, { href: "#cursos", label: "Os cursos" }, { href: "#disponibilidade", label: "Disponibilidade" }];
export function Header({ downloadUrl }: { downloadUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) { dialog.current?.showModal(); const before = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = before; }; }
    dialog.current?.close();
  }, [open]);
  return <header className={`site-header ${styles.header}`}>
    <div className={`header-inner ${styles.inner}`}>
      <button ref={trigger} className="icon-button menu-trigger" aria-label="Abrir navegação" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu aria-hidden="true" /></button>
      <a className="brand" href="#inicio" aria-label="Impulso, início"><MoveUpRight aria-hidden="true" strokeWidth={3} /><span>impulso<span className="brand-dot">.</span></span></a>
      <nav className={`desktop-nav ${styles.nav}`} aria-label="Navegação principal">{links.slice(0, 2).map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className={styles.action}><DownloadButton url={downloadUrl} statusId="header-download-status" compact /></div>
    </div>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-labelledby="navigation-title" onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = dialog.current?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }} onCancel={() => setOpen(false)} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="dialog-heading"><span id="navigation-title">Navegação</span><button autoFocus className="icon-button" aria-label="Fechar navegação" onClick={() => setOpen(false)}><X aria-hidden="true" /></button></div>
      <nav aria-label="Navegação mobile">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
    </dialog>
  </header>;
}


