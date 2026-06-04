const REPO = "https://github.com/elleskay/platform";

function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-acid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark className="h-5 w-5" />
          <span className="mono text-[15px] font-semibold tracking-tight">platform</span>
        </a>
        <div className="mono hidden items-center gap-8 text-[13px] text-[var(--color-muted)] md:flex">
          <a href="#features" className="transition-colors hover:text-[var(--color-ink)]">[ features ]</a>
          <a href="#how" className="transition-colors hover:text-[var(--color-ink)]">[ how ]</a>
          <a href="#gate" className="transition-colors hover:text-[var(--color-ink)]">[ gate ]</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-ink)]">[ apps ]</a>
        </div>
        <a
          href={REPO}
          className="mono rounded-none bg-[var(--color-acid)] px-4 py-2 text-[13px] font-semibold text-[#0b0b0d] transition-opacity hover:opacity-90"
        >
          use template
        </a>
      </nav>
    </header>
  );
}

function Terminal() {
  const Row = ({ label, children, hi }: { label?: string; children: React.ReactNode; hi?: boolean }) => (
    <div className="flex gap-3">
      <span className="text-[var(--color-acid)]">{"✓"}</span>
      {label ? <span className="w-[78px] shrink-0 text-[var(--color-ink)]">{label}</span> : null}
      <span className={hi ? "text-[var(--color-acid)]" : "text-[var(--color-faint)]"}>{children}</span>
    </div>
  );
  return (
    <div className="border border-[var(--color-line)] bg-[#0c0c0f]">
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-[var(--color-line-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full border border-[var(--color-line-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full border border-[var(--color-line-strong)]" />
        <span className="mono ml-3 text-[12px] text-[var(--color-faint)]">my-app ~ cloned from elleskay/platform</span>
      </div>
      <div className="mono space-y-2 p-6 text-[13px] leading-relaxed">
        <div className="text-[var(--color-ink)]">
          <span className="text-[var(--color-acid)]">$</span> git push origin main
        </div>
        <div className="h-2" />
        <Row label="ci">typecheck · lint · build · cdk synth</Row>
        <Row label="security">codeql · gitleaks · npm audit</Row>
        <Row label="spec gate" hi>example v1: 100% covered (3/3)</Row>
        <Row label="deploy">oidc · cdk deploy · smoke test 9/9</Row>
        <div className="h-2" />
        <div className="flex gap-3">
          <span className="text-[var(--color-acid)]">{"●"}</span>
          <span className="text-[var(--color-ink)]">live on cloudfront, zero stored aws keys</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(700px_400px_at_50%_-5%,#000,transparent)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(620px 320px at 50% -10%, rgba(196,240,66,0.10), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-20 pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <div className="mono flex items-center gap-3 text-[13px] text-[var(--color-acid)]">
            <span className="h-px w-8 bg-[var(--color-acid)]" />
            a template, not a product
          </div>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.02] tracking-tight sm:text-[76px]">
            Ship Next.js to AWS<br className="hidden sm:block" /> serverless, on{" "}
            <span className="text-[var(--color-acid)]">day one.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            A reusable TypeScript monorepo. Clone it per app and inherit a working CI/CD pipeline, infrastructure as code via AWS CDK, security scanning, OIDC deploys with no stored keys, and a spec-driven test gate that blocks merges until every requirement is covered.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={REPO} className="mono bg-[var(--color-acid)] px-6 py-3 text-sm font-semibold text-[#0b0b0d] transition-opacity hover:opacity-90">
              use the template
            </a>
            <a href="#how" className="mono border border-[var(--color-line-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-acid)] hover:text-[var(--color-acid)]">
              how it works
            </a>
          </div>
          <div className="mono mt-6 inline-flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-2 text-[13px] text-[var(--color-muted)]">
            <span className="text-[var(--color-acid)]">$</span>
            git clone github.com/elleskay/platform my-app
          </div>
        </div>
        <div className="mt-16 max-w-3xl">
          <Terminal />
        </div>
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
    <section id="apps" className="border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-[1180px] px-6 py-5">
        <div className="mono flex flex-col gap-4 text-[13px] text-[var(--color-faint)] sm:flex-row sm:items-center sm:gap-8">
          <span className="shrink-0 text-[var(--color-muted)]">// cloned by apps in production</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {apps.map((a) => (
              <a key={a.name} href={a.href} className="group flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-acid)]">
                <span className="h-1.5 w-1.5 bg-[var(--color-acid)]" />
                {a.name}
                <span className="text-[var(--color-faint)] group-hover:text-[var(--color-muted)]">, {a.note}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ id, n, children }: { id?: string; n: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mono mb-8 flex items-center gap-4 text-[13px] text-[var(--color-muted)]">
      <span className="text-[var(--color-acid)]">{n}</span>
      <span className="h-px flex-1 bg-[var(--color-line)]" />
      <span className="uppercase tracking-[0.18em]">{children}</span>
    </div>
  );
}

function Features() {
  const Cell = ({ className = "", n, t, d, children }: { className?: string; n: string; t: string; d: string; children?: React.ReactNode }) => (
    <div className={`cell flex flex-col p-6 ${className}`}>
      <span className="mono text-[12px] text-[var(--color-acid)]">{n}</span>
      <h3 className="mt-3 text-lg font-semibold">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{d}</p>
      {children}
    </div>
  );
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20 sm:py-28">
      <SectionLabel id="features" n="01">what you get the moment you clone</SectionLabel>
      <div className="grid grid-cols-1 gap-px bg-[var(--color-line)] md:grid-cols-6">
        <Cell className="md:col-span-4 md:row-span-2" n="construct" t="One CDK construct, a whole stack" d="NextjsServerless deploys a Next.js app as Lambda, S3, and CloudFront via OpenNext, auto-routing every public asset to S3. It encodes every production gotcha this template learned the hard way.">
          <pre className="mono mt-5 flex-1 overflow-x-auto border border-[var(--color-line)] bg-[#0c0c0f] p-4 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
{`new NextjsServerless(this, "Web", {
  appPath: resolve("apps/web"),
  serverTimeoutSeconds: 60,
  environment: { DATABASE_URL, AUTH_SECRET, AUTH_URL },
});`}
          </pre>
        </Cell>
        <Cell className="md:col-span-2 md:row-span-2" n="pipeline" t="Three workflows, wired" d="Green from the first push.">
          <div className="mono mt-5 flex-1 space-y-3 text-[13px]">
            {[
              ["ci", "typecheck · lint · build · synth"],
              ["security", "codeql · gitleaks · audit"],
              ["deploy", "oidc · cdk · smoke test"],
            ].map(([k, v]) => (
              <div key={k} className="border-l border-[var(--color-line-strong)] pl-3">
                <div className="text-[var(--color-acid)]">{k}</div>
                <div className="text-[var(--color-faint)]">{v}</div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell className="md:col-span-2" n="auth" t="OIDC deploys" d="A setup stack provisions a GitHub OIDC role. Deploys assume into AWS with short-lived credentials, no long-lived keys in the repo." />
        <Cell className="md:col-span-2" n="gate" t="Spec-driven gate" d="Requirements in YAML first, code and tests together. CI refuses to merge below 100 percent coverage." />
        <Cell className="md:col-span-2" n="smoke" t="Post-deploy smoke test" d="Probes the live URL after every deploy and exits non-zero on any failure, so a broken deploy never goes green." />
        <Cell className="md:col-span-6" n="overlays" t="Batteries, not lock-in" d="Reference overlays for Auth.js, security headers, middleware, Sentry, PostHog, email, and rate limiting. Each no-ops without keys, so you wire only what you need." />
      </div>
    </section>
  );
}

function How() {
  const steps = [
    ["01", "Clone the template", "Start a new app from the repo. The workflows, the CDK construct, the spec-test package, and the reference overlays come with it."],
    ["02", "Write the spec first", "Translate the brief into YAML requirements, each with an ID and given / when / then. No code until the spec exists."],
    ["03", "Code and tests together", "Implement each requirement and its test in the same change. The gate fails the build if any requirement is uncovered."],
    ["04", "git push deploys it", "Build with OpenNext, deploy via CDK over OIDC, and smoke-test the live URL before it counts as shipped."],
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[#0b0b0e]">
      <div className="mx-auto max-w-[1180px] px-6 py-20 sm:py-28">
        <SectionLabel id="how" n="02">from an empty clone to a deployed app</SectionLabel>
        <div className="border-t border-[var(--color-line)]">
          {steps.map(([n, t, d]) => (
            <div key={n} className="grid grid-cols-1 gap-2 border-b border-[var(--color-line)] py-7 md:grid-cols-12 md:items-baseline md:gap-6">
              <div className="mono text-[var(--color-acid)] md:col-span-1">{n}</div>
              <h3 className="text-xl font-semibold md:col-span-4">{t}</h3>
              <p className="text-[var(--color-muted)] md:col-span-7">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gate() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20 sm:py-28">
      <SectionLabel id="gate" n="03">the build does not pass until every requirement is proven</SectionLabel>
      <div className="grid items-start gap-px bg-[var(--color-line)] lg:grid-cols-2">
        <div className="bg-[var(--color-bg)] p-8">
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Requirements live as data, not prose. Each has an ID bound to a test, and a coverage tool cross-checks the spec against the tests that actually ran. Below 100 percent, CI fails.
          </p>
          <ul className="mono mt-7 space-y-3 text-[13px] text-[var(--color-muted)]">
            {[
              "every requirement carries a unique id and category",
              "tests claim a requirement by id; empty assertions fail lint",
              "category mismatches and stale coverage fail too",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span className="text-[var(--color-acid)]">✓</span>
                {li}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-px bg-[var(--color-bg)]">
          <div className="border border-[var(--color-line)] bg-[#0c0c0f]">
            <div className="mono border-b border-[var(--color-line)] px-4 py-2.5 text-[12px] text-[var(--color-faint)]">green gate, exit 0</div>
            <pre className="mono p-5 text-[13px] leading-relaxed text-[var(--color-acid)]">
{`example v1: 100% covered (3/3)
all requirements proven, deploy allowed`}
            </pre>
          </div>
          <div className="border border-[var(--color-line)] bg-[#0c0c0f]">
            <div className="mono border-b border-[var(--color-line)] px-4 py-2.5 text-[12px] text-[var(--color-faint)]">one uncovered, nonzero exit</div>
            <pre className="mono p-5 text-[13px] leading-relaxed text-[#f87171]">
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
    <section className="relative overflow-hidden border-t border-[var(--color-line)]">
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(600px_300px_at_50%_120%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 300px at 50% 130%, rgba(196,240,66,0.12), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1180px] px-6 py-28 text-center">
        <Mark className="mx-auto h-9 w-9" />
        <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          Stop re-solving the <span className="text-[var(--color-acid)]">plumbing.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-muted)]">
          Clone the template and spend day one on your product, not on CI, infrastructure, security, and deploys.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={REPO} className="mono bg-[var(--color-acid)] px-7 py-3.5 text-sm font-semibold text-[#0b0b0d] transition-opacity hover:opacity-90">
            get the template
          </a>
          <a href="https://github.com/elleskay" className="mono border border-[var(--color-line-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-acid)] hover:text-[var(--color-acid)]">
            apps built on it
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="mono mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-6 py-8 text-[13px] text-[var(--color-faint)] sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Mark className="h-4 w-4" />
          platform, an open-source template. MIT.
        </div>
        <div className="flex items-center gap-6">
          <a href={REPO} className="transition-colors hover:text-[var(--color-acid)]">github</a>
          <a href="https://github.com/elleskay" className="transition-colors hover:text-[var(--color-acid)]">elleskay</a>
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
