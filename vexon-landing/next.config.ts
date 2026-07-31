import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const scriptSources = ["'self'", "'unsafe-inline'", "https://va.vercel-scripts.com", ...(isDevelopment ? ["'unsafe-eval'"] : [])].join(" ");
const connectSources = ["'self'", "https://formspree.io", "https://vitals.vercel-insights.com", ...(isDevelopment ? ["ws:"] : [])].join(" ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src ${scriptSources}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src ${connectSources}; form-action 'self' https://formspree.io; media-src 'self'; worker-src 'self' blob:`,
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
