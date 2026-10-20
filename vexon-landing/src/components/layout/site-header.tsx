"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import "./mobile-menu.css";
import "./site-header.css";
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsId = useId();
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const close = () => setOpen(false);
  const solutionsActive = pathname.startsWith("/solucoes/");

  const changeOpen = (next: boolean) => {
    setOpen(next);
    setSolutionsOpen(solutionsActive);
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <header className="site-header">
        <nav className="site-container site-header-inner" aria-label="Navegação principal">
          <Link className="site-brand" href="/" aria-label="Vexon — início">
            <Image
              src="/brand/logo-vexon-white.png"
              alt="Vexon"
              width={152}
              height={55}
              priority
              className="h-auto w-28 sm:w-32"
            />
          </Link>

          <NavigationMenu viewport={false} className="desktop-navigation hidden lg:flex">
            <NavigationMenuList className="desktop-nav-list">
              <NavigationMenuItem>
                <Link
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="desktop-nav-link"
                  href="/"
                >
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  data-active={solutionsActive || undefined}
                  className="desktop-nav-link"
                >
                  Soluções
                </NavigationMenuTrigger>
                <NavigationMenuContent className="desktop-solutions-panel">
                  <div className="desktop-solutions-grid">
                    {services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <NavigationMenuLink asChild key={service.slug}>
                          <Link
                            className="desktop-solution-link"
                            aria-current={
                              pathname === "/solucoes/" + service.slug ? "page" : undefined
                            }
                            href={`/solucoes/${service.slug}`}
                          >
                            <Icon className="desktop-solution-icon" aria-hidden="true" />
                            <span>
                              <span className="desktop-solution-title">{service.title}</span>
                              <span className="desktop-solution-description">
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
                      className="desktop-nav-link"
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
            className="site-header-cta hidden lg:inline-flex"
            onClick={() => trackConversion("whatsapp_nav_click")}
            href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
          >
            <MessageCircle size={17} aria-hidden="true" /> Falar com a Vexon
          </a>
          <Dialog.Trigger asChild>
            <button
              className="grid min-h-11 min-w-11 place-items-center lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu aria-hidden="true" />
            </button>
          </Dialog.Trigger>
        </nav>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 lg:hidden" />
        <Dialog.Content className="vexon-mobile-menu lg:hidden">
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
          <Dialog.Description className="sr-only">
            Navegue pelas páginas da Vexon ou expanda Soluções para conhecer os serviços.
          </Dialog.Description>
          <div className="mobile-menu-header">
            <Image
              src="/brand/logo-vexon-white.png"
              alt="Vexon"
              width={152}
              height={55}
              className="h-auto w-28"
            />
            <Dialog.Close asChild>
              <button className="mobile-menu-close" aria-label="Fechar menu">
                <X aria-hidden="true" size={22} />
              </button>
            </Dialog.Close>
          </div>
          <nav className="mobile-menu-scroll" aria-label="Navegação móvel">
            <ul className="mobile-menu-list">
              <li>
                <Link
                  className="mobile-menu-link"
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={close}
                >
                  Início
                </Link>
              </li>
              <li>
                <button
                  className="mobile-menu-link mobile-menu-disclosure"
                  aria-expanded={solutionsOpen}
                  aria-controls={solutionsId}
                  data-active={solutionsActive || undefined}
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                >
                  Soluções <ChevronDown size={18} aria-hidden="true" />
                </button>
                <ul className="mobile-menu-services" id={solutionsId} hidden={!solutionsOpen}>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        className="mobile-menu-service"
                        href={"/solucoes/" + service.slug}
                        aria-current={pathname === "/solucoes/" + service.slug ? "page" : undefined}
                        onClick={close}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {links.slice(1).map(([label, href]) => (
                <li key={href}>
                  <Link
                    className="mobile-menu-link"
                    href={href}
                    aria-current={isActive(pathname, href) ? "page" : undefined}
                    onClick={close}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-footer">
            <a
              className="mobile-menu-whatsapp"
              href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
              onClick={() => trackConversion("whatsapp_nav_click")}
            >
              <MessageCircle size={18} aria-hidden="true" /> Conversar pelo WhatsApp
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
