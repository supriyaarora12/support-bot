"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { problems } from "@/content/landing";
import { getLandingIcon } from "./icons";

const CYCLE_MS = 2800;
const LINE_MS = 1400;

export function Problem() {
  const [active, setActive] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % problems.length);
      setLineIndex(0);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lines = problems[active].scene.lines;
    if (lines.length <= 1) return;

    const id = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % lines.length);
    }, LINE_MS);

    return () => window.clearInterval(id);
  }, [active]);

  return (
    <section
      id="problem"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-brand-deep/40 bg-brand-deep py-14 sm:py-20"
    >
      <style>{`
        @keyframes problem-wave {
          0% { transform: translateX(-120%); opacity: 0; }
          12% { opacity: 1; }
          78% { opacity: 1; }
          100% { transform: translateX(320%); opacity: 0; }
        }
        @keyframes problem-line {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .problem-wave, .problem-line {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="problem-wave absolute inset-y-0 left-0 w-[38%] blur-md"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(216,243,231,0.35) 35%, rgba(94,234,212,0.45) 50%, rgba(216,243,231,0.3) 65%, transparent 100%)",
            animation: "problem-wave 5.5s ease-in-out infinite",
          }}
        />
      </div>

      <Container className="relative z-[1]">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(15rem,0.85fr)_minmax(0,1.25fr)] lg:gap-10">
          <div className="max-w-xl lg:sticky lg:top-[6.5rem] lg:self-start">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
              <span className="h-px w-6 bg-teal-200/70" aria-hidden />
              The problem
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.1rem] lg:leading-snug">
              Support teams drown in the same questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Queues grow for simple answers, generic bots guess, and when they
              fail customers have nowhere to go.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {problems.map((item, index) => {
                const isActive = index === active;
                const line =
                  item.scene.lines[
                    isActive ? lineIndex % item.scene.lines.length : 0
                  ];

                return (
                  <article
                    key={item.title}
                    onMouseEnter={() => {
                      setActive(index);
                      setLineIndex(0);
                    }}
                    className={`relative flex min-h-0 flex-col gap-2.5 overflow-hidden rounded-[1.15rem] border px-4 pb-4 pt-4 pl-5 transition duration-300 motion-reduce:transition-none ${
                      isActive
                        ? "translate-y-[-2px] border-mint-strong/35 bg-white shadow-[0_18px_36px_-24px_rgba(12,51,47,0.45)] motion-reduce:translate-y-0"
                        : "border-border/95 bg-white/90 shadow-[0_14px_30px_-26px_rgba(12,51,47,0.35)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute top-3.5 bottom-3.5 left-0 w-[3px] rounded-full transition duration-300 ${
                        isActive
                          ? "bg-gradient-to-b from-teal-300 to-mint-strong"
                          : "bg-brand/15"
                      }`}
                    />

                    <div className="flex items-center gap-2.5 pl-1">
                      <span
                        aria-hidden
                        className={`font-display text-lg font-semibold leading-none ${
                          isActive ? "text-mint-strong" : "text-brand/30"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[0.65rem] border border-mint-strong/15 bg-mint/75 text-brand"
                      >
                        {getLandingIcon(item.icon)}
                      </span>
                      <h3 className="m-0 font-display text-[1.05rem] font-semibold text-brand-deep">
                        {item.title}
                      </h3>
                    </div>

                    <p className="m-0 pl-1 text-[0.86rem] leading-snug text-muted">
                      {item.body}
                    </p>

                    <div
                      aria-live="polite"
                      className={`mt-auto ml-1 flex min-h-10 items-center rounded-[0.8rem] px-2.5 py-2 ${
                        isActive
                          ? "border border-solid border-mint-strong/25 bg-mint/55"
                          : "border border-dashed border-brand/15 bg-brand-deep/[0.04]"
                      }`}
                    >
                      <span
                        key={`${item.title}-${line}`}
                        className="problem-line text-[0.78rem] leading-snug text-brand-deep"
                        style={{ animation: "problem-line 0.35s ease both" }}
                      >
                        {line}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div
              className="mt-3.5 flex justify-center gap-1.5"
              role="tablist"
              aria-label="Problems"
            >
              {problems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={item.title}
                  aria-selected={index === active}
                  onClick={() => {
                    setActive(index);
                    setLineIndex(0);
                  }}
                  className={`h-1.5 rounded-full border-0 p-0 transition-all duration-300 motion-reduce:transition-none ${
                    index === active
                      ? "w-[1.15rem] bg-mint-strong"
                      : "w-1.5 bg-brand/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
