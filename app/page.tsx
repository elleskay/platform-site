import { siNextdotjs, siExpo, siNestjs, siPostgresql, siGithubactions } from "simple-icons";
import HeroCommand from "./components/HeroCommand";
import Gallery from "./components/Gallery";
import HowSteps from "./components/HowSteps";
import PipelineRun from "./components/PipelineRun";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import ThemeToggle from "./components/ThemeToggle";
import { APPS } from "./content";

const REPO = "https://github.com/elleskay/platform";
const MOBILE_REPO = "https://github.com/elleskay/mobile-platform";

// Page gutter shared by every section, header, and footer.
const WRAP = "mx-auto max-w-7xl px-6 sm:px-8";

function Mark({ className = "h-6 w-6", color = "var(--color-ink)" }: { className?: string; color?: string }) {
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
  const links: [string, string][] = [
    ["How it works", "#how"],
    ["Pipeline", "#pipeline"],
    ["Stacks", "#stacks"],
    ["Showcase", "#apps"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header backdrop-blur-[20px]">
      <nav className={`${WRAP} flex h-16 items-center justify-between`}>
        <a href="#top" className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.012em]">
          <Mark className="h-[18px] w-[18px]" />
          platform
        </a>
        <div className="flex items-center gap-1">
          <div className="hidden items-center md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-ink">{label}</a>
            ))}
            <span className="mx-3 h-4 w-px bg-line" />
          </div>
          <ThemeToggle />
          <a href={MOBILE_REPO} className="rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-ink">Mobile</a>
          <a href={REPO} className="btn btn-invert h-8 px-3 text-[13px]">Web</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const agents = ["Claude Code", "Codex", "Cursor", "Windsurf", "Cline"];
  return (
    <section id="top">
      <div className={`${WRAP} pt-20 sm:pt-32`}>
        <h1 className="max-w-4xl text-[40px] font-medium leading-[1.05] tracking-title sm:text-[64px] sm:leading-none">
          The production stack your coding agent builds on
        </h1>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-muted">Open-source Next.js and Expo templates on AWS. Describe an idea, and your agent ships a real, live app.</p>
          <a href="#apps" className="shrink-0 text-muted transition-colors hover:text-ink">
            <span className="font-medium text-ink-2">Live</span>&nbsp;&nbsp;{APPS.length} shipped apps <span aria-hidden>→</span>
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:mt-20 sm:px-6">
        <HeroCommand />
      </div>
      <div data-reveal="0" className={`${WRAP} pb-20 pt-20 sm:pb-28 sm:pt-28`}>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:justify-between sm:gap-x-10">
          {agents.map((a) => (
            <span key={a} className="text-[20px] font-medium tracking-[-0.02em] text-ink-2 sm:text-[22px]">{a}</span>
          ))}
        </div>
        <p className="caption mt-6">Works with the coding agent you already use</p>
      </div>
    </section>
  );
}

/* Pipeline: a two-tone statement, one pull request going from checks to a
   live deploy, and the three numbers that pipeline guarantees */
