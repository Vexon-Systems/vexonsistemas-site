"use client";

import { useEffect } from "react";
import { trackConversion, type ConversionEvent } from "@/lib/analytics";

export function ConversionTracker() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const cta = target.closest<HTMLElement>("[data-conversion-event]");
      if (!cta) {
        const link = target.closest<HTMLAnchorElement>("main a[href]");
        if (link && new URL(link.href).hostname === "wa.me") {
          trackConversion("whatsapp_content_click", {
            section:
              link.closest("section")?.querySelector("h2")?.textContent?.slice(0, 120) ?? "content",
          });
        }
        return;
      }

      const conversionEvent = cta.dataset.conversionEvent as ConversionEvent | undefined;
      if (!conversionEvent) return;

      const detail = cta.dataset.conversionDetail;
      trackConversion(conversionEvent, detail ? { target: detail } : undefined);
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
}
