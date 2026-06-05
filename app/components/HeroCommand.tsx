"use client";

import { useEffect, useState } from "react";

const WEB_TASKS = [
  "build a customer feedback portal with an admin dashboard",
  "build a SaaS billing dashboard with Stripe and teams",
  "build an internal helpdesk with ticketing and SLAs",
  "build a job board with an employer portal",
  "build a CMS with drafts, roles, and publishing",
];

const MOBILE_TASKS = [
  "build a scam-reporting app with call screening",
  "build a delivery driver app with offline routes",
  "build a habit tracker with reminders and streaks",
  "build a field-inspection app with photo capture",
  "build a community safety app with SMS verification",
];

function useTypewriter(tasks: string[]) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const full = tasks[i].length;
    let t: ReturnType<typeof setTimeout>;
    if (!del && n < full) t = setTimeout(() => setN((c) => c + 1), 42 + Math.random() * 28);
    else if (!del && n >= full) t = setTimeout(() => setDel(true), 1700);
    else if (del && n > 0) t = setTimeout(() => setN((c) => c - 1), 22);
    else {
      setDel(false);
      setI((p) => (p + 1) % tasks.length);
    }
    return () => clearTimeout(t);
  }, [i, n, del, reduced, tasks]);

  return reduced ? tasks[0] : tasks[i].slice(0, n);
}

function Terminal({ label, color, repo, tasks }: { label: string; color: string; repo: string; tasks: string[] }) {
  const text = useTypewriter(tasks);
  return (
    <div className="card overflow-hidden text-left shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">claude code</span>
        <span className="mono ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color, background: "rgba(255,255,255,0.05)" }}>
          {label}
        </span>
      </div>
      <div className="mono flex min-h-[6.5rem] gap-2 px-5 py-4 text-[13px] leading-relaxed">
        <span className="text-[var(--color-accent)]">›</span>
        <span className="text-[var(--color-ink)]">
          use <span style={{ color }}>{repo}</span> to {text}
          <span className="caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-[var(--color-accent)]" />
        </span>
      </div>
    </div>
  );
}

export default function HeroCommand() {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      <Terminal label="Web" color="var(--color-accent)" repo="github.com/elleskay/platform" tasks={WEB_TASKS} />
      <Terminal label="Mobile" color="var(--color-violet)" repo="github.com/elleskay/mobile-platform" tasks={MOBILE_TASKS} />
    </div>
  );
}
