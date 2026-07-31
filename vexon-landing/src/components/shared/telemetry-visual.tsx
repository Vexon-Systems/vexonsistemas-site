export function TelemetryVisual() {
  return (
    <div className="relative grid min-h-56 overflow-hidden bg-zinc-900 p-6 text-zinc-300">
      <div
        className="absolute -right-16 -top-24 size-72 rounded-full border border-white/15"
        aria-hidden="true"
      />
      <div
        className="absolute -right-6 -top-14 size-52 rounded-full border border-[var(--brand-500)]/70"
        aria-hidden="true"
      />
      <p className="relative self-start text-xs font-bold tracking-[.14em]">
        MVP / VALIDAÇÃO TÉCNICA
      </p>
      <div className="relative self-end border-l-2 border-[var(--brand-500)] pl-4">
        <p className="font-display text-2xl font-bold tracking-[-.045em] text-white">
          Telemetria de Pivôs
        </p>
        <p className="mt-2 text-sm leading-6">
          Monitoramento remoto em pesquisa e desenvolvimento.
        </p>
      </div>
    </div>
  );
}
