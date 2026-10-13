import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { benefits } from "@/content/landing";
import { BenefitDinoGame } from "./BenefitDinoGame";

export function Benefits() {
  const mid = Math.ceil(benefits.length / 2);
  const top = benefits.slice(0, mid);
  const bottom = benefits.slice(mid);

  return (
    <section
      id="benefits"
      className="relative scroll-mt-20 overflow-hidden border-b border-border bg-surface py-14 sm:py-20"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            align="center"
            className="mx-auto"
            eyebrow="Benefits"
            title="Fewer tickets. Faster help. No dead ends."
            subtitle="Teams spend less time on repeats. Customers get answers anytime — with a human path when it matters."
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((item, index) => (
            <li key={item.title} className="border-t border-border pt-5">
              <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-mint-strong">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-lg font-semibold text-brand-deep">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}

          <li className="col-span-full py-1 sm:col-span-2 lg:col-span-3">
            <BenefitDinoGame />
          </li>

          {bottom.map((item, index) => (
            <li key={item.title} className="border-t border-border pt-5">
              <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-mint-strong">
                {String(mid + index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-lg font-semibold text-brand-deep">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
