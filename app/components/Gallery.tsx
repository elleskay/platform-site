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
  { name: "IRAS Tax Assistant", cat: "Tax", tag: "AI · Tax", color: "#0ea5e9", note: "A multi-step Singapore tax agent (GST, income, corporate, SRS) that chains real MCP tools with a visible step trace. Cost-aware model routing across OpenAI and Anthropic through an observed gateway, a sandboxed code runtime, versioned prompts, an LLM-judge eval harness, and escalation to a human advisor. Not affiliated with IRAS.", live: "https://d1yl1box414d2i.cloudfront.net", repo: "https://github.com/elleskay/iras-tax-assistant", shot: irasShot },
  { name: "DriveBuddy", cat: "Mobility", tag: "AI · Mobility", color: "#818cf8", note: "AI driving companion for Singapore: live ERP, traffic, weather and parking, drive tracking with in-drive voice alerts, post-trip cost breakdowns, and an AI assistant.", live: "https://elleskay.github.io/drivebuddy/", repo: "https://github.com/elleskay/drivebuddy", shot: driveShot },
  { name: "CoverLens", cat: "Insurance", tag: "AI · Insurance", color: "var(--color-accent)", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", live: "https://d33z7oya883ugt.cloudfront.net", repo: "https://github.com/elleskay/insurance-dashboard", shot: coverShot },
  { name: "Cancer Navigator", cat: "Healthcare", tag: "Healthcare", color: "var(--color-violet)", note: "Plain-language roadmaps by cancer type for newly diagnosed patients in Singapore, with instant Cancer Drug List coverage lookup.", live: "https://d1z96o21m62u9i.cloudfront.net", repo: "https://github.com/elleskay/cancer-navigator", shot: cancerShot },
  { name: "ScamShield (Unofficial)", cat: "OGP Reconstruction", tag: "OGP Reconstruction", color: "var(--color-ok)", note: "Check a message, number, or email for an instant verdict, report scams, and watch a reviewer verify them. Rebuilt from OGP's public product updates to understand how they approach the problem. Not affiliated with OGP.", live: "https://elleskay.github.io/scamshield/", repo: "https://github.com/elleskay/scamshield", shot: scamShot },
  { name: "Armoury (Unofficial)", cat: "OGP Reconstruction", tag: "OGP Reconstruction", color: "#d97706", note: "Digital equipment checklists for frontline agencies, with an HQ readiness dashboard. Rebuilt from OGP's public product updates to understand how they approach the problem. Not affiliated with OGP.", live: "https://d6a3alh51t58d.cloudfront.net", repo: "https://github.com/elleskay/armoury", shot: armouryShot },
];

const CATS = ["All", "Tax", "Healthcare", "Insurance", "Mobility", "OGP Reconstruction"];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const apps = cat === "All" ? APPS : APPS.filter((a) => a.cat === cat);

  return (
    <section id="apps" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Real apps. Shipped.</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">Every one is live, on real auth and real data. Open any of them.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATS.map((c) => (
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
