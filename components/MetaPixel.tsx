"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getMarketingConsent, META_PIXEL_BOOTSTRAP, setMarketingConsent, subscribeMarketingConsent, trackPageView } from "@/lib/meta-pixel";
import styles from "./MetaPixel.module.css";

export function MetaPixel() {
  const consent = useSyncExternalStore(subscribeMarketingConsent, getMarketingConsent, () => null);
  const [editing, setEditing] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const page = `${pathname}${search ? `?${search}` : ""}`;

  useEffect(() => { trackPageView(page); }, [page, consent]);

  function choose(value: "granted" | "denied") {
    setMarketingConsent(value);
    setEditing(false);
  }

  return <>
    {consent === "granted" && <Script id="pack-meta-pixel" strategy="afterInteractive" onReady={() => trackPageView(`${location.pathname}${location.search}`)}>{META_PIXEL_BOOTSTRAP}</Script>}
    {consent === null || editing ? <section className={styles.panel} aria-labelledby="marketing-consent-title">
      <h2 id="marketing-consent-title">Uso de cookies</h2>
      <p>Utilizamos cookies para analisar visitas e melhorar sua experiência. Com sua autorização, também medimos os resultados de nossas campanhas. Saiba mais em nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("denied")}>Recusar</button>
        <button type="button" onClick={() => choose("granted")}>Aceitar</button>
      </div>
    </section> : <button type="button" className={styles.preferences} onClick={() => setEditing(true)}>Preferências de privacidade</button>}
  </>;
}
