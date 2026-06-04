const REPO = "https://github.com/elleskay/platform";

const S = "var(--color-stroke)";
const A = "var(--color-accent)";
const BG = "var(--color-bg)";

function Mark({ className = "h-6 w-6", color = "var(--color-stroke)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  );
}

function Ticks() {
  return (
    <>
      <span className="tick absolute left-0 top-0 border-l border-t" />
      <span className="tick absolute right-0 top-0 border-r border-t" />
      <span className="tick absolute bottom-0 left-0 border-b border-l" />
      <span className="tick absolute bottom-0 right-0 border-b border-r" />
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-stroke)_30%,transparent)] bg-[var(--color-bg)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">platform</span>
        </a>
        <div className="mono ml-auto hidden items-center gap-6 text-[12px] uppercase tracking-[0.12em] text-[var(--color-muted)] md:flex">
          <a href="#loop" className="hover:text-[var(--color-accent)]">the loop</a>
          <a href="#deploys" className="hover:text-[var(--color-accent)]">what it deploys</a>
          <a href="#spec" className="hover:text-[var(--color-accent)]">spec</a>
          <a href="#refs" className="hover:text-[var(--color-accent)]">as-built</a>
        </div>
        <a href={REPO} className="mono ml-auto border border-[var(--color-stroke)] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-stroke)] hover:text-[var(--color-bg)] md:ml-0">
          use template
        </a>
      </nav>
    </header>
  );
}

