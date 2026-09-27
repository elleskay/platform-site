"use client";

import { useState } from "react";
import Image from "next/image";
import { APPS, CATEGORIES, type Category, type ShowcaseApp } from "../content";
import SectionHead from "./SectionHead";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Live
    </span>
  );
}

/* Desktop screenshot in a browser window, address bar showing the live host */
function BrowserFrame({ app }: { app: ShowcaseApp }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-panel-2 shadow-high">
      <div className="flex h-9 items-center gap-3 border-b border-line px-3.5">
        <div className="flex w-14 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
        </div>
        <div className="mx-auto flex h-6 min-w-0 max-w-[62%] flex-1 items-center justify-center gap-1.5 rounded-md bg-surface px-3 text-[12px] text-muted">
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          <span className="truncate">{host(app.live)}</span>
        </div>
        <div className="flex w-14 justify-end"><LiveBadge /></div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={app.shot} alt={`${app.name} screenshot`} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]" placeholder="blur" />
      </div>
    </div>
  );
}

/* Mobile screenshot in a phone rising from the bottom of a 16:10 stage, so it
   sits level with the browser frames */
function PhoneFrame({ app }: { app: ShowcaseApp }) {
  // The status bar takes the tone of the app's top edge.
  const bar = app.screen === "dark" ? { bg: "#0a0b0d", ink: "#f5f5f5" } : { bg: "#f5f6fa", ink: "#111111" };
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border-strong bg-panel-2 shadow-high">
      <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(70% 90% at 50% 100%, color-mix(in srgb, ${app.color} 26%, transparent), transparent 70%)` }} />
      <div className="absolute right-3.5 top-2.5"><LiveBadge /></div>
      <div className="absolute left-1/2 top-[9%] w-[42%] -translate-x-1/2 rounded-t-[30px] bg-[#1c1d20] p-[6px] pb-0 shadow-high ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
        <div className="overflow-hidden rounded-t-[24px]" style={{ background: bar.bg }}>
          <div className="flex h-6 items-center justify-between px-5 text-[10px] font-semibold" style={{ color: bar.ink }}>
            <span>9:41</span>
            <span className="h-3.5 w-14 rounded-full bg-black" />
            <svg viewBox="0 0 24 12" className="h-2.5 w-5" fill="currentColor"><rect x="0" y="1" width="20" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" /><rect x="2" y="3" width="14" height="6" rx="1.2" /><rect x="21" y="4" width="2" height="4" rx="1" /></svg>
          </div>
          <Image src={app.shot} alt={`${app.name} screenshot`} sizes="320px" className="block h-auto w-full" placeholder="blur" />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState<Category>("All");
  const apps = cat === "All" ? APPS : APPS.filter((a) => a.cat === cat);

  return (
    <section id="apps" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-36">
        <div data-reveal="0">
          <SectionHead
            title={<>Real apps,<br />already live</>}
            intro="Every one was built on the templates and runs on real auth and real data. Open any of them."
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full border border-line bg-panel p-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={c === cat}
                className={
                  c === cat
                    ? "h-7 rounded-full bg-surface-strong px-3 text-[13px] font-medium text-ink"
                    : "h-7 rounded-full px-3 text-[13px] text-muted transition-colors hover:text-ink"
                }
              >
                {c}
              </button>
            ))}
          </div>
          <span className="caption">Showing {apps.length} of {APPS.length}</span>
        </div>

        <div className="mt-8 border-t border-line">
          {apps.map((a) => (
            <article key={a.name} data-reveal="0" className="group grid items-center gap-8 border-b border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:py-14">
              <div>
                <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] font-medium text-ink-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: a.color }} /> {a.tag}
                </span>
                <h3 className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em]">{a.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.note}</p>
                <div className="mt-6 flex items-center gap-4">
                  <a href={a.live} className="btn btn-invert h-9 px-4 text-[13px]">Open demo</a>
                  <a href={a.repo} className="text-[13px] text-muted transition-colors hover:text-ink">
                    Repo <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
              <a href={a.live} aria-label={`Open the ${a.name} demo`} className="block">
                {a.device === "phone" ? <PhoneFrame app={a} /> : <BrowserFrame app={a} />}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
