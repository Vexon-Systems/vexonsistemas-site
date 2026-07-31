"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Entradas curtas para guiar a leitura sem competir com o conteúdo. */
export function SolutionPageMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const controls = new Set<ReturnType<typeof animate>>();
    const hero = document.querySelector<HTMLElement>("[data-motion-target='solution-hero']");

    if (hero) {
      controls.add(animate(hero, { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] }, { duration: 0.52, ease: "easeOut" }));
    }

    const stop = inView(
      "[data-solution-section]",
      (element) => {
        const control = animate(
          element,
          { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0px)"] },
          { duration: 0.48, ease: "easeOut" },
        );
        controls.add(control);
        return () => control.stop();
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
