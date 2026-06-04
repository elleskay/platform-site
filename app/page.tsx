import Pipeline from "./components/Pipeline";

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

/* IDE window-chrome nav */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-3 w-3 rounded-full bg-[var(--color-green)]" />
          <span className="h-3 w-3 rounded-full bg-[#eab308]" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-faint)]" />
        </div>
        <a href="#top" className="mono flex items-center gap-2 text-sm font-bold tracking-tight">
          <Mark className="h-5 w-5" /> ~/elleskay/platform
        </a>
        <div className="mono ml-auto hidden items-center gap-7 text-sm text-[var(--color-muted)] md:flex">
          <a href="#pipeline" className="transition-colors hover:text-[var(--color-green-bright)]">pipeline</a>
          <a href="#construct" className="transition-colors hover:text-[var(--color-green-bright)]">construct</a>
          <a href="#receipt" className="transition-colors hover:text-[var(--color-green-bright)]">the math</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-green-bright)]">apps</a>
        </div>
        <a href={REPO} className="mono ml-auto bg-[var(--color-green)] px-4 py-2 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)] md:ml-0">
          use template
        </a>
      </nav>
    </header>
  );
}

/* Asymmetric editorial hero + lockfile manifest */
function Hero() {
  const modules: [string, string, "green" | "purple"][] = [
    ["ci-cd", "typecheck · lint · build · synth", "green"],
    ["infra", "NextjsServerless cdk construct", "purple"],
    ["security", "codeql · gitleaks · npm audit", "green"],
    ["spec-gate", "100% coverage or no deploy", "purple"],
    ["smoke-test", "9 live checks post-deploy", "green"],
    ["batteries", "auth.js · neon · zod · sentry", "purple"],
  ];
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(1100px_640px_at_18%_-10%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(620px 360px at 12% -6%, rgba(34,197,94,0.14), transparent 64%), radial-gradient(560px 320px at 92% 18%, rgba(168,85,247,0.12), transparent 66%)" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="mono inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green-bright)]">
            <span className="h-1.5 w-1.5 bg-[var(--color-green)]" /> a template, not a product
          </span>
          <h1 className="mt-7 text-[46px] font-bold leading-[0.95] tracking-tight sm:text-[72px]">
            The boring parts of <span className="text-[var(--color-green)]">shipping</span>, already <span className="text-[var(--color-purple)]">solved.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            Clone one repo and inherit a Next.js app on AWS serverless with CI/CD, infrastructure as code, security scanning, OIDC deploys, and a spec-driven test gate. Wired the day you start, proven by real apps in production.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={REPO} className="mono bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">use the template</a>
            <a href="#pipeline" className="mono border-2 border-[var(--color-purple)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-purple)] hover:text-white">watch it deploy</a>
          </div>
        </div>

        {/* Lockfile-style manifest */}
        <div className="border-2 border-[var(--color-border)] bg-[#0b1324]">
          <div className="mono flex items-center justify-between border-b-2 border-[var(--color-border)] px-4 py-3 text-[12px] text-[var(--color-faint)]">
            <span>platform.lock</span>
            <span>6 modules</span>
          </div>
          <ul className="mono divide-y divide-[var(--color-border)] text-[13px]">
            {modules.map(([name, desc, c]) => (
              <li key={name} className="flex items-center gap-3 px-4 py-3">
                <span className="h-2 w-2 shrink-0" style={{ background: c === "green" ? "var(--color-green)" : "var(--color-purple)" }} />
                <span className="w-[92px] shrink-0 font-bold text-[var(--color-ink)]">{name}</span>
                <span className="truncate text-[var(--color-faint)]">{desc}</span>
              </li>
            ))}
          </ul>
          <div className="mono border-t-2 border-[var(--color-border)] px-4 py-3 text-[12px] text-[var(--color-green-bright)]">resolved, 0 to configure</div>
        </div>
      </div>
    </section>
  );
}

