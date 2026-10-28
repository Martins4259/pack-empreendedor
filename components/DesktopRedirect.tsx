"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function DesktopRedirect() {
  const checked = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || checked.current) return;
    checked.current = true;

    if (window.location.pathname !== "/" || !window.matchMedia("(min-width: 768px)").matches) return;

    router.replace(`/sem-download${window.location.search}${window.location.hash}`);
  }, [router]);

  return null;
}
