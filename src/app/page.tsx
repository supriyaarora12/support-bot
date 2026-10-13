import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Benefits } from "@/components/landing/Benefits";
import { DemoCta } from "@/components/landing/DemoCta";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Nav } from "@/components/landing/Nav";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Tour } from "@/components/landing/Tour";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ScrollReveal>
          <Problem />
        </ScrollReveal>
        <ScrollReveal delayMs={40}>
          <Solution />
        </ScrollReveal>
        <ScrollReveal delayMs={40}>
          <Features />
        </ScrollReveal>
        <ScrollReveal delayMs={40}>
          <Tour />
        </ScrollReveal>
        <ScrollReveal delayMs={40}>
          <Benefits />
        </ScrollReveal>
        <ScrollReveal delayMs={60}>
          <DemoCta />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
