"use client";

import { useEffect, useRef } from "react";
import "./cursor.css";

/** Visible teal gradient wash while scrolling — fades after ~1s. */
export function ScrollGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const fadeTimer = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const paint = () => {
      ticking.current = false;
      const y = window.scrollY;
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = y / max;
      const delta = y - lastY.current;
      lastY.current = y;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const glow = glowRef.current;
      if (!glow) return;

      if (Math.abs(delta) < 1) return;

      glow.dataset.dir = delta > 0 ? "down" : "up";
      glow.classList.add("is-active");

      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => {
        glow.classList.remove("is-active");
      }, 420);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="sb-scroll-progress" aria-hidden />
      <div ref={glowRef} className="sb-scroll-glow" aria-hidden>
        <span className="sb-scroll-glow-beam" />
      </div>
    </>
  );
}
