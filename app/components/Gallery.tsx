"use client";

import { useState } from "react";
import Image from "next/image";
import coverShot from "../shots/coverlens.png";
import irasShot from "../shots/iras.png";
import cancerShot from "../shots/cancer.png";
import scamShot from "../shots/scamshield.png";
import armouryShot from "../shots/armoury.png";
import driveShot from "../shots/drivebuddy.png";

const APPS = [
  { name: "CoverLens", cat: "Insurance", tag: "AI · Insurance", color: "var(--color-accent)", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", live: "https://d33z7oya883ugt.cloudfront.net", repo: "https://github.com/elleskay/insurance-dashboard", shot: coverShot },
  { name: "IRAS Tax Assistant", cat: "GovTech", tag: "AI · Tax", color: "#38bdf8", note: "Conversational Singapore tax help: GST, income, corporate, and SRS, with multi-model routing and human escalation.", live: "https://d1yl1box414d2i.cloudfront.net", repo: "https://github.com/elleskay/iras-tax-assistant", shot: irasShot },
  { name: "Cancer Navigator", cat: "Healthcare", tag: "Healthcare", color: "var(--color-violet)", note: "A roadmap for newly diagnosed cancer patients in Singapore, with subsidy coverage.", live: "https://d1z96o21m62u9i.cloudfront.net", repo: "https://github.com/elleskay/cancer-navigator", shot: cancerShot },
  { name: "ScamShield", cat: "GovTech", tag: "GovTech · Safety", color: "var(--color-ok)", note: "Check a message, number, or email for an instant verdict, report scams, and watch a reviewer verify them.", live: "https://elleskay.github.io/scamshield/", repo: "https://github.com/elleskay/scamshield", shot: scamShot },
  { name: "Armoury", cat: "GovTech", tag: "GovTech", color: "#fbbf24", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard.", live: "https://d6a3alh51t58d.cloudfront.net", repo: "https://github.com/elleskay/armoury", shot: armouryShot },
  { name: "DriveBuddy", cat: "Mobility", tag: "Mobility", color: "#818cf8", note: "AI driving companion for Singapore: live trip tracking, cost breakdowns, real-time ERP and traffic, and a voice assistant.", live: "https://elleskay.github.io/drivebuddy/", repo: "https://github.com/elleskay/drivebuddy", shot: driveShot },
];

const CATS = ["All", "GovTech", "Healthcare", "Insurance", "Mobility"];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const apps = cat === "All" ? APPS : APPS.filter((a) => a.cat === cat);

  return (
    <section id="apps" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Don&apos;t take our word for it.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Real apps I have shipped, real auth, real data, live on AWS right now. Open any of them.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={
                c === cat
                  ? "rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-sm font-medium text-[#0a0b16]"
                  : "rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
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
              <a href={a.live} className="relative block aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
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
