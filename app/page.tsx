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

function Window({ title, children, accent = "green" }: { title: string; children: React.ReactNode; accent?: "green" | "purple" }) {
  const c = accent === "green" ? "var(--color-green)" : "var(--color-purple)";
  return (
    <div className="border-2 border-[var(--color-border)] bg-[#0b1324]">
      <div className="flex items-center gap-2 border-b-2 border-[var(--color-border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ background: c }} />
        <span className="h-3 w-3 rounded-full bg-[#eab308]" />
        <span className="h-3 w-3 rounded-full bg-[var(--color-faint)]" />
        <span className="mono ml-3 text-[12px] text-[var(--color-faint)]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5"><Mark className="h-6 w-6" /><span className="text-lg font-bold tracking-tight">platform</span></a>
        <div className="mono hidden items-center gap-8 text-sm font-medium text-[var(--color-muted)] md:flex">
          <a href="#demo" className="transition-colors hover:text-[var(--color-green-bright)]">demo</a>
          <a href="#build" className="transition-colors hover:text-[var(--color-green-bright)]">what it does</a>
          <a href="#compare" className="transition-colors hover:text-[var(--color-green-bright)]">compare</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-green-bright)]">apps</a>
        </div>
        <a href={REPO} className="mono bg-[var(--color-green)] px-4 py-2 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">use template</a>
      </nav>
    </header>
  );
}

/* 1. HERO + 2. PRODUCT DEMO (centered) */
function Hero() {
  const Row = ({ label, children, hi, dot }: { label?: string; children: React.ReactNode; hi?: boolean; dot?: string }) => (
    <div className="flex gap-3"><span style={{ color: dot ?? "var(--color-green)" }}>{dot ? "●" : "✓"}</span>{label ? <span className="w-[78px] shrink-0 text-[var(--color-ink)]">{label}</span> : null}<span className={hi ? "text-[var(--color-green-bright)]" : "text-[var(--color-faint)]"}>{children}</span></div>
  );
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(1000px_560px_at_50%_-8%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(640px 340px at 72% -8%, rgba(34,197,94,0.13), transparent 65%), radial-gradient(600px 340px at 22% 8%, rgba(168,85,247,0.12), transparent 65%)" }} />
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-24">
        <span className="mono inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green-bright)]"><span className="h-1.5 w-1.5 bg-[var(--color-green)]" /> a template, not a product</span>
        <h1 className="mx-auto mt-7 max-w-3xl text-[44px] font-bold leading-[0.98] tracking-tight sm:text-[78px]">
          Ship Next.js to <span className="text-[var(--color-green)]">AWS serverless,</span> on <span className="text-[var(--color-purple)]">day one.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          Clone the template and inherit a working CI/CD pipeline, infrastructure as code via AWS CDK, security scanning, OIDC deploys with no stored keys, and a spec-driven test gate, all wired the day you start.
        </p>
        <div id="demo" className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={REPO} className="mono bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">use the template</a>
          <a href="#build" className="mono border-2 border-[var(--color-purple)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">what it does</a>
        </div>
      </div>
      {/* Product demo, centered */}
      <div className="relative mx-auto -mb-px max-w-3xl px-6">
        <Window title="my-app ~ cloned from elleskay/platform">
          <div className="mono space-y-2 p-6 text-[13px] leading-relaxed">
            <div className="text-[var(--color-ink)]"><span className="text-[var(--color-green)]">$</span> git clone github.com/elleskay/platform my-app</div>
            <div className="text-[var(--color-ink)]"><span className="text-[var(--color-green)]">$</span> git push origin main</div>
            <div className="h-2" />
            <Row label="ci">typecheck · lint · build · cdk synth</Row>
            <Row label="security">codeql · gitleaks · npm audit</Row>
            <Row label="spec gate" hi>example v1: 100% covered (3/3)</Row>
            <Row label="deploy">oidc · cdk deploy · smoke test 9/9</Row>
            <div className="h-2" />
            <Row dot="var(--color-purple)">live on cloudfront, zero stored aws keys</Row>
          </div>
        </Window>
      </div>
    </section>
  );
}

