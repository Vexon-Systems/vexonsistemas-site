import { Android } from "@/components/ui/android";
import { Safari } from "@/components/ui/safari";

/** Dispositivos para comunicar a experiência responsiva da solução. */
export function ServiceDevices({ label = "RESPONSIVO POR PRINCÍPIO" }: { label?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] pb-3 pt-5 sm:pb-8">
      <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 border-l border-t border-[var(--brand-600)] sm:h-32 sm:w-32" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-5 h-20 w-20 border-b border-r border-[var(--brand-600)] sm:h-28 sm:w-28" aria-hidden="true" />
      <Safari
        className="relative z-10 w-full drop-shadow-[0_22px_44px_rgb(0_0_0_/_0.35)]"
        imageSrc="/assets/close-up-people-working-office.jpg"
        url="vexonsistemas.com"
      />
      <Android
        aria-hidden="true"
        className="absolute bottom-0 right-4 z-20 h-auto w-[23%] drop-shadow-[0_16px_30px_rgb(0_0_0_/_0.45)] sm:right-7"
        src="/assets/close-up-people-working-office.jpg"
      />
      <p className="absolute bottom-4 left-4 z-20 border border-white/15 bg-zinc-950 px-3 py-2 font-mono text-[.62rem] font-bold tracking-[.15em] text-white sm:left-6 sm:text-xs">
        {label}
      </p>
    </div>
  );
}
