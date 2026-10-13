import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_URL, navLinks, site } from "@/content/landing";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-page/75 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0 transition-opacity hover:opacity-80">
          <BrandMark label={site.name} monogram="S" size="sm" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          href={DEMO_URL}
          target="_blank"
          size="md"
          className="shrink-0 text-xs sm:text-sm"
        >
          <span className="sm:hidden">Try demo</span>
          <span className="hidden sm:inline">Try Support Desk</span>
        </Button>
      </Container>
    </header>
  );
}
