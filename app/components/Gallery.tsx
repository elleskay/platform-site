"use client";

import { useState } from "react";
import Image from "next/image";
import { APPS, CATEGORIES, type Category } from "../content";

export default function Gallery() {
  const [cat, setCat] = useState<Category>("All");
  const apps = cat === "All" ? APPS : APPS.filter((a) => a.cat === cat);

  return (
    <section id="apps" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Real apps. Shipped.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Every one is live, on real auth and real data. Open any of them.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={
                c === cat
                  ? "rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-on-accent)]"
                  : "rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {c}
            </button>
          ))}
          <span className="mono text-xs text-[var(--color-faint)]">Showing {apps.length} of {APPS.length}</span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((a) => (
            <div key={a.name} className="card card-hover flex flex-col overflow-hidden">
              <a href={a.live} className="relative block aspect-[16/7] overflow-hidden border-b border-[var(--color-border)]">
                <Image src={a.shot} alt={`${a.name} screenshot`} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover object-top" placeholder="blur" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ok)]" /> Live
                </span>
              </a>
              <div className="flex flex-1 flex-col p-5 text-center">
                <div className="mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: a.color }}>{a.tag}</div>
                <h3 className="mt-2 font-semibold">{a.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{a.note}</p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <a href={a.live} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-strong)]">Demo</a>
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
