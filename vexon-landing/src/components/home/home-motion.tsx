"use client";

import { animate, inView, stagger } from "motion";
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

    const controls = new Set<ReturnType<typeof animate>>();
    const stop = inView(
      "[data-home-section]",
      (element) => {
        const target = element as HTMLElement;
        const sectionAnimation = animate(
          target,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"] },
          { duration: 0.48, ease: "easeOut" },
        );
        controls.add(sectionAnimation);

        const staggerTargets = target.querySelectorAll<HTMLElement>("[data-motion-stagger]");
        if (staggerTargets.length) {
          const staggerAnimation = animate(
            staggerTargets,
            { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0px)"] },
            { delay: stagger(0.08, { startDelay: 0.12 }), duration: 0.42, ease: "easeOut" },
          );
          controls.add(staggerAnimation);
        }

        // Finish even after leaving the viewport; never freeze readable content.
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
      heroControl?.complete();
      controls.forEach((control) => control.complete());
      stop();
      stopGantt();
    };
  }, [reducedMotion]);

  return null;
}
