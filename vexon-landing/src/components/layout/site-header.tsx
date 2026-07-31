"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getWhatsAppUrl } from "@/config/site";
import { services } from "@/content/services";
import { trackConversion } from "@/lib/analytics";

const links = [
  ["Início", "/"],
  ["Projetos", "/projetos"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const solutionsActive = pathname.startsWith("/solucoes/");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 text-white backdrop-blur">
        <nav
          className="site-container flex min-h-18 items-center justify-between gap-5"
          aria-label="Navegação principal"
        >
          <Link href="/" aria-label="Vexon — início">
            <Image
              src="/brand/logo-vexon-white.png"
              alt="Vexon"
              width={152}
              height={55}
              priority
              className="h-auto w-28 sm:w-32"
            />
          </Link>

          <NavigationMenu viewport={false} className="hidden lg:flex">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <Link
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`border-b-2 py-1 text-base font-medium transition ${pathname === "/" ? "border-((--brand-500)) text-white" : "border-transparent text-zinc-300 hover:text-white"}`}
                  href="/"
                >
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`h-auto rounded-none border-b-2 bg-transparent px-0 py-1 text-base font-medium hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent ${solutionsActive ? "border-(--brand-500) text-white" : "border-transparent text-zinc-300"}`}
                >
                  Soluções
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-136! border border-white/15 bg-zinc-950 p-2 text-white shadow-[0_20px_48px_rgb(0_0_0_/_0.35)]">
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <NavigationMenuLink asChild key={service.slug}>
                          <Link
                            className="group flex min-h-28 gap-3 rounded-[10px] border border-transparent p-4 transition hover:border-white/10 hover:bg-white/6 focus:bg-white/6"
                            href={`/solucoes/${service.slug}`}
                          >
                            <Icon
                              className="mt-0.5 size-5 shrink-0 text-red-200 transition group-hover:scale-110"
                              aria-hidden="true"
                            />
                            <span>
                              <span className="block font-display text-base font-bold tracking-[-.025em]">
                                {service.title}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-zinc-400">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {links.slice(1).map(([label, href]) => {
                const active = isActive(pathname, href);

                return (
                  <NavigationMenuItem key={href}>
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={`border-b-2 py-1 text-base font-medium transition ${active ? "border-[var(--brand-500)] text-white" : "border-transparent text-zinc-300 hover:text-white"}`}
                      href={href}
                    >
                      {label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <a
            className="hidden min-h-11 items-center gap-2 rounded-[10px] bg-[var(--brand-600)] px-4 text-sm font-semibold transition hover:bg-[var(--brand-700)] lg:inline-flex"
            onClick={() => trackConversion("whatsapp_nav_click")}
            href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
          >
            <MessageCircle size={17} aria-hidden="true" /> Falar com a Vexon
          </a>
          <Dialog.Trigger asChild>
            <button className="grid min-h-11 min-w-11 place-items-center lg:hidden" aria-label="Abrir menu" onClick={() => setOpen(true)}>
              <Menu aria-hidden="true" />
            </button>
          </Dialog.Trigger>
        </nav>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-zinc-950 p-5 text-white shadow-[-20px_0_48px_rgb(0_0_0_/_0.4)] lg:hidden">
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(183_31_30_/_0.14),transparent_38%)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto flex min-h-full max-w-lg flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <Image
                  src="/brand/logo-vexon-white.png"
                  alt="Vexon"
                  width={152}
                  height={55}
                  className="h-auto w-28"
                />
                <Dialog.Close asChild>
                  <button className="grid min-h-11 min-w-11 place-items-center rounded-[10px] border border-white/15 bg-white/5 transition hover:bg-white/10" aria-label="Fechar menu">
                    <X aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="mt-8 grid gap-2">
                <Link
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`block rounded-[10px] border px-4 py-4 text-xl font-semibold transition ${pathname === "/" ? "border-red-500/50 bg-red-950/45 text-red-100" : "border-white/10 bg-white/[.035] hover:border-white/20 hover:bg-white/[.08]"}`}
                  href="/"
                  onClick={close}
                >
                  Início
                </Link>
                <div className="mt-4">
                  <p className="px-1 text-xs font-bold uppercase tracking-[.14em] text-red-200">
                    Soluções
                  </p>
                  <div className="mt-3 grid gap-2">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const active = pathname === `/solucoes/${service.slug}`;

                      return (
                        <Link
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-[10px] border px-4 py-3.5 text-base font-semibold transition ${active ? "border-red-500/50 bg-red-950/45 text-red-100" : "border-white/10 bg-white/[.035] hover:border-white/20 hover:bg-white/[.08]"}`}
                          href={`/solucoes/${service.slug}`}
                          key={service.slug}
                          onClick={close}
                        >
                          <Icon className="size-5 text-red-200" aria-hidden="true" />
                          {service.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  {links.slice(1).map(([label, href]) => {
                    const active = isActive(pathname, href);

                    return (
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-[10px] border px-4 py-4 text-xl font-semibold transition ${active ? "border-red-500/50 bg-red-950/45 text-red-100" : "border-white/10 bg-white/[.035] hover:border-white/20 hover:bg-white/[.08]"}`}
                        href={href}
                        key={href}
                        onClick={close}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
                <a
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-(--brand-600) px-4 font-semibold transition hover:bg-[var(--brand-700)]"
                  onClick={() => trackConversion("whatsapp_nav_click")}
                  href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
                >
                  Falar com a Vexon
                </a>
              </div>
            </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
