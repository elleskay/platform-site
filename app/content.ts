import type { StaticImageData } from "next/image";
import irasShot from "./shots/iras.webp";
import driveShot from "./shots/drivebuddy.webp";

/* The showcase content, shared by the gallery island (list and filter)
   and the server-rendered hero (live-app count), so the two never drift. */

export const CATEGORIES = ["All", "Tax", "Mobility"] as const;
export type Category = (typeof CATEGORIES)[number];

export type ShowcaseApp = {
  name: string;
  cat: Exclude<Category, "All">;
  tag: string;
  color: string;
  // One sentence; the screenshot and demo carry the rest.
  note: string;
  stack: string[];
  live: string;
  repo: string;
  shot: StaticImageData;
  // How the screenshot is framed: a desktop browser window or a phone.
  device: "browser" | "phone";
  // Phone frames only: whether the app's top edge is light or dark, so the
  // status bar matches it. Defaults to light.
  screen?: "light" | "dark";
};

export const APPS: ShowcaseApp[] = [
  { name: "AI Tax Assistant Platform", cat: "Tax", tag: "AI · Tax", color: "#0ea5e9", note: "A governed AI assistant for tax officers: answers cited from each department's own documents, every model call routed and costed, and a full audit trail.", stack: ["RAG", "Model gateway", "Eval gate", "PII redaction"], live: "https://ai-tax.soonkeong.dev", repo: "https://github.com/elleskay/ai-tax-assistant-platform", shot: irasShot, device: "browser" },
  { name: "DriveBuddy", cat: "Mobility", tag: "AI · Mobility", color: "#c6f135", note: "An AI driving companion for Singapore: live ERP and traffic alerts, trip costs, and a Claude co-pilot you can talk to.", stack: ["Expo", "NestJS on Lambda", "Neon Postgres"], live: "https://elleskay.github.io/drivebuddy/", repo: "https://github.com/elleskay/drivebuddy", shot: driveShot, device: "phone", screen: "dark" },
];
