/*
 * generate_data.cjs — CANONICAL DATA GENERATOR
 *
 * Rebuilds src/data/portfolioData.js from the ACTUAL work on disk.
 *
 * Steps:
 *   1. Scans `portfolio khush/<album>/` — every album folder is a project.
 *   2. Excludes non-photography: app/AI screenshots (Screenshot_*, file_*),
 *      AI-generated PNGs (ChatGPT Image*), and any file whose longest side
 *      is < 900px (thumbnails/logos).
 *   3. Generates web-optimized JPEG copies into public/assets/images/web
 *      via macOS `sips` (max 2000px, q80) — raw originals stay untouched.
 *   4. Stale web copies (no longer in the source set) are deleted.
 *   5. Maps curated service/instagram data to verified files only.
 *   6. Writes src/data/portfolioData.js and src/data/all_images_manifest.json.
 *
 * Albums with fewer than 3 gallery frames are auto-hidden (`visible: false`)
 * so the showcase never presents an empty-looking card.
 *
 * Usage: node generate_data.cjs
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ALBUMS_DIR = path.join(__dirname, 'portfolio khush');
const ALL_DIR = path.join(__dirname, 'assets-original-images');
const WEB_DIR = path.join(__dirname, 'public', 'assets', 'images', 'web');
const MANIFEST_PATH = path.join(__dirname, 'src', 'data', 'all_images_manifest.json');
const DATA_PATH = path.join(__dirname, 'src', 'data', 'portfolioData.js');

const MAX_DIM = 1920;
const QUALITY = 78;
const MIN_SIDE = 900;

/* Identity assets — not part of any album, but kept in web/ and refreshed
 * from assets-original-images on every run so the generator never prunes them. */
const IDENTITY_ASSETS = ['IMG_8689.jpg'];

/* ---------------------------------------------------------------- */
/* Album metadata — one project per folder                           */
/* ---------------------------------------------------------------- */
const ALBUM_META = {
  animal: {
    title: 'CREATURES OF THE FRAME',
    category: 'ANIMALS',
    subCategories: ['ANIMALS', 'LIFESTYLE'],
    client: 'Personal Series',
    tagline: 'Straight-shooting animal portraits — wild presence, honest light and quiet patience.',
    description: 'A collection of animal studies shot with available light and restraint. Every frame leans on stillness, texture and the unguarded moment between animal and lens.',
    quote: 'An animal gives you one honest glance — that is the frame.',
  },
  celeb: {
    title: 'IN THE PRESENCE OF STARS',
    category: 'CELEBRITY',
    subCategories: ['CELEBRITY', 'PORTRAITS'],
    client: 'Celebrity & Media Coverage',
    tagline: 'Red-carpet and backstage portraits of public figures, made intimate.',
    description: 'Coverage built on composure — controlled backgrounds, flattering single-source light and enough distance to let public figures feel like people.',
    quote: 'Celebrity portraiture is trust, shot at one-sixtieth of a second.',
  },
  clubs: {
    title: 'CLUBS & NIGHT ENERGY',
    category: 'CLUBS & NIGHTLIFE',
    subCategories: ['CLUBS & NIGHTLIFE', 'EVENTS'],
    client: 'Nightlife & Event Coverage',
    tagline: 'Low light, loud colour and motion blur that still holds a face sharp.',
    description: 'Nightlife documentation shot handheld under strobes and LED wash — the energy of the floor preserved without killing the mood with flash.',
    quote: 'A club floor rewards the photographer who becomes part of it.',
  },
  food: {
    title: 'FLAVOUR STUDIES',
    category: 'FOOD & DRINK',
    subCategories: ['FOOD & DRINK', 'PRODUCTS'],
    client: 'Food & Hospitality',
    tagline: 'Texture-first food photography built for menus and social feeds.',
    description: 'Editorial food frames that make steam, crust and garnish the heroes — styled to appetite, lit to sell.',
    quote: 'Good food photography should make a screen taste like a kitchen.',
  },
  jewellery: {
    title: 'JEWELS OF RAJASTHAN',
    category: 'JEWELLERY',
    subCategories: ['JEWELLERY', 'PRODUCTS', 'BRANDS'],
    client: 'Jewellery Brand',
    tagline: 'Macro detail, controlled speculars and stone-first storytelling.',
    description: 'High-detail jewellery work where every reflection is intentional and every facet gets its own light. Built for catalogs, campaigns and e-commerce.',
    quote: 'Luxury product photography requires extreme discipline — every reflection must be intentional.',
  },
  model: {
    title: 'THE ART OF THE POSE',
    category: 'MODELS & FASHION',
    subCategories: ['MODELS & FASHION', 'PORTRAITS', 'FASHION'],
    client: 'Editorial Sessions',
    tagline: 'Direction, silhouette and garment movement in one continuous take.',
    description: 'Fashion session frames balancing model direction, key-light contours and editorial polish — the bridge between portrait intimacy and campaign imagery.',
    quote: 'Posing is a dialogue — the camera is the third person in the room.',
  },
  'real estate': {
    title: 'SPACES & ARCHITECTURE',
    category: 'REAL ESTATE',
    subCategories: ['REAL ESTATE', 'BRANDS'],
    client: 'Real Estate & Property',
    tagline: 'Wide, luminous interior frames that sell the space, not just the square feet.',
    description: 'Architectural and interior photography that respects geometry and daylight — clean verticals, generous depth and a sense of open, livable air.',
    quote: 'A room is a portrait of the people who will live in it.',
  },
  street: {
    title: 'STREET CHRONICLES',
    category: 'STREET',
    subCategories: ['STREET', 'LIFESTYLE'],
    client: 'Personal Series',
    tagline: 'Unfiltered city life, caught in open shade and honest light.',
    description: 'Candid street documentation across old-city corridors and market squares — high contrast sunlight, passing strangers and the geometry of everyday Jaipur.',
    quote: 'The street rewards those who wait quietly in the shadows.',
  },
};

