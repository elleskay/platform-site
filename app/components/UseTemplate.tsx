"use client";

import { useEffect, useRef, useState } from "react";

const WEB_REPO = "https://github.com/elleskay/platform";
const MOBILE_REPO = "https://github.com/elleskay/mobile-platform";

export default function UseTemplate({
  variant = "nav",
  label = "Use template",
}: {
  variant?: "nav" | "hero";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const trigger =
    variant === "hero"
      ? "rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]"
      : "rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#0a0b16] transition-colors hover:bg-[var(--color-accent-strong)]";

  const menuPos = variant === "hero" ? "left-1/2 -translate-x-1/2" : "right-0";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 ${trigger}`}
      >
        {label}
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <div role="menu" className={`absolute z-50 mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-[var(--color-bg-2)] p-1.5 shadow-2xl shadow-black/50 ${menuPos}`}>
          <a role="menuitem" href={WEB_REPO} className="block rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]">
            <div className="text-sm font-semibold text-[var(--color-ink)]">Web, platform</div>
            <div className="mt-0.5 text-xs text-[var(--color-muted)]">Next.js apps on AWS serverless</div>
          </a>
          <a role="menuitem" href={MOBILE_REPO} className="block rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]">
            <div className="text-sm font-semibold text-[var(--color-ink)]">Mobile, mobile-platform</div>
            <div className="mt-0.5 text-xs text-[var(--color-muted)]">Expo and NestJS on AWS</div>
          </a>
        </div>
      ) : null}
    </div>
  );
}