/* 3. FEATURE BREAKDOWN, one alternating section per feature */
function FeatureSection({ reverse, kicker, title, body, bullets, visual }: { reverse?: boolean; kicker: string; title: string; body: string; bullets?: string[]; visual: React.ReactNode }) {
  return (
    <div className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="mono mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-green)]"><span className="h-3 w-3 bg-[var(--color-green)]" />{kicker}</div>
        <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{body}</p>
        {bullets ? (
          <ul className="mono mt-5 space-y-2.5 text-sm text-[var(--color-muted)]">
            {bullets.map((b) => <li key={b} className="flex gap-3"><span className="text-[var(--color-green)]">✓</span>{b}</li>)}
          </ul>
        ) : null}
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}

function Build() {
  return (
    <section id="build" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="mono text-center text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-purple)]">// what you inherit, feature by feature</div>
        <div className="divide-y divide-[var(--color-border)]">
          <FeatureSection
            kicker="the construct"
            title="One CDK call, a whole stack"
            body="NextjsServerless deploys a Next.js app as Lambda, S3, and CloudFront via OpenNext, auto-routing every public asset to S3 and encoding every production gotcha this template learned the hard way."
            bullets={["env baked at synth, never at runtime", "configurable lambda and cdn timeouts", "custom domain in one prop"]}
            visual={
              <Window title="infra/cdk/web/lib/web-stack.ts" accent="green">
                <pre className="mono overflow-x-auto p-5 text-[13px] leading-relaxed text-[var(--color-muted)]">
{`new NextjsServerless(this, "Web", {
  appPath: resolve("apps/web"),
  serverTimeoutSeconds: 60,
  environment: {
    DATABASE_URL,
    AUTH_SECRET,
    AUTH_URL,
  },
});`}
                </pre>
              </Window>
            }
          />
          <FeatureSection
            reverse
            kicker="the pipeline"
            title="Three workflows, green from push one"
            body="CI, security, and deploy run on every push. Deploys assume into AWS over OIDC with short-lived credentials, so no long-lived keys ever live in the repo."
            visual={
              <Window title="github actions" accent="purple">
                <div className="mono space-y-4 p-5 text-[13px]">
                  {[["ci", "typecheck · lint · build · cdk synth", "green"], ["security", "codeql · gitleaks · npm audit", "purple"], ["deploy", "oidc · cdk deploy · smoke test", "green"]].map(([k, v, c]) => (
                    <div key={k} className="border-l-2 pl-3" style={{ borderColor: c === "green" ? "var(--color-green)" : "var(--color-purple)" }}>
                      <div className="font-bold text-[var(--color-ink)]">{k}</div>
                      <div className="text-[var(--color-faint)]">{v}</div>
                    </div>
                  ))}
                </div>
              </Window>
            }
          />
          <FeatureSection
            kicker="the gate"
            title="The build does not pass until every requirement is proven"
            body="Requirements live as data, not prose. Each has an ID bound to a test, and a coverage tool cross-checks the spec against the tests that actually ran. Below 100 percent, CI fails."
            visual={
              <div className="space-y-4">
                <Window title="green gate, exit 0" accent="green">
                  <pre className="mono p-5 text-[13px] leading-relaxed text-[var(--color-green-bright)]">{`example v1: 100% covered (3/3)
all requirements proven, deploy allowed`}</pre>
                </Window>
                <div className="border-2 border-[var(--color-destructive)]/50 bg-[#0b1324]">
                  <div className="mono border-b border-[var(--color-border)] px-4 py-2.5 text-[12px] font-bold text-[var(--color-destructive)]">one uncovered, nonzero exit</div>
                  <pre className="mono p-5 text-[13px] leading-relaxed text-[#fca5a5]">{`example v1: 66.7% covered (2/3)
  uncovered: EX-UI-001
build blocked`}</pre>
                </div>
              </div>
            }
          />
          <FeatureSection
            reverse
            kicker="the safety net"
            title="A smoke test that catches broken deploys"
            body="After every deploy a script probes the live URL and exits non-zero on any failure. It auto-detects auth versus public apps, so a green pipeline always means a working site."
            bullets={["health, routing, security headers, css served", "auth surface and lambda-url leak checks", "nonzero exit blocks the release"]}
            visual={
              <Window title="scripts/verify-deploy.sh" accent="green">
                <pre className="mono p-5 text-[13px] leading-relaxed">
{`✓ health endpoint
✓ security headers present
✓ stylesheet serves as text/css
✓ no lambda-url leaked
`}<span className="text-[var(--color-green-bright)]">9/9 checks passed, deploy verified</span>
                </pre>
              </Window>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* 4. COMPARISON */
function Compare() {
  const hard = ["Write the GitHub Actions yourself", "Hand-roll the CDK for Lambda, S3, CloudFront", "Configure OIDC and a least-privilege role", "Wire CodeQL, gitleaks, npm audit", "Build a test gate and coverage tooling", "Write a post-deploy smoke test", "Re-learn every deploy gotcha"];
  const easy = ["git clone", "One NextjsServerless call", "One setup stack, then forget it", "Already in the security workflow", "Spec gate ships in the box", "verify-deploy.sh runs on every deploy", "Encoded so you never relearn them"];
  return (
    <section id="compare" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Day one, two ways.</h2>
        <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">The same production-ready app. One path is a week of plumbing, the other is a clone.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="border-2 border-[var(--color-border)] p-7">
            <div className="mono text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-faint)]">from scratch</div>
            <ul className="mt-5 space-y-3 text-[var(--color-muted)]">
              {hard.map((h) => <li key={h} className="flex gap-3"><span className="mono text-[var(--color-destructive)]">✗</span>{h}</li>)}
            </ul>
          </div>
          <div className="border-2 border-[var(--color-green)] bg-[#0b1324] p-7" style={{ boxShadow: "0 0 0 1px var(--color-green), 0 30px 60px -34px rgba(34,197,94,0.4)" }}>
            <div className="mono text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-green)]">cloned from platform</div>
            <ul className="mt-5 space-y-3 text-[var(--color-ink)]">
              {easy.map((e) => <li key={e} className="flex gap-3"><span className="mono text-[var(--color-green)]">✓</span>{e}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. SOCIAL PROOF */
function Apps() {
  const apps = [
    { name: "CoverLens", href: "https://github.com/elleskay/insurance-dashboard", note: "AI insurance policy checker" },
    { name: "Cancer Navigator", href: "https://github.com/elleskay/cancer-navigator", note: "Singapore cancer roadmap" },
    { name: "Armoury", href: "https://github.com/elleskay/armoury", note: "Frontline equipment checklists" },
  ];
  return (
    <section id="apps" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mono mb-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">cloned by these apps, in production</div>
        <div className="grid gap-5 sm:grid-cols-3">
          {apps.map((a) => (
            <a key={a.name} href={a.href} className="block border-2 border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-green)]">
              <div className="flex items-center gap-2"><Mark className="h-5 w-5" /><span className="font-bold">{a.name}</span></div>
              <p className="mono mt-2 text-sm text-[var(--color-faint)]">{a.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. CTA */
function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(740px_380px_at_50%_120%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 300px at 50% 130%, rgba(34,197,94,0.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
        <Mark className="mx-auto h-10 w-10" />
        <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">Stop re-solving the <span className="text-[var(--color-green)]">plumbing.</span></h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-muted)]">Clone the template and spend day one on your product.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={REPO} className="mono bg-[var(--color-green)] px-7 py-4 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">get the template</a>
          <a href="https://github.com/elleskay" className="mono border-2 border-[var(--color-purple)] px-7 py-4 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">apps built on it</a>
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
        <div className="flex items-center gap-6"><a href={REPO} className="transition-colors hover:text-[var(--color-green-bright)]">github</a><a href="https://github.com/elleskay" className="transition-colors hover:text-[var(--color-green-bright)]">elleskay</a></div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Build />
      <Compare />
      <Apps />
      <CTA />
      <Footer />
    </main>
  );
}