/* Annotated construct close-up: code with margin callouts */
function Construct() {
  const code: { txt: string; note?: string }[] = [
    { txt: "new NextjsServerless(this, \"Web\", {" },
    { txt: "  appPath: resolve(\"apps/web\"),", note: "OpenNext build wired in" },
    { txt: "  serverTimeoutSeconds: 60,", note: "Lambda + CDN read timeout, raised together" },
    { txt: "  customDomain: \"app.example.com\",", note: "ACM cert + CloudFront alias, one prop" },
    { txt: "  environment: {", note: "baked at synth, never at runtime" },
    { txt: "    DATABASE_URL," },
    { txt: "    AUTH_SECRET," },
    { txt: "    AUTH_URL," },
    { txt: "  }," },
    { txt: "});" },
  ];
  let noteN = 0;
  return (
    <section id="construct" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <div className="mono text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-purple)]">// the construct</div>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Every deploy gotcha, encoded in <span className="text-[var(--color-purple)]">one call.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Lambda, S3, and CloudFront via OpenNext. The lessons this template learned the hard way are now defaults you never relearn.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="border-2 border-[var(--color-border)] bg-[#0b1324]">
            <div className="mono border-b-2 border-[var(--color-border)] px-4 py-3 text-[12px] text-[var(--color-faint)]">infra/cdk/web/lib/web-stack.ts</div>
            <pre className="mono overflow-x-auto p-5 text-[13px] leading-[1.9]">
              {code.map((l, i) => {
                const n = l.note ? ++noteN : null;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="select-none text-[var(--color-faint)]/50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[var(--color-muted)]">{l.txt}</span>
                    {n ? (
                      <span className="mono ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-purple)] text-[11px] font-bold text-white">{n}</span>
                    ) : null}
                  </div>
                );
              })}
            </pre>
          </div>
          <ol className="flex flex-col justify-center gap-4">
            {code.filter((l) => l.note).map((l, i) => (
              <li key={i} className="flex gap-3.5 border-l-2 border-[var(--color-purple)] bg-[var(--color-surface)] px-4 py-3.5">
                <span className="mono flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-purple)] text-[11px] font-bold text-white">{i + 1}</span>
                <p className="text-[var(--color-muted)]">{l.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Comparison reimagined as an itemized receipt */
function Receipt() {
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
    <section id="receipt" className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mono text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">// the math</div>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              The bill for <span className="text-[var(--color-green)]">not</span> using a template.
            </h2>
            <p className="mt-4 max-w-md text-lg text-[var(--color-muted)]">
              Every line is a thing you would otherwise build, debug, and maintain before writing a single product feature. Cloning zeroes the invoice.
            </p>
            <a href={REPO} className="mono mt-7 inline-block bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">skip the bill</a>
          </div>

          <div className="border-2 border-[var(--color-border)] bg-[#0b1324] shadow-[0_30px_70px_-44px_rgba(0,0,0,0.9)]">
            <div className="mono border-b-2 border-dashed border-[var(--color-border)] px-6 py-4 text-center text-[12px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
              from-scratch invoice
            </div>
            <ul className="mono px-6 py-5 text-[13px]">
              {items.map(([label, cost]) => (
                <li key={label} className="flex items-baseline gap-3 py-2.5">
                  <span className="text-[var(--color-muted)]">{label}</span>
                  <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-[var(--color-border)]" />
                  <span className="text-[var(--color-faint)] line-through">{cost}</span>
                </li>
              ))}
            </ul>
            <div className="mono flex items-baseline justify-between border-t-2 border-dashed border-[var(--color-border)] px-6 py-4">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-ink)]">your total</span>
              <span className="text-2xl font-bold text-[var(--color-green-bright)]">git clone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Proof: apps as a filmstrip */
function Apps() {
  const apps = [
    { name: "CoverLens", note: "AI insurance policy checker", href: "https://github.com/elleskay/insurance-dashboard", c: "green" },
    { name: "Cancer Navigator", note: "Singapore cancer roadmap", href: "https://github.com/elleskay/cancer-navigator", c: "purple" },
    { name: "Armoury", note: "Frontline equipment checklists", href: "https://github.com/elleskay/armoury", c: "green" },
  ];
  return (
    <section id="apps" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mono mb-8 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">// cloned into production by</div>
        <div className="grid gap-5 sm:grid-cols-3">
          {apps.map((a) => (
            <a key={a.name} href={a.href} className="group flex flex-col border-2 border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-green)]">
              <div className="mono mb-6 flex items-center justify-between text-[12px] text-[var(--color-faint)]">
                <span>app</span>
                <span className="h-2 w-2" style={{ background: a.c === "green" ? "var(--color-green)" : "var(--color-purple)" }} />
              </div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Mark className="h-5 w-5" color={a.c === "green" ? "var(--color-green)" : "var(--color-purple)"} /> {a.name}
              </div>
              <p className="mono mt-2 text-sm text-[var(--color-faint)]">{a.note}</p>
              <span className="mono mt-6 text-sm text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-green-bright)]">view repo</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA as a clone prompt */
function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(760px_400px_at_50%_120%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 300px at 50% 130%, rgba(34,197,94,0.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <Mark className="mx-auto h-10 w-10" />
        <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          Day one starts at <span className="text-[var(--color-green)]">git clone.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-[var(--color-muted)]">Take the plumbing. Spend your time on the product.</p>
        <div className="mono mx-auto mt-9 flex max-w-xl items-center gap-3 border-2 border-[var(--color-border)] bg-[#0b1324] px-5 py-4 text-left text-sm">
          <span className="text-[var(--color-green)]">$</span>
          <span className="truncate text-[var(--color-ink)]">git clone github.com/elleskay/platform</span>
          <a href={REPO} className="ml-auto shrink-0 bg-[var(--color-green)] px-3 py-1.5 text-xs font-bold text-[#06210f] transition-colors hover:bg-[var(--color-green-bright)]">open</a>
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
      <Pipeline />
      <Construct />
      <Receipt />
      <Apps />
      <CTA />
      <Footer />
    </main>
  );
}
