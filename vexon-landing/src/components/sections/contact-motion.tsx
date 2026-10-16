"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Entradas sutis e trajetórias lentas para a página de contato. */
export function ContactMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const controls = new Set<ReturnType<typeof animate>>();
    document.querySelectorAll<HTMLElement>("[data-contact-line]").forEach((line, index) => {
      controls.add(
        animate(
          line,
          { opacity: [0.25, 0.85, 0.25], transform: ["translate3d(-7%, 7%, 0)", "translate3d(7%, -7%, 0)", "translate3d(-7%, 7%, 0)"] },
          { delay: index * 0.65, duration: 7 + index, ease: "easeInOut", repeat: Infinity },
        ),
      );
    });

    const hero = document.querySelector<HTMLElement>("[data-contact-hero]");
    if (hero) {
      controls.add(animate(hero, { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] }, { duration: 0.52, ease: "easeOut" }));
    }

    const stop = inView(
      "[data-contact-section]",
      (element) => {
        const control = animate(
          element,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"] },
          { duration: 0.48, ease: "easeOut" },
        );
        controls.add(control);
        // Let the entrance finish when scrolling quickly.
      },
      { margin: "0px 0px -12% 0px" },
    );

    return () => {
      controls.forEach((control) => control.stop());
      stop();
    };
  }, [reducedMotion]);

  return null;
}
