const REPO = "https://github.com/elleskay/platform";

function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-lg bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    </span>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-bold tracking-tight">platform</span>
        </a>
        <div className="hidden items-center gap-7 text-sm font-medium text-[var(--color-muted)] sm:flex">
          <a href="#features" className="hover:text-[var(--color-ink)]">What you get</a>
          <a href="#how" className="hover:text-[var(--color-ink)]">How it works</a>
          <a href="#gate" className="hover:text-[var(--color-ink)]">Spec gate</a>
          <a href="#apps" className="hover:text-[var(--color-ink)]">Built on it</a>
        </div>
        <a
          href={REPO}
          className="rounded-lg bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Terminal() {
  const Line = ({
    ok,
    label,
    children,
    cyan,
  }: {
    ok?: boolean;
    label?: string;
    children: React.ReactNode;
    cyan?: boolean;
  }) => (
    <div className="flex gap-2.5">
      {ok ? <span className="text-emerald-400">{"✓"}</span> : <span className="text-emerald-400">{"●"}</span>}
      {label ? <span className="w-20 shrink-0 text-blue-300">{label}</span> : null}
      <span className={cyan ? "text-cyan-300" : "text-slate-300"}>{children}</span>
    </div>
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_46px_90px_-34px_rgba(13,20,40,0.55),0_16px_36px_-18px_rgba(13,20,40,0.4)]">
      <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-[#121a2c] px-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-[family-name:var(--font-mono)] text-[13px] text-slate-500">
          my-app, cloned from elleskay/platform
        </span>
      </div>
      <div className="space-y-1.5 p-6 font-[family-name:var(--font-mono)] text-[13.5px] leading-relaxed">
        <div className="text-slate-200">$ git push origin main</div>
        <div className="h-2" />
        <Line ok label="CI"><span className="text-slate-400">typecheck {"·"} lint {"·"} build {"·"} cdk synth</span></Line>
        <Line ok label="Security"><span className="text-slate-400">CodeQL {"·"} gitleaks {"·"} npm audit</span></Line>
        <Line ok label="Spec gate" cyan>example v1: 100% covered (3/3)</Line>
        <Line ok label="Deploy"><span className="text-slate-400">OIDC {"·"} cdk deploy {"·"} smoke test 9/9</span></Line>
        <div className="h-2" />
        <Line>Live on CloudFront, with zero stored AWS keys.</Line>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 440px at 85% -10%, rgba(79,70,229,0.16), transparent 60%), radial-gradient(620px 420px at -5% 30%, rgba(6,182,212,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/70 px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-indigo-700)]">
            Clone it. Ship to AWS, day one.
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            Ship Next.js apps to <span className="text-grad">AWS serverless,</span> on day one.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            A reusable TypeScript monorepo template. Clone it per app and inherit a working CI/CD pipeline, infrastructure as code via AWS CDK, security scanning, OIDC deploys with no stored keys, and a spec-driven test gate that blocks merges until every requirement is covered.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={REPO}
              className="rounded-xl bg-[linear-gradient(135deg,#4f46e5,#4338ca)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(79,70,229,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Use the template on GitHub
            </a>
            <a
              href="#how"
              className="rounded-xl border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-indigo)]"
            >
              See how it works
            </a>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-muted)]">
            <span className="text-[var(--color-indigo)]">$</span>
            git clone https://github.com/elleskay/platform my-app
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const apps = [
    { name: "CoverLens", href: "https://github.com/elleskay/insurance-dashboard", note: "AI insurance policy checker" },
    { name: "Cancer Navigator", href: "https://github.com/elleskay/cancer-navigator", note: "Singapore cancer roadmap" },
    { name: "Armoury", href: "https://github.com/elleskay/armoury", note: "Frontline equipment checklists" },
  ];
  return (
    <section id="apps" className="border-y border-[var(--color-line)] bg-[#fafbff]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-center font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Cloned by real apps in production
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {apps.map((a) => (
            <a
              key={a.name}
              href={a.href}
              className="group rounded-2xl border border-[var(--color-line)] bg-white p-5 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center gap-2">
                <Logo className="h-6 w-6" />
                <span className="font-semibold">{a.name}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{a.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      t: "A reusable CDK construct",
      d: "One NextjsServerless call deploys a Next.js app as Lambda, S3, and CloudFront via OpenNext. It auto-routes every public/ asset to S3 and takes a configurable Lambda timeout and custom domain.",
    },
    {
      t: "Three GitHub Actions workflows",
      d: "CI (typecheck, lint, demo build, cdk synth), security (CodeQL, gitleaks, npm audit), and deploy (build, cdk deploy, smoke test), wired and green from the first push.",
    },
    {
      t: "OIDC deploys, no stored keys",
      d: "A one-time setup stack provisions a GitHub OIDC role, so deploys assume into AWS with short-lived credentials. No long-lived access keys ever touch the repo.",
    },
    {
      t: "A spec-driven test gate",
      d: "Write requirements in YAML first, then code and tests together. CI refuses to merge below 100 percent requirement coverage, so the spec and the implementation cannot drift.",
    },
    {
      t: "A post-deploy smoke test",
      d: "After every deploy, a script probes the live URL and exits non-zero on any failure. It auto-detects auth versus public apps, so a broken deploy never goes green.",
    },
    {
      t: "Batteries, not lock-in",
      d: "Reference overlays for Auth.js, security headers, middleware, Sentry, PostHog, email, and rate limiting. Each no-ops without keys, so you wire only what you need.",
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          What you get the moment you clone
        </h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          The cross-cutting plumbing every production app needs, solved once and inherited, not rebuilt per project.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.t}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.3)]"
          >
            <span className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-indigo)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{it.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function How() {
  const steps = [
    { n: "01", t: "Clone the template", d: "Start a new app from the repo. You inherit the workflows, the CDK construct, the spec-test package, and the reference overlays immediately." },
    { n: "02", t: "Write the spec first", d: "Translate the brief into requirements in a YAML spec, each with an ID, category, and given / when / then. No code until the spec exists." },
    { n: "03", t: "Code and tests together", d: "Implement each requirement and its test in the same change. The coverage gate fails the build if any requirement is uncovered." },
    { n: "04", t: "git push deploys it", d: "Push to main and the pipeline builds with OpenNext, deploys via CDK over OIDC, and smoke-tests the live URL before it counts as shipped." },
  ];
  return (
    <section id="how" className="border-y border-[var(--color-line)] bg-[#fafbff]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          From an empty clone to a deployed app
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <span className="text-grad text-3xl font-extrabold">{s.n}</span>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">One call, a whole stack</h3>
            <p className="mt-3 text-[var(--color-muted)]">
              The NextjsServerless construct encodes every production gotcha this template learned the hard way: env baked at synth, public assets routed to S3, security headers, and configurable Lambda and CDN timeouts.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_30px_70px_-30px_rgba(13,20,40,0.5)]">
            <div className="border-b border-white/5 bg-[#121a2c] px-4 py-2.5 font-[family-name:var(--font-mono)] text-[12px] text-slate-500">
              infra/cdk/web/lib/web-stack.ts
            </div>
            <pre className="overflow-x-auto p-5 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-slate-300">
{`new NextjsServerless(this, "Web", {
  appPath: resolve(__dirname, "../../../apps/web"),
  serverTimeoutSeconds: 60,   // AI / long-running routes
  environment: {
    DATABASE_URL,
    AUTH_SECRET,
    AUTH_URL,
  },
});`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gate() {
  return (
    <section id="gate" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-indigo)]">
            Spec-driven, gated in CI
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The build does not pass until every requirement is proven
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Requirements live as data, not prose. Each has an ID bound to a test, and a coverage tool cross-checks the spec against the tests that actually ran. Below 100 percent, CI fails. No "I will write tests later".
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--color-muted)]">
            {[
              "Every requirement carries a unique ID and a category",
              "Tests claim a requirement by naming it; empty assertions fail lint",
              "Category mismatches and stale coverage fail the gate too",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span className="mt-0.5 text-[var(--color-indigo)]">{"✓"}</span>
                {li}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0b1220]">
            <div className="border-b border-white/5 px-4 py-2.5 font-[family-name:var(--font-mono)] text-[12px] text-slate-500">
              a green gate, exit 0
            </div>
            <pre className="p-5 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-emerald-300">
{`example v1: 100% covered (3/3)
all requirements proven, deploy allowed`}
            </pre>
          </div>
          <div className="overflow-hidden rounded-2xl border border-rose-500/20 bg-[#0b1220]">
            <div className="border-b border-white/5 px-4 py-2.5 font-[family-name:var(--font-mono)] text-[12px] text-slate-500">
              one uncovered requirement, nonzero exit
            </div>
            <pre className="p-5 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-rose-300">
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 380px at 50% 120%, rgba(79,70,229,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
        <Logo className="mx-auto h-12 w-12" />
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Stop re-solving the <span className="text-grad">plumbing.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-muted)]">
          Clone the template and spend day one on your product, not on CI, infrastructure, security, and deploys.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={REPO}
            className="rounded-xl bg-[linear-gradient(135deg,#4f46e5,#4338ca)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(79,70,229,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Get the template
          </a>
          <a
            href="https://github.com/elleskay"
            className="rounded-xl border border-[var(--color-line)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-indigo)]"
          >
            See the apps built on it
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[#fafbff]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-[var(--color-muted)] sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-5 w-5" />
          <span>platform, an open-source template. MIT licensed.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={REPO} className="hover:text-[var(--color-ink)]">GitHub</a>
          <a href="https://github.com/elleskay" className="hover:text-[var(--color-ink)]">More by elleskay</a>
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
      <Features />
      <How />
      <Gate />
      <CTA />
      <Footer />
    </main>
  );
}
