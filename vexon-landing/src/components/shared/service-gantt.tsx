const ganttSteps = [
  ["01", "Conversa Inicial"],
  ["02", "Reunião com a Equipe de Design"],
  ["03", "Protótipo & Aprovação"],
  ["04", "Desenvolvimento"],
  ["05", "Validação"],
  ["06", "Treinamento e implantação"],
] as const;

const desktopPositions = [
  "xl:col-span-3",
  "xl:col-start-2 xl:col-span-4",
  "xl:col-start-4 xl:col-span-4",
  "xl:col-start-4 xl:col-span-4",
  "xl:col-start-7 xl:col-span-4",
  "xl:col-start-8 xl:col-span-5",
];

/** Gantt visual: sequência de construção de um site institucional. */
export function ServiceGantt({ variant = "gradient" }: { variant?: "gradient" | "solid" }) {
  const stepBackground =
    variant === "solid"
      ? "bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)]"
      : "bg-gradient-to-r from-[var(--brand-600)]/75 to-transparent";

  return (
    <>
      <ol className="relative mt-10 grid gap-2 border-l border-dashed border-white/35 pl-5 sm:pl-7 xl:hidden" data-motion-gantt>
        {ganttSteps.map(([number, title]) => (
          <li className={`relative rounded-[10px] border border-white/45 px-4 py-3 ${stepBackground}`} data-motion-gantt-step key={number}>
            <span className="absolute -left-[1.93rem] top-4 grid size-5 place-items-center rounded-full border border-red-300 bg-zinc-950 font-mono text-[.52rem] font-bold text-red-200 sm:-left-[2.43rem]">
              {number}
            </span>
            <h3 className="font-display text-base font-bold tracking-[-.025em] text-white">{title}</h3>
          </li>
        ))}
      </ol>
      <ol className="relative mt-12 hidden grid-cols-12 gap-x-4 gap-y-3 border-x border-white/35 px-3 pb-1 xl:grid" data-motion-gantt>
        {variant === "solid" && (
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span className="absolute inset-y-0 left-0 border-l border-zinc-400/45" />
            <span className="absolute inset-y-0 left-1/2 border-l border-zinc-400/45" />
            <span className="absolute inset-y-0 right-0 border-l border-zinc-400/45" />
          </div>
        )}
        <div className="pointer-events-none absolute bottom-0 left-[16.66%] top-0 border-l border-dashed border-white/25" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 border-l border-white/60" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-[83.33%] top-12 border-l border-dashed border-white/25" aria-hidden="true" />
        {ganttSteps.map(([number, title], index) => (
          <li
            className={`relative z-10 min-h-14 rounded-[10px] border border-white/45 px-4 py-3 ${stepBackground} ${desktopPositions[index]}`}
            data-motion-gantt-step
            key={number}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[.7rem] font-bold tracking-[.12em] text-red-100">{number}</span>
              <h3 className="font-display text-[.95rem] font-bold tracking-[-.02em] text-white">{title}</h3>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
