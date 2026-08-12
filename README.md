# Khush Kapoor — Photography Portfolio

A cinematic photography portfolio for Khush Kapoor built with React, Vite, Framer Motion, and Tailwind CSS.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (port 3000)
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run check      # verify every image reference resolves (run before deploy)
npm run generate   # rebuild data + web-optimized images from portfolio khush/
```

## Asset pipeline

- Raw work lives in `portfolio khush/<album>/` (gitignored, never deployed) — **each folder is a portfolio album**: `animal`, `celeb`, `clubs`, `food`, `jewellery`, `model`, `real estate`, `street`
- New albums are auto-discovered; drop a folder in and run `npm run generate` (add matching metadata in `generate_data.cjs` → `ALBUM_META` for curated titles)
- `npm run generate` produces web-optimized copies (max 1920px, q78) in `public/assets/images/web/` and regenerates `src/data/portfolioData.js` + `all_images_manifest.json` from the files actually on disk
- Non-photographs are excluded automatically: `Screenshot_*`, `file_*`, `ChatGPT Image*` (AI/screenshots), and frames under 900px
- `IMG_8689.jpg` is kept as the site portrait — an identity asset refreshed from `assets-original-images/` on every generate run
- `npm run check` fails the build if any image reference is broken — do not deploy with a red check
- `generate_data.cjs` requires macOS (`sips`); CI runs `check` + `build` only