import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "platform, ship Next.js apps to AWS serverless on day one",
  description:
    "A reusable TypeScript monorepo template for shipping Next.js apps to AWS serverless. CI/CD, infrastructure as code via AWS CDK, security scanning, OIDC deploys with no stored keys, and a spec-driven test gate, all wired the day you clone it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
