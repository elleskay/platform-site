"use client";

import { useEffect, useRef, useState } from "react";
import { siGithubactions } from "simple-icons";

// [start, end] in ms after the pull request is opened.
type Span = [number, number];
type Job = { name: string; at: Span; after?: boolean };
type Workflow = { name: string; file: string; jobs: Job[] };

/* One change to an app built on the web template, the way the template ships
   it: the pull request's required checks run, branch protection allows the
   merge once they pass, and the merge to main deploys. Workflow, job, and step
   names mirror the template's .github/workflows, and the smoke test prints
   what scripts/verify-deploy.sh prints. `after` marks a job that waits on the
   one before it. */
const CHECKS: Workflow[] = [
  { name: "Test (spec-driven)", file: "test.yml", jobs: [{ name: "Spec coverage gate", at: [600, 7600] }] },
  {
    name: "Security",
    file: "security.yml",
    jobs: [
      { name: "CodeQL", at: [500, 6200] },
      { name: "Secret scan", at: [500, 2200] },
      { name: "npm audit", at: [500, 3000] },
    ],
  },
  {
    name: "CI",
    file: "ci.yml",
    jobs: [
      { name: "Typecheck", at: [500, 3200] },
      { name: "Lint", at: [500, 2800] },
      { name: "Build demo", at: [3300, 6500], after: true },
      { name: "CDK synth", at: [6600, 8300], after: true },
    ],
  },
];
const CHECKS_DONE = 8300;
const MERGED_AT = 9200;

const DEPLOY: Span = [10300, 20300];
const DEPLOY_WORKFLOW: Workflow = {
  name: "Deploy",
  file: "deploy.yml",
  jobs: [
    { name: "Preflight", at: [9400, 10200] },
    { name: "Deploy to production", at: DEPLOY, after: true },
  ],
};

const STEPS: [string, Span][] = [
  ["Set up job", [10300, 10800]],
  ["Configure AWS credentials via OIDC", [10800, 11500]],
  ["Install workspace dependencies", [11500, 12400]],
  ["Apply database migrations", [12400, 13100]],
  ["Seed demo data", [13100, 13600]],
  ["Build Next.js with OpenNext", [13600, 15600]],
  ["CDK deploy", [15600, 17800]],
  ["Extract deployed URL", [17800, 18200]],
  ["Smoke test", [18200, 20100]],
  ["Complete job", [20100, 20300]],
];
const SMOKE_AT = 18200;

const SMOKE = [
  "Health endpoint (optional)",
  "Root redirects to /login",
  "/login renders",
  "Security headers present",
  "HTML loads a stylesheet",
  "Stylesheet serves as text/css",
  "NextAuth /api/auth/providers responds JSON",
  "NextAuth /api/auth/csrf returns a token",
  "No Lambda Function URL leaked in auth surface",
];

const DONE = 20500;
const HOLD = 6000;
const TICK = 100;

type State = "queued" | "running" | "done";
const stateAt = ([start, end]: Span, t: number): State => (t < start ? "queued" : t < end ? "running" : "done");

