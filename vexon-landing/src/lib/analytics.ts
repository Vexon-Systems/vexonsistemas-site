export type ConversionEvent =
  | "whatsapp_nav_click"
  | "whatsapp_float_click"
  | "whatsapp_content_click"
  | "hero_primary_click"
  | "solution_cta_click"
  | "contact_form_submit"
  | "contact_form_start"
  | "project_open"
  | "social_link_click";

export function trackConversion(event: ConversionEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const payload = { event, page: window.location.pathname, ...detail };
  window.dispatchEvent(new CustomEvent("vexon:conversion", { detail: payload }));
  // Zaraz can persist conversion events when configured in Cloudflare.
  const analyticsWindow = window as Window & {
    zaraz?: { track: (event: string, data: Record<string, string>) => void };
  };
  analyticsWindow.zaraz?.track(event, { page: window.location.pathname, ...detail });
}
