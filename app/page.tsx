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

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">platform</span>
        </a>
        <div className="mono hidden items-center gap-8 text-sm font-medium text-[var(--color-muted)] md:flex">
          <a href="#features" className="transition-colors hover:text-[var(--color-green-bright)]">features</a>
          <a href="#how" className="transition-colors hover:text-[var(--color-green-bright)]">how</a>
          <a href="#gate" className="transition-colors hover:text-[var(--color-green-bright)]">gate</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-green-bright)]">apps</a>
        </div>
        <a href={REPO} className="mono bg-[var(--color-green)] px-4 py-2 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">
          use template
        </a>
      </nav>
    </header>
  );
}

function Terminal() {
  const Row = ({ label, children, hi }: { label?: string; children: React.ReactNode; hi?: boolean }) => (
    <div className="flex gap-3">
      <span className="text-[var(--color-green)]">{"✓"}</span>
      {label ? <span className="w-[78px] shrink-0 text-[var(--color-ink)]">{label}</span> : null}
      <span className={hi ? "text-[var(--color-green-bright)]" : "text-[var(--color-faint)]"}>{children}</span>
    </div>
  );
  return (
    <div className="border-2 border-[var(--color-border)] bg-[#0b1324]">
      <div className="flex items-center gap-2 border-b-2 border-[var(--color-border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[var(--color-destructive)]" />
        <span className="h-3 w-3 rounded-full bg-[#eab308]" />
        <span className="h-3 w-3 rounded-full bg-[var(--color-green)]" />
        <span className="mono ml-3 text-[12px] text-[var(--color-faint)]">my-app ~ cloned from elleskay/platform</span>
      </div>
      <div className="mono space-y-2 p-6 text-[13px] leading-relaxed">
        <div className="text-[var(--color-ink)]"><span className="text-[var(--color-green)]">$</span> git push origin main</div>
        <div className="h-2" />
        <Row label="ci">typecheck · lint · build · cdk synth</Row>
        <Row label="security">codeql · gitleaks · npm audit</Row>
        <Row label="spec gate" hi>example v1: 100% covered (3/3)</Row>
        <Row label="deploy">oidc · cdk deploy · smoke test 9/9</Row>
        <div className="h-2" />
        <div className="flex gap-3"><span className="text-[var(--color-purple)]">{"●"}</span><span className="text-[var(--color-ink)]">live on cloudfront, zero stored aws keys</span></div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(900px_500px_at_50%_-10%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(620px 320px at 78% -10%, rgba(34,197,94,0.14), transparent 65%), radial-gradient(560px 320px at 12% 20%, rgba(168,85,247,0.12), transparent 65%)" }} />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <span className="mono inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green-bright)]">
            <span className="h-1.5 w-1.5 bg-[var(--color-green)]" /> a template, not a product
          </span>
          <h1 className="mt-7 text-[46px] font-bold leading-[0.98] tracking-tight sm:text-[82px]">
            Ship Next.js to <span className="text-[var(--color-green)]">AWS serverless,</span> on <span className="text-[var(--color-purple)]">day one.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            A reusable TypeScript monorepo. Clone it per app and inherit a working CI/CD pipeline, infrastructure as code via AWS CDK, security scanning, OIDC deploys with no stored keys, and a spec-driven test gate that blocks merges until every requirement is covered.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={REPO} className="mono bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">
              use the template
            </a>
            <a href="#how" className="mono border-2 border-[var(--color-purple)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">
              how it works
            </a>
          </div>
          <div className="mono mt-6 inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] text-[var(--color-muted)]">
            <span className="text-[var(--color-green)]">$</span> git clone github.com/elleskay/platform my-app
          </div>
        </div>
        <div className="mt-16 max-w-3xl"><Terminal /></div>
      </div>
    </section>
  );
}

