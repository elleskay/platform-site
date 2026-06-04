import ThemeToggle from "./components/ThemeToggle";

const REPO = "https://github.com/elleskay/platform";

const INK = "border-2 border-[var(--color-ink)]";
const ON = "text-[var(--color-on-accent)]";

function Mark({ className = "h-6 w-6", color = "var(--color-ink)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Btn({ href, children, fill = "green" }: { href: string; children: React.ReactNode; fill?: "green" | "ink" | "paper" }) {
  const bg =
    fill === "green"
      ? `bg-[var(--color-green-fill)] ${ON}`
      : fill === "ink"
        ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
        : "bg-[var(--color-paper-card)] text-[var(--color-ink)]";
  return (
    <a href={href} className={`mono ${INK} ${bg} hard press inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold`}>
      {children}
    </a>
  );
}

/* Brutalist top bar */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-ink)] bg-[var(--color-bg)]">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className={`${INK} bg-[var(--color-green-fill)] flex h-9 w-9 items-center justify-center`}><Mark className="h-5 w-5" color="var(--color-on-accent)" /></span>
          <span className="text-lg font-bold tracking-tight">platform</span>
        </a>
        <div className="mono ml-auto hidden items-center gap-6 text-[13px] font-medium md:flex">
          <a href="#grid" className="hover:underline">what you get</a>
          <a href="#math" className="hover:underline">the math</a>
          <a href="#apps" className="hover:underline">apps</a>
        </div>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <a href={REPO} className={`mono ${INK} bg-[var(--color-ink)] press px-4 py-2 text-sm font-bold text-[var(--color-bg)]`} style={{ boxShadow: "4px 4px 0 0 var(--color-ink)" }}>
            use template
          </a>
        </div>
      </nav>
    </header>
  );
}

/* Oversized brutalist hero with highlighter headline */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-[var(--color-ink)]">
      <div className="dotgrid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <span className={`mono ${INK} ${ON} bg-[var(--color-yellow)] inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]`} style={{ boxShadow: "4px 4px 0 0 var(--color-ink)" }}>
          a template, not a product
        </span>
        <h1 className="mt-7 max-w-4xl text-[44px] font-bold leading-[0.92] tracking-tight sm:text-[80px]">
          The boring parts of{" "}
          <span className={`mono ${ON} inline-block -rotate-1 border-2 border-[var(--color-ink)] bg-[var(--color-green-fill)] px-2.5 leading-tight`}>shipping</span>,
          <br className="hidden sm:block" /> already{" "}
          <span className={`mono ${ON} inline-block rotate-1 border-2 border-[var(--color-ink)] bg-[var(--color-purple-fill)] px-2.5 leading-tight`}>solved</span>.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
          Clone one repo and inherit a Next.js app on AWS serverless: CI/CD, infrastructure as code, security scanning, OIDC deploys, and a spec-driven test gate. Wired the day you start, proven by real apps in production.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Btn href={REPO} fill="green">use the template</Btn>
          <Btn href="#grid" fill="paper">see what is inside</Btn>
        </div>
      </div>
    </section>
  );
}

