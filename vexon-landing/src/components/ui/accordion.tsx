"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export type AccordionItem = { question: string; answer: string };

export function VexonAccordion({
  items,
  className = "",
  variant = "default",
}: {
  items: readonly AccordionItem[];
  className?: string;
  variant?: "default" | "home" | "editorial";
}) {
  const home = variant === "home";
  const editorial = variant === "editorial";

  return (
    <AccordionPrimitive.Root
      className={
        editorial
          ? `faq-editorial ${className}`
          : home
            ? `grid gap-3 ${className}`
            : `faq-list ${className}`
      }
      type="single"
      collapsible
    >
      {items.map(({ question, answer }, index) => (
        <AccordionPrimitive.Item
          className={
            editorial
              ? "faq-editorial-item"
              : home
                ? "overflow-hidden border border-zinc-200 bg-white transition data-[state=open]:border-zinc-300 data-[state=open]:shadow-[0_10px_28px_rgb(0_0_0_/_0.06)]"
                : "faq-item"
          }
          value={`faq-${index}`}
          key={question}
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={
                editorial
                  ? "faq-editorial-trigger group"
                  : home
                    ? "group flex min-h-16 w-full items-center justify-between gap-5 px-5 text-left font-display text-lg font-bold tracking-[-.025em] outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-600)]"
                    : "faq-trigger"
              }
            >
              {question}
              <Plus
                className={
                  editorial
                    ? "size-4 shrink-0 text-zinc-500 transition duration-200 group-data-[state=open]:rotate-45 motion-reduce:transition-none"
                    : home
                      ? "size-5 shrink-0 text-[var(--brand-600)] transition duration-200 group-data-[state=open]:rotate-45"
                      : "faq-icon"
                }
                size={18}
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={
              editorial
                ? "faq-editorial-content"
                : home
                  ? "overflow-hidden data-[state=closed]:animate-none"
                  : "faq-content"
            }
          >
            <p
              className={
                editorial
                  ? "faq-editorial-answer"
                  : home
                    ? "border-t border-zinc-100 px-5 py-5 leading-7 text-zinc-600"
                    : ""
              }
            >
              {answer}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
