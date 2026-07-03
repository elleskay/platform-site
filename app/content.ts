import type { StaticImageData } from "next/image";
import coverShot from "./shots/coverlens.png";
import irasShot from "./shots/iras.png";
import driveShot from "./shots/drivebuddy.png";

/* The showcase content, shared by the gallery island (list and filter)
   and the server-rendered hero (live-app count), so the two never drift. */

export const CATEGORIES = ["All", "Tax", "Insurance", "Mobility"] as const;
export type Category = (typeof CATEGORIES)[number];

export type ShowcaseApp = {
  name: string;
  cat: Exclude<Category, "All">;
  tag: string;
  color: string;
  note: string;
  live: string;
  repo: string;
  shot: StaticImageData;
};

export const APPS: ShowcaseApp[] = [
  { name: "AI Tax Assistant Platform", cat: "Tax", tag: "AI · Tax", color: "#0ea5e9", note: "A multi-tenant AI tax assistant platform for tax officers: each department gets its own workspace with a document-grounded assistant (RAG with clickable inline citations) and a visible step trace. One observed gateway routes every call across six OpenAI and Anthropic models by deterministic rules, logging latency, tokens, and cost, with cross-provider fallback. Officers compose their own lookup, template, and calculator tools (code runs in a QuickJS WASM sandbox), prompt versions activate only past an LLM-judge eval gate, and governance-as-code enforces PII redaction, a per-call cost ceiling, and a full audit trail.", live: "https://ai-tax.soonkeong.dev", repo: "https://github.com/elleskay/ai-tax-assistant-platform", shot: irasShot },
  { name: "DriveBuddy", cat: "Mobility", tag: "AI · Mobility", color: "#818cf8", note: "AI driving companion for Singapore: an Expo app on a serverless NestJS API (Lambda + Neon Postgres). Surfaces live ERP, traffic, weather, and parking, tracks drives with background GPS and in-drive voice alerts for gantries and incidents ahead, itemizes fuel and ERP costs after every trip, and takes voice or text questions through a Claude assistant grounded in your vehicles and driving history.", live: "https://elleskay.github.io/drivebuddy/", repo: "https://github.com/elleskay/drivebuddy", shot: driveShot },
  { name: "CoverLens", cat: "Insurance", tag: "AI · Insurance", color: "var(--color-accent)", note: "AI insurance policy checker for Singapore. Drop in a policy PDF (read in your browser, never stored) and get a plain-language summary, a coverage breakdown, and a curated fine-print checklist. A LangGraph draft-verify-finalize loop grounds the model: deterministic code checks every quote against the document and re-drafts what fails, so nothing unquotable is shown.", live: "https://coverlens.soonkeong.dev", repo: "https://github.com/elleskay/insurance-dashboard", shot: coverShot },
];
