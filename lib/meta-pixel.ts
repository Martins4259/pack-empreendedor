export const META_PIXEL_ID = "1469158415094350";
export const MARKETING_CONSENT_KEY = "pack-marketing-consent-v1";
export type MarketingConsent = "granted" | "denied" | null;
export const META_PIXEL_READY_EVENT = "pack:meta-pixel-ready";
export const MARKETING_PREFERENCES_EVENT = "pack:marketing-preferences";
const consentEvent = "pack:marketing-consent";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void);
    __packMarketingConsent?: MarketingConsent;
    __packMetaInitialized?: boolean;
    __packMetaConsent?: "grant" | "revoke";
    __packMetaLastPage?: string;
  }
}

export function getMarketingConsent(): MarketingConsent {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(MARKETING_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch { return window.__packMarketingConsent ?? null; }
}

// Keep consent transitions separate from page views. Window state survives React
// Strict Mode effect replays and Next.js client component remounts.
function applyPixelConsent(value: "grant" | "revoke") {
  if (!window.__packMetaInitialized || !window.fbq || window.__packMetaConsent === value) return;
  try {
    window.fbq("consent", value);
    window.__packMetaConsent = value;
  } catch { /* Tracking never blocks the UI. */ }
}

function revokePixel() {
  applyPixelConsent("revoke");
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    const parts = location.hostname.split(".");
    for (let index = 0; index < parts.length - 1; index++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(index).join(".")}; SameSite=Lax`;
    }
  }
}

export function setMarketingConsent(value: Exclude<MarketingConsent, null>) {
  window.__packMarketingConsent = value;
  try { localStorage.setItem(MARKETING_CONSENT_KEY, value); } catch { /* Session-only choice if storage is unavailable. */ }
  if (value === "granted") applyPixelConsent("grant");
  else revokePixel();
  window.dispatchEvent(new Event(consentEvent));
}

export function subscribeMarketingConsent(callback: () => void) {
  const update = () => {
    if (getMarketingConsent() === "granted") applyPixelConsent("grant");
    else revokePixel();
    callback();
  };
  window.addEventListener(consentEvent, update);
  window.addEventListener("storage", update);
  return () => {
    window.removeEventListener(consentEvent, update);
    window.removeEventListener("storage", update);
  };
}

export function trackPageView(page: string) {
  if (getMarketingConsent() !== "granted" || !window.__packMetaInitialized || !window.fbq) return;
  try {
    if (window.__packMetaLastPage === page) return;
    window.fbq("track", "PageView");
    window.__packMetaLastPage = page;
  } catch { /* Pixel blocking or failure must not affect navigation. */ }
}

export function trackDownloadApp() {
  if (getMarketingConsent() !== "granted") return;
  try { window.fbq?.("trackCustom", "DownloadApp"); } catch { /* Preserve native APK navigation. */ }
}

// Official Meta base loader. PageView is handled separately for App Router navigation.
// No script, request or noscript image is emitted before marketing consent.
export const META_PIXEL_BOOTSTRAP = `
(function(){
  var consent;
  try { consent = localStorage.getItem('${MARKETING_CONSENT_KEY}'); }
  catch(e) { consent = window.__packMarketingConsent; }
  if(consent !== 'granted' || window.__packMetaInitialized) return;
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('consent', 'grant');
  window.__packMetaConsent = 'grant';
  fbq('set', 'autoConfig', false, '${META_PIXEL_ID}');
  fbq('init', '${META_PIXEL_ID}');
  window.__packMetaInitialized = true;
  window.dispatchEvent(new Event('${META_PIXEL_READY_EVENT}'));
})();`;
