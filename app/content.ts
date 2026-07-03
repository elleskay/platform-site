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
  { name: "AI Tax Assistant Platform", cat: "Tax", tag: "AI · Tax", color: "#0ea5e9", note: "A multi-tenant AI tax assistant platform for tax officers: each department gets a document-grounded assistant (RAG with inline citations) and a visible step trace. Cost-aware model routing across OpenAI and Anthropic through one observed gateway, a sandboxed code runtime, versioned prompts, an LLM-judge eval harness, and governance-as-code: PII handling, an eval gate, a cost ceiling, and a full audit trail.", live: "https://ai-tax.soonkeong.dev", repo: "https://github.com/elleskay/ai-tax-assistant-platform", shot: irasShot },
  { name: "DriveBuddy", cat: "Mobility", tag: "AI · Mobility", color: "#818cf8", note: "AI driving companion for Singapore: live ERP, traffic, weather and parking, drive tracking with in-drive voice alerts, post-trip cost breakdowns, and an AI assistant.", live: "https://elleskay.github.io/drivebuddy/", repo: "https://github.com/elleskay/drivebuddy", shot: driveShot },
  { name: "CoverLens", cat: "Insurance", tag: "AI · Insurance", color: "var(--color-accent)", note: "AI insurance policy checker. Grounded LangGraph extraction, every finding quote-backed.", live: "https://coverlens.soonkeong.dev", repo: "https://github.com/elleskay/insurance-dashboard", shot: coverShot },
];
