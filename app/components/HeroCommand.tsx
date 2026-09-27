"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Task = {
  prompt: string;
  slug: string;
  // First requirement of the spec the agent writes (shown in the file preview).
  id: string;
  title: string;
  // The screen or page the agent writes after the spec.
  file: string;
};

const WEB_TASKS: Task[] = [
  { prompt: "build a benefits eligibility checker: a citizen answers a short form, sees which subsidies they qualify for, and gets the rule that decided each", slug: "benefits-checker", id: "BENEFITS-ELIG-001", title: "Each result names the rule that decided it", file: "apps/web/app/check/page.tsx" },
  { prompt: "build a grants portal: citizens apply, officers review in a queue, every status change is logged, and applicants are notified at each step", slug: "grants-portal", id: "GRANTS-FLOW-001", title: "Every status change is written to the log", file: "apps/web/app/applications/page.tsx" },
  { prompt: "build a public-records request tracker: citizens file FOI requests, officers assign and respond, and an SLA timer flags anything overdue", slug: "records-tracker", id: "RECORDS-SLA-001", title: "Requests past their SLA are flagged overdue", file: "apps/web/app/requests/page.tsx" },
  { prompt: "build a permit portal: citizens submit and pay, officers approve or return with reasons, and the citizen sees exactly which items are missing", slug: "permit-portal", id: "PERMIT-REVIEW-001", title: "A returned permit lists every missing item", file: "apps/web/app/permits/page.tsx" },
  { prompt: "build a caseworker dashboard: triage cases by priority, role-gated access to records, and an append-only audit log of every action", slug: "casework", id: "CASES-AUDIT-001", title: "Every action appends an audit entry", file: "apps/web/app/cases/page.tsx" },
];

const MOBILE_TASKS: Task[] = [
  { prompt: "build a municipal issue reporter: a citizen photographs a pothole, it geotags and routes to the right department, and they track it to closed", slug: "issue-reporter", id: "REPORT-ROUTE-001", title: "A photo report is geotagged and routed", file: "apps/app/app/report.tsx" },
  { prompt: "build a field-inspection app for officers: offline checklists, photo evidence and signatures, and sync that never drops a report", slug: "field-inspections", id: "INSPECT-SYNC-001", title: "Reports made offline sync without loss", file: "apps/app/app/inspection.tsx" },
  { prompt: "build a disaster check-in app: residents mark themselves safe, request help with their location, and officers watch a live needs map", slug: "safe-check-in", id: "CHECKIN-SAFE-001", title: "A resident can mark themselves safe", file: "apps/app/app/check-in.tsx" },
  { prompt: "build an officer dispatch app: assigned jobs with directions, status updates from the field, and a push alert on every high-priority case", slug: "officer-dispatch", id: "DISPATCH-ALERT-001", title: "High-priority jobs send a push alert", file: "apps/app/app/jobs.tsx" },
  { prompt: "build a benefits check-in app: appointment reminders, secure document upload, and an SMS fallback when there's no data connection", slug: "benefits-check-in", id: "CHECKIN-SMS-001", title: "Reminders fall back to SMS offline", file: "apps/app/app/appointments.tsx" },
];

const TEMPLATES = {
  web: { name: "platform", repo: "github.com/elleskay/platform", color: "var(--color-accent)", tasks: WEB_TASKS },
  mobile: { name: "mobile-platform", repo: "github.com/elleskay/mobile-platform", color: "var(--color-violet)", tasks: MOBILE_TASKS },
};
type Kind = keyof typeof TEMPLATES;

const TODOS = ["Write the spec", "Scaffold the app", "Write the code and the tests", "Connect GitHub and AWS", "Open a PR and pass its checks", "Merge and deploy"];

/* ---------- terminal pieces, styled after the Claude Code CLI ---------- */

function Bullet({ tone }: { tone: "text" | "run" | "ok" }) {
  const color = tone === "ok" ? "var(--color-ok)" : tone === "run" ? "var(--color-faint)" : "var(--color-ink)";
  return <span className={`mt-[0.55em] h-[7px] w-[7px] shrink-0 rounded-full ${tone === "run" ? "motion-safe:animate-pulse" : ""}`} style={{ background: color }} />;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="var(--color-ok)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function Msg({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex gap-2.5">
      <Bullet tone="text" />
      <div className="min-w-0 text-ink-2">{children}</div>
    </div>
  );
}

