"use client";

import { useState } from "react";

const VARIANTS = {
  web: { repo: "github.com/elleskay/platform", task: "build a customer feedback portal" },
  mobile: { repo: "github.com/elleskay/mobile-platform", task: "build a scam-reporting app with call screening" },
} as const;

export default function HeroCommand() {
  const [tab, setTab] = useState<"web" | "mobile">("web");
  const c = VARIANTS[tab];
  const tabCls = (on: boolean) =>
    on
      ? "rounded-md bg-[var(--color-accent)] px-3 py-1 text-[#0a0b16]"
      : "rounded-md px-3 py-1 text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold">
        <button type="button" onClick={() => setTab("web")} className={tabCls(tab === "web")}>Web</button>
        <button type="button" onClick={() => setTab("mobile")} className={tabCls(tab === "mobile")}>Mobile</button>
      </div>
      <div className="card overflow-hidden text-left shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mono ml-2 text-[12px] text-[var(--color-faint)]">claude code</span>
        </div>
        <div className="mono flex items-center gap-2 px-5 py-4 text-[13px] leading-relaxed">
          <span className="text-[var(--color-accent)]">›</span>
          <span className="truncate text-[var(--color-ink)]">
            use <span className="text-[var(--color-accent)]">{c.repo}</span> to {c.task}
          </span>
          <span className="caret inline-block h-3.5 w-[7px] shrink-0 bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  );
}
