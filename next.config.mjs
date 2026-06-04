/** @type {import('next').NextConfig} */
// Static export for GitHub Pages. The site is served from the repo subpath
// https://elleskay.github.io/platform-site, so basePath must match in CI.
// Set PAGES_BASE="" for a root-served local preview.
const basePath = process.env.PAGES_BASE ?? "/platform-site";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
