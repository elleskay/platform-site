const VARIANTS = [
  { label: "Web", color: "var(--color-accent)", repo: "github.com/elleskay/platform", task: "build a customer feedback portal" },
  { label: "Mobile", color: "var(--color-violet)", repo: "github.com/elleskay/mobile-platform", task: "build a scam-reporting app with call screening" },
];

export default function HeroCommand() {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      {VARIANTS.map((v) => (
        <div key={v.label} className="card overflow-hidden text-left shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">claude code</span>
            <span className="mono ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: v.color, background: "rgba(255,255,255,0.05)" }}>
              {v.label}
            </span>
          </div>
          <div className="mono flex gap-2 px-5 py-4 text-[13px] leading-relaxed">
            <span className="text-[var(--color-accent)]">›</span>
            <span className="text-[var(--color-ink)]">
              use <span style={{ color: v.color }}>{v.repo}</span> to {v.task}
              <span className="caret ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-[var(--color-accent)]" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
