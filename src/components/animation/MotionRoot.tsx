"use client";

import type { ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { ScrollGlow } from "./ScrollGlow";
import { SmoothScroll } from "./SmoothScroll";

export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollGlow />
      <CustomCursor />
      {children}
    </>
  );
}