// A tool call: "⏺ Name(arg)" and its indented "⎿" result, if any yet. The
// bullet pulses until the call is done.
function Tool({ name, arg, done, children }: { name: string; arg: string; done: boolean; children?: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="flex gap-2.5">
        <Bullet tone={done ? "ok" : "run"} />
        <div className="min-w-0 truncate">
          <span className="font-medium text-ink">{name}</span>
          {arg && <span className="text-muted">({arg})</span>}
        </div>
      </div>
      {children && (
        <div className="flex gap-2 pl-[3px] text-muted">
          <span aria-hidden className="ml-[1px] mt-[0.3em] h-[0.7em] w-[0.75em] shrink-0 border-b border-l border-faint" />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      )}
    </div>
  );
}

function Todos({ done }: { done: boolean }) {
  return (
    <Tool name="Update Todos" arg="" done>
      <ul>
        {TODOS.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="grid h-3 w-3 shrink-0 place-items-center rounded-[3px] border border-line-2">{done && <Check />}</span>
            <span className={done ? "text-faint line-through" : "text-ink-2"}>{t}</span>
          </li>
        ))}
      </ul>
    </Tool>
  );
}

// File preview under a Write, numbered like the CLI shows it.
function Preview({ lines, more }: { lines: string[]; more: number }) {
  return (
    <div>
      {lines.map((l, i) => (
        <div key={i} className="flex gap-3">
          <span className="w-4 shrink-0 text-right text-faint">{i + 1}</span>
          <span className="truncate whitespace-pre text-ink-2">{l}</span>
        </div>
      ))}
      <div className="text-faint">… +{more} lines (ctrl+r to expand)</div>
    </div>
  );
}

const FRAMES = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];

function Spinner({ verb }: { verb: string }) {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setF((n) => (n + 1) % FRAMES.length), 120);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-3 flex gap-2.5 text-claude">
      <span className="w-[7px] shrink-0 text-center">{FRAMES[f]}</span>
      <span>
        {verb}… <span className="text-faint">(esc to interrupt)</span>
      </span>
    </div>
  );
}

/* ---------- the session script ---------- */

// Each event reveals over `ticks` steps, `pace` ms apart; `verb` drives the spinner.
type Event = { verb: string; ticks: number; pace: number; render: (progress: number) => React.ReactNode };

function tool(name: string, arg: string, verb: string, result: React.ReactNode): Event {
  return { verb, ticks: 2, pace: 520, render: (p) => <Tool name={name} arg={arg} done={p > 1}>{p > 1 && result}</Tool> };
}

// A long-running call whose output streams in: a first line, then one ✓ item
// per tick, then a closing line once everything has passed.
function stream(name: string, arg: string, verb: string, first: React.ReactNode, items: string[], last: React.ReactNode): Event {
  const ticks = 2 + items.length + 1;
  return {
    verb,
    ticks,
    pace: 320,
    render: (p) => (
      <Tool name={name} arg={arg} done={p >= ticks}>
        {p > 1 && (
          <>
            <div>{first}</div>
            <div className="flex flex-wrap gap-x-4">
              {items.slice(0, p - 2).map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-ink-2"><Check /> {c}</span>
              ))}
            </div>
            {p >= ticks && <div>{last}</div>}
          </>
        )}
      </Tool>
    ),
  };
}

