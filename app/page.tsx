const REPO = "https://github.com/elleskay/platform";

const LIVE = {
  coverlens: "https://d33z7oya883ugt.cloudfront.net",
  cancer: "https://d1z96o21m62u9i.cloudfront.net",
  armoury: "https://d6a3alh51t58d.cloudfront.net",
};

function Mark({ className = "h-6 w-6", color = "var(--color-accent)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Check({ className = "h-4 w-4", color = "var(--color-ok)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
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
          <a href="#included" className="transition-colors hover:text-[var(--color-ink)]">What's included</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-ink)]">Showcase</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a href={REPO} className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:block">GitHub</a>
          <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">
            Use template
          </a>
        </div>
      </nav>
    </header>
  );
}

/* Hero centerpiece: prompt to live app */
function PromptConsole() {
  return (
    <div className="card mx-auto max-w-2xl overflow-hidden text-left shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">claude code</span>
      </div>
      <div className="mono space-y-2 p-5 text-[13px] leading-relaxed">
        <div className="text-[var(--color-ink)]">
          <span className="text-[var(--color-accent)]">›</span> use <span className="text-[var(--color-accent)]">github.com/elleskay/platform</span> to build a customer feedback portal with login and an admin dashboard
        </div>
        <div className="h-1.5" />
        <div className="flex items-start gap-2 text-[var(--color-muted)]"><Check className="mt-[3px] h-3.5 w-3.5" /><span>scaffolded from the platform template</span></div>
        <div className="flex items-start gap-2 text-[var(--color-muted)]"><Check className="mt-[3px] h-3.5 w-3.5" /><span>wrote the app and its spec tests</span></div>
        <div className="h-1.5" />
        <div className="flex items-start gap-2 text-[var(--color-ink)]">
          <span className="mt-[1px] text-[var(--color-accent)]">?</span>
          <span>ready to deploy. connect GitHub and AWS? <span className="text-[var(--color-accent)]">yes</span></span>
        </div>
        <div className="flex items-start gap-2 text-[var(--color-muted)]"><Check className="mt-[3px] h-3.5 w-3.5" /><span>connected: OIDC role, database, secrets</span></div>
        <div className="flex items-start gap-2 text-[var(--color-muted)]"><Check className="mt-[3px] h-3.5 w-3.5" /><span>pushed. github actions: ci, security, gate 100%, deploy</span></div>
        <div className="h-1.5" />
        <div className="flex items-center gap-2 text-[var(--color-ink)]">
          <span className="text-[var(--color-ok)]">●</span>
          <span>live at <span className="text-[var(--color-accent)]">your-app.cloudfront.net</span></span>
          <span className="caret ml-0.5 inline-block h-3.5 w-[7px] bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(700px_420px_at_50%_0%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(620px 360px at 50% -8%, rgba(139,149,255,0.18), transparent 60%), radial-gradient(560px 360px at 82% 4%, rgba(192,132,252,0.13), transparent 60%)" }} />
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-[var(--color-muted)] transition-colors hover:border-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> No setup. Just prompt your idea.
        </a>
        <h1 className="mx-auto mt-6 max-w-3xl text-[42px] font-bold leading-[1.05] tracking-tight sm:text-[68px]">
          Ship production-grade apps, <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-violet)] bg-clip-text text-transparent">fast.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          platform is a production-grade template for AI coding agents. Prompt your agent with an idea and it handles the rest: it scaffolds from the template, builds the app, and when it is ready to deploy it walks you through a one-time GitHub and AWS connection (an OIDC deploy role, a database, and a few secrets). From then on, every push ships to a live AWS URL, with no stored keys.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">Use the template</a>
          <a href="#how" className="rounded-lg border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:border-white/25">See how it works</a>
        </div>
        <div className="mt-14"><PromptConsole /></div>
      </div>
    </section>
  );
}

