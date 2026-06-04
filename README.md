# platform-site

The marketing landing page for the [**platform**](https://github.com/elleskay/platform) template, a reusable TypeScript monorepo for shipping Next.js apps to AWS serverless.

**Live:** https://elleskay.github.io/platform-site

Built with Next.js (static export) and Tailwind CSS v4, deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
PAGES_BASE="" npm run dev     # root-served local preview
PAGES_BASE="" npm run build   # static export to out/ (root paths)
```

In CI the build uses `basePath: /platform-site` to match the Pages subpath. Set `PAGES_BASE=""` locally to serve from the root.

## License

MIT.
