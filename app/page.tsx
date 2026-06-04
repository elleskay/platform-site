const REPO = "https://github.com/elleskay/platform";

function Mark({ className = "h-6 w-6", color = "var(--color-accent)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2">
          <Mark className="h-5 w-5" />
          <span className="font-semibold tracking-tight">platform</span>
        </a>
        <div className="ml-2 hidden items-center gap-7 text-sm text-[var(--color-muted)] md:flex">
          <a href="#how" className="transition-colors hover:text-[var(--color-ink)]">How it works</a>
          <a href="#features" className="transition-colors hover:text-[var(--color-ink)]">Features</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-ink)]">Showcase</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a href={REPO} className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:block">GitHub</a>
          <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#06251a] transition-colors hover:bg-[var(--color-accent-strong)]">
            Use template
          </a>
        </div>
      </nav>
    </header>
  );
}

/* Hero product shot: a clean CI "checks" panel telling the two-PR story */
function ChecksPanel() {
  return (
    <div className="card mx-auto max-w-2xl overflow-hidden text-left">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">my-app · checks</span>
      </div>
      <div className="divide-y divide-white/[0.06]">
        <div className="flex items-start gap-3 px-4 py-4">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">PR #128 · spec-gate</span>
              <span className="mono text-[12px] text-red-400">66.7% (2/3)</span>
            </div>
            <p className="mono mt-1 text-[12px] text-[var(--color-faint)]">EX-API-002 has no test · deploy blocked</p>
          </div>
        </div>
        <div className="flex items-start gap-3 px-4 py-4">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">PR #129 · spec-gate</span>
              <span className="mono text-[12px] text-[var(--color-accent)]">100% (3/3)</span>
            </div>
            <p className="mono mt-1 text-[12px] text-[var(--color-faint)]">agent added the test · deployed to cloudfront</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(620px 360px at 50% -8%, rgba(52,211,153,0.16), transparent 60%), radial-gradient(560px 360px at 80% 0%, rgba(139,92,246,0.12), transparent 60%)" }} />
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-[var(--color-muted)] transition-colors hover:border-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> Built to pair with coding agents
        </a>
        <h1 className="mx-auto mt-6 max-w-3xl text-[42px] font-bold leading-[1.05] tracking-tight sm:text-[68px]">
          Ship what your agent <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-violet)] bg-clip-text text-transparent">can prove.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          platform is a TypeScript monorepo template that pairs with Claude Code and Codex. Your agent writes against a spec; the template proves every requirement, then deploys to AWS serverless. No green gate, no production.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#06251a] transition-colors hover:bg-[var(--color-accent-strong)]">Use the template</a>
          <a href="#how" className="rounded-lg border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:border-white/25">See how it works</a>
        </div>
        <div className="mt-14"><ChecksPanel /></div>
      </div>
    </section>
  );
}