function Proof() {
  const apps = [
    { name: "CoverLens", live: LIVE.coverlens },
    { name: "Cancer Navigator", live: LIVE.cancer },
    { name: "Armoury", live: LIVE.armoury },
  ];
  return (
    <section className="border-y border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:justify-center sm:gap-10">
        <span className="text-[13px] uppercase tracking-[0.14em] text-[var(--color-faint)]">Live in production</span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--color-muted)]">
          {apps.map((a) => (
            <a key={a.name} href={a.live} className="flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"><Mark className="h-4 w-4" /> {a.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How it works, horizontal timeline */
function How() {
  const steps: [string, string][] = [
    ["Prompt your idea", "Point your AI coding agent at the platform repo and prompt it with the app you want. It scaffolds from the template and builds it. No setup first."],
    ["It asks to connect", "The first time it deploys, the agent walks you through a one-time GitHub and AWS connection: an OIDC deploy role, a database, and a few secrets. No stored keys."],
    ["It ships", "From then on, every push auto-builds, tests, and deploys to a live AWS URL. You just prompt the next idea."],
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prompt your idea. It does the rest.</h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">No setup first. Point your AI coding agent at the platform repo and prompt it with your idea. It walks you through the one-time connection itself, right when it is ready to deploy.</p>
      </div>
      <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block" />
        {steps.map(([t, body], i) => (
          <div key={t} className="relative text-center md:text-left">
            <div className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[var(--color-bg)] text-sm font-semibold text-[var(--color-accent)] md:mx-0">{i + 1}</div>
            <h3 className="mt-5 text-lg font-semibold">{t}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* What's included, checklist of the prebuilt layer */
function Included() {
  const items: [string, string][] = [
    ["CI/CD pipeline", "Typecheck, lint, build, and a full cdk synth on every push."],
    ["AWS serverless infra", "Lambda, S3, and CloudFront, provisioned by one CDK construct."],
    ["OIDC deploys", "GitHub assumes a short-lived role. No stored AWS keys."],
    ["Security scanning", "CodeQL, gitleaks, npm audit, and strict security headers."],
    ["Spec-driven test gate", "Every requirement bound to a test. 100% coverage, or it does not ship."],
    ["Post-deploy smoke test", "Nine live checks confirm the deploy actually works."],
    ["Auth and database", "Auth.js v5 sessions and Neon Postgres, ready to use."],
    ["Observability", "Sentry and PostHog hooks wired and waiting for a key."],
    ["Validation", "Zod at every server action boundary."],
  ];
  return (
    <section id="included" className="border-t border-white/[0.06] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nothing to wire. It's all built.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Your agent inherits the entire production layer, so it spends its time on your product, not the plumbing.</p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([t, body]) => (
            <div key={t} className="flex gap-3.5">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent)]/12">
                <Check className="h-3.5 w-3.5" color="var(--color-accent)" />
              </span>
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Showcase, live apps */
function Apps() {
  const apps = [
    { name: "CoverLens", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", live: LIVE.coverlens, repo: "https://github.com/elleskay/insurance-dashboard" },
    { name: "Cancer Navigator", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", live: LIVE.cancer, repo: "https://github.com/elleskay/cancer-navigator" },
    { name: "Armoury", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", live: LIVE.armoury, repo: "https://github.com/elleskay/armoury" },
  ];
  return (
    <section id="apps" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built on the platform. Live right now.</h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">Each is a full vertical slice shipped on the template, real auth, real data, a real AWS deploy.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {apps.map((a) => (
          <div key={a.name} className="card card-hover flex flex-col p-7">
            <div className="flex items-center gap-2.5"><Mark className="h-5 w-5" /><span className="font-semibold">{a.name}</span></div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
            <div className="mt-6 flex items-center gap-4 text-sm font-medium">
              <a href={a.live} className="text-[var(--color-accent)] hover:underline">Visit live</a>
              <a href={a.repo} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Repo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 280px at 50% 120%, rgba(139,149,255,0.2), transparent 65%)" }} />
        <div className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Prompt an idea. Ship a live app.</h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-[var(--color-muted)]">Point your AI coding agent at the platform repo and prompt it with your idea. It handles the rest, even the one-time GitHub and AWS connection. Every push ships to a live AWS URL, with no stored keys.</p>
          <div className="mono mx-auto mt-9 flex max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-left text-sm">
            <span className="text-[var(--color-accent)]">›</span>
            <span className="truncate text-[var(--color-ink)]">build my app on the elleskay/platform template</span>
            <a href={REPO} className="ml-auto shrink-0 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">Template</a>
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
      <Included />
      <Apps />
      <CTA />
      <Footer />
    </main>
  );
}