/* The hero demo: same agent, two PRs, the gate decides */
function GatePanel({ pr, title, rows, coverage, verdict, ok }: { pr: string; title: string; rows: [string, boolean][]; coverage: string; verdict: string; ok: boolean }) {
  const c = ok ? "var(--color-ok)" : "var(--color-bad)";
  return (
    <div className="border bg-[var(--color-bg-2)]" style={{ borderColor: `color-mix(in srgb, ${c} 55%, transparent)` }}>
      <div className="mono flex items-center justify-between border-b px-4 py-2.5 text-[11px]" style={{ borderColor: "color-mix(in srgb, var(--color-stroke) 22%, transparent)" }}>
        <span className="text-[var(--color-muted)]">{pr}</span>
        <span style={{ color: c }}>{ok ? "● deploy" : "● blocked"}</span>
      </div>
      <div className="mono space-y-1.5 p-4 text-[12.5px]">
        <div className="text-[var(--color-faint)]">agent: {title}</div>
        <div className="h-1" />
        {rows.map(([id, pass]) => (
          <div key={id} className="flex items-center gap-2 text-[var(--color-muted)]">
            <span style={{ color: pass ? "var(--color-ok)" : "var(--color-bad)" }}>{pass ? "✓" : "✗"}</span>
            <span>{id}</span>
            {!pass ? <span className="text-[var(--color-bad)]">no test</span> : null}
          </div>
        ))}
        <div className="h-1" />
        <div style={{ color: A }}>{coverage}</div>
        <div className="font-bold" style={{ color: c }}>{verdict}</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="mono flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
          <span className="h-2 w-2 bg-[var(--color-accent)]" /> the agent harness
        </div>
        <h1 className="mt-6 max-w-4xl text-[38px] font-extrabold leading-[1.0] tracking-tight sm:text-[64px]">
          An agent can write anything.
          <br className="hidden sm:block" /> The gate decides what <span className="text-[var(--color-accent)]">ships.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          platform is a TypeScript monorepo template built to pair with coding agents like Claude Code and Codex. The agent writes against a spec; the template proves every requirement before anything deploys. No green gate, no production. Same agent, two pull requests:
        </p>

        {/* the demo */}
        <div className="frame mt-9 bg-[color-mix(in_srgb,var(--color-bg-2)_55%,transparent)] p-4 sm:p-6">
          <Ticks />
          <div className="mono mb-4 flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)] pb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-faint)]">
            <span>fig. 01 — the gate, deciding</span>
            <span>npm run test:spec</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <GatePanel
              pr="PR #128 · add export endpoint"
              title="wrote the endpoint, skipped a test"
              rows={[["EX-API-001 validates payload", true], ["EX-API-002 rejects bad input", false], ["EX-UI-001 renders result", true]]}
              coverage="coverage 66.7% (2/3)"
              verdict="gate failed, deploy blocked"
              ok={false}
            />
            <GatePanel
              pr="PR #129 · add export endpoint"
              title="added the missing test, reran the gate"
              rows={[["EX-API-001 validates payload", true], ["EX-API-002 rejects bad input", true], ["EX-UI-001 renders result", true]]}
              coverage="coverage 100% (3/3)"
              verdict="gate green, deployed to cloudfront"
              ok={true}
            />
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={REPO} className="mono border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-bg)] transition-opacity hover:opacity-90">use the template</a>
          <a href="#loop" className="mono border border-[var(--color-stroke)] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-stroke)] hover:text-[var(--color-bg)]">how the loop works</a>
        </div>
        <div className="mono mt-6 flex flex-wrap items-center gap-2.5 text-[12px] text-[var(--color-faint)]">
          <span className="uppercase tracking-[0.14em]">pairs with</span>
          {["Claude Code", "Codex", "Cursor", "any agent"].map((t) => (
            <span key={t} className="border border-[color-mix(in_srgb,var(--color-stroke)_38%,transparent)] px-2.5 py-1 text-[var(--color-muted)]">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* The control loop */
function AgentLoop() {
  const steps: [string, string, string][] = [
    ["01", "Author", "Your coding agent writes code against the app's spec file, guided by the repo's CLAUDE.md conventions. It knows the structure, the stack, and the deploy gotchas before it writes a line."],
    ["02", "Prove", "The spec gate binds every requirement to a test and fails the build below 100 percent coverage. CodeQL, gitleaks, and npm audit scan in parallel. An agent cannot mark its own homework."],
    ["03", "Ship", "A green gate triggers an OIDC deploy and the smoke test verifies the live URL. Anything the agent could not prove never reaches production."],
  ];
  return (
    <section id="loop" className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-2)_50%,transparent)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mono mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">// the agent loop</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          platform turns an autonomous coding agent into a safe contributor: it writes, the template proves, then it deploys. The same gate applies to human and agent pull requests alike.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([n, t, body]) => (
            <div key={n} className="frame p-6">
              <Ticks />
              <div className="mono text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">step {n}</div>
              <h3 className="mt-3 text-xl font-bold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SVG node helpers */
function Box({ x, y, w, h, t, sub, dash }: { x: number; y: number; w: number; h: number; t: string; sub?: string; dash?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--color-panel)" stroke={S} strokeWidth={1.4} strokeDasharray={dash ? "6 4" : undefined} />
      <text x={x + 14} y={y + 26} className="mono" fill="var(--color-ink)" fontSize={14} fontWeight={700}>{t}</text>
      {sub ? <text x={x + 14} y={y + 45} className="mono" fill="var(--color-muted)" fontSize={11}>{sub}</text> : null}
    </g>
  );
}
function Tag({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={12} fill={A} stroke={BG} strokeWidth={1.5} />
      <text x={x} y={y + 4} textAnchor="middle" className="mono" fill={BG} fontSize={13} fontWeight={800}>{n}</text>
    </g>
  );
}

function Diagram() {
  return (
    <div className="overflow-x-auto pb-2">
      <svg viewBox="0 0 1000 470" className="block h-auto w-full min-w-[820px]" role="img" aria-label="Architecture: a coding agent commits to GitHub Actions, which deploys over OIDC to an AWS account running Lambda, S3, and CloudFront, backed by Neon Postgres, verified by a post-deploy smoke test.">
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={S} />
          </marker>
          <marker id="aha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={A} />
          </marker>
        </defs>

        <rect x={300} y={36} width={676} height={410} fill="none" stroke={S} strokeWidth={1.2} strokeDasharray="2 5" opacity={0.7} />
        <text x={316} y={60} className="mono" fill="var(--color-muted)" fontSize={12} letterSpacing="2">AWS ACCOUNT</text>

        <Box x={24} y={60} w={184} h={66} t="Claude Code · Codex" sub="authors to spec" />
        <line x1={116} y1={126} x2={116} y2={168} stroke={S} strokeWidth={1.4} markerEnd="url(#ah)" />
        <text x={126} y={150} className="mono" fill="var(--color-faint)" fontSize={10}>commits</text>

        <Box x={24} y={168} w={184} h={132} t="GitHub Actions" sub="ci · security · deploy" />
        <text x={36} y={232} className="mono" fill="var(--color-faint)" fontSize={11}>push to main</text>
        <text x={36} y={284} className="mono" fill="var(--color-accent)" fontSize={11}>gate: 100% or block</text>

        <line x1={208} y1={234} x2={324} y2={234} stroke={A} strokeWidth={1.6} markerEnd="url(#aha)" />
        <text x={266} y={224} textAnchor="middle" className="mono" fill="var(--color-accent)" fontSize={11}>OIDC · 1h creds</text>

        <Box x={330} y={80} w={186} h={58} t="cdk deploy" sub="synth + provision" />
        <line x1={372} y1={138} x2={372} y2={200} stroke={S} strokeWidth={1.2} strokeDasharray="5 4" markerEnd="url(#ah)" />
        <line x1={430} y1={138} x2={430} y2={320} stroke={S} strokeWidth={1.2} strokeDasharray="5 4" markerEnd="url(#ah)" />
        <text x={440} y={172} className="mono" fill="var(--color-faint)" fontSize={10}>provisions</text>

        <Box x={330} y={200} w={170} h={84} t="Lambda" sub="SSR / API" />
        <Box x={330} y={320} w={170} h={84} t="S3" sub="static assets" />
        <Box x={638} y={236} w={196} h={116} t="CloudFront" sub="CDN + TLS" />
        <Box x={760} y={80} w={196} h={64} t="Neon" sub="Postgres" />

        <line x1={500} y1={242} x2={638} y2={272} stroke={S} strokeWidth={1.5} markerEnd="url(#ah)" />
        <line x1={500} y1={360} x2={638} y2={320} stroke={S} strokeWidth={1.5} markerEnd="url(#ah)" />
        <line x1={500} y1={214} x2={760} y2={120} stroke={S} strokeWidth={1.3} markerEnd="url(#ah)" />
        <text x={612} y={150} className="mono" fill="var(--color-faint)" fontSize={10}>sql</text>

        <line x1={834} y1={294} x2={930} y2={294} stroke={S} strokeWidth={1.6} markerEnd="url(#ah)" />
        <text x={902} y={284} textAnchor="middle" className="mono" fill="var(--color-muted)" fontSize={11}>users</text>

        <line x1={736} y1={352} x2={736} y2={426} stroke={A} strokeWidth={1.3} strokeDasharray="3 4" markerEnd="url(#aha)" />
        <text x={748} y={418} className="mono" fill="var(--color-accent)" fontSize={11}>verify-deploy.sh · 9/9</text>

        <Tag x={30} y={174} n={1} />
        <Tag x={266} y={250} n={2} />
        <Tag x={336} y={86} n={3} />
        <Tag x={644} y={242} n={4} />
        <Tag x={730} y={420} n={5} />
      </svg>
    </div>
  );
}

/* What it deploys: the architecture, demoted to proof */
function Deploys() {
  const notes: [number, string, string][] = [
    [1, "Pipeline", "GitHub Actions runs ci, security, and deploy on every push to main. Three workflows, green from the first commit."],
    [2, "OIDC deploy", "The deploy job assumes a least-privilege role over OIDC with 1-hour credentials. No long-lived AWS keys ever live in the repo."],
    [3, "CDK construct", "One NextjsServerless call synthesizes and provisions Lambda, S3, and CloudFront via OpenNext, every deploy gotcha baked in."],
    [4, "Edge runtime", "CloudFront serves SSR from the Lambda origin and static assets from S3 over TLS, with the server timeout raised for long routes."],
    [5, "Smoke test", "After deploy, verify-deploy.sh probes the live URL. Nine checks; a non-zero exit blocks the release."],
  ];
  return (
    <section id="deploys" className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mono mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">// what it deploys</h2>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          Every app the agent ships lands on this architecture. It is the same blueprint on day one as on day one thousand.
        </p>
        <div className="frame bg-[color-mix(in_srgb,var(--color-bg-2)_55%,transparent)] p-4 sm:p-7">
          <Ticks />
          <div className="mono mb-4 flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)] pb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-faint)]">
            <span>fig. 02 — deploy architecture</span>
            <span>scale 1:1</span>
          </div>
          <Diagram />
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map(([n, t, body]) => (
            <div key={n} className="border-t border-[color-mix(in_srgb,var(--color-stroke)_30%,transparent)] pt-5">
              <div className="flex items-center gap-3">
                <span className="mono grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent)] text-[13px] font-extrabold text-[var(--color-bg)]">{n}</span>
                <h3 className="text-lg font-bold">{t}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Specifications sheet */
function Spec() {
  const rows: [string, string, string][] = [
    ["01", "Language", "TypeScript (strict)"],
    ["02", "Runtime", "Node 20+"],
    ["03", "Compute", "AWS Lambda (OpenNext SSR)"],
    ["04", "Delivery", "S3 + CloudFront CDN"],
    ["05", "Infra as code", "AWS CDK"],
    ["06", "Auth", "Auth.js v5 (JWT)"],
    ["07", "Database", "PostgreSQL (Neon)"],
    ["08", "CI/CD", "GitHub Actions + OIDC"],
    ["09", "Security", "CodeQL · gitleaks · npm audit"],
    ["10", "License", "MIT"],
  ];
  return (
    <section id="spec" className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-2)_50%,transparent)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mono mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">// specifications</h2>
        <div className="frame">
          <Ticks />
          <table className="mono w-full text-left text-sm">
            <tbody>
              {rows.map(([n, k, v], i) => (
                <tr key={n} className={i % 2 ? "bg-[color-mix(in_srgb,var(--color-stroke)_5%,transparent)]" : ""}>
                  <td className="w-12 border-r border-[color-mix(in_srgb,var(--color-stroke)_20%,transparent)] px-4 py-3 text-[var(--color-faint)]">{n}</td>
                  <td className="w-1/3 px-4 py-3 uppercase tracking-[0.08em] text-[var(--color-muted)]">{k}</td>
                  <td className="px-4 py-3 font-bold text-[var(--color-ink)]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* As-built references */
function Refs() {
  const apps = [
    { sheet: "REF-01", name: "CoverLens", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", href: "https://github.com/elleskay/insurance-dashboard" },
    { sheet: "REF-02", name: "Cancer Navigator", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", href: "https://github.com/elleskay/cancer-navigator" },
    { sheet: "REF-03", name: "Armoury", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", href: "https://github.com/elleskay/armoury" },
  ];
  return (
    <section id="refs" className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mono mb-10 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">// as-built, in production</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {apps.map((a) => (
            <a key={a.sheet} href={a.href} className="frame group block p-6 transition-colors hover:bg-[color-mix(in_srgb,var(--color-stroke)_6%,transparent)]">
              <Ticks />
              <div className="mono flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[var(--color-faint)]">
                <span>{a.sheet}</span>
                <span className="text-[var(--color-accent)]">built to spec</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
              <span className="mono mt-5 inline-block text-[12px] uppercase tracking-[0.12em] text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">open repo</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-b border-[color-mix(in_srgb,var(--color-stroke)_22%,transparent)]">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Mark className="mx-auto h-10 w-10" />
        <h2 className="mt-7 text-3xl font-extrabold tracking-tight sm:text-5xl">Point your agent at it.</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-[var(--color-muted)]">Clone the template and let your agent ship on day one, only what it can prove.</p>
        <div className="mono mx-auto mt-9 flex max-w-xl items-center gap-3 border border-[var(--color-stroke)] bg-[var(--color-bg-2)] px-5 py-4 text-left text-sm">
          <span className="text-[var(--color-accent)]">$</span>
          <span className="truncate">git clone github.com/elleskay/platform</span>
          <a href={REPO} className="mono ml-auto shrink-0 border border-[var(--color-accent)] bg-[var(--color-accent)] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-bg)]">open</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const block: [string, string][] = [
    ["drawn by", "elleskay"],
    ["project", "platform"],
    ["scale", "1:1"],
    ["rev", "1.0"],
    ["license", "MIT"],
  ];
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="frame">
          <Ticks />
          <dl className="mono grid grid-cols-2 divide-x divide-y divide-[color-mix(in_srgb,var(--color-stroke)_18%,transparent)] sm:grid-cols-5 sm:divide-y-0">
            {block.map(([k, v]) => (
              <div key={k} className="px-4 py-4">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-faint)]">{k}</dt>
                <dd className="mt-1 text-sm font-bold text-[var(--color-ink)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mono mt-5 flex items-center justify-between text-[12px] text-[var(--color-faint)]">
          <span>platform, an open-source template.</span>
          <a href={REPO} className="hover:text-[var(--color-accent)]">github</a>
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
      <AgentLoop />
      <Deploys />
      <Spec />
      <Refs />
      <CTA />
      <Footer />
    </main>
  );
}
