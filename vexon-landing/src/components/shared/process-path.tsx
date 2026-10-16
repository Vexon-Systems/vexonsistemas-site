type ProcessStep = readonly [number: string, title: string, description: string];

export function ProcessPath({ steps }: { steps: readonly ProcessStep[]; variant?: "timeline" }) {
  return (
    <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {steps.map(([number, title, description]) => (
        <li className="relative border-t-2 border-(--brand-600) pt-4" key={number}>
          <span className="font-mono text-xs font-bold tracking-[.14em] text-(--brand-600)">{number}</span>
          <h3 className="mt-3 font-display text-xl font-bold tracking-[-.035em]">{title}</h3>
          <p className="mt-3 leading-6 text-zinc-600">{description}</p>
        </li>
      ))}
    </ol>
  );
}
