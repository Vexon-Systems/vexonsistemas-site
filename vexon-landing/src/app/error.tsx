"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-zinc-950 px-5 text-center text-white">
      <section className="max-w-xl">
        <p className="eyebrow eyebrow-light">OCORREU UM IMPREVISTO</p>
        <h1 className="font-display text-4xl font-extrabold tracking-[-.06em]">Não foi possível carregar esta página.</h1>
        <p className="mt-5 leading-7 text-zinc-300">Tente novamente. Se o problema continuar, entre em contato conosco.</p>
        <button className="mt-8 min-h-12 rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold hover:bg-[var(--brand-700)]" onClick={reset} type="button">Tentar novamente</button>
      </section>
    </main>
  );
}