function script(kind: Kind, task: Task): Event[] {
  const web = kind === "web";
  const spec = `${web ? "apps/web" : "apps/app"}/specs/${task.slug}.yml`;
  const branch = `feat/${task.slug}`;
  // Required PR checks, by the job names in each template's workflows.
  const checks = web
    ? ["Spec coverage gate", "Typecheck", "Lint", "Build demo", "CDK synth", "CodeQL", "Secret scan", "npm audit"]
    : ["unit-component", "attestations", "Typecheck", "Lint + format", "Expo app", "CDK synth", "CodeQL", "Secret scan"];
  const deploy = web ? ["OIDC credentials", "CDK deploy", "Smoke test 9/9"] : ["OIDC credentials", "CDK deploy", "Smoke test"];

  const writeSpec = tool(
    "Write",
    spec,
    "Speccing",
    <>
      <div>
        Wrote 64 lines to <span className="text-ink-2">{spec}</span>
      </div>
      <Preview lines={[`app: ${task.slug}`, "version: 1", "requirements:", `  - id: ${task.id}`, `    title: ${task.title}`]} more={59} />
    </>,
  );
  const scaffold = tool(
    "Bash",
    web ? `cp -r infra/cdk/_template infra/cdk/${task.slug}` : "cp -r apps/_demo apps/app && cp -r services/_template services/api",
    "Scaffolding",
    <span className="text-faint">(No content)</span>,
  );

  return [
    { verb: "Reading", ticks: 1, pace: 700, render: () => <Msg>I&apos;ll build this on the {TEMPLATES[kind].name} template. Reading its conventions first.</Msg> },
    tool("Read", "CLAUDE.md", "Reading", <>Read {web ? 212 : 190} lines <span className="text-faint">(ctrl+r to expand)</span></>),
    { verb: "Planning", ticks: 1, pace: 650, render: () => <Todos done={false} /> },
    ...(web ? [writeSpec, scaffold] : [scaffold, writeSpec]),
    tool("Write", task.file, "Building", <>Wrote {web ? 148 : 132} lines to <span className="text-ink-2">{task.file}</span></>),
    tool(
      "Bash",
      "npm test",
      "Testing",
      <>
        <div className="flex items-center gap-1.5"><Check /> {web ? "Vitest and Playwright" : "jest-expo, Vitest, and Maestro"} results recorded</div>
        <div>spec-coverage: <span className="text-ok">100%</span> of requirements covered</div>
      </>,
    ),
    tool("Bash", "npm run setup", "Connecting", <div className="flex items-center gap-1.5"><Check /> OIDC role, database, and secrets configured</div>),
    tool("Bash", `git push -u origin ${branch} && gh pr create --fill`, "Opening a PR", <span className="text-ink-2">https://github.com/you/{task.slug}/pull/1</span>),
    stream(
      "Bash",
      "gh pr checks --watch",
      "Waiting on checks",
      "Branch protection holds the merge until these pass",
      checks,
      <span className="text-ink-2">All checks were successful</span>,
    ),
    stream(
      "Bash",
      "gh pr merge --squash && gh run watch",
      "Deploying",
      <span className="inline-flex items-center gap-1.5 text-ink-2"><Check /> Squashed and merged pull request #1</span>,
      deploy,
      web ? <span className="text-ink-2">Deployed to production</span> : <span className="text-ink-2">API deployed to production</span>,
    ),
    ...(web
      ? []
      : [tool("Bash", 'gh workflow run "Mobile build" -f profile=preview -f action=build', "Building the app", <span className="inline-flex items-center gap-1.5 text-ink-2"><Check /> Created workflow_dispatch event for mobile-build.yml at main</span>)]),
    { verb: "Wrapping up", ticks: 1, pace: 600, render: () => <Todos done /> },
    {
      verb: "Wrapping up",
      ticks: 1,
      pace: 650,
      render: () => (
        <Msg>
          Done. The PR passed every check and merged.{" "}
          {web ? (
            <><span className="text-ink">{task.slug}</span> is live on AWS, and every merge to main redeploys it.</>
          ) : (
            <>The API is live on AWS, and an EAS preview build of the app is running.</>
          )}
        </Msg>
      ),
    },
  ];
}

/* Type the prompt, send it, reveal the session tick by tick, hold, then start
   a fresh session on the other template. Reduced motion shows one finished
   session. */
function useSession() {
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);

  const kind: Kind = reduced || run % 2 === 0 ? "web" : "mobile";
  const tpl = TEMPLATES[kind];
  const task = reduced ? tpl.tasks[0] : tpl.tasks[Math.floor(run / 2) % tpl.tasks.length];
  const prompt = `use ${tpl.repo} to ${task.prompt}`;
  const events = useMemo(() => script(kind, task), [kind, task]);
  const total = events.reduce((n, e) => n + e.ticks, 0);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (!sent && typed < prompt.length) t = setTimeout(() => setTyped((n) => n + 1), 12 + Math.random() * 16);
    else if (!sent) t = setTimeout(() => setSent(true), 450);
    else if (step < total) {
      // The pace of whichever event the next tick belongs to.
      let i = 0;
      for (let n = step; n >= events[i].ticks; i++) n -= events[i].ticks;
      t = setTimeout(() => setStep((s) => s + 1), events[i].pace);
    } else {
      t = setTimeout(() => {
        setRun((r) => r + 1);
        setTyped(0);
        setSent(false);
        setStep(0);
      }, 5000);
    }
    return () => clearTimeout(t);
  }, [reduced, typed, sent, step, total, prompt, events]);

  if (reduced) return { kind, tpl, task, prompt, events, typed: prompt.length, sent: true, step: total, total };
  return { kind, tpl, task, prompt, events, typed, sent, step, total };
}