const ALBUM_ORDER = ['animal', 'celeb', 'clubs', 'food', 'jewellery', 'model', 'real estate', 'street'];

function fallbackMeta(folder) {
  const label = folder
    .split(/[\s\-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const category = label.toUpperCase();
  return {
    title: `${label} — COLLECTION`,
    category,
    subCategories: [category, 'PORTFOLIO'],
    client: 'Portfolio Work',
    tagline: `Frames from the ${label.toLowerCase()} collection — shot in Jaipur, India.`,
    description: `A selected set of ${label.toLowerCase()} photographs, chosen for light, composition and the moment that made the frame necessary.`,
    quote: 'Every collection starts with one honest frame.',
  };
}

/* Non-photograph files — stay on disk, never published. */
const EXCLUDED_BY_NAME = /^(Screenshot_|file_|ChatGPT\s*Image)/i;

function sanitize(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/~2/g, '');
}

const slug = (folder) => folder.replace(/\s+/g, '-').toLowerCase();
const webName = (folder, name) => `${slug(folder)}-${sanitize(path.parse(name).name)}.jpg`;
const relWeb = (folder, name) => `/assets/images/web/${webName(folder, name)}`;

function dims(file) {
  const meta = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
  return {
    w: parseInt(/pixelWidth: (\d+)/.exec(meta)[1], 10),
    h: parseInt(/pixelHeight: (\d+)/.exec(meta)[1], 10),
  };
}

/* ---------------------------------------------------------------- */
/* 1. Scan disk — every album folder becomes a project               */
/* ---------------------------------------------------------------- */
/* Auto-discover albums: any folder inside ALBUMS_DIR with photographs.
 * ALBUM_ORDER keeps the curated sort order; unknown folders get
 * fallback metadata so the pipeline never silently drops new work. */
const DISCOVERED = fs
  .readdirSync(ALBUMS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();
const ordered = [...ALBUM_ORDER.filter((a) => DISCOVERED.includes(a)), ...DISCOVERED.filter((d) => !ALBUM_ORDER.includes(d))];
const albums = [];

for (const folder of ordered) {
  const dir = path.join(ALBUMS_DIR, folder);
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  const photos = [];
  for (const f of files) {
    if (EXCLUDED_BY_NAME.test(f)) continue;
    const src = path.join(dir, f);
    let d;
    try { d = dims(src); } catch { continue; }
    if (Math.max(d.w, d.h) < MIN_SIDE) continue;
    photos.push({ file: f, albumFolder: folder, src, w: d.w, h: d.h });
  }
  albums.push({ folder, meta: ALBUM_META[folder] || fallbackMeta(folder), photos });
  console.log(`[generate] ${folder}: ${photos.length}/${files.length} photos`);
}

const totalPhotos = albums.reduce((n, a) => n + a.photos.length, 0);
const totalFiles = albums.reduce((n, a) => n + fs.readdirSync(path.join(ALBUMS_DIR, a.folder)).length, 0);
console.log(`[generate] ${totalFiles} files on disk → ${totalPhotos} published (AI / screenshots / too small excluded)`);

const allPhotos = albums.flatMap((a) => a.photos);

/* ---------------------------------------------------------------- */
/* 2. Web-optimized copies via sips + prune stale outputs            */
/* ---------------------------------------------------------------- */
fs.mkdirSync(WEB_DIR, { recursive: true });

for (const album of albums) {
  for (const p of album.photos) {
    const out = path.join(WEB_DIR, webName(album.folder, p.file));
    if (fs.existsSync(out)) continue;
    const longest = Math.max(p.w, p.h);
    const args = ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(QUALITY)];
    if (longest > MAX_DIM) args.push('-Z', String(MAX_DIM));
    args.push(p.src, '--out', out);
    execFileSync('sips', args, { stdio: 'ignore' });
  }
}

const expected = new Set(allPhotos.map((p) => webName(p.albumFolder, p.file)));
for (const album of albums) {
  for (const p of album.photos) p.web = webName(album.folder, p.file);
}

/* Identity assets: always refresh the web copy from the originals folder. */
for (const id of IDENTITY_ASSETS) {
  const src = path.join(ALL_DIR, id);
  const out = path.join(WEB_DIR, id);
  if (!fs.existsSync(src)) {
    console.error(`[generate] WARNING — identity asset missing from ${ALL_DIR}: ${id}`);
    continue;
  }
  const meta = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', src], { encoding: 'utf8' });
  const w = parseInt(/pixelWidth: (\d+)/.exec(meta)[1], 10);
  const h = parseInt(/pixelHeight: (\d+)/.exec(meta)[1], 10);
  const args = ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(QUALITY)];
  if (Math.max(w, h) > MAX_DIM) args.push('-Z', String(MAX_DIM));
  args.push(src, '--out', out);
  execFileSync('sips', args, { stdio: 'ignore' });
}
expected.add(...IDENTITY_ASSETS);

