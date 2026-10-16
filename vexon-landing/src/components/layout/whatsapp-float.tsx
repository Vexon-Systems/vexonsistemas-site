"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { trackConversion } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const hero = document.querySelector("[data-primary-hero]");
    if (!hero) {
      const frame = requestAnimationFrame(() => setHidden(false));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <a
      hidden={hidden}
      aria-label="Conversar com a Vexon pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center rounded-full bg-[#128c45] text-white shadow-[0_12px_30px_rgb(0_0_0_/0.28)] transition hover:scale-105 hover:bg-[#107c3d] focus-visible:ring-4 focus-visible:ring-green-300 motion-reduce:transform-none sm:bottom-7 sm:right-7 sm:size-14 [&[hidden]]:hidden"
      href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
      onClick={() => trackConversion("whatsapp_float_click")}
      rel="noreferrer"
      target="_blank"
      title="Conversar pelo WhatsApp"
    >
      <MessageCircle className="size-8" aria-hidden="true" />
    </a>
  );
}
