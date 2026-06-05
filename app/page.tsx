import { siNextdotjs, siExpo, siNestjs, siPostgresql, siGithubactions } from "simple-icons";
import HeroCommand from "./components/HeroCommand";
import Gallery from "./components/Gallery";

const REPO = "https://github.com/elleskay/platform";
const MOBILE_REPO = "https://github.com/elleskay/mobile-platform";

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
          <a href="#features" className="transition-colors hover:text-[var(--color-ink)]">Features</a>
          <a href="#stacks" className="transition-colors hover:text-[var(--color-ink)]">Stacks</a>
          <a href="#how" className="transition-colors hover:text-[var(--color-ink)]">How it works</a>
          <a href="#apps" className="transition-colors hover:text-[var(--color-ink)]">Showcase</a>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <a href={REPO} className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:block">GitHub</a>
          <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-3.5 py-2 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">Web</a>
          <a href={MOBILE_REPO} className="rounded-lg bg-[var(--color-violet)] px-3.5 py-2 text-sm font-semibold text-[#0a0b16] transition-opacity hover:opacity-90">Mobile</a>
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
          <a href="#how" className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">How it works</a>
          <a href="#apps" className="rounded-lg border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition-colors hover:border-white/25">View demos</a>
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

function FeatureIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    gate: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    ci: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /></>,
    sec: <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" />,
    oidc: <><circle cx="8" cy="12" r="3" /><path d="M11 12h9l-2 2m2-2l-2-2" /></>,
    cloud: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /></>,
    smoke: <path d="M3 12h4l2 6 4-14 2 8h6" />,
    auth: <><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
    valid: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

/* Features: capability cards, each with example tags */
function Features() {
  const items: [string, string, string[]][] = [
    ["gate", "Spec-driven gate", ["bound tests", "100% coverage", "blocks deploy"]],
    ["ci", "CI/CD pipeline", ["typecheck", "lint", "cdk synth"]],
    ["sec", "Security scanning", ["CodeQL", "gitleaks", "npm audit"]],
    ["oidc", "OIDC deploys", ["short-lived role", "no stored keys", "least-privilege"]],
    ["cloud", "Next.js on AWS", ["Lambda", "S3", "CloudFront"]],
    ["smoke", "Post-deploy smoke test", ["health", "headers", "9 checks"]],
    ["auth", "Auth and database", ["Auth.js v5", "Neon Postgres", "JWT sessions"]],
    ["eye", "Observability", ["Sentry", "PostHog", "ready for a key"]],
    ["valid", "Validation", ["Zod", "every server action", "typed boundaries"]],
  ];
  return (
    <section id="features" className="border-t border-white/[0.06] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need, already built.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Your agent inherits a complete Next.js and AWS production stack, so it spends its time on your product, not the plumbing.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([icon, t, tags]) => (
            <div key={t} className="card card-hover p-6">
              <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
                <FeatureIcon name={icon} />
              </span>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <div className="mono mt-3 flex flex-wrap gap-2 text-[12px]">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 text-[var(--color-muted)]">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Real brand logos for the techs that publish them freely (Simple Icons).
const BRAND: Record<string, { path: string }> = {
  next: siNextdotjs,
  expo: siExpo,
  nest: siNestjs,
  db: siPostgresql,
  actions: siGithubactions,
};
// AWS does not license its service logos for free reuse, so these stay generic.
const AWS_MARK: Record<string, React.ReactNode> = {
  lambda: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  cdn: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  cdk: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 7v10l9 5 9-5V7" /><path d="M12 12v10" /></>,
};

function TechIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const brand = BRAND[name];
  if (brand) {
    return <svg viewBox="0 0 24 24" className={className} fill="var(--color-ink)"><path d={brand.path} /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{AWS_MARK[name]}</svg>;
}

/* Stacks: the technologies wired into the templates */
function Stacks() {
  const stacks: [string, string, string, string][] = [
    ["Next.js", "Web", "App Router, SSR on Lambda via OpenNext.", "next"],
    ["Expo", "Mobile", "React Native app, EAS build and OTA updates.", "expo"],
    ["NestJS", "Mobile", "Typed API on Lambda and API Gateway.", "nest"],
    ["AWS Lambda", "Cloud", "Serverless compute that scales to zero.", "lambda"],
    ["S3 + CloudFront", "Cloud", "Static assets on a global CDN.", "cdn"],
    ["AWS CDK", "Infra", "Infrastructure as code, one construct.", "cdk"],
    ["Neon Postgres", "Data", "Serverless Postgres with connection pooling.", "db"],
    ["GitHub Actions", "CI/CD", "OIDC deploys, no stored keys.", "actions"],
  ];
  return (
    <section id="stacks" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Eight technologies, already wired.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Across two templates, web (<a href={REPO} className="text-[var(--color-accent)] hover:underline">platform</a>) and mobile (<a href={MOBILE_REPO} className="text-[var(--color-violet)] hover:underline">mobile-platform</a>), configured and deploying on day one.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stacks.map(([name, kind, note, icon]) => (
            <div key={name} className="card card-hover p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-2"><TechIcon name={icon} /></span>
                  <span className="font-semibold">{name}</span>
                </div>
                <span className="mono rounded-md border border-white/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--color-faint)]">{kind}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How it works: 5-step stepper */
function How() {
  const steps: [string, string][] = [
    ["Prompt your idea", "Describe the app to your AI coding agent and point it at the template repo."],
    ["It scaffolds", "The agent pulls from the template and writes the app, no boilerplate, no config."],
    ["It connects your cloud", "On the first deploy it wires GitHub and AWS once: an OIDC role, a database, and secrets."],
    ["CI proves it", "The spec gate hits 100%, security scans pass, and the smoke test confirms the deploy."],
    ["It ships", "A live AWS URL, automatically, on every push from then on."],
  ];
  return (
    <section id="how" className="border-t border-white/[0.06] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prompt your idea. It does the rest.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">You describe the app. The agent builds it, sets up your cloud once, and ships it to AWS.</p>
        </div>
        <div className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block" />
          {steps.map(([t, body], i) => (
            <div key={t} className="relative text-center md:text-left">
              <div className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[var(--color-bg-2)] text-sm font-semibold text-[var(--color-accent)] md:mx-0">{i + 1}</div>
              <h3 className="mt-5 font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const features = ["Open source, MIT", "Works with any coding agent", "Production-ready: spec gate + smoke test"];
  return (
    <section className="border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(560px 280px at 50% 120%, rgba(139,149,255,0.2), transparent 65%)" }} />
        <div className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Prompt an idea. Ship a live app.</h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-[var(--color-muted)]">Point your agent at the platform repo and describe your first app. It builds, connects, and ships to a live AWS URL.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-muted)]">
            {features.map((f) => (
              <span key={f} className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> {f}</span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={REPO} className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]">Use the web template</a>
            <a href={MOBILE_REPO} className="rounded-lg bg-[var(--color-violet)] px-6 py-3 text-sm font-semibold text-[#0a0b16] transition-opacity hover:opacity-90">Use the mobile template</a>
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
      <Features />
      <Stacks />
      <How />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}
