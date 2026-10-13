import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { DEMO_URL, site } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-page to-mint/20 py-12">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BrandMark label={site.name} monogram="S" size="sm" />
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand transition-colors hover:text-brand-deep"
        >
          Open Support Desk →
        </a>
      </Container>
    </footer>
  );
}
