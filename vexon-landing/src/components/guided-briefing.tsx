"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { finderQuestions, solutionChoices } from "@/content/project-guide";
import { getWhatsAppUrl } from "@/config/site";
import { trackConversion } from "@/lib/analytics";
import "./project-guide.css";

export function GuidedBriefing() {
  const params = useSearchParams();
  const suggested = solutionChoices.find((item) => item.slug === params.get("solucao"));
  const situation = finderQuestions[1].options.find(
    (item) => item.value === params.get("situacao"),
  )?.value;
  const priority = finderQuestions[2].options.find(
    (item) => item.value === params.get("prioridade"),
  )?.value;
  const [solution, setSolution] = useState<string>(suggested?.title ?? "Ainda não sei");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [outcome, setOutcome] = useState("");
  const [timing, setTiming] = useState("Quero avaliar com a equipe");
  const [step, setStep] = useState(0);
  const target = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) target.current?.focus();
  }, [step]);
  const summary = [
    "Olá! Montei um briefing no site da Vexon.",
    `Solução a avaliar: ${solution}`,
    situation && `Como funciona hoje: ${situation}`,
    priority && `Prioridade: ${priority}`,
    company.trim() && `Empresa: ${company.trim()}`,
    `Situação atual: ${context.trim()}`,
    `O que quero melhorar: ${outcome.trim()}`,
    `Momento do projeto: ${timing}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <section className="project-guide" aria-labelledby="briefing-title">
      <h2 id="briefing-title">Vamos organizar sua ideia?</h2>
      <p className="guide-note">
        O briefing guiado ajuda a explicar sua necessidade. Você revisa o resumo antes de abrir o
        WhatsApp.
      </p>
      <details open={Boolean(suggested)}>
        <summary>Começar meu briefing</summary>
        <div className="guide-panel">
          <ol className="guide-progress" aria-label="Etapas do briefing">
            {["Seu negócio", "Objetivo", "Revisão"].map((label, index) => (
              <li key={label} aria-current={step === index ? "step" : undefined}>
                {index + 1}. {label}
              </li>
            ))}
          </ol>
          <div ref={target} tabIndex={-1}>
            {step < 2 ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  interacted.current = true;
                  setStep(step + 1);
                }}
              >
                <fieldset key={step}>
                  <legend className="guide-step-title">
                    {step === 0 ? "Como é sua rotina hoje?" : "O que você espera do projeto?"}
                  </legend>
                  {step === 0 ? (
                    <>
                      <label className="guide-field">
                        Solução a avaliar
                        <select
                          className="guide-input"
                          value={solution}
                          onChange={(event) => setSolution(event.target.value)}
                        >
                          {solutionChoices.map((item) => (
                            <option key={item.slug}>{item.title}</option>
                          ))}
                          <option>Ainda não sei</option>
                        </select>
                      </label>
                      <label className="guide-field">
                        Empresa (opcional)
                        <input
                          className="guide-input"
                          autoComplete="organization"
                          maxLength={160}
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                        />
                      </label>
                      <label className="guide-field">
                        O que sua empresa faz e como resolve isso hoje? (obrigatório)
                        <textarea
                          className="guide-input"
                          rows={4}
                          required
                          minLength={12}
                          maxLength={1200}
                          placeholder="Ex.: Tenho uma loja e organizo os pedidos em mensagens e uma planilha."
                          value={context}
                          onChange={(event) => {
                            event.target.setCustomValidity(
                              event.target.value.trim().length < 12
                                ? "Conte um pouco mais sobre sua rotina."
                                : "",
                            );
                            setContext(event.target.value);
                          }}
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="guide-field">
                        Qual problema você quer resolver primeiro? (obrigatório)
                        <textarea
                          className="guide-input"
                          rows={4}
                          required
                          minLength={12}
                          maxLength={1200}
                          placeholder="Ex.: Quero reunir os pedidos em um só lugar para acompanhar as entregas."
                          value={outcome}
                          onChange={(event) => {
                            event.target.setCustomValidity(
                              event.target.value.trim().length < 12
                                ? "Conte um pouco mais sobre seu objetivo."
                                : "",
                            );
                            setOutcome(event.target.value);
                          }}
                        />
                      </label>
                      <label className="guide-field">
                        Em que momento você está?
                        <select
                          className="guide-input"
                          value={timing}
                          onChange={(event) => setTiming(event.target.value)}
                        >
                          <option>Quero avaliar com a equipe</option>
                          <option>Estou pesquisando possibilidades</option>
                          <option>Quero começar a planejar</option>
                          <option>Tenho uma data para conversar sobre o projeto</option>
                        </select>
                      </label>
                      <p className="guide-note">
                        Prazos e valores são definidos depois de entender o escopo.
                      </p>
                    </>
                  )}
                </fieldset>
                <div className="guide-actions">
                  <button className="guide-primary" type="submit">
                    {step === 0 ? "Continuar" : "Revisar briefing"}
                  </button>
                  {step > 0 && (
                    <button
                      className="guide-secondary"
                      type="button"
                      onClick={() => setStep(step - 1)}
                    >
                      Voltar
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <>
                <h3 className="guide-step-title">Seu briefing está pronto para revisão.</h3>
                <p>
                  Confira as informações. Ao continuar, você abre o WhatsApp com este texto; o envio
                  é feito por você na conversa.
                </p>
                <div className="guide-summary">{summary}</div>
                <div className="guide-actions">
                  <a
                    className="guide-primary"
                    href={getWhatsAppUrl(summary)}
                    onClick={() => trackConversion("briefing_whatsapp_click", { solution })}
                  >
                    Continuar com o briefing no WhatsApp
                  </a>
                  <button className="guide-secondary" type="button" onClick={() => setStep(0)}>
                    Editar briefing
                  </button>
                </div>
              </>
            )}
          </div>
          <p className="guide-note">
            Suas respostas ficam apenas nesta página até você escolher continuar pelo WhatsApp. Não
            há salvamento automático.{" "}
            <Link className="underline" href="/politica-de-privacidade/">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </details>
    </section>
  );
}