for (const stale of fs.readdirSync(WEB_DIR)) {
  if (!expected.has(stale)) {
    fs.unlinkSync(path.join(WEB_DIR, stale));
    console.log(`[generate] pruned stale web asset: ${stale}`);
  }
}

console.log(`[generate] optimized ${totalPhotos} images -> ${WEB_DIR}`);

/* ---------------------------------------------------------------- */
/* 3. Projects — one per album, hero = largest frame                 */
/* ---------------------------------------------------------------- */
const heroOf = (album) => album.photos.reduce((best, p) => (p.w * p.h > best.w * best.h ? p : best), album.photos[0]);
const secondOf = (album) => {
  const best = heroOf(album);
  return album.photos.reduce((s, p) => (p.w * p.h > s.w * s.h && p !== best ? p : s), album.photos[0]);
};

function aspectRatio(p) {
  const ratio = p.w / p.h;
  if (ratio > 1.35) return 'wide';
  if (ratio < 0.8) return 'tall';
  return 'small';
}

const projects = albums.map((album, i) => {
  const hero = heroOf(album);
  return {
    id: `album-${slug(album.folder)}`,
    number: String(i + 1).padStart(2, '0'),
    title: album.meta.title,
    category: album.meta.category,
    subCategories: album.meta.subCategories,
    year: '2026',
    location: 'Jaipur, India',
    client: album.meta.client,
    role: 'Lead Photographer',
    heroImage: relWeb(album.folder, hero.file),
    aspectRatio: aspectRatio(hero),
    gallery: album.photos.map((p) => relWeb(album.folder, p.file)),
    tagline: album.meta.tagline,
    description: album.meta.description,
    quote: album.meta.quote,
    visible: album.photos.length >= 3,
  };
});

