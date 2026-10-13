import { AnimatedScene } from "@/components/animation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_URL, hero, tourSteps } from "@/content/landing";
import { getLandingIcon } from "./icons";

function HArrow({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`hidden items-center justify-center self-center text-teal-200/80 sm:flex ${
        flip ? "-scale-x-100" : ""
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 48 16" className="h-4 w-9 overflow-visible">
        <path
          d="M2 8h38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="motion-safe:animate-[tourDash_1.6s_linear_infinite]"
        />
        <path
          d="M36 3l8 5-8 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function FlowNode({
  step,
  index,
}: {
  step: (typeof tourSteps)[number];
  index: number;
}) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/18 p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-teal-200/45 hover:bg-white/28 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-teal-100 ring-1 ring-white/25">
          {getLandingIcon(step.icon)}
        </span>
        <span className="font-display text-sm font-semibold text-teal-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display text-base font-semibold text-white">
        {step.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/70">{step.body}</p>
    </div>
  );
}

function FlowRow({
  items,
  reverse,
}: {
  items: { step: (typeof tourSteps)[number]; index: number }[];
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-x-2">
      {items.map((item, i) => (
        <div key={item.step.title} className="contents">
          <FlowNode step={item.step} index={item.index} />
          {i < items.length - 1 ? <HArrow flip={reverse} /> : null}
        </div>
      ))}
    </div>
  );
}

export function Tour() {
  const top = [
    { step: tourSteps[0], index: 0 },
    { step: tourSteps[1], index: 1 },
    { step: tourSteps[2], index: 2 },
  ];
  const bottom = [
    { step: tourSteps[5], index: 5 },
    { step: tourSteps[4], index: 4 },
    { step: tourSteps[3], index: 3 },
  ];

  return (
    <section
      id="tour"
      className="relative scroll-mt-20 overflow-hidden border-b border-brand-deep/40 bg-brand-deep py-14 sm:py-20"
    >
      <style>{`
        @keyframes tourDash {
          to { stroke-dashoffset: -12; }
        }
      `}</style>

      <AnimatedScene src="/landing/tour-bg.jpg" overlay="dark" intensity="soft" />
      <div
        className="pointer-events-none absolute inset-0 bg-brand-deep/55"
        aria-hidden
      />

      <Container className="relative z-[1]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
              <span className="h-px w-6 bg-teal-200/70" aria-hidden />
              What you will see
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.1rem] lg:leading-snug">
              The Support Desk experience
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              A clear path through the live desk — from the first chat reply to
              escalation when a human is needed.
            </p>
          </div>
          <Button
            href={DEMO_URL}
            target="_blank"
            size="lg"
            variant="inverse"
            className="shrink-0 self-start lg:self-auto"
          >
            {hero.primaryCta}
          </Button>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-white/20 bg-white/10 p-4 shadow-[0_28px_60px_-34px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6">
          <p className="mb-5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-teal-100/80">
            Support Desk flow
          </p>

          {/* Mobile timeline */}
          <ol className="relative space-y-3 sm:hidden">
            <span
              aria-hidden
              className="absolute top-3 bottom-3 left-[1.35rem] w-px bg-gradient-to-b from-teal-200/50 via-white/20 to-teal-200/50"
            />
            {tourSteps.map((step, index) => (
              <li key={step.title} className="relative flex gap-3 pl-1">
                <span className="relative z-[1] mt-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-200/90 text-[0.65rem] font-bold text-brand-deep ring-2 ring-white/30">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-2xl border border-white/20 bg-white/15 p-3.5 backdrop-blur-xl">
                  <div className="mb-2 flex items-center gap-2 text-teal-100">
                    {getLandingIcon(step.icon)}
                    <h3 className="font-display text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Desktop snake flowchart: 01→02→03 ↓ 06←05←04 */}
          <div className="hidden sm:block">
            <FlowRow items={top} />

            <div className="flex justify-end py-1 pr-[16%]" aria-hidden>
              <svg
                viewBox="0 0 16 36"
                className="h-8 w-4 overflow-visible text-teal-200/80"
              >
                <path
                  d="M8 2v24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="motion-safe:animate-[tourDash_1.6s_linear_infinite]"
                />
                <path
                  d="M3 22l5 8 5-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <FlowRow items={bottom} reverse />

            <p className="mt-5 text-center text-xs text-white/55">
              Chat → sources → session → status → feedback → escalation
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
