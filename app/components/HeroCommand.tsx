"use client";

import { useEffect, useState } from "react";

const WEB_TASKS = [
  "build a benefits eligibility checker: a citizen answers a short form, sees which subsidies they qualify for, and gets the rule that decided each",
  "build a grants portal: citizens apply, officers review in a queue, every status change is logged, and applicants are notified at each step",
  "build a public-records request tracker: citizens file FOI requests, officers assign and respond, and an SLA timer flags anything overdue",
  "build a permit portal: citizens submit and pay, officers approve or return with reasons, and the citizen sees exactly which items are missing",
  "build a caseworker dashboard: triage cases by priority, role-gated access to records, and an append-only audit log of every action",
];

const MOBILE_TASKS = [
  "build a municipal issue reporter: a citizen photographs a pothole, it geotags and routes to the right department, and they track it to closed",
  "build a field-inspection app for officers: offline checklists, photo evidence and signatures, and sync that never drops a report",
  "build a disaster check-in app: residents mark themselves safe, request help with their location, and officers watch a live needs map",
  "build an officer dispatch app: assigned jobs with directions, status updates from the field, and a push alert on every high-priority case",
  "build a benefits check-in app: appointment reminders, secure document upload, and an SMS fallback when there's no data connection",
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
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-surface-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-surface-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-surface-strong)]" />
        <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">claude code</span>
        <span className="mono ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color, background: "var(--color-surface-strong)" }}>
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