function Pipeline() {
  const stats: [string, string][] = [
    ["100%", "Spec coverage to merge"],
    ["9", "Smoke checks per deploy"],
    ["0", "Stored AWS keys"],
  ];
  return (
    <section id="pipeline" className="border-t border-line">
      <div className={`${WRAP} py-24 sm:py-36`}>
        <h2 data-reveal="0" className="max-w-6xl text-pretty text-[28px] font-medium leading-[1.15] tracking-title text-muted sm:text-[48px] sm:leading-none">
          <span className="text-ink">Nothing ships unproven.</span> Every pull request clears the spec gate, security scans, and CI before it can merge.
        </h2>
        <div data-reveal="0" className="mt-16 sm:mt-20">
          <PipelineRun />
          <p className="mt-4 text-[13px] text-faint">
            Web template shown. The mobile template ships its API the same way.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-px border-y border-line bg-line">
          {stats.map(([n, l], i) => (
            <div key={l} className="bg-canvas px-3 py-6 first:pl-0 sm:px-6">
              <div data-reveal={i}>
                <div className="text-[28px] font-medium tracking-title sm:text-[40px]">{n}</div>
                <div className="caption mt-1">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Real brand logos for the techs that publish them freely (Simple Icons).
const BRAND = {
  next: siNextdotjs,
  expo: siExpo,
  nest: siNestjs,
  db: siPostgresql,
  actions: siGithubactions,
} satisfies Record<string, { path: string }>;
// AWS does not license its service logos for free reuse, so these stay generic.
const AWS_MARK = {
  lambda: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  cdn: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  cdk: <><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 7v10l9 5 9-5V7" /><path d="M12 12v10" /></>,
} satisfies Record<string, React.ReactNode>;

type TechIconName = keyof typeof BRAND | keyof typeof AWS_MARK;

function TechIcon({ name, className = "h-5 w-5" }: { name: TechIconName; className?: string }) {
  if (name in BRAND) {
    return <svg viewBox="0 0 24 24" className={className} fill="var(--color-ink)"><path d={BRAND[name as keyof typeof BRAND].path} /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{AWS_MARK[name as keyof typeof AWS_MARK]}</svg>;
}

/* Stacks: the technologies wired into the templates */
function Stacks() {
  const stacks: [string, string, string, TechIconName][] = [
    ["Next.js", "Web", "App Router, SSR on Lambda via OpenNext.", "next"],
    ["Expo", "Mobile", "React Native app, EAS build and OTA updates.", "expo"],
    ["NestJS", "Mobile", "Typed API on Lambda and API Gateway.", "nest"],
    ["AWS Lambda", "Cloud", "Serverless compute that scales to zero.", "lambda"],
    ["S3 + CloudFront", "Cloud", "Static assets on a global CDN.", "cdn"],
    ["AWS CDK", "Infra", "Infrastructure as code, one construct.", "cdk"],
    ["Neon Postgres", "Data", "Serverless Postgres with connection pooling.", "db"],
    ["GitHub Actions", "CI/CD", "OIDC deploys, no stored AWS keys.", "actions"],
  ];
  const alsoWired: [string, string][] = [
    ["Auth and database", "Auth.js v5 · JWT sessions · migrations on deploy"],
    ["Observability", "Sentry · PostHog · ready for a key"],
    ["Validation", "Zod on every server action · typed boundaries"],
  ];
  return (
    <section id="stacks" className="border-t border-line">
      <div className={`${WRAP} py-24 sm:py-36`}>
        <div data-reveal="0">
          <SectionHead
            title={<>Eight technologies,<br />already wired</>}
            intro="Two templates, web and mobile, configured and deploying on day one."
            links={[["platform", REPO], ["mobile-platform", MOBILE_REPO]]}
          />
        </div>
        <div className="mt-16 overflow-hidden rounded-xl border border-border-strong bg-line">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {stacks.map(([name, kind, note, icon], i) => (
              <div key={name} className="bg-panel p-6 transition-colors hover:bg-panel-2">
                <div data-reveal={i % 4}>
                  <div className="flex items-center justify-between">
                    <TechIcon name={icon} />
                    <span className="caption">{kind}</span>
                  </div>
                  <h3 className="mt-8 font-medium text-ink-2">{name}</h3>
                  <p className="mt-1 text-muted">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <div className="caption">Also wired into the web template</div>
          <div className="mt-4 grid gap-6 md:grid-cols-3 md:gap-8">
            {alsoWired.map(([t, note], i) => (
              <div key={t} data-reveal={i} className="flex gap-3">
                <Check className="mt-[5px] h-3.5 w-3.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-ink-2">{t}</h3>
                  <p className="mt-1 text-muted">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* How it works: five steps on a timeline */
function How() {
  const steps: [string, string][] = [
    ["Prompt your idea", "Describe the app and point your agent at the template."],
    ["It scaffolds", "It writes the spec first, then the code and tests."],
    ["It connects your cloud", "One command wires GitHub and AWS: OIDC, database, secrets."],
    ["CI proves it", "The PR can't merge until the spec gate and scans pass."],
    ["It ships", "The merge deploys, and a smoke test checks it live."],
  ];
  return (
    <section id="how" className="border-t border-line">
      <div className={`${WRAP} py-24 sm:py-36`}>
        <div data-reveal="0">
          <SectionHead
            title={<>Idea to<br />live URL</>}
            intro="You describe the app. The agent builds it, sets up your cloud once, and ships it to AWS."
            links={[["Read the template guide", REPO]]}
          />
        </div>
        <HowSteps steps={steps} />
      </div>
    </section>
  );
}

function CTA() {
  const features = ["Open source, MIT", "Works with any coding agent", "Production-ready: spec gate + smoke test"];
  return (
    <section className="border-t border-line">
      <div data-reveal="0" className={`${WRAP} py-28 text-center sm:py-44`}>
        <h2 className="mx-auto max-w-3xl text-balance text-[36px] font-medium leading-[1.05] tracking-title sm:text-[72px] sm:leading-none">
          Describe the app.<br />Your agent ships it.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={REPO} className="btn btn-invert h-11 px-5 text-[16px]">Use the web template</a>
          <a href={MOBILE_REPO} className="btn btn-ghost h-11 px-5 text-[16px]">Use the mobile template</a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
          {features.map((f) => (
            <span key={f} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5" /> {f}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns: [string, [string, string][]][] = [
    ["Templates", [["platform", REPO], ["mobile-platform", MOBILE_REPO]]],
    ["Showcase", APPS.map((a) => [a.name, a.live])],
    ["Connect", [["GitHub", "https://github.com/elleskay"]]],
  ];
  return (
    <footer className="border-t border-line">
      <div className={`${WRAP} grid gap-10 py-16 sm:grid-cols-[1fr_repeat(3,minmax(0,200px))]`}>
        <a href="#top" aria-label="platform, back to top"><Mark className="h-5 w-5" /></a>
        {columns.map(([head, links]) => (
          <div key={head}>
            <h3 className="text-[13px] font-medium">{head}</h3>
            <ul className="mt-4 space-y-2.5">
              {links.map(([label, href]) => (
                <li key={href}><a href={href} className="text-[13px] text-muted transition-colors hover:text-ink">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={`${WRAP} pb-12 text-[13px] text-faint`}>platform, an open-source template. MIT.</div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <How />
        <Pipeline />
        <Stacks />
        <Gallery />
        <CTA />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
