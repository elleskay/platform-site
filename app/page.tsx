import Image from "next/image";
import UseTemplate from "./components/UseTemplate";
import HeroCommand from "./components/HeroCommand";
import coverShot from "./shots/coverlens.png";
import cancerShot from "./shots/cancer.png";
import armouryShot from "./shots/armoury.png";

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
          <a href="#included" className="transition-colors hover:text-[var(--color-ink)]">Features</a>
          <a href="#templates" className="transition-colors hover:text-[var(--color-ink)]">Stacks</a>
          <a href="#how" className="transition-colors hover:text-[var(--color-ink)]">How it works</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-ink)]">Showcase</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a href={REPO} className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:block">GitHub</a>
          <UseTemplate variant="nav" label="Use template" />
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const agents = ["Claude Code", "Codex", "Cursor", "Windsurf", "Cline"];
  const stats: [string, string][] = [
    ["100%", "Spec coverage"],
    ["9", "Smoke checks"],
    ["0", "Stored keys"],
    ["3", "Live apps"],
    ["2", "Templates"],
    ["MIT", "License"],
  ];
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(720px_440px_at_50%_0%,#000,transparent)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(640px 380px at 50% -6%, rgba(139,149,255,0.2), transparent 60%), radial-gradient(560px 360px at 82% 6%, rgba(192,132,252,0.14), transparent 60%)" }} />
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pt-20">
        <div className="mono mb-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-xs text-[var(--color-faint)]">
          <span className="uppercase tracking-[0.16em]">Works with</span>
          {agents.map((a) => (
            <span key={a} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[var(--color-muted)]">{a}</span>
          ))}
        </div>
        <h1 className="mx-auto max-w-3xl text-[42px] font-bold leading-[1.05] tracking-tight sm:text-[68px]">
          Ship production-grade apps, <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-violet)] bg-clip-text text-transparent">fast.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          Open-source Next.js and AWS templates your AI coding agent can deploy to. Point it at a repo, describe an idea, and it ships a real, live app, with no infrastructure to build.
        </p>
        <div className="mt-9"><HeroCommand /></div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <UseTemplate variant="hero" label="Use the template" />
          <a href="#how" className="rounded-lg border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:border-white/25">See how it works</a>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {stats.map(([n, l]) => (
            <div key={l} className="card p-4 text-center">
              <div className="text-2xl font-bold tracking-tight">{n}</div>
              <div className="mono mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-faint)]">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How it works, horizontal timeline */
function How() {
  const steps: [string, string][] = [
    ["Prompt your idea", "Point your AI coding agent at the platform repo and describe the app you want. It scaffolds from the template and builds it, no boilerplate, no config."],
    ["It sets up your cloud", "The first time it deploys, the agent wires your GitHub and AWS for you: a least-privilege OIDC role, a database, and the secrets. Once, and never again, with no stored keys."],
    ["It ships", "From then on, every idea you prompt is built, tested, and deployed to a live AWS URL automatically."],
  ];
  return (
    <section id="how" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prompt your idea. It does the rest.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">You describe the app. The agent does the building, the one-time cloud setup, and the deploy.</p>
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
      </div>
    </section>
  );
}

function FeatureIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    gate: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    oidc: <><circle cx="8" cy="12" r="3" /><path d="M11 12h9l-2 2m2-2l-2-2" /></>,
    cloud: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /></>,
    ci: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></>,
    sec: <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" />,
    smoke: <path d="M3 12h4l2 6 4-14 2 8h6" />,
    auth: <><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
    valid: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

/* Features: capability cards for the prebuilt layer */
function Included() {
  const items: [string, string, string][] = [
    ["gate", "Spec-driven test gate", "Every requirement is bound to a test. 100% coverage, or it does not ship."],
    ["oidc", "OIDC deploys", "GitHub assumes a short-lived role to deploy. No stored AWS keys, ever."],
    ["cloud", "Next.js on AWS serverless", "Your app runs on Lambda, S3, and CloudFront, provisioned by one CDK construct."],
    ["ci", "CI/CD pipeline", "Typecheck, lint, build, and a full cdk synth on every push."],
    ["sec", "Security scanning", "CodeQL, gitleaks, npm audit, and strict security headers."],
    ["smoke", "Post-deploy smoke test", "Nine live checks confirm every deploy actually works."],
    ["auth", "Auth and database", "Auth.js v5 sessions and Neon Postgres, ready to use."],
    ["eye", "Observability", "Sentry and PostHog hooks wired and waiting for a key."],
    ["valid", "Validation", "Zod at every server action boundary."],
  ];
  return (
    <section id="included" className="border-t border-white/[0.06] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need, already built.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Your agent inherits a complete Next.js and AWS production stack, so it spends its time on your product, not the plumbing.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([icon, t, body]) => (
            <div key={t} className="card card-hover p-6">
              <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
                <FeatureIcon name={icon} />
              </span>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Two templates: web (primary) + mobile sibling */
function Templates() {
  return (
    <section id="templates" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One workflow. Two stacks.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">The same prompt-to-deploy template comes in a web and a mobile flavor: same spec gate, same OIDC deploys, no stored keys.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="card flex flex-col p-7">
            <div className="mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Web</div>
            <div className="mt-3 flex items-center gap-2.5"><Mark className="h-5 w-5" /><span className="text-lg font-semibold">platform</span></div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">Next.js apps on AWS serverless, Lambda, S3, and CloudFront via CDK. The stack this page is about.</p>
            <div className="mono mt-5 text-sm text-[var(--color-faint)]">Proven by the apps below</div>
            <div className="mt-5"><a href={REPO} className="text-sm font-medium text-[var(--color-accent)] hover:underline">View on GitHub</a></div>
          </div>
          <div className="card flex flex-col p-7">
            <div className="mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-violet)]">Mobile</div>
            <div className="mt-3 flex items-center gap-2.5"><Mark className="h-5 w-5" color="var(--color-violet)" /><span className="text-lg font-semibold">mobile-platform</span></div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">Expo (React Native) apps with a NestJS API on AWS. Native call and SMS screening in Swift and Kotlin via Expo config plugins, plus EAS build, submit, and OTA.</p>
            <div className="mono mt-5 text-sm text-[var(--color-faint)]">Reference: ScamShield (preview)</div>
            <div className="mt-5 flex items-center gap-4 text-sm font-medium">
              <a href="https://elleskay.github.io/scamshield/" className="text-[var(--color-accent)] hover:underline">Preview</a>
              <a href="https://github.com/elleskay/mobile-platform" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Repo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Showcase, live apps as screenshot cards with a demo button */
function Gallery() {
  const apps = [
    { name: "CoverLens", tag: "AI · Insurance", tagColor: "var(--color-accent)", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", live: LIVE.coverlens, repo: "https://github.com/elleskay/insurance-dashboard", shot: coverShot },
    { name: "Cancer Navigator", tag: "Healthcare", tagColor: "var(--color-violet)", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", live: LIVE.cancer, repo: "https://github.com/elleskay/cancer-navigator", shot: cancerShot },
    { name: "Armoury", tag: "GovTech", tagColor: "var(--color-ok)", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", live: LIVE.armoury, repo: "https://github.com/elleskay/armoury", shot: armouryShot },
  ];
  return (
    <section id="apps" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built on the platform. Live right now.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Real apps shipped on the template, real auth, real data, a real AWS deploy. Open any of them.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((a) => (
            <div key={a.name} className="card card-hover flex flex-col overflow-hidden">
              <a href={a.live} className="relative block aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                <Image src={a.shot} alt={`${a.name} screenshot`} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover object-top" placeholder="blur" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ok)]" /> Live
                </span>
              </a>
              <div className="flex flex-1 flex-col p-5">
                <div className="mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: a.tagColor }}>{a.tag}</div>
                <h3 className="mt-2 font-semibold">{a.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
                <div className="mt-5 flex items-center gap-3">
                  <a href={a.live} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">Demo</a>
                  <a href={a.repo} className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Repo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <p className="mx-auto mt-5 max-w-md text-lg text-[var(--color-muted)]">Point your agent at the platform repo and describe your first app. It builds, connects, and ships to a live AWS URL.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <UseTemplate variant="hero" label="Use the template" />
            <a href={REPO} className="rounded-lg border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:border-white/25">Browse the code</a>
          </div>
          <p className="mt-5 text-sm text-[var(--color-faint)]">Free and open source. MIT licensed.</p>
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
      <Included />
      <Templates />
      <How />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}
