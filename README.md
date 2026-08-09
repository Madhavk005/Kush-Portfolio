# Khush Kapoor — Photography Portfolio

A high-fashion, cinematic photography portfolio for Khush Kapoor built with React, Vite, Framer Motion, and Tailwind CSS.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (port 3000)
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run check      # verify every image reference resolves (run before deploy)
npm run generate   # rebuild portfolio data + web-optimized images from assets-original-images/
```

## Asset pipeline

- Raw camera originals live in `assets-original-images/` (gitignored, never deployed)
- `npm run generate` produces web-optimized copies (max 2000px) in `public/assets/images/web/` and regenerates `src/data/portfolioData.js` from the files actually on disk
- `npm run check` fails the build if any image reference is broken — do not deploy with a red check
- `generate_data.cjs` requires macOS (`sips`); CI runs `check` + `build` only