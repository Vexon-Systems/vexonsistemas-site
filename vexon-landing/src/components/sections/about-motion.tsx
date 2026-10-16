"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Entradas editoriais curtas para apresentar a história da Vexon. */
export function AboutMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const controls = new Set<ReturnType<typeof animate>>();
    const hero = document.querySelector<HTMLElement>("[data-about-hero]");
    if (hero) {
      controls.add(
        animate(hero, { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] }, { duration: 0.54, ease: "easeOut" }),
      );
    }

    const stop = inView(
      "[data-about-section]",
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
