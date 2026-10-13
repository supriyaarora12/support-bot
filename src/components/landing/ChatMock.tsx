"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content/landing";
import "./hero-chat.css";

type ChatItem = (typeof hero.chat)[number];

const STEP_MS = 1050;
const TYPING_MS = 650;
const HOLD_MS = 3200;

export function ChatMock() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(hero.chat.length);
      return;
    }

    let cancelled = false;
    const timers = new Set<number>();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const run = async () => {
      while (!cancelled) {
        setVisible(0);
        setTyping(false);
        await wait(500);
        if (cancelled) return;

        for (let i = 0; i < hero.chat.length; i += 1) {
          if (cancelled) return;
          const item = hero.chat[i];

          if (item.role === "bot") {
            setTyping(true);
            await wait(TYPING_MS);
            if (cancelled) return;
            setTyping(false);
          }

          setVisible(i + 1);
          await wait(STEP_MS);
        }

        await wait(HOLD_MS);
        if (cancelled) return;
        setCycle((c) => c + 1);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const messages = hero.chat.slice(0, visible);

  return (
    <div className="sb-hero-thread" aria-live="polite">
      {messages.map((item) => (
        <MessageBubble key={`${cycle}-${item.id}`} item={item} />
      ))}

      {typing ? (
        <div className="sb-hero-msg is-bot">
          <div className="sb-hero-typing" aria-hidden>
            <i />
            <i />
            <i />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MessageBubble({ item }: { item: ChatItem }) {
  const isUser = item.role === "user";
  const tags =
    ("sources" in item && item.sources) ||
    ("tools" in item && item.tools) ||
    undefined;
  const react =
    "handoff" in item && item.handoff
      ? "🙋 1"
      : "sources" in item && item.sources
        ? "✨ 1"
        : null;

  return (
    <div className={`sb-hero-msg ${isUser ? "is-user" : "is-bot"}`}>
      <div className="sb-hero-bubble">
        <p>{item.text}</p>

        {tags ? (
          <div className="sb-hero-meta">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}

        {react ? <span className="sb-hero-react">{react}</span> : null}
      </div>
    </div>
  );
}
