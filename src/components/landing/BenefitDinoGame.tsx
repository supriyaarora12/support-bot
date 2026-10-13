"use client";

import { useCallback, useEffect, useRef } from "react";

const W = 720;
const H = 40;
const GROUND = 30;
const GRAVITY = 0.5;
const JUMP_V = -7.2;
const BASE_SPEED = 3.6;

type Obstacle = { x: number; w: number; h: number };
type Mode = "ready" | "play" | "over";

/** Slim Chrome-dino style strip — section divider, no chrome border. */
export function BenefitDinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>("ready");
  const yRef = useRef(GROUND);
  const vyRef = useRef(0);
  const groundedRef = useRef(true);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const frameRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const scoreRef = useRef(0);

  const reset = useCallback(() => {
    yRef.current = GROUND;
    vyRef.current = 0;
    groundedRef.current = true;
    obstaclesRef.current = [];
    frameRef.current = 0;
    speedRef.current = BASE_SPEED;
    scoreRef.current = 0;
    modeRef.current = "play";
  }, []);

  const jump = useCallback(() => {
    if (modeRef.current !== "play") {
      reset();
      return;
    }
    if (groundedRef.current) {
      vyRef.current = JUMP_V;
      groundedRef.current = false;
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(19, 78, 74, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 0.5);
      ctx.lineTo(W, GROUND + 0.5);
      ctx.stroke();

      ctx.fillStyle = "rgba(13, 148, 136, 0.35)";
      for (let i = 0; i < 10; i += 1) {
        const dx =
          ((frameRef.current * speedRef.current * 0.5 + i * 72) % (W + 30)) - 15;
        ctx.fillRect(dx, GROUND + 4, 2, 1);
      }

      const playing = modeRef.current === "play";
      const idle = modeRef.current === "ready";

      if (playing || idle) {
        frameRef.current += 1;
        speedRef.current = idle
          ? 2.1
          : BASE_SPEED + Math.min(2.8, frameRef.current / 600);
        if (playing) scoreRef.current = Math.floor(frameRef.current / 8);

        vyRef.current += GRAVITY;
        yRef.current += vyRef.current;
        if (yRef.current >= GROUND) {
          yRef.current = GROUND;
          vyRef.current = 0;
          groundedRef.current = true;
        }

        const gap = idle ? 200 : 160;
        const last = obstaclesRef.current[obstaclesRef.current.length - 1];
        if (!last || last.x < W - gap) {
          if (Math.random() < (idle ? 0.018 : 0.03)) {
            obstaclesRef.current.push({
              x: W + 8,
              w: 7 + Math.floor(Math.random() * 5),
              h: 10 + Math.floor(Math.random() * 10),
            });
          }
        }

        obstaclesRef.current = obstaclesRef.current
          .map((o) => ({ ...o, x: o.x - speedRef.current }))
          .filter((o) => o.x + o.w > -16);

        if (idle) {
          const near = obstaclesRef.current.find((o) => o.x > 48 && o.x < 78);
          if (near && groundedRef.current) {
            vyRef.current = JUMP_V;
            groundedRef.current = false;
          }
        }

        if (playing) {
          for (const o of obstaclesRef.current) {
            if (
              48 < o.x + o.w - 1 &&
              62 > o.x + 1 &&
              yRef.current > GROUND - o.h
            ) {
              modeRef.current = "over";
              break;
            }
          }
        }
      }

      ctx.fillStyle = "#134e4a";
      for (const o of obstaclesRef.current) {
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
      }

      const run = Math.floor(frameRef.current / 5) % 2;
      ctx.fillStyle = "#0d9488";
      ctx.fillRect(48, yRef.current - 16, 14, 14);
      ctx.fillStyle = "#5eead4";
      ctx.fillRect(56, yRef.current - 12, 3, 3);
      ctx.fillStyle = "#134e4a";
      ctx.fillRect(50, yRef.current - 2, 3, 4 + run);
      ctx.fillRect(57, yRef.current - 2, 3, 4 - run);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== "ArrowUp") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <button
      type="button"
      onClick={jump}
      aria-label="Play runner divider game"
      className="block w-full cursor-pointer border-0 bg-transparent p-0"
    >
      <canvas ref={canvasRef} width={W} height={H} className="h-10 w-full" />
    </button>
  );
}
