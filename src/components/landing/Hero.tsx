import { AnimatedScene, FloatingOrbs } from "@/components/animation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_URL, hero, site } from "@/content/landing";
import { ChatMock } from "./ChatMock";
import "@/components/animation/motion.css";

export function Hero() {
  return (
    <section
      id="top"
      className="relative scroll-mt-20 overflow-hidden border-b border-border"
    >
      <AnimatedScene src="/landing/hero-bg.jpg" overlay="light" intensity="soft" />
      <FloatingOrbs tone="mint" />

      <Container className="relative grid items-start gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:py-20">
        <div className="max-w-xl self-center sb-fade-up">
          <p className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-strong sb-pulse-ring" />
            {site.name}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
            {hero.headline}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={DEMO_URL} target="_blank" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href="#solution" variant="outline" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="relative w-full min-w-0 lg:h-[32rem]">
          <ChatMock />
        </div>
      </Container>
    </section>
  );
}
