"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./living-backdrop.css";

type LivingBackdropProps = {
  src: string;
  alt?: string;
  className?: string;
};

/** Zoom + glow + running light streaks — only while section is on screen. */
export function LivingBackdrop({
  src,
  alt = "",
  className = "",
}: LivingBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-live", entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`sb-live ${className}`} aria-hidden>
      <div className="sb-live-media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="sb-live-shade" />
      <div className="sb-live-glow" />
      <div className="sb-live-particles" />
      <div className="sb-live-scan" />
      <div className="sb-live-streaks">
        <span className="sb-live-streak" />
        <span className="sb-live-streak" />
        <span className="sb-live-streak" />
      </div>
    </div>
  );
}
