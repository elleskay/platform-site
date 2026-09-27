"use client";

import { useEffect, useRef, useState } from "react";

const LEAD = 400; // pause before the first step lights up
const PACE = 1800; // time each step stays in progress
const HOLD = 4500; // pause on the finished timeline before it loops
const TICK = 100;

type State = "todo" | "current" | "done";

/* The five-step timeline, played as a run: a progress line sweeps from step to
   step, each step lights up while it is "in progress" and settles once done,
   and the last one goes live. It starts when scrolled into view, pauses off
   screen, and loops; reduced motion shows the finished timeline. */
export default function HowSteps({ steps }: { steps: [string, string][] }) {
  const root = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [reduced, setReduced] = useState(false);
  const end = LEAD + steps.length * PACE;

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const id = setInterval(() => {
      if (visible) setT((n) => (n >= end + HOLD ? 0 : n + TICK));
    }, TICK);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [reduced, end]);

  const now = reduced ? end : t;
  const stateOf = (i: number): State => {
    const start = LEAD + i * PACE;
    return now < start ? "todo" : now < start + PACE ? "current" : "done";
  };
  // The furthest step reached so far; the progress line ends at its dot.
  const reached = Math.min(steps.length - 1, Math.floor((now - LEAD) / PACE));
  const last = steps.length - 1;

  return (
    <div ref={root} className="relative mt-20">
      <div aria-hidden className="absolute left-0 right-0 top-[4px] hidden h-px bg-line md:block" />
      <div
        aria-hidden
        className="absolute left-0 top-[4px] hidden h-px transition-[width] duration-700 ease-out md:block"
        style={{
          width: reached < 0 ? 0 : `calc((100% + 2rem) * ${reached} / ${steps.length} + 4px)`,
          // Accent while in progress; the run's end turns it toward the live green.
          background: stateOf(last) === "done" ? "linear-gradient(to right, var(--color-accent), var(--color-ok))" : "var(--color-accent)",
        }}
      />
      <ol className="grid gap-10 md:grid-cols-5 md:gap-8">
        {steps.map(([title, body], i) => {
          const state = stateOf(i);
          const live = i === last && state === "done";
          const color = live ? "var(--color-ok)" : state === "todo" ? "var(--color-line-2)" : "var(--color-accent)";
          return (
            <li key={title} data-reveal={i} className="relative">
              <span className="relative z-10 block h-[9px] w-[9px]">
                {(state === "current" || live) && (
                  <span className="absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping" style={{ background: color }} />
                )}
                <span
                  className="absolute inset-0 rounded-full transition-colors duration-500"
                  style={{
                    background: color,
                    boxShadow: `0 0 0 4px var(--color-canvas), 0 0 0 5px ${state === "todo" ? "var(--color-line)" : `color-mix(in srgb, ${color} 45%, transparent)`}`,
                  }}
                />
              </span>
              <h3 className={`mt-8 font-medium transition-colors duration-500 ${state === "todo" ? "text-muted" : "text-ink"}`}>{title}</h3>
              <p className={`mt-1 transition-colors duration-500 ${state === "todo" ? "text-faint" : "text-muted"}`}>{body}</p>
              <div className="caption mt-4">
                Step {String(i + 1).padStart(2, "0")}
                {state === "current" && <span className="text-accent"> · in progress</span>}
                {state === "done" && <span className="text-ok"> · {live ? "live" : "done"}</span>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
