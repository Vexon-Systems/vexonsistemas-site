"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme: "light" | "dark" | "auto";
      action: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<TurnstileApi> | undefined;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileScript) return turnstileScript;

  turnstileScript = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile indisponível."));
    script.onerror = () => {
      turnstileScript = undefined;
      script.remove();
      reject(new Error("Não foi possível carregar o Turnstile."));
    };
    document.head.appendChild(script);
  });

  return turnstileScript;
}

export function Turnstile({
  siteKey,
  onTokenChange,
  onError,
}: {
  siteKey: string;
  onTokenChange: (token: string) => void;
  onError?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | undefined;
    let active = true;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          action: "contact",
          callback: onTokenChange,
          "error-callback": () => {
            onTokenChange("");
            onError?.();
          },
          "expired-callback": () => onTokenChange(""),
        });
      })
      .catch(() => {
        if (active) {
          onTokenChange("");
          onError?.();
        }
      });

    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onTokenChange, onError, siteKey]);

  return <div ref={containerRef} />;
}
