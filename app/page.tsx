const REPO = "https://github.com/elleskay/platform";

function Mark({ className = "h-6 w-6", color = "var(--color-green)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/* App icon tile, the listing identity */
function AppIcon({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <div className={`${className} grid place-items-center rounded-[22%] border border-[var(--color-border)]`} style={{ background: "linear-gradient(140deg, #22c55e 0%, #0f172a 55%, #a855f7 100%)", boxShadow: "0 20px 50px -24px rgba(34,197,94,0.5)" }}>
      <Mark className="h-1/2 w-1/2" color="#f8fafc" />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">platform</span>
        </a>
        <div className="mono hidden items-center gap-8 text-sm font-medium text-[var(--color-muted)] md:flex">
          <a href="#screens" className="transition-colors hover:text-[var(--color-green-bright)]">preview</a>
          <a href="#features" className="transition-colors hover:text-[var(--color-green-bright)]">features</a>
          <a href="#proof" className="transition-colors hover:text-[var(--color-green-bright)]">proof</a>
          <a href="#info" className="transition-colors hover:text-[var(--color-green-bright)]">info</a>
        </div>
        <a href={REPO} className="mono rounded-full bg-[var(--color-green)] px-5 py-2 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">
          GET
        </a>
      </nav>
    </header>
  );
}

/* Hero, an app-store listing header */
function Hero() {
  const meta = [
    ["category", "Developer Tools"],
    ["price", "Free · MIT"],
    ["in production", "3 apps"],
  ];
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(900px_500px_at_50%_-10%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(620px 320px at 80% -10%, rgba(34,197,94,0.14), transparent 65%), radial-gradient(560px 320px at 14% 10%, rgba(168,85,247,0.12), transparent 65%)" }} />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-8">
          <AppIcon className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">platform</h1>
            <p className="mono mt-2 text-sm text-[var(--color-muted)] sm:text-base">Ship Next.js to AWS serverless, on day one</p>
            <div className="mono mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--color-faint)]">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-green-bright)]"><Check className="h-3.5 w-3.5" /> open source</span>
              <span className="text-[var(--color-border)]">·</span>
              <span>Developer Tools</span>
              <span className="text-[var(--color-border)]">·</span>
              <span>TypeScript monorepo</span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
            <a href={REPO} className="mono rounded-full bg-[var(--color-green)] px-8 py-3 text-center text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">
              USE TEMPLATE
            </a>
            <a href="#screens" className="mono rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-3 text-center text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-purple)]">
              preview
            </a>
          </div>
        </div>

        {/* meta strip, like an app-store sub-header */}
        <div className="mono mt-10 grid grid-cols-3 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)] text-center">
          {meta.map(([k, v]) => (
            <div key={k} className="px-3 py-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-faint)]">{k}</div>
              <div className="mt-1.5 text-base font-bold text-[var(--color-ink)]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Window frame for screenshots */
function Shot({ title, accent = "green", children }: { title: string; accent?: "green" | "purple"; children: React.ReactNode }) {
  const c = accent === "green" ? "var(--color-green)" : "var(--color-purple)";
  return (
    <div className="block snap-start w-[300px] shrink-0 sm:w-[380px]">
      <div className="border-2 border-[var(--color-border)] bg-[#0b1324]">
        <div className="flex items-center gap-2 border-b-2 border-[var(--color-border)] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-faint)]" />
          <span className="mono ml-2 truncate text-[11px] text-[var(--color-faint)]">{title}</span>
        </div>
        <div className="mono h-[230px] overflow-hidden p-4 text-[12px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* Screenshot carousel */
function Screens() {
  const R = ({ l, children, hi }: { l?: string; children: React.ReactNode; hi?: boolean }) => (
    <div className="flex gap-2"><span className="text-[var(--color-green)]">✓</span>{l ? <span className="w-[68px] shrink-0 text-[var(--color-ink)]">{l}</span> : null}<span className={hi ? "text-[var(--color-green-bright)]" : "text-[var(--color-faint)]"}>{children}</span></div>
  );
  return (
    <section id="screens" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mono mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">preview</h2>
          <span className="text-[12px] text-[var(--color-faint)]">scroll to see more</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <Shot title="my-app ~ git push origin main">
            <div className="space-y-1.5">
              <div className="text-[var(--color-ink)]"><span className="text-[var(--color-green)]">$</span> git push origin main</div>
              <div className="h-1" />
              <R l="ci">typecheck · lint · build · synth</R>
              <R l="security">codeql · gitleaks · audit</R>
              <R l="gate" hi>100% covered (3/3)</R>
              <R l="deploy">oidc · cdk · smoke 9/9</R>
              <div className="h-1" />
              <div className="flex gap-2"><span className="text-[var(--color-purple)]">●</span><span className="text-[var(--color-ink)]">live on cloudfront</span></div>
            </div>
          </Shot>
          <Shot title="infra/cdk/web/lib/web-stack.ts" accent="purple">
            <pre className="text-[var(--color-muted)]">{`new `}<span className="text-[var(--color-purple)]">NextjsServerless</span>{`(this, "Web", {
  appPath: resolve("apps/web"),
  serverTimeoutSeconds: 60,
  customDomain: "app.example.com",
  environment: {
    DATABASE_URL,
    AUTH_SECRET,
    AUTH_URL,
  },
});`}</pre>
          </Shot>
          <Shot title="npm run test:spec">
            <div className="space-y-1.5 text-[var(--color-muted)]">
              <div>EX-API-001 payload validated <span className="text-[var(--color-green)]">✓</span></div>
              <div>EX-UI-001 empty state <span className="text-[var(--color-green)]">✓</span></div>
              <div>EX-SEC-001 headers <span className="text-[var(--color-green)]">✓</span></div>
              <div className="h-1" />
              <div className="text-[var(--color-purple)]">coverage 100% (3/3)</div>
              <div className="text-[var(--color-green-bright)]">gate green, deploy allowed</div>
              <div className="h-2" />
              <div className="text-[#fca5a5]">on miss: 66.7% (2/3), build blocked</div>
            </div>
          </Shot>
          <Shot title="github actions" accent="purple">
            <div className="space-y-3">
              {[["ci", "typecheck · lint · build · synth", "green"], ["security", "codeql · gitleaks · npm audit", "purple"], ["deploy", "oidc · cdk deploy · smoke", "green"]].map(([k, v, col]) => (
                <div key={k} className="border-l-2 pl-2.5" style={{ borderColor: col === "green" ? "var(--color-green)" : "var(--color-purple)" }}>
                  <div className="font-bold text-[var(--color-ink)]">{k}</div>
                  <div className="text-[var(--color-faint)]">{v}</div>
                </div>
              ))}
            </div>
          </Shot>
          <Shot title="scripts/verify-deploy.sh">
            <div className="space-y-1.5 text-[var(--color-muted)]">
              <div><span className="text-[var(--color-green)]">✓</span> health endpoint 200</div>
              <div><span className="text-[var(--color-green)]">✓</span> security headers</div>
              <div><span className="text-[var(--color-green)]">✓</span> stylesheet text/css</div>
              <div><span className="text-[var(--color-green)]">✓</span> no lambda-url leaked</div>
              <div className="h-1" />
              <div className="text-[var(--color-green-bright)]">9/9 checks, deploy verified</div>
            </div>
          </Shot>
        </div>
      </div>
    </section>
  );
}

/* Features with icons */
function Icon({ name }: { name: string }) {
  const common = { className: "h-6 w-6", fill: "none", stroke: "var(--color-green)", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    cicd: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></>,
    infra: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /></>,
    security: <><path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" /></>,
    oidc: <><circle cx="8" cy="12" r="3" /><path d="M11 12h9l-2 2m2-2l-2-2" /></>,
    gate: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    smoke: <><path d="M3 12h4l2 6 4-14 2 8h6" /></>,
  };
  return <svg viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
}

function Features() {
  const items = [
    ["cicd", "CI/CD pipeline", "Typecheck, lint, build, and a full cdk synth on every push, then an OIDC deploy."],
    ["infra", "Infrastructure as code", "One NextjsServerless CDK construct: Lambda, S3, and CloudFront via OpenNext."],
    ["security", "Security scanning", "CodeQL, gitleaks, and npm audit in their own workflow, plus strict headers."],
    ["oidc", "OIDC deploys", "GitHub assumes a least-privilege role with 1-hour credentials. No stored keys."],
    ["gate", "Spec-driven gate", "Requirements are data bound to tests. Below 100% coverage, the build fails."],
    ["smoke", "Post-deploy smoke test", "Nine live checks probe the deploy. A non-zero exit blocks the release."],
  ];
  return (
    <section id="features" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mono mb-10 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">what is inside</h2>
        <div className="grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([icon, title, body]) => (
            <div key={title} className="bg-[var(--color-bg)] p-6">
              <div className="inline-flex border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5"><Icon name={icon} /></div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Ratings & reviews, adapted honestly: real metrics + real apps shipped on it */
function Proof() {
  const stats = [
    ["apps in production", "3"],
    ["spec coverage gate", "100%"],
    ["post-deploy checks", "9/9"],
    ["stored AWS keys", "0"],
  ];
  const apps = [
    { name: "CoverLens", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", href: "https://github.com/elleskay/insurance-dashboard" },
    { name: "Cancer Navigator", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", href: "https://github.com/elleskay/cancer-navigator" },
    { name: "Armoury", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", href: "https://github.com/elleskay/armoury" },
  ];
  return (
    <section id="proof" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mono mb-10 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">proven in production</h2>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* summary rail */}
          <div className="block border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="text-5xl font-bold tracking-tight">3</div>
            <div className="mono mt-1 text-sm text-[var(--color-faint)]">full apps shipped on it</div>
            <div className="mono mt-6 space-y-3 border-t border-[var(--color-border)] pt-5 text-sm">
              {stats.slice(1).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-[var(--color-muted)]">{k}</span>
                  <span className="font-bold text-[var(--color-green-bright)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* review-style cards = real apps */}
          <div className="grid gap-4 sm:grid-cols-2">
            {apps.map((a) => (
              <a key={a.name} href={a.href} className="block block block-purple border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-green-bright)]"><Check className="h-3 w-3" /> verified ship</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{a.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
                <span className="mono mt-4 inline-block text-sm text-[var(--color-faint)]">open repo</span>
              </a>
            ))}
            <div className="block border border-dashed border-[var(--color-border)] bg-transparent p-5">
              <h3 className="text-lg font-bold text-[var(--color-muted)]">Your app here</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-faint)]">Clone the template and ship the next one.</p>
              <a href={REPO} className="mono mt-4 inline-block text-sm text-[var(--color-green-bright)]">use template</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Information table, like an app-store details panel */
function Info() {
  const rows = [
    ["Type", "Monorepo template"],
    ["Language", "TypeScript (strict)"],
    ["Runtime", "Node 20+"],
    ["Cloud", "AWS Lambda · S3 · CloudFront"],
    ["IaC", "AWS CDK (via OpenNext)"],
    ["Auth", "Auth.js v5 (JWT sessions)"],
    ["Database", "PostgreSQL (Neon)"],
    ["CI/CD", "GitHub Actions + OIDC"],
    ["License", "MIT"],
  ];
  return (
    <section id="info" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mono mb-8 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">information</h2>
        <dl className="mono grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(([k, v]) => (
            <div key={k} className="bg-[var(--color-bg)] px-5 py-4">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-faint)]">{k}</dt>
              <dd className="mt-1.5 text-sm font-bold text-[var(--color-ink)]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* Download CTA */
function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(720px_360px_at_50%_120%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(540px 280px at 50% 130%, rgba(34,197,94,0.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <AppIcon className="mx-auto h-20 w-20" />
        <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-5xl">Get the template.</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-[var(--color-muted)]">Free and open source. Clone it and ship on day one.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={REPO} className="mono rounded-full bg-[var(--color-green)] px-8 py-3.5 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">USE TEMPLATE</a>
          <a href="https://github.com/elleskay" className="mono rounded-full border border-[var(--color-purple)] px-8 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">more by elleskay</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mono mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[var(--color-faint)] sm:flex-row">
        <div className="flex items-center gap-2.5"><Mark className="h-4 w-4" /> platform, an open-source template. MIT.</div>
        <div className="flex items-center gap-6">
          <a href={REPO} className="transition-colors hover:text-[var(--color-green-bright)]">github</a>
          <a href="https://github.com/elleskay" className="transition-colors hover:text-[var(--color-green-bright)]">elleskay</a>
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
      <Screens />
      <Features />
      <Proof />
      <Info />
      <CTA />
      <Footer />
    </main>
  );
}