function Proof() {
  const apps = ["CoverLens", "Cancer Navigator", "Armoury"];
  return (
    <section className="border-y border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:justify-center sm:gap-10">
        <span className="text-[13px] uppercase tracking-[0.14em] text-[var(--color-faint)]">In production</span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--color-muted)]">
          {apps.map((a) => (
            <span key={a} className="flex items-center gap-2"><Mark className="h-4 w-4" /> {a}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How it works */
function How() {
  const steps = [
    ["Author", "Your coding agent writes against the app's spec file, guided by the repo's CLAUDE.md conventions. It knows the stack and the deploy gotchas before it writes a line."],
    ["Prove", "The spec gate binds every requirement to a test and fails below 100% coverage. CodeQL, gitleaks, and npm audit run in parallel. An agent cannot mark its own homework."],
    ["Ship", "A green gate triggers an OIDC deploy and a smoke test verifies the live URL. Anything the agent could not prove never reaches production."],
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">An agent can write anything.<br />The gate decides what ships.</h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">The same gate applies to human and agent pull requests alike.</p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map(([t, body], i) => (
          <div key={t} className="card p-7">
            <div className="mono text-sm text-[var(--color-accent)]">0{i + 1}</div>
            <h3 className="mt-3 text-lg font-semibold">{t}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Feature bento */
function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    gate: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    oidc: <><circle cx="8" cy="12" r="3" /><path d="M11 12h9l-2 2m2-2l-2-2" /></>,
    cdk: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /></>,
    sec: <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" />,
    smoke: <path d="M3 12h4l2 6 4-14 2 8h6" />,
    batt: <><rect x="3" y="8" width="16" height="8" rx="2" /><path d="M22 11v2" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

function Features() {
  const small = [
    ["oidc", "OIDC deploys", "GitHub assumes a least-privilege role with 1-hour credentials. No stored AWS keys."],
    ["cdk", "One CDK construct", "NextjsServerless provisions Lambda, S3, and CloudFront via OpenNext, every gotcha baked in."],
    ["sec", "Security scanning", "CodeQL, gitleaks, and npm audit on every change, plus strict security headers."],
    ["smoke", "Smoke test", "Nine live checks probe the deploy. A non-zero exit blocks the release."],
    ["batt", "Batteries included", "Auth.js v5, Neon Postgres, Zod, Sentry, and PostHog, wired and ready."],
  ];
  return (
    <section id="features" className="border-t border-white/[0.06] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything wired on day one.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Clone the repo and inherit the whole production layer, so your agent spends its tokens on your product, not the plumbing.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* hero feature */}
          <div className="card lg:col-span-1 lg:row-span-2 flex flex-col p-7">
            <Icon name="gate" className="h-6 w-6" />
            <h3 className="mt-4 text-xl font-semibold">The spec gate</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">Requirements are data, each with an ID bound to a test. The build refuses to deploy until coverage hits 100%.</p>
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/30 p-4">
              <div className="mono flex items-center justify-between text-[12px]"><span className="text-[var(--color-muted)]">coverage</span><span className="text-[var(--color-accent)]">100%</span></div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full w-full rounded-full bg-[var(--color-accent)]" /></div>
              <div className="mono mt-3 space-y-1 text-[12px] text-[var(--color-faint)]">
                <div><span className="text-[var(--color-accent)]">✓</span> EX-API-001 · EX-API-002 · EX-UI-001</div>
                <div className="text-[var(--color-accent)]">gate green, deploy allowed</div>
              </div>
            </div>
          </div>
          {small.map(([icon, t, body]) => (
            <div key={t} className="card card-hover p-6">
              <Icon name={icon} />
              <h3 className="mt-3.5 font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Showcase */
function Apps() {
  const apps = [
    { name: "CoverLens", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", href: "https://github.com/elleskay/insurance-dashboard" },
    { name: "Cancer Navigator", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", href: "https://github.com/elleskay/cancer-navigator" },
    { name: "Armoury", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", href: "https://github.com/elleskay/armoury" },
  ];
  return (
    <section id="apps" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Proven by real apps.</h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">Each is a full vertical slice shipped on the template, real auth, real data, a real AWS deploy.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {apps.map((a) => (
          <a key={a.name} href={a.href} className="card card-hover group flex flex-col p-7">
            <div className="flex items-center gap-2.5"><Mark className="h-5 w-5" /><span className="font-semibold">{a.name}</span></div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
            <span className="mt-6 text-sm font-medium text-[var(--color-accent)] group-hover:underline">View repo</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 280px at 50% 120%, rgba(52,211,153,0.18), transparent 65%)" }} />
        <div className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Point your agent at it.</h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-[var(--color-muted)]">Clone the template and let your agent ship on day one, only what it can prove.</p>
          <div className="mono mx-auto mt-9 flex max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-left text-sm">
            <span className="text-[var(--color-accent)]">$</span>
            <span className="truncate text-[var(--color-ink)]">git clone github.com/elleskay/platform</span>
            <a href={REPO} className="ml-auto shrink-0 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-[#06251a] transition-colors hover:bg-[var(--color-accent-strong)]">Open</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[var(--color-faint)] sm:flex-row">
        <div className="flex items-center gap-2"><Mark className="h-4 w-4" /> platform, an open-source template. MIT.</div>
        <div className="flex items-center gap-6">
          <a href={REPO} className="transition-colors hover:text-[var(--color-ink)]">GitHub</a>
          <a href="https://github.com/elleskay" className="transition-colors hover:text-[var(--color-ink)]">elleskay</a>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Proof />
      <How />
      <Features />
      <Apps />
      <CTA />
      <Footer />
    </main>
  );
}
