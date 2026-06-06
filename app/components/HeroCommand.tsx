"use client";

import { useEffect, useState } from "react";

const WEB_TASKS = [
  "build an AI contract reviewer: extract every clause, flag risks by severity, cite the exact source span, and block the report until each finding is grounded",
  "build a multi-tenant SaaS: org-scoped data, owner/admin/member roles, metered Stripe billing, and an append-only audit log of every write",
  "build an AI support copilot grounded in our docs: cite every source, and answer \"I don't know\" when no document supports the question",
  "build a realtime ops dashboard: stream metrics over SSE, gate each panel by role, and alert when a threshold stays breached for five minutes",
  "build a marketplace: Stripe Connect seller payouts, reviews limited to verified buyers, and search ranked by rating then recency",
];

const MOBILE_TASKS = [
  "build a telehealth app: book appointments, end-to-end encrypted chat, tokens in secure storage, and a push reminder before each visit",
  "build a field-service app: work offline, queue jobs and signatures, sync on reconnect, and never lose a record on a dropped connection",
  "build a delivery tracker: live driver location, push ETA updates, and an order status timeline that survives app restarts",
  "build an authenticator: TOTP codes, biometric unlock, encrypted backup, and SMS fallback when the camera can't scan a QR",
  "build a safety check-in app: scheduled check-ins, an SOS button that shares location, and SMS fallback when there's no data connection",
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
    if (!del && n < full) t = setTimeout(() => setN((c) => c + 1), 30 + Math.random() * 20);
    else if (!del && n >= full) t = setTimeout(() => setDel(true), 2200);
    else if (del && n > 0) t = setTimeout(() => setN((c) => c - 1), 11);
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
      <div className="mono flex min-h-[9rem] gap-2 px-5 py-4 text-[13px] leading-relaxed">
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
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-4 md:grid-cols-2">
        <Terminal label="Web" color="var(--color-accent)" repo="github.com/elleskay/platform" tasks={WEB_TASKS} />
        <Terminal label="Mobile" color="var(--color-violet)" repo="github.com/elleskay/mobile-platform" tasks={MOBILE_TASKS} />
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-muted)]">
        Spec-driven by default: your agent turns each brief into a <span className="text-[var(--color-ink)]">spec</span>, writes the code and the tests together, and CI blocks the deploy until every requirement is covered by a passing test.
      </p>
    </div>
  );
}
