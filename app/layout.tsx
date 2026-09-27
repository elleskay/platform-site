import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Inter as a variable font, so the in-between weights (510, 590) render true.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// metadataBase is the ORIGIN only; Next already prefixes the basePath
// (/platform-site) onto the file-based image routes, so including it here
// too would double it.
const ORIGIN = "https://elleskay.github.io";
const SITE = `${ORIGIN}/platform-site`;
const DESC =
  "Open-source Next.js and Expo templates on AWS, built for AI coding agents. Point your agent at a repo, describe an idea, and it builds the app, sets up your cloud once, and ships it to a live AWS URL, with no stored AWS keys.";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: "platform, ship production-grade apps fast with AI coding agents",
  description: DESC,
  robots: { index: false, follow: false },
  openGraph: {
    title: "platform, ship production-grade apps, fast",
    description: DESC,
    url: SITE,
    siteName: "platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "platform, ship production-grade apps, fast",
    description: DESC,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the pre-paint script below may remove the
    // theme-dark class before React hydrates, which is an expected mismatch.
    <html lang="en" className={`${sans.variable} ${mono.variable} theme-dark`} suppressHydrationWarning>
      <body>
        {/* Apply the saved theme before paint. Dark is the default (class in the markup). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.remove('theme-dark')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