const visibleProjects = projects.filter((p) => p.visible);
console.log(`[generate] projects: ${visibleProjects.length} visible` + (visibleProjects.length < projects.length ? `, ${projects.length - visibleProjects.length} hidden (too few frames)` : ''));

const hero = heroOf(albums.find((a) => a.folder === 'street'));
console.log(`[generate] HERO: ${heroOf(albums.find((a) => a.folder === 'street')).web}`);

const categories = ['ALL', ...new Set(albums.map((a) => a.meta.category))];

const pick = (folder, idx = 0) => {
  const album = albums.find((a) => a.folder === folder) || albums[0];
  return relWeb(album.folder, album.photos[idx].file);
};
const pick2 = (folder) => {
  const album = albums.find((a) => a.folder === folder) || albums[0];
  return relWeb(folder, secondOf(album).file);
};

const services = [
  { number: '01', title: 'PORTRAIT PHOTOGRAPHY', subtitle: 'Cinematic, character-driven personal & celebrity portraits.', description: 'Creating powerful, intimate portraits that uncover personality, atmosphere and presence. Designed for artists, executives, public figures and personal brand building.', deliverables: ['Creative direction', 'Studio & location shoots', 'High-end retouching', 'Commercial usage rights'], image: pick('celeb', 0) },
  { number: '02', title: 'FASHION & EDITORIAL', subtitle: 'High-fashion lookbooks, magazine spreads & couture imagery.', description: 'Editorial photography that elevates apparel and designer couture into artistic statements. Focus on movement, garment texture, lighting narrative and magazine-ready polish.', deliverables: ['Lookbooks & campaign assets', 'On-location / Set styling', 'Model direction', 'Publication licensing'], image: pick('model', 0) },
  { number: '03', title: 'BRAND CAMPAIGNS', subtitle: 'Commercial visual storytelling built for market impact.', description: 'Translating brand identity into unforgettable imagery. Full-service visual production from moodboards to final color-graded campaign assets for print, web and billboards.', deliverables: ['Campaign strategy', 'Multi-asset deliverables', 'Social & print formats', 'Commercial licensing'], image: pick2('celeb') },
  { number: '04', title: 'EVENT COVERAGE', subtitle: 'Documentary-style event & nightlife coverage.', description: 'Discreet, high-impact photography capturing authentic energy, key moments and ambient lighting during exclusive galas, club nights and fashion shows.', deliverables: ['Same-day highlight selects', 'Complete document gallery', 'High-res print files'], image: pick('clubs', 0) },
  { number: '05', title: 'PRODUCT PHOTOGRAPHY', subtitle: 'Luxury jewellery, pendants, rings & lifestyle goods.', description: 'Precision macro photography highlighting craftsmanship, precious stones and fine textures. Specialized in high-end jewellery, timepieces and luxury product catalogs.', deliverables: ['Macro close-Ups', 'Refinement & specular control', 'E-commerce & editorial cutouts'], image: pick('jewellery', 0) },
  { number: '06', title: 'SOCIAL MEDIA CONTENT', subtitle: 'High-volume cinematic imagery optimized for digital feeds.', description: 'Visual content engineered to stand out in fast-scrolling environments while maintaining a distinctive, premium brand aesthetic.', deliverables: ['Vertical & square formats', 'Batch content packs', 'Reels & photo carousels'], image: pick('street', 0) },
  { number: '07', title: 'CREATIVE DIRECTION', subtitle: 'Concept design, moodboard curation & visual strategy.', description: 'Comprehensive creative control over lighting, location, talent sourcing, color palette and narrative arc before a single frame is shot.', deliverables: ['Moodboards & storyboards', 'Set design consultation', 'Talent & styling curation'], image: pick2('model') },
  { number: '08', title: 'CINEMATIC VISUALS', subtitle: 'Anamorphic stills & motion frames for film & music.', description: 'Widescreen imagery with filmic color grading, depth of field and dramatic atmospheric lighting suited for film stills, album art and creative media.', deliverables: ['Widescreen ratio stills', 'Custom filmic color grading', 'Key-art poster compositions'], image: pick2('street') },
];

