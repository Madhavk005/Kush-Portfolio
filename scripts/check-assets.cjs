/*
 * scripts/check-assets.cjs — BUILD-TIME ASSET GUARD
 *
 * Verifies every /assets/ reference in the app resolves to a real file
 * in public/. Fails (exit 1) if anything is broken so the build pipeline
 * catches regressions instead of shipping broken images.
 *
 * Usage: npm run check
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const filesToScan = [
  path.join(ROOT, 'index.html'),
  ...fs
    .readdirSync(path.join(ROOT, 'src'), { recursive: true })
    .filter((f) => /\.(jsx?|tsx?)$/.test(f))
    .map((f) => path.join(ROOT, 'src', f)),
];

const refs = new Map(); // path -> [files]
const addRef = (file, p) => {
  if (!refs.has(p)) refs.set(p, []);
  refs.get(p).push(file);
};

for (const file of filesToScan) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/"(\/assets\/[^" ]+)"/g)) addRef(file, match[1]);
}

const broken = [...refs.entries()].filter(([p]) => !fs.existsSync(path.join(PUBLIC, p)));

let ok = true;

if (broken.length) {
  ok = false;
  console.error(`[check] BROKEN asset references: ${broken.length}`);
  for (const [p, files] of broken) {
    console.error(`  ✗ ${p}  (referenced by ${[...new Set(files)].map((f) => path.relative(ROOT, f)).join(', ')})`);
  }
} else {
  console.log(`[check] ${refs.size} asset references — all resolve ✓`);
}

/* Every generated web image must be referenced at least once. */
const webDir = path.join(PUBLIC, 'assets', 'images', 'web');
if (fs.existsSync(webDir)) {
  const webFiles = fs.readdirSync(webDir);
  const unreferenced = webFiles.filter((f) => !refs.has(`/assets/images/web/${f}`));
  if (unreferenced.length) {
    ok = false;
    console.error(`[check] ${unreferenced.length} web images are not referenced anywhere:`);
    for (const f of unreferenced.slice(0, 10)) console.error(`  ✗ /assets/images/web/${f}`);
  } else {
    console.log(`[check] all ${webFiles.length} web images are referenced ✓`);
  }
}

if (!ok) {
  console.error('\n[check] FAILED — fix the issues above (run `npm run generate` to rebuild data).');
  process.exit(1);
}
console.log('[check] PASS ✓');
