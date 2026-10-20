"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { finderQuestions, solutionChoices } from "@/content/project-guide";
import { trackConversion } from "@/lib/analytics";
import "./project-guide.css";

export function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const focusTarget = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) focusTarget.current?.focus();
  }, [step]);
  const choice = solutionChoices.find((item) => item.slug === answers[0]);
  const question = finderQuestions[step];

  return (
    <details className="project-guide" id="qual-solucao">
      <summary>Não sabe por onde começar? Descubra qual solução faz sentido.</summary>
      <div className="guide-panel" aria-labelledby="finder-title">
        <h3 id="finder-title">Qual solução preciso?</h3>
        <p className="guide-note">
          Três perguntas para encontrar um ponto de partida. Sem cadastro.
        </p>
        <div ref={focusTarget} tabIndex={-1} className="mt-6">
          {step < 3 ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                interacted.current = true;
                setStep(step + 1);
                if (step === 2)
                  trackConversion("solution_finder_complete", { solution: answers[0] });
              }}
            >
              <p className="guide-note">Pergunta {step + 1} de 3</p>
              <fieldset key={step}>
                <legend className="guide-step-title">{question.title}</legend>
                <div className="guide-options">
                  {question.options.map((option) => (
                    <label className="guide-option" key={option.value}>
                      <input
                        type="radio"
                        name={`finder-${step}`}
                        value={option.value}
                        required
                        checked={answers[step] === option.value}
                        onChange={() =>
                          setAnswers(
                            answers.map((answer, index) =>
                              index === step ? option.value : answer,
                            ),
                          )
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="guide-actions">
                <button className="guide-primary" type="submit">
                  {step === 2 ? "Ver recomendação" : "Continuar"}
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
            choice && (
              <div>
                <p className="guide-note">Ponto de partida sugerido</p>
                <p className="guide-result">{choice.title}</p>
                <p>{choice.reason}</p>
                <p className="guide-note">
                  Hoje: {answers[1]}. Prioridade: {answers[2]}. A conversa com a equipe ajuda a
                  validar o escopo e avaliar alternativas.
                </p>
                <div className="guide-actions">
                  <Link
                    className="guide-primary"
                    href={`/contato/?solucao=${choice.slug}&situacao=${encodeURIComponent(answers[1])}&prioridade=${encodeURIComponent(answers[2])}#briefing`}
                  >
                    Montar meu briefing
                  </Link>
                  <Link className="guide-secondary" href={`/solucoes/${choice.slug}/`}>
                    Conhecer esta solução
                  </Link>
                  <button className="guide-secondary" type="button" onClick={() => setStep(0)}>
                    Rever respostas
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <details className="guide-comparison">
          <summary>Comparar as quatro soluções</summary>
          <ul>
            {solutionChoices.map((item) => (
              <li key={item.slug}>
                <Link
                  className="underline underline-offset-4 font-semibold"
                  href={`/solucoes/${item.slug}/`}
                >
                  {item.title}
                </Link>
                <span>{item.reason}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </details>
  );
}
