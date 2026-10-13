"use client";

import { useEffect, useRef, useState } from "react";
import { RunningBeam } from "@/components/animation";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/content/landing";
import { getLandingIcon } from "./icons";

function FeatureRow({
  item,
  index,
}: {
  item: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const fromRight = index % 2 === 1;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        className={`flex flex-col gap-3 sm:items-center sm:gap-6 ${
          fromRight ? "sm:flex-row-reverse" : "sm:flex-row"
        } ${inView ? "feature-in" : "feature-out"} ${
          fromRight ? "feature-from-right" : "feature-from-left"
        }`}
        style={{ transitionDelay: inView ? `${index * 55}ms` : "0ms" }}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-white text-brand ring-1 ring-brand/10">
          {getLandingIcon(item.icon)}
        </div>
        <div className={`max-w-2xl ${fromRight ? "sm:text-right" : ""}`}>
          <h3 className="font-display text-lg font-semibold text-brand-deep sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
            {item.body}
          </p>
        </div>
      </div>
      {index < features.length - 1 ? <RunningBeam className="mt-5" /> : null}
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-20 overflow-hidden border-b border-border bg-page py-12 sm:py-16"
    >
      <style>{`
        .feature-out {
          opacity: 0;
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .feature-from-left.feature-out {
          transform: translate3d(-2.5rem, 0, 0);
        }
        .feature-from-right.feature-out {
          transform: translate3d(2.5rem, 0, 0);
        }
        .feature-in {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-out,
          .feature-in,
          .feature-from-left.feature-out,
          .feature-from-right.feature-out {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <Container className="relative">
        <SectionHeader
          eyebrow="Key features"
          title="Built for real support work"
          subtitle="Docs search, tools, human handoff, feedback, and production safeguards — in one assistant."
        />

        <div className="mt-8 space-y-5">
          {features.map((item, index) => (
            <FeatureRow key={item.title} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
