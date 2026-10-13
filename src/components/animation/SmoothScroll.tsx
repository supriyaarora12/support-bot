"use client";

import { useEffect } from "react";

/**
 * Fast ease-out smooth scroll for in-page anchors only.
 * Avoids document scroll-behavior: smooth (feels slow / laggy on long pages).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;

    const scrollToY = (target: number, duration = 380) => {
      const start = window.scrollY;
      const diff = target - start;
      if (Math.abs(diff) < 1) return;
      const t0 = performance.now();
      cancelAnimationFrame(raf);

      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        // easeOutCubic — quick settle
        const e = 1 - (1 - t) ** 3;
        window.scrollTo(0, start + diff * e);
        if (t < 1) raf = requestAnimationFrame(step);
      };

      raf = requestAnimationFrame(step);
    };

    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      scrollToY(top);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
