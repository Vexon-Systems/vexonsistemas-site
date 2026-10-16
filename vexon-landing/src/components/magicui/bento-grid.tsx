import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoGridProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

type BentoCardProps = ComponentPropsWithoutRef<"article"> & {
  name: string;
  background?: ReactNode;
  Icon: ElementType;
  description: string;
  href: string;
  cta: string;
  conversionDetail?: string;
};

/** Baseado no Bento Grid do Magic UI, com CTA sempre visível. */
function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn("grid w-full gap-4 md:auto-rows-88 md:grid-cols-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function BentoCard({
  name,
  background,
  Icon,
  description,
  href,
  cta,
  conversionDetail,
  className,
  ...props
}: BentoCardProps) {
  return (
    <article
      className={cn(
        "group relative col-span-1 flex min-h-72 flex-col overflow-hidden border border-zinc-200 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_42px_rgb(0_0_0_/0.12)] focus-within:-translate-y-1 focus-within:border-zinc-300 focus-within:shadow-[0_18px_42px_rgb(0_0_0_/0.12)] motion-reduce:transform-none motion-reduce:transition-none md:min-h-0",
        className,
      )}
      data-motion-stagger
      {...props}
    >
      {background ? (
        <div
          className="pointer-events-none absolute inset-0 transition duration-300 group-hover:scale-[1.03] group-focus-within:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden="true"
        >
          {background}
        </div>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-zinc-950/0 transition duration-300 group-hover:bg-zinc-950/2.5 group-focus-within:bg-zinc-950/2.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col">
        <Icon
          className="size-7 origin-left text-[color:var(--bento-icon,var(--brand-600))] transition duration-300 group-hover:scale-90 group-focus-within:scale-90 motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden="true"
        />
        <h3 className="mt-7 font-display text-2xl font-bold tracking-[-.04em]">{name}</h3>
        <p className="mt-3 max-w-md leading-7 text-[color:var(--bento-copy,#52525b)]">{description}</p>
        <Link
          className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-bold text-[color:var(--bento-link,var(--brand-600))] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--brand-600)] focus-visible:ring-offset-2"
          data-conversion-detail={conversionDetail}
          data-conversion-event="solution_cta_click"
          href={href}
        >
          {cta}
          <ArrowRight
            className="transition duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
            size={16}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export { BentoCard, BentoGrid };
