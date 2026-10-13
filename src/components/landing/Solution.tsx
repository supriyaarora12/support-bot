"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { solution } from "@/content/landing";
import "./solution-showcase.css";

type Step = (typeof solution.steps)[number];
const STEP_COUNT = solution.steps.length;
const STEP_VH = 110;

function PanelVisual({ step, index }: { step: Step; index: number }) {
  return (
    <div className="sb-why-panel" aria-live="polite">
      {solution.steps.map((item) => (
        <div
          key={item.id}
          className={`sb-why-panel-image ${
            item.id === step.id ? "is-active" : ""
          }`}
        >
          <Image
            src={item.panel.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority={item.id === solution.steps[0].id}
          />
        </div>
      ))}
      <div className="sb-why-visual-frame" aria-hidden />

      <div key={step.id} className="sb-why-center">
        <p className="sb-why-eyebrow-panel">{step.panel.headline}</p>
        <h3 className="sb-why-caption-title">{step.title}</h3>
        <p className="sb-why-center-body">{step.body}</p>
        <span className="sb-why-mint-pill" aria-hidden />
        <p className="sb-why-center-metric">
          <b>{step.panel.metricValue}</b> {step.panel.metric}
        </p>
      </div>

      <div className="sb-why-steps" aria-hidden>
        {solution.steps.map((item, i) => (
          <span
            key={item.id}
            className={`sb-why-step-num ${i === index ? "is-active" : ""}`}
          >
            0{i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Solution() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const active = useMemo(
    () => solution.steps[activeIndex] ?? solution.steps[0],
    [activeIndex],
  );

  const updateFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const rect = track.getBoundingClientRect();
    const total = Math.max(1, track.offsetHeight - window.innerHeight);

    if (rect.top > 0) {
      setProgress(0);
      setActiveIndex(0);
      return;
    }

    if (rect.bottom <= window.innerHeight) {
      setProgress(1);
      setActiveIndex(STEP_COUNT - 1);
      return;
    }

    const scrolled = Math.min(total, Math.max(0, -rect.top));
    const nextProgress = scrolled / total;
    const nextIndex = Math.min(
      STEP_COUNT - 1,
      Math.floor(nextProgress * STEP_COUNT),
    );

    setProgress(nextProgress);
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        updateFromScroll();
        ticking.current = false;
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateFromScroll]);

  const goToStep = (index: number) => {
    const track = trackRef.current;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (!track || !desktop) {
      setActiveIndex(index);
      return;
    }

    const total = Math.max(1, track.offsetHeight - window.innerHeight);
    const target = track.offsetTop + ((index + 0.2) / STEP_COUNT) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="solution"
      className="sb-why relative scroll-mt-20 border-b border-border bg-page"
    >
      <div
        ref={trackRef}
        className="sb-why-track"
        style={{ height: `${STEP_COUNT * STEP_VH}vh` }}
      >
        <div className="sb-why-sticky sticky top-0 overflow-hidden">
          <div className="sb-why-stage">
            <div className="sb-why-copy-col">
              <p className="sb-why-eyebrow">{solution.eyebrow}</p>
              <h2 className="sb-why-title whitespace-pre-line">
                {solution.title}
              </h2>
              <p className="sb-why-lead">{solution.body}</p>

              <div className="sb-why-rail" role="tablist" aria-label="Solution steps">
                <div className="sb-why-rail-line" aria-hidden>
                  <span style={{ transform: `scaleY(${progress})` }} />
                </div>

                {solution.steps.map((step, index) => {
                  const selected = index === activeIndex;
                  const done = index < activeIndex;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={`sb-why-tab ${selected ? "is-active" : ""} ${
                        done ? "is-done" : ""
                      }`}
                      onClick={() => goToStep(index)}
                    >
                      <span className="sb-why-tab-num">0{index + 1}</span>
                      <span className="sb-why-tab-body">
                        <span className="sb-why-tab-label">{step.label}</span>
                        {selected ? (
                          <span className="sb-why-tab-desc">{step.body}</span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sb-why-media-col">
              <PanelVisual step={active} index={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
