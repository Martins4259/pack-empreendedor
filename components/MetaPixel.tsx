"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { MarketingConsent } from "@/lib/meta-pixel";
import { getMarketingConsent, MARKETING_PREFERENCES_EVENT, META_PIXEL_BOOTSTRAP, META_PIXEL_READY_EVENT, setMarketingConsent, subscribeMarketingConsent, trackPageView } from "@/lib/meta-pixel";
import styles from "./MetaPixel.module.css";

export function MetaPixel() {
  const consent = useSyncExternalStore<MarketingConsent | "loading">(subscribeMarketingConsent, getMarketingConsent, () => "loading");
  const [editing, setEditing] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const page = `${pathname}${search ? `?${search}` : ""}`;

  useEffect(() => {
    // next/script onReady for inline scripts can precede actual execution.
    // Listen to the bootstrap itself, and also cover initialization before this effect.
    const recordPage = () => trackPageView(page);
    window.addEventListener(META_PIXEL_READY_EVENT, recordPage);
    recordPage();
    return () => window.removeEventListener(META_PIXEL_READY_EVENT, recordPage);
  }, [page, consent]);

  useEffect(() => {
    const openPreferences = () => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setEditing(true);
    };
    window.addEventListener(MARKETING_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(MARKETING_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => { if (editing) panel.current?.focus(); }, [editing]);

  function choose(value: "granted" | "denied") {
    setMarketingConsent(value);
    setEditing(false);
    opener.current?.focus();
  }

  return <>
    {consent === "granted" && <Script id="pack-meta-pixel" strategy="afterInteractive">{META_PIXEL_BOOTSTRAP}</Script>}
    {consent === null || editing ? <section ref={panel} id="marketing-consent-panel" tabIndex={-1} className={styles.panel} aria-labelledby="marketing-consent-title">
      <h2 id="marketing-consent-title">Uso de cookies</h2>
      <p>Utilizamos cookies para analisar visitas e melhorar sua experiência. Com sua autorização, também medimos os resultados de nossas campanhas. Saiba mais em nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
      {(consent === "granted" || consent === "denied") && <p className={styles.selection} role="status">Cookies de marketing: {consent === "granted" ? "Aceitos" : "Recusados"}</p>}
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("denied")}>Recusar</button>
        <button type="button" onClick={() => choose("granted")}>Aceitar</button>
      </div>
    </section> : null}
  </>;
}