function Icon({ state, className = "h-3.5 w-3.5" }: { state: State; className?: string }) {
  if (state === "done") {
    return (
      <svg viewBox="0 0 16 16" className={`${className} shrink-0`}>
        <circle cx="8" cy="8" r="7" fill="var(--color-ok)" />
        <path d="M5 8.2l2 2 4-4.4" fill="none" stroke="var(--color-canvas)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === "running") {
    return (
      <svg viewBox="0 0 16 16" className={`${className} shrink-0 motion-safe:animate-spin`} fill="none" strokeWidth="2">
        <circle cx="8" cy="8" r="6" stroke="color-mix(in srgb, var(--color-warn) 25%, transparent)" />
        <path d="M8 2a6 6 0 0 1 6 6" stroke="var(--color-warn)" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className={`${className} shrink-0`} fill="none">
      <circle cx="8" cy="8" r="6.2" stroke="var(--color-line-2)" strokeWidth="1.5" strokeDasharray="2.2 2.2" />
    </svg>
  );
}

// Pull request glyph: a branch feeding main, colored by where the PR stands.
function PrIcon({ merged, className = "h-5 w-5" }: { merged: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`${className} shrink-0`} fill="none" stroke={merged ? "var(--color-accent-2)" : "var(--color-ok)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="3.5" r="1.75" />
      <circle cx="4" cy="12.5" r="1.75" />
      <circle cx="12" cy="12.5" r="1.75" />
      {merged ? <path d="M4 5.25v5.5M4 6.5c0 3 3 4.5 6.25 5.5" /> : <path d="M4 5.25v5.5M12 10.75V6.5a2 2 0 0 0-2-2H7.5m1.5-1.5L7.5 4.5 9 6" />}
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="var(--color-warn)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

function WorkflowRow({ wf, t, divider }: { wf: Workflow; t: number; divider: boolean }) {
  return (
    <div className={`flex flex-col gap-3 border-line px-5 py-4 sm:flex-row sm:items-center sm:gap-5 ${divider ? "border-b" : ""}`}>
      <div className="w-32 shrink-0">
        <div className="font-medium text-ink-2">{wf.name}</div>
        <div className="mono text-[11px] text-faint">{wf.file}</div>
      </div>
      {/* Dependency connectors only on wider screens, where a row never wraps
          a connector onto the start of a line. */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-x-0">
        {wf.jobs.map((job, i) => {
          const state = stateAt(job.at, t);
          return (
            <div key={job.name} className="flex items-center">
              {job.after ? (
                <span aria-hidden className="hidden items-center px-1 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full border border-line-2 bg-panel" />
                  <span className="h-px w-4 bg-line-2" />
                  <span className="h-1.5 w-1.5 rounded-full border border-line-2 bg-panel" />
                </span>
              ) : (
                i > 0 && <span className="hidden w-2 sm:block" />
              )}
              <span className={`inline-flex h-8 items-center gap-2 rounded-md border bg-panel px-2.5 transition-colors ${state === "queued" ? "border-line text-faint" : "border-line-2 text-ink-2"}`}>
                <Icon state={state} />
                {job.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Clock for the run: starts when the window scrolls into view, pauses while
   it is off screen, and loops after a pause on the finished run. Reduced
   motion shows the finished run. */
function useRunClock(target: React.RefObject<HTMLDivElement | null>) {
  const [t, setT] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(() => {
    const el = target.current;
    if (reduced || !el) return;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const id = setInterval(() => {
      if (visible) setT((n) => (n >= DONE + HOLD ? 0 : n + TICK));
    }, TICK);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [reduced, target]);

  return reduced ? DONE : t;
}

/* The pipeline "product shot": a pull request's required checks, the merge
   they unlock, and the deploy that merge triggers, with the deploy job's log
   on the right. */
export default function PipelineRun() {
  const root = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const t = useRunClock(root);
  const checksPassed = t >= CHECKS_DONE;
  const merged = t >= MERGED_AT;
  const deployed = t >= DONE;
  const smokeOpen = t >= SMOKE_AT;
  const smokeLines = Math.max(0, Math.min(SMOKE.length, Math.floor((t - SMOKE_AT) / 200)));
  const jobs = [...CHECKS, DEPLOY_WORKFLOW].flatMap((wf) => wf.jobs);
  const passed = jobs.filter((j) => t >= j.at[1]).length;

  // Once the smoke test starts, bring its log to the top of the panel, like
  // GitHub's live log view following the running step. Re-run as output
  // arrives, since the panel can only scroll that far once the log is tall.
  useEffect(() => {
    const el = log.current;
    const row = el?.querySelector<HTMLElement>("[data-step='Smoke test']");
    if (el && row) el.scrollTo({ top: smokeOpen ? row.offsetTop - 8 : 0, behavior: smokeOpen ? "smooth" : "auto" });
  }, [smokeOpen, smokeLines, deployed]);

  const status = deployed
    ? { icon: <Icon state="done" className="h-3 w-3" />, label: "Deployed" }
    : merged
      ? { icon: <Icon state="running" className="h-3 w-3" />, label: "Merged, deploying" }
      : checksPassed
        ? { icon: <Icon state="done" className="h-3 w-3" />, label: "Ready to merge" }
        : { icon: <Icon state="running" className="h-3 w-3" />, label: "Checks running" };

  return (
    <div
      ref={root}
      role="img"
      aria-label="Animation: a pull request on an app built from the web template. Its required checks (spec gate, security scans, CI) run, branch protection allows the merge once they pass, and the merge deploys over OIDC, where the smoke test passes all nine checks."
      className="overflow-hidden rounded-xl border border-border-strong bg-panel text-left text-[13px] shadow-high"
    >
      <div className="flex h-11 items-center gap-2 border-b border-line px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <svg viewBox="0 0 24 24" className="ml-3 h-3.5 w-3.5 shrink-0" fill="var(--color-muted)"><path d={siGithubactions.path} /></svg>
        <span className="truncate text-muted">
          you/ai-tax-assistant <span className="text-faint">/</span> <span className="text-ink-2">Pull request #12</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-5 py-4">
        <PrIcon merged={merged} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-medium text-ink">
            feat: AI tax assistant <span className="font-normal text-faint">#12</span>
          </div>
          <div className="mt-0.5 text-muted">
            {merged ? "Merged into" : "Wants to merge into"} <span className="mono inline-block rounded border border-line px-1.5 text-[11px] leading-[18px] text-ink-2">main</span> from{" "}
            <span className="mono inline-block rounded border border-line px-1.5 text-[11px] leading-[18px] text-ink-2">feat/ai-tax-assistant</span>
          </div>
        </div>
        <span className="hidden h-6 items-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] font-medium text-ink-2 sm:inline-flex">
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex flex-col bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="caption border-b border-line bg-panel px-5 py-2">Required checks</div>
          {CHECKS.map((wf, i) => (
            <WorkflowRow key={wf.name} wf={wf} t={t} divider={i < CHECKS.length - 1} />
          ))}

          <div className="flex h-14 items-center gap-2.5 border-y border-line bg-panel px-5">
            {merged ? (
              <>
                <PrIcon merged className="h-3.5 w-3.5" />
                <span className="truncate text-ink-2">Merged into main</span>
              </>
            ) : checksPassed ? (
              <>
                <Icon state="done" />
                <span className="truncate text-ink-2">All checks have passed</span>
                <span className="btn btn-invert ml-auto h-7 shrink-0 px-3 text-[12px]">Squash and merge</span>
              </>
            ) : (
              <>
                <Lock />
                <span className="truncate text-muted">Merge blocked until the required checks pass</span>
              </>
            )}
          </div>

          <div className="caption border-b border-line bg-panel px-5 py-2">On merge to main</div>
          <WorkflowRow wf={DEPLOY_WORKFLOW} t={t} divider={false} />

          <div className="mt-auto flex h-12 items-center gap-2.5 border-t border-line bg-panel px-5">
            {deployed ? (
              <>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                </span>
                <span className="truncate text-ink-2">Deployed to production, live on AWS</span>
              </>
            ) : (
              <span className="truncate text-faint">{t === 0 ? "Waiting for runners" : merged ? "Deploying…" : checksPassed ? "Ready to merge" : "Running checks…"}</span>
            )}
            <span className="mono ml-auto shrink-0 text-[12px] text-faint">{passed}/{jobs.length} jobs</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col border-t border-line lg:border-l lg:border-t-0">
          <div className="flex h-11 items-center gap-2 border-b border-line px-5">
            <Icon state={stateAt(DEPLOY, t)} />
            <span className="font-medium text-ink-2">Deploy to production</span>
            <span className="mono ml-auto text-[11px] text-faint">{merged ? "deploy.yml" : "waits for the merge"}</span>
          </div>
          {/* basis-0 (a length, not flex-1's 0%) keeps the growing log from
              stretching the window; it only fills the height the graph sets. */}
          <div ref={log} className="relative min-h-[21rem] grow basis-0 overflow-hidden py-2 [mask-image:linear-gradient(to_bottom,transparent,#000_20px)]">
            {STEPS.map(([name, at]) => {
              const state = stateAt(at, t);
              const open = name === "Smoke test" && state !== "queued";
              return (
                <div key={name} data-step={name}>
                  <div className={`flex h-8 items-center gap-2.5 px-5 ${state === "queued" ? "text-faint" : "text-ink-2"}`}>
                    <svg viewBox="0 0 16 16" className={`h-3 w-3 shrink-0 text-faint transition-transform ${open ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4" /></svg>
                    <Icon state={state} />
                    <span className="truncate">{name}</span>
                  </div>
                  {open && (
                    <div className="mono mx-5 mb-2 rounded-md bg-canvas px-3 py-2 text-[11.5px] leading-[1.7]">
                      <div className="text-muted">Run ./scripts/verify-deploy.sh &quot;$URL&quot;</div>
                      <div className="text-muted">Detected auth app (root returned 307); checking landing page /login</div>
                      {SMOKE.slice(0, smokeLines).map((line) => (
                        <div key={line} className="flex gap-3 whitespace-nowrap">
                          <span className="text-ok">PASS</span>
                          <span className="truncate text-ink-2">{line}</span>
                        </div>
                      ))}
                      {state === "done" && <div className="mt-1 text-ink-2">Summary: {SMOKE.length} passed, 0 failed</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
