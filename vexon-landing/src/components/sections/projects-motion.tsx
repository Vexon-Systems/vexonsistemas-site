"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Movimento editorial de baixa intensidade para o Hero, cases e trajetórias. */
export function ProjectsMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const controls = new Set<ReturnType<typeof animate>>();
    const lines = Array.from(document.querySelectorAll<HTMLElement>("[data-project-line]"));

    lines.forEach((line, index) => {
      controls.add(
        animate(
          line,
          { opacity: [0.2, 0.8, 0.2], transform: ["translate3d(-8%, 8%, 0)", "translate3d(8%, -8%, 0)", "translate3d(-8%, 8%, 0)"] },
          { delay: index * 0.7, duration: 7 + index * 1.5, ease: "easeInOut", repeat: Infinity },
        ),
      );
    });

    const hero = document.querySelector<HTMLElement>("[data-projects-hero]");
    if (hero) {
      controls.add(
        animate(hero, { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"] }, { duration: 0.56, ease: "easeOut" }),
      );
    }

    const stop = inView(
      "[data-project-case]",
      (element) => {
        const caseElement = element as HTMLElement;
        const media = caseElement.querySelector<HTMLElement>(".project-media");
        const copy = caseElement.querySelector<HTMLElement>(".project-copy");
        const offset = caseElement.dataset.projectSide === "left" ? -28 : 28;

        if (copy) {
          controls.add(
            animate(copy, { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] }, { duration: 0.46, ease: "easeOut" }),
          );
        }
        if (media) {
          controls.add(
            animate(media, { opacity: [0, 1], transform: [`translateX(${offset}px)`, "translateX(0px)"] }, { delay: 0.08, duration: 0.52, ease: "easeOut" }),
          );
        }
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