const whyKhush = [
  { number: '01', title: 'A DISTINCT VISUAL LANGUAGE', description: "I don't want every shoot to look like everyone else's. I craft custom lighting moods, deep shadows and color palettes tailored strictly to the subject." },
  { number: '02', title: 'STORY OVER SNAPSHOTS', description: 'Every frame should communicate something meaningful. Whether visible for a 30-second scroll or a physical gallery wall, the image must stop people in their tracks.' },
  { number: '03', title: 'BUILT FOR PEOPLE & BRANDS', description: 'From animal portraits to celebrity coverage and nightlife energy, the objective remains singular: create commercial value through timeless artistic visual direction.' },
  { number: '04', title: 'FROM IDEA TO FINAL FRAME', description: 'Concept, mood boarding, shooting, lighting and color grading all live seamlessly under one cohesive creative vision.' },
];

const instagramGrid = [
  { id: 1, image: pick('celeb', 0), caption: 'In the presence of stars — celebrity portraiture.' },
  { id: 2, image: pick('model', 0), caption: 'The art of the pose — editorial session.' },
  { id: 3, image: pick('clubs', 0), caption: 'Night energy — clubs & after-dark coverage.' },
  { id: 4, image: pick('street', 0), caption: 'Street chronicles — honest light, candid city.' },
  { id: 5, image: pick('jewellery', 0), caption: 'Jewels of Rajasthan — macro & specular control.' },
  { id: 6, image: pick('food', 0), caption: 'Flavour studies — food shot for appetite.' },
];

const data = `// AUTO-GENERATED by generate_data.cjs — do not edit by hand.
// Regenerate with: npm run generate

export const PORTFOLIO_CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const ARCHIVE_IMAGES = ${JSON.stringify(allPhotos.map((p) => relWeb(p.albumFolder, p.file)), null, 2)};

export const PORTFOLIO_PROJECTS = ${JSON.stringify(visibleProjects, null, 2)};

export const SERVICES_DATA = ${JSON.stringify(services, null, 2)};

export const WHY_KHUSH_PILLARS = ${JSON.stringify(whyKhush, null, 2)};

export const INSTAGRAM_GRID = ${JSON.stringify(instagramGrid, null, 2)};
`;

fs.writeFileSync(DATA_PATH, data);

const manifest = allPhotos.map((p) => ({
  relPath: relWeb(p.albumFolder, p.file),
  album: p.albumFolder,
  originalFile: p.file,
  webFile: p.web,
}));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

console.log(`[generate] SUCCESS — ${totalPhotos} photos written to portfolioData.js`);
console.log(`[generate] hero-bg candidate: ${relWeb('street', hero.file)}`);