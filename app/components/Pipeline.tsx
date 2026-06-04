"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "prompt" | "ok" | "dim" | "accent" | "warn" | "err";
type Line = { t: string; tone?: Tone };

type Stage = {
  key: string;
  n: string;
  title: string;
  blurb: string;
  prompt: string;
  lines: Line[];
};

const TONE: Record<Tone, string> = {
  prompt: "text-[var(--color-ink)]",
  ok: "text-[var(--color-green-bright)]",
  dim: "text-[var(--color-faint)]",
  accent: "text-[var(--color-purple)]",
  warn: "text-[#eab308]",
  err: "text-[#fca5a5]",
};

const STAGES: Stage[] = [
  {
    key: "clone",
    n: "01",
    title: "Clone",
    blurb: "Start from a working monorepo, not a blank folder. App, infra, CI, and docs are already wired together.",
    prompt: "git clone github.com/elleskay/platform my-app",
    lines: [
      { t: "Cloning into 'my-app'...", tone: "dim" },
      { t: "apps/web        next.js app", tone: "dim" },
      { t: "infra/cdk       aws cdk stack", tone: "dim" },
      { t: ".github/        ci · security · deploy", tone: "dim" },
      { t: "ready in 1.4s", tone: "ok" },
    ],
  },
  {
    key: "ci",
    n: "02",
    title: "Integrate",
    blurb: "Every push runs typecheck, lint, build, and a full cdk synth. Broken infra fails the same PR as broken code.",
    prompt: "gh workflow run ci.yml",
    lines: [
      { t: "typecheck    tsc --noEmit", tone: "dim" },
      { t: "lint         eslint . --max-warnings 0", tone: "dim" },
      { t: "build        next build", tone: "dim" },
      { t: "synth        cdk synth", tone: "dim" },
      { t: "✓ ci passed in 1m 52s", tone: "ok" },
    ],
  },
  {
    key: "security",
    n: "03",
    title: "Scan",
    blurb: "Static analysis, secret scanning, and a dependency audit run in their own workflow on every change.",
    prompt: "gh workflow run security.yml",
    lines: [
      { t: "codeql       0 alerts", tone: "dim" },
      { t: "gitleaks     0 secrets", tone: "dim" },
      { t: "npm audit    0 vulnerabilities", tone: "dim" },
      { t: "✓ clean", tone: "ok" },
    ],
  },
  {
    key: "gate",
    n: "04",
    title: "Prove",
    blurb: "Requirements are data with IDs bound to tests. The build does not pass until coverage hits 100 percent.",
    prompt: "npm run test:spec",
    lines: [
      { t: "EX-API-001  payload validated     ✓", tone: "dim" },
      { t: "EX-UI-001   empty state renders   ✓", tone: "dim" },
      { t: "EX-SEC-001  headers present       ✓", tone: "dim" },
      { t: "coverage 100% (3/3)", tone: "accent" },
      { t: "✓ gate green, deploy allowed", tone: "ok" },
    ],
  },
  {
    key: "deploy",
    n: "05",
    title: "Deploy",
    blurb: "GitHub assumes a least-privilege role over OIDC, then CDK ships Lambda, S3, and CloudFront. No stored keys.",
    prompt: "gh workflow run deploy.yml",
    lines: [
      { t: "assume-role  oidc, 1h credentials", tone: "dim" },
      { t: "open-next    build", tone: "dim" },
      { t: "cdk deploy   WebStack", tone: "dim" },
      { t: "cloudfront   d33z7oya883ugt.cloudfront.net", tone: "accent" },
      { t: "✓ deployed", tone: "ok" },
    ],
  },
  {
    key: "smoke",
    n: "06",
    title: "Verify",
    blurb: "A post-deploy script probes the live URL. Any failure exits non-zero, so green always means a working site.",
    prompt: "scripts/verify-deploy.sh",
    lines: [
      { t: "health        200", tone: "dim" },
      { t: "headers       hsts · csp · nosniff", tone: "dim" },
      { t: "stylesheet    text/css", tone: "dim" },
      { t: "lambda-url    not leaked", tone: "dim" },
      { t: "✓ 9/9 checks, deploy verified", tone: "ok" },
    ],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stage = STAGES[active];

  return (
    <section id="pipeline" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <div className="mono text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">// one push, six stages</div>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            What happens when you <span className="text-[var(--color-green)]">git push</span>.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Scroll the session. The same pipeline runs on day one as on day one thousand.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Sticky terminal */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-2 border-[var(--color-border)] bg-[#0b1324] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b-2 border-[var(--color-border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[var(--color-green)]" />
                <span className="h-3 w-3 rounded-full bg-[#eab308]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-faint)]" />
                <span className="mono ml-3 text-[12px] text-[var(--color-faint)]">my-app ~ stage {stage.n}</span>
              </div>
              <div className="mono flex h-[340px] flex-col gap-2 p-6 text-[13px] leading-relaxed sm:h-[360px]">
                <div className="text-[var(--color-ink)]">
                  <span className="text-[var(--color-green)]">$</span> {stage.prompt}
                </div>
                <div key={stage.key} className="flex flex-col gap-2 pipe-fade">
                  {stage.lines.map((l, i) => (
                    <div key={i} className={TONE[l.tone ?? "dim"]}>
                      {l.t}
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 text-[var(--color-faint)]">
                  <span className="inline-block h-3.5 w-2 animate-pulse bg-[var(--color-green)]" />
                  <span>stage {stage.n} of 06</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling steps with a spine */}
          <div className="relative">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-[var(--color-border)] lg:block" aria-hidden />
            {STAGES.map((s, i) => {
              const on = i === active;
              return (
                <div
                  key={s.key}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="relative flex min-h-[58vh] flex-col justify-center pl-12"
                >
                  <span
                    className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border-2 text-[11px] font-bold transition-colors duration-300"
                    style={{
                      borderColor: on ? "var(--color-green)" : "var(--color-border)",
                      background: on ? "var(--color-green)" : "var(--color-surface-2)",
                      color: on ? "#06210f" : "var(--color-faint)",
                    }}
                  >
                    <span className="mono">{s.n}</span>
                  </span>
                  <div className="transition-opacity duration-300" style={{ opacity: on ? 1 : 0.4 }}>
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">{s.blurb}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