function Apps() {
  const apps = [
    { name: "CoverLens", href: "https://github.com/elleskay/insurance-dashboard", note: "AI insurance policy checker" },
    { name: "Cancer Navigator", href: "https://github.com/elleskay/cancer-navigator", note: "Singapore cancer roadmap" },
    { name: "Armoury", href: "https://github.com/elleskay/armoury", note: "Frontline equipment checklists" },
  ];
  return (
    <section id="apps" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-7">
        <div className="mono flex flex-col gap-4 text-sm text-[var(--color-faint)] sm:flex-row sm:items-center sm:gap-8">
          <span className="shrink-0 font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">cloned by, in production</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {apps.map((a) => (
              <a key={a.name} href={a.href} className="group flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-green-bright)]">
                <span className="h-2 w-2 bg-[var(--color-green)] transition-colors group-hover:bg-[var(--color-purple)]" />
                {a.name}<span className="text-[var(--color-faint)]">, {a.note}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="mono mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
        <span className="h-3 w-3 bg-[var(--color-green)]" /> {kicker}
      </div>
      <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{children}</h2>
    </div>
  );
}

function Features() {
  const Block = ({ className = "", purple, n, t, d, children }: { className?: string; purple?: boolean; n: string; t: string; d: string; children?: React.ReactNode }) => (
    <div className={`block ${purple ? "block-purple" : ""} flex flex-col p-7 ${className}`}>
      <span className={`mono text-[13px] font-bold ${purple ? "text-[var(--color-purple)]" : "text-[var(--color-green)]"}`}>{n}</span>
      <h3 className="mt-3 text-xl font-bold">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{d}</p>
      {children}
    </div>
  );
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Heading kicker="what you get">Everything you would otherwise rebuild, the day you clone.</Heading>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Block className="md:col-span-2" n="// construct" t="One CDK construct, a whole stack" d="NextjsServerless deploys a Next.js app as Lambda, S3, and CloudFront via OpenNext, auto-routing every public asset to S3. It encodes every production gotcha this template learned the hard way.">
          <pre className="mono mt-5 overflow-x-auto border border-[var(--color-border)] bg-[#0b1324] p-4 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
{`new NextjsServerless(this, "Web", {
  appPath: resolve("apps/web"),
  serverTimeoutSeconds: 60,
  environment: { DATABASE_URL, AUTH_SECRET, AUTH_URL },
});`}
          </pre>
        </Block>
        <Block purple n="// pipeline" t="Three workflows, wired" d="CI, security, and deploy, green from the very first push.">
          <div className="mono mt-5 space-y-3 text-sm">
            {[["ci", "typecheck · lint · synth"], ["security", "codeql · gitleaks · audit"], ["deploy", "oidc · cdk · smoke test"]].map(([k, v]) => (
              <div key={k} className="border-l-2 border-[var(--color-purple)] pl-3"><div className="font-bold text-[var(--color-ink)]">{k}</div><div className="text-[var(--color-faint)]">{v}</div></div>
            ))}
          </div>
        </Block>
        <Block n="// oidc" t="OIDC deploys" d="A setup stack provisions a GitHub OIDC role. Deploys assume into AWS with short-lived credentials, no long-lived keys in the repo." />
        <Block purple n="// gate" t="Spec-driven gate" d="Requirements in YAML first, code and tests together. CI refuses to merge below 100 percent coverage." />
        <Block n="// smoke" t="Post-deploy smoke test" d="Probes the live URL after every deploy and exits non-zero on any failure, so a broken deploy never goes green." />
        <Block purple className="md:col-span-3" n="// overlays" t="Batteries, not lock-in" d="Reference overlays for Auth.js, security headers, middleware, Sentry, PostHog, email, and rate limiting. Each no-ops without keys, so you wire only what you need." />
      </div>
    </section>
  );
}

function How() {
  const steps = [
    ["01", "Clone the template", "The workflows, the CDK construct, the spec-test package, and the reference overlays all come with it."],
    ["02", "Write the spec first", "Translate the brief into YAML requirements, each with an ID and given / when / then. No code until the spec exists."],
    ["03", "Code and tests together", "Implement each requirement and its test in the same change. The gate fails the build if anything is uncovered."],
    ["04", "git push deploys it", "Build with OpenNext, deploy via CDK over OIDC, and smoke-test the live URL before it counts as shipped."],
  ];
  return (
    <section id="how" className="border-y border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Heading kicker="how it works">From an empty clone to a deployed app.</Heading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, d], i) => (
            <div key={n} className={`block ${i % 2 ? "block-purple" : ""} p-7`}>
              <span className={`text-5xl font-bold ${i % 2 ? "text-[var(--color-purple)]" : "text-[var(--color-green)]"}`}>{n}</span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gate() {
  return (
    <section id="gate" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Heading kicker="spec gate">The build does not pass until every requirement is proven.</Heading>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <div className="block p-8">
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Requirements live as data, not prose. Each has an ID bound to a test, and a coverage tool cross-checks the spec against the tests that actually ran. Below 100 percent, CI fails.
          </p>
          <ul className="mono mt-7 space-y-3 text-sm text-[var(--color-muted)]">
            {["every requirement carries a unique id and category", "tests claim a requirement by id; empty assertions fail lint", "category mismatches and stale coverage fail too"].map((li) => (
              <li key={li} className="flex gap-3"><span className="text-[var(--color-green)]">✓</span>{li}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="border-2 border-[var(--color-green)] bg-[#0b1324]">
            <div className="mono border-b border-[var(--color-border)] px-4 py-2.5 text-[12px] font-bold text-[var(--color-green)]">green gate, exit 0</div>
            <pre className="mono p-5 text-[13px] leading-relaxed text-[var(--color-green-bright)]">
{`example v1: 100% covered (3/3)
all requirements proven, deploy allowed`}
            </pre>
          </div>
          <div className="border-2 border-[var(--color-destructive)]/60 bg-[#0b1324]">
            <div className="mono border-b border-[var(--color-border)] px-4 py-2.5 text-[12px] font-bold text-[var(--color-destructive)]">one uncovered, nonzero exit</div>
            <pre className="mono p-5 text-[13px] leading-relaxed text-[#fca5a5]">
{`example v1: 66.7% covered (2/3)
  uncovered: EX-UI-001
build blocked`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(700px_360px_at_50%_120%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 300px at 50% 130%, rgba(34,197,94,0.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
        <Mark className="mx-auto h-10 w-10" />
        <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          Stop re-solving the <span className="text-[var(--color-green)]">plumbing.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-muted)]">
          Clone the template and spend day one on your product, not on CI, infrastructure, security, and deploys.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={REPO} className="mono bg-[var(--color-green)] px-7 py-4 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">
            get the template
          </a>
          <a href="https://github.com/elleskay" className="mono border-2 border-[var(--color-purple)] px-7 py-4 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">
            apps built on it
          </a>
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
      <Apps />
      <Features />
      <How />
      <Gate />
      <CTA />
      <Footer />
    </main>
  );
}
