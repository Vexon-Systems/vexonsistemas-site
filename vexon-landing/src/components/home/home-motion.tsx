"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Entradas editoriais sutis para as seções da Home. */
export function HomeMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const hero = document.querySelector<HTMLElement>("[data-home-hero-copy]");
    const heroControl = hero
      ? animate(
          hero,
          { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
          { duration: 0.55, ease: "easeOut" },
        )
      : null;

    const stop = inView(
      "[data-home-section]",
      (element) => {
        const target = element as HTMLElement;
        const control = animate(
          target,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"] },
          { duration: 0.48, ease: "easeOut" },
        );
        return () => control.stop();
      },
      { margin: "0px 0px -12% 0px" },
    );

    return () => {
      heroControl?.stop();
      stop();
    };
  }, [reducedMotion]);

  return null;
}