/* The hero "product shot": a Claude Code session building an app from one of
   the templates, end to end, as a live, looping terminal. */
export default function HeroCommand() {
  const { tpl, task, prompt, events, typed, sent, step, total } = useSession();
  const scroller = useRef<HTMLDivElement>(null);

  // Keep the newest output in view, like a terminal.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: sent && step > 0 ? "smooth" : "auto" });
  }, [typed, sent, step]);

  let left = step;
  const shown = events.map((e, i) => {
    const p = Math.min(left, e.ticks);
    left -= p;
    return p > 0 ? <div key={i}>{e.render(p)}</div> : null;
  });
  let active = 0;
  for (let n = step; active < events.length - 1 && n >= events[active].ticks; active++) n -= events[active].ticks;
  // The prompt as typed so far, with the repo in the template's color.
  const draft = prompt.slice(0, typed);
  const repoEnd = 4 + tpl.repo.length;

  return (
    <div
      role="img"
      aria-label="Animation: Claude Code builds an app from the template, writes the spec and tests, opens a pull request, waits for its checks, merges, and ships it to AWS"
      className="overflow-hidden rounded-xl border border-border-strong bg-panel text-left shadow-high"
    >
      <div className="flex h-11 items-center gap-2 border-b border-line px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        <span className="mono ml-3 truncate text-[12px] text-muted">
          <span className="text-claude">✻</span> Claude Code <span className="text-faint">—</span> ~/{task.slug}
        </span>
      </div>

      <div
        ref={scroller}
        className="mono h-[25rem] overflow-hidden px-4 pb-4 pt-5 text-[12px] leading-[1.65] [mask-image:linear-gradient(to_bottom,transparent,#000_28px)] sm:h-[28rem] sm:px-6 sm:text-[13px]"
      >
        <div className="w-fit max-w-full rounded-md border border-claude/50 px-4 py-3 text-ink-2">
          <div>
            <span className="text-claude">✻</span> Welcome to <span className="font-medium text-ink">Claude Code</span>!
          </div>
          <div className="mt-3 pl-4 text-muted">/help for help, /status for your current setup</div>
          <div className="mt-3 pl-4 text-muted">cwd: ~/{task.slug}</div>
        </div>

        {sent && (
          <div className="mt-4 flex gap-2.5 rounded-md bg-surface px-2 py-1 text-muted">
            <span>&gt;</span>
            <span>
              use <span style={{ color: tpl.color }}>{tpl.repo}</span> to {task.prompt}
            </span>
          </div>
        )}
        {shown}
        {sent && step < total && <Spinner verb={events[active].verb} />}

        <div className="mt-4 flex gap-2.5 rounded-lg border border-line-2 px-3 py-2">
          <span className="text-muted">&gt;</span>
          <span className="min-w-0 text-ink-2">
            {!sent && (
              <>
                {draft.slice(0, 4)}
                <span style={{ color: tpl.color }}>{draft.slice(4, repoEnd)}</span>
                {draft.slice(repoEnd)}
              </>
            )}
            <span className="caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-ink-2" />
          </span>
        </div>
        <div className="mt-1.5 flex justify-between px-1 text-[11px] text-faint">
          <span>? for shortcuts</span>
          <span className="text-violet">⏵⏵ accept edits on</span>
        </div>
      </div>
    </div>
  );
}
