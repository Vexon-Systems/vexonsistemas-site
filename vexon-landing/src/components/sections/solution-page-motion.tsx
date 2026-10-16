"use client";

import { animate, inView, stagger } from "motion";
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
        // Let the entrance finish when scrolling quickly.
      },
      { margin: "0px 0px -12% 0px" },
    );

    const stopGantt = inView(
      "[data-motion-gantt]",
      (element) => {
        const steps = element.querySelectorAll<HTMLElement>("[data-motion-gantt-step]");
        const control = animate(
          steps,
          { opacity: [0, 1], transform: ["translateX(-14px)", "translateX(0px)"] },
          { delay: stagger(0.1), duration: 0.38, ease: "easeOut" },
        );
        controls.add(control);
        // Let the entrance finish when scrolling quickly.
      },
      { margin: "0px 0px -16% 0px" },
    );

    return () => {
      controls.forEach((control) => control.complete());
      stop();
      stopGantt();
    };
  }, [reducedMotion]);

  return null;
}
