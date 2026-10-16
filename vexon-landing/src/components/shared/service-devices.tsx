import Image from "next/image";

/** Dispositivos para comunicar a experiência responsiva da solução. */
export function ServiceDevices({ label = "RESPONSIVO POR PRINCÍPIO" }: { label?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] pb-3 pt-5 sm:pb-8">
      <div
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 border-l border-t border-[var(--brand-600)] sm:h-32 sm:w-32"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-5 h-20 w-20 border-b border-r border-[var(--brand-600)] sm:h-28 sm:w-28"
        aria-hidden="true"
      />
      <figure
        className="relative z-10 m-0 overflow-hidden rounded-[10px] border border-white/20 bg-zinc-950 shadow-xl"
        aria-label="Prévia ilustrativa do próprio site da Vexon em computador e celular"
      >
        <div
          className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-900 p-3"
          aria-hidden="true"
        >
          <span className="size-1.5 rounded-full bg-zinc-500" />
          <span className="size-1.5 rounded-full bg-zinc-500" />
          <span className="size-1.5 rounded-full bg-zinc-500" />
          <span className="ml-4 text-[10px] text-zinc-300">
            Site da Vexon · prévia de interface
          </span>
        </div>
        <div className="p-5 sm:p-7" aria-hidden="true">
          <Image
            src="/brand/logo-vexon-white.png"
            alt=""
            width={100}
            height={36}
            className="h-auto w-20"
          />
          <div className="my-7 max-w-[75%]">
            <p className="font-display text-[clamp(1.1rem,2vw,1.7rem)] font-extrabold leading-tight text-white">
              Sites e sistemas para sua empresa evoluir
            </p>
            <p className="mt-3 text-[10px] leading-5 text-zinc-300 sm:text-xs">
              Tecnologia com clareza e proximidade em Ituiutaba e região.
            </p>
            <span className="mt-4 inline-block rounded bg-[var(--brand-600)] px-3 py-2 text-[10px] font-semibold text-white">
              Conversar sobre meu projeto
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-white/15 pt-4 text-[10px] text-zinc-200">
            <span>Sites institucionais</span>
            <span>Sistemas sob medida</span>
          </div>
        </div>
      </figure>
      <div
        aria-hidden="true"
        className="absolute bottom-1 right-3 z-20 w-[25%] rounded-[16px] border-4 border-zinc-600 bg-zinc-950 px-2 pb-5 pt-3 shadow-xl sm:right-5"
      >
        <div className="mx-auto mb-4 h-1 w-6 rounded bg-zinc-600" />
        <Image
          src="/brand/logo-vexon-white.png"
          alt=""
          width={70}
          height={26}
          className="h-auto w-12"
        />
        <p className="mt-4 font-display text-xs font-bold leading-tight text-white sm:text-sm">
          Sites e sistemas para sua empresa evoluir
        </p>
        <div className="mt-4 h-4 rounded bg-[var(--brand-600)]" />
      </div>
      <p className="relative z-20 mt-3 max-w-[70%] font-mono text-[.62rem] font-bold tracking-[.15em] text-zinc-300 sm:text-xs">
        {label}
      </p>
    </div>
  );
}
