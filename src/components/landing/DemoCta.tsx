import { LivingBackdrop } from "@/components/animation/LivingBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_URL, demoCta } from "@/content/landing";
import "@/components/animation/motion.css";

export function DemoCta() {
  return (
    <section
      id="demo"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-border bg-brand-deep py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <LivingBackdrop src="/landing/cta-atmosphere.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-deep/70 to-brand-deep/85" />
      </div>

      <Container className="relative z-10 text-center sb-fade-up">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-mint">
          Live demo
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {demoCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/75 sm:text-lg">
          {demoCta.body}
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            href={DEMO_URL}
            target="_blank"
            size="lg"
            variant="inverse"
            className="rounded-full px-8 shadow-lg shadow-black/20"
          >
            {demoCta.button}
          </Button>
        </div>
      </Container>
    </section>
  );
}
