"use client";

import { useEffect, useRef, useState } from "react";
import "./cursor.css";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const running = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const tick = () => {
      const root = rootRef.current;
      if (!root) {
        running.current = false;
        return;
      }

      // Snappy follow — was 0.22 (laggy)
      ring.current.x += (pos.current.x - ring.current.x) * 0.48;
      ring.current.y += (pos.current.y - ring.current.y) * 0.48;

      root.style.setProperty("--rx", `${ring.current.x.toFixed(1)}px`);
      root.style.setProperty("--ry", `${ring.current.y.toFixed(1)}px`);

      const dx = Math.abs(pos.current.x - ring.current.x);
      const dy = Math.abs(pos.current.y - ring.current.y);

      if (dx < 0.35 && dy < 0.35) {
        running.current = false;
        return;
      }

      raf.current = requestAnimationFrame(tick);
    };

    const startLag = () => {
      if (running.current) return;
      running.current = true;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      root.style.setProperty("--cx", `${e.clientX}px`);
      root.style.setProperty("--cy", `${e.clientY}px`);
      root.classList.add("is-moving");
      startLag();
    };

    let lastInteractive = false;
    const onOver = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          "a, button, [role='button'], input, textarea, label, .cursor-hover",
        ),
      );
      if (interactive === lastInteractive) return;
      lastInteractive = interactive;
      root.classList.toggle(
        "is-hover",
        interactive && !root.classList.contains("is-scroll"),
      );
    };

    const onScroll = () => {
      const root = rootRef.current;
      if (!root) return;
      root.classList.add("is-scroll");
      root.classList.remove("is-hover");
      lastInteractive = false;
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        root.classList.remove("is-scroll");
      }, 280);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="sb-cursor" aria-hidden>
      <span className="sb-cursor-bloom" />
      <span className="sb-cursor-ring" />
      <span className="sb-cursor-dot" />
      <span className="sb-cursor-label">Open</span>
    </div>
  );
}
