export type ConversionEvent =
  | "whatsapp_nav_click"
  | "hero_primary_click"
  | "solution_cta_click"
  | "contact_form_submit"
  | "project_open"
  | "social_link_click";

export function trackConversion(event: ConversionEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  track(event, detail);
  window.dispatchEvent(new CustomEvent("vexon:conversion", { detail: { event, ...detail } }));
}
import { track } from "@vercel/analytics";