/* Kinetic marquee strip */
function Marquee() {
  const tags = ["CI / CD", "AWS CDK", "OPEN-NEXT", "OIDC DEPLOYS", "SPEC GATE", "SMOKE TEST", "NEON POSTGRES", "AUTH.JS V5", "ZOD", "CODEQL", "GITLEAKS", "SENTRY"];
  const Strip = () => (
    <div className="flex shrink-0 items-center">
      {tags.map((t) => (
        <span key={t} className="mono flex items-center gap-6 px-6 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-bg)]">
          {t} <span className="text-[var(--color-green-fill)]">/</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-3">
      <div className="marquee-track">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}

function CellHead({ tag, color, onFill = false }: { tag: string; color?: string; onFill?: boolean }) {
  return (
    <div className={`mono mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] ${onFill ? ON : "text-[var(--color-faint)]"}`}>
      <span className="h-2.5 w-2.5 border border-[var(--color-ink)]" style={{ background: onFill ? "var(--color-on-accent)" : (color ?? "var(--color-ink)") }} /> {tag}
    </div>
  );
}

/* Asymmetric bento grid */
function Bento() {
  return (
    <section id="grid" className="border-b-2 border-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          One clone, the whole <span className={`mono ${ON} border-2 border-[var(--color-ink)] bg-[var(--color-yellow)] px-2`}>stack</span>.
        </h2>

        {/* Row 1: big code cell + stacked accent cells */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className={`${INK} hard lift bg-[var(--color-paper-card)] md:col-span-2`}>
            <div className="mono flex items-center justify-between border-b-2 border-[var(--color-ink)] px-4 py-2.5 text-[12px] font-bold">
              <span>infra/cdk/web/lib/web-stack.ts</span>
              <span className="text-[var(--color-faint)]">the construct</span>
            </div>
            <pre className="mono overflow-x-auto p-5 text-[13px] leading-[1.85] text-[var(--color-muted)]">
{`new `}<span className="text-[var(--color-purple)]">NextjsServerless</span>{`(this, "Web", {
  appPath: resolve("apps/web"),
  serverTimeoutSeconds: 60,
  customDomain: "app.example.com",
  environment: { DATABASE_URL, AUTH_SECRET, AUTH_URL },
});
`}<span className="text-[var(--color-green)]">{`// Lambda + S3 + CloudFront, every gotcha baked in`}</span>
            </pre>
          </div>

          <div className="flex flex-col gap-4">
            <div className={`${INK} hard lift ${ON} bg-[var(--color-green-fill)] flex-1 p-5`}>
              <CellHead tag="infra" onFill />
              <div className="text-[56px] font-bold leading-none">1</div>
              <p className="mt-2 text-sm font-medium">CDK call deploys the entire serverless stack.</p>
            </div>
            <div className={`${INK} hard lift ${ON} bg-[var(--color-purple-fill)] flex-1 p-5`}>
              <CellHead tag="spec gate" onFill />
              <div className="text-[56px] font-bold leading-none">100%</div>
              <p className="mt-2 text-sm font-medium">coverage, or the build does not deploy.</p>
            </div>
          </div>
        </div>

        {/* Row 2: three equal cells */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className={`${INK} hard lift bg-[var(--color-paper-card)] p-5`}>
            <CellHead tag="pipeline" color="var(--color-green-fill)" />
            <ul className="mono space-y-1.5 text-[13px] text-[var(--color-muted)]">
              <li><span className="text-[var(--color-green)]">✓</span> ci: typecheck · lint · build · synth</li>
              <li><span className="text-[var(--color-green)]">✓</span> security: codeql · gitleaks · audit</li>
              <li><span className="text-[var(--color-green)]">✓</span> deploy: oidc · cdk · smoke test</li>
            </ul>
          </div>
          <div className={`${INK} hard lift bg-[var(--color-paper-card)] p-5`}>
            <CellHead tag="oidc" color="var(--color-purple-fill)" />
            <div className="text-[40px] font-bold leading-none">0</div>
            <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">stored AWS keys. GitHub assumes a least-privilege role over OIDC, 1-hour credentials.</p>
          </div>
          <div className={`${INK} hard lift ${ON} bg-[var(--color-yellow)] p-5`}>
            <CellHead tag="smoke test" onFill />
            <div className="text-[40px] font-bold leading-none">9/9</div>
            <p className="mt-2 text-sm font-medium">live checks after every deploy. Non-zero exit blocks the release.</p>
          </div>
        </div>

        {/* Row 3: full-width batteries */}
        <div className={`${INK} hard lift mt-4 bg-[var(--color-paper-card)] p-5`}>
          <CellHead tag="batteries included" color="var(--color-green-fill)" />
          <div className="mono flex flex-wrap gap-2.5 text-[13px] font-bold">
            {["Auth.js v5", "Neon Postgres", "Zod validation", "Sentry", "PostHog", "Security headers", "Rate limiting", "Dependabot"].map((b) => (
              <span key={b} className="border-2 border-[var(--color-ink)] bg-[var(--color-bg)] px-3 py-1.5">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* The math: from-scratch invoice vs git clone */
function Math() {
  const items: [string, string][] = [
    ["GitHub Actions for CI", "~6h"],
    ["CDK for Lambda + S3 + CloudFront", "~2d"],
    ["OIDC + least-privilege deploy role", "~4h"],
    ["CodeQL, gitleaks, npm audit wiring", "~3h"],
    ["Spec gate + coverage tooling", "~1d"],
    ["Post-deploy smoke test", "~3h"],
    ["Relearning the deploy gotchas", "priceless"],
  ];
  return (
    <section id="math" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              The bill for <span className={`mono ${ON} inline-block -rotate-1 border-2 border-[var(--color-ink)] bg-[var(--color-green-fill)] px-2`}>not</span> using a template.
            </h2>
            <p className="mt-5 max-w-md text-lg text-[var(--color-muted)]">
              Every line is a thing you would otherwise build, debug, and maintain before writing a single product feature. Cloning zeroes the invoice.
            </p>
            <div className="mt-8"><Btn href={REPO} fill="green">skip the bill</Btn></div>
          </div>
          <div className={`${INK} hard-lg bg-[var(--color-paper-card)]`}>
            <div className="mono border-b-2 border-dashed border-[var(--color-ink)] px-6 py-4 text-center text-[12px] font-bold uppercase tracking-[0.2em]">
              from-scratch invoice
            </div>
            <ul className="mono px-6 py-5 text-[13px]">
              {items.map(([label, cost]) => (
                <li key={label} className="flex items-baseline gap-3 py-2.5">
                  <span className="text-[var(--color-muted)]">{label}</span>
                  <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-[var(--color-faint)]" />
                  <span className="font-bold text-[var(--color-faint)] line-through">{cost}</span>
                </li>
              ))}
            </ul>
            <div className="mono flex items-baseline justify-between border-t-2 border-dashed border-[var(--color-ink)] px-6 py-4">
              <span className="text-sm font-bold uppercase tracking-[0.16em]">your total</span>
              <span className={`${ON} border-2 border-[var(--color-ink)] bg-[var(--color-green-fill)] px-2 text-xl font-bold`}>git clone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Proof: apps */
function Apps() {
  const apps = [
    { name: "CoverLens", note: "AI insurance policy checker", href: "https://github.com/elleskay/insurance-dashboard", c: "var(--color-green-fill)" },
    { name: "Cancer Navigator", note: "Singapore cancer roadmap", href: "https://github.com/elleskay/cancer-navigator", c: "var(--color-purple-fill)" },
    { name: "Armoury", note: "Frontline equipment checklists", href: "https://github.com/elleskay/armoury", c: "var(--color-yellow)" },
  ];
  return (
    <section id="apps" className="border-b-2 border-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mono mb-8 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-faint)]">// cloned into production by</div>
        <div className="grid gap-4 sm:grid-cols-3">
          {apps.map((a) => (
            <a key={a.name} href={a.href} className={`${INK} hard lift group flex flex-col bg-[var(--color-paper-card)] p-6`}>
              <span className="mb-6 h-8 w-8 border-2 border-[var(--color-ink)]" style={{ background: a.c }} />
              <div className="text-lg font-bold">{a.name}</div>
              <p className="mono mt-1.5 text-sm text-[var(--color-faint)]">{a.note}</p>
              <span className="mono mt-6 text-sm font-bold group-hover:underline">view repo</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA */
function CTA() {
  return (
    <section className="relative overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-green-fill)]">
      <div className="dotgrid pointer-events-none absolute inset-0" />
      <div className={`relative mx-auto max-w-3xl px-5 py-24 text-center ${ON}`}>
        <h2 className="text-4xl font-bold leading-[1] tracking-tight sm:text-6xl">
          Day one starts at <br className="hidden sm:block" />
          <span className="mono mt-3 inline-block border-2 border-[var(--color-ink)] bg-[var(--color-paper-card)] px-3 text-[var(--color-ink)]">git clone</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg font-medium">Take the plumbing. Spend your time on the product.</p>
        <div className={`mono ${INK} hard-lg mx-auto mt-9 flex max-w-xl items-center gap-3 bg-[var(--color-ink)] px-5 py-4 text-left text-sm text-[var(--color-bg)]`}>
          <span className="text-[var(--color-green-fill)]">$</span>
          <span className="truncate">git clone github.com/elleskay/platform</span>
          <a href={REPO} className={`mono press ${ON} ml-auto shrink-0 border-2 border-[var(--color-bg)] bg-[var(--color-green-fill)] px-3 py-1.5 text-xs font-bold`}>open</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--color-bg)]">
      <div className="mono mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-[var(--color-faint)] sm:flex-row">
        <div className="flex items-center gap-2.5"><Mark className="h-4 w-4" /> platform, an open-source template. MIT.</div>
        <div className="flex items-center gap-6">
          <a href={REPO} className="font-bold hover:underline">github</a>
          <a href="https://github.com/elleskay" className="font-bold hover:underline">elleskay</a>
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
      <Marquee />
      <Bento />
      <Math />
      <Apps />
      <CTA />
      <Footer />
    </main>
  );
}
