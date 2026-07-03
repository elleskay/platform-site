/** @type {import('next').NextConfig} */
// Static export for GitHub Pages. In production the site is served from the
// repo subpath https://elleskay.github.io/platform-site, so the deploy
// workflow sets PAGES_BASE=/platform-site. Local dev and preview default to
// the root, no env var needed.
const basePath = process.env.PAGES_BASE ?? "";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
