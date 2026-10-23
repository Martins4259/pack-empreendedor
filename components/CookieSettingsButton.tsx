"use client";

import { MARKETING_PREFERENCES_EVENT } from "@/lib/meta-pixel";

export function CookieSettingsButton({ className }: { className?: string }) {
  return <button type="button" className={className} aria-controls="marketing-consent-panel" onClick={() => window.dispatchEvent(new Event(MARKETING_PREFERENCES_EVENT))}>Configurações de cookies</button>;
}
