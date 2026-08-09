/*
 * generate_data.cjs — CANONICAL DATA GENERATOR
 *
 * Rebuilds src/data/portfolioData.js from the ACTUAL files on disk.
 *
 * Steps:
 *   1. Scans assets-original-images for every image file.
 *   2. Excludes non-photography: app screenshots, AI-generated PNGs (file_*),
 *      and any file whose longest side is < 900px (thumbnails/logos).
 *   3. Generates web-optimized JPEG copies into public/assets/images/web
 *      via macOS `sips` (max 2000px, q80) — raw originals stay untouched.
 *   4. Stale web copies (no longer in the source set) are deleted.
 *   5. Maps curated project/service/instagram data to verified files only.
 *   6. Writes src/data/portfolioData.js and src/data/all_images_manifest.json.
 *
 * Projects with fewer than 3 gallery frames are auto-hidden (`visible: false`)
 * so the showcase never presents an empty-looking card.
 *
 * Usage: node generate_data.cjs
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ALL_DIR = path.join(__dirname, 'assets-original-images');
const WEB_DIR = path.join(__dirname, 'public', 'assets', 'images', 'web');
const MANIFEST_PATH = path.join(__dirname, 'src', 'data', 'all_images_manifest.json');
const DATA_PATH = path.join(__dirname, 'src', 'data', 'portfolioData.js');

const MAX_DIM = 2000;
const QUALITY = 80;
const MIN_SIDE = 900;

/* ---------------------------------------------------------------- */
/* 1. Scan disk                                                     */
/* ---------------------------------------------------------------- */
const files = fs.readdirSync(ALL_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
files.sort();

/* Non-photograph files — stay on disk, never published. */
const EXCLUDED_BY_NAME = files.filter((f) => /^(Screenshot_|file_)/i.test(f));

function sanitize(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/~2/g, '');
}

const webName = (name) => sanitize(path.parse(name).name) + '.jpg';
const relWeb = (name) => `/assets/images/web/${webName(name)}`;

/* Photographs: every file that is not name-excluded AND not a thumbnail.
 * Smallest genuine frames on disk are 1024px+; AI thumbnails/logos are 605px. */
const IMAGE_FILES = files.filter((f) => {
  if (EXCLUDED_BY_NAME.includes(f)) return false;
  const src = path.join(ALL_DIR, f);
  try {
    const meta = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', src], { encoding: 'utf8' });
    const w = parseInt(/pixelWidth: (\d+)/.exec(meta)[1], 10);
    const h = parseInt(/pixelHeight: (\d+)/.exec(meta)[1], 10);
    return Math.max(w, h) >= MIN_SIDE;
  } catch {
    return false;
  }
});

console.log(`[generate] ${files.length} files on disk → ${IMAGE_FILES.length} published, ${files.length - IMAGE_FILES.length} excluded (screenshots / AI / too small)`);

/* ---------------------------------------------------------------- */
/* 2. Web-optimized copies via sips + prune stale outputs            */
/* ---------------------------------------------------------------- */
fs.mkdirSync(WEB_DIR, { recursive: true });

for (const file of IMAGE_FILES) {
  const src = path.join(ALL_DIR, file);
  const out = path.join(WEB_DIR, webName(file));

  if (fs.existsSync(out)) continue;

  const meta = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', src], { encoding: 'utf8' });
  const width = parseInt(/pixelWidth: (\d+)/.exec(meta)[1], 10);
  const height = parseInt(/pixelHeight: (\d+)/.exec(meta)[1], 10);
  const longest = Math.max(width, height);

  const args = ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(QUALITY)];
  if (longest > MAX_DIM) args.push('-Z', String(MAX_DIM));
  args.push(src, '--out', out);

  execFileSync('sips', args, { stdio: 'ignore' });
}

/* Delete previously-generated images that are no longer in the source set
   (e.g. AI PNGs from an earlier pipeline re-run) — keeps web/ in sync. */
const expected = new Set(IMAGE_FILES.map(webName));
for (const stale of fs.readdirSync(WEB_DIR)) {
  if (!expected.has(stale)) {
    fs.unlinkSync(path.join(WEB_DIR, stale));
    console.log(`[generate] pruned stale web asset: ${stale}`);
  }
}

console.log(`[generate] optimized ${IMAGE_FILES.length} images -> ${WEB_DIR}`);

/* ---------------------------------------------------------------- */
/* 3. Curated project definitions (verified against disk)            */
/* ---------------------------------------------------------------- */
const has = (name) => IMAGE_FILES.includes(name);

const P1 = ['yuvika-1-DSC08153.jpg', 'yuvika-2-DSC08257.jpg', 'yuvika-3-DSC08295.jpg', 'yuvika-4-IMG_8643.jpg', 'yuvika-5-IMG_8644.jpg', 'yuvika-6-IMG_8645.jpg', 'yuvika-7-IMG_8650.jpg', 'yuvika-8-IMG_8651.jpg', 'yuvika-9-IMG_8655.jpg', 'yuvika-10-IMG_8656.jpg', 'yuvika-11-IMG_8662.jpg', 'yuvika-12-IMG_8669.jpg'];
const P2 = ['fashion-editorial-1.jpg', 'fashion-monochrome.jpg', '03084d87-f055-4544-8548-e1e54195a2f6.jpeg', 'd12c2336-0641-452a-95fc-04d965ec3a26.jpeg', 'f028f6b7-757c-4033-903c-398aa6741b58.jpeg'];
const P3 = ['DSC01053.jpg', 'DSC01290 (1).jpg', 'DSC01299.jpg', 'DSC03473.jpg', 'IMG_8689.jpg', '82070814-c940-4208-8fb5-8d85173a176d.jpeg', 'aac1f1f7-80e3-4b48-8010-fd4ab01571c6.jpeg', 'e2b10c66-9f54-4d74-a1fd-b75417d6a9bd.jpeg'];
/* Product set: the single verified frame today; rings/pendant originals
   (MISSING-PHOTOS.md) auto-join this project the moment they land on disk. */
const P4 = ['brand-product-shoot.jpg', ...IMAGE_FILES.filter((n) => /^(rings|pendant)-/i.test(n))];
const P5 = ['cinematic-amber-fort.jpg', 'street-atmosphere.jpg', 'd4ec5007-db05-4660-a299-569cebdd3590.jpeg', 'DSC08191.jpg'];
const P6 = ['desktop-1-124695.jpg.jpeg', 'desktop-2-72128.jpg.jpeg', 'desktop-5-DSC05420.jpg', 'desktop-6-DSC05421.jpg', 'desktop-7-DSC05426.jpg', 'desktop-13-WhatsApp_Image_2026-05-28_at_11.38.27_PM.jpeg', 'desktop-14-WhatsApp_Image_2026-05-28_at_11.38.27_PMM.jpeg', 'desktop-16-WhatsApp_Image_2026-05-31_at_8.32.24_AM.jpeg', 'desktop-17-WhatsApp_Image_2026-07-16_at_1.52.11_PM.jpeg', 'desktop-18-WhatsApp_Image_2026-07-16_at_1.53.54_PM.jpeg', 'desktop-19-WhatsApp_Image_2026-07-16_at_1.53.55_PM__1_.jpeg', 'desktop-20-WhatsApp_Image_2026-07-16_at_1.53.55_PM.jpeg'];
const P7 = ['DSC00286.JPG', 'DSC00299.JPG', 'DSC03780.JPG', 'DSC03791.JPG', 'DSC04910.JPG', 'DSC04959.JPG', 'DSC05141.JPG', 'DSC05141_1.JPG', 'DSC05143.JPG', 'DSC07538.JPG', 'DSC07550.JPG', 'DSC07553.JPG', 'DSC08953.JPG'];

/* P8 = everything remaining, so no verified frame is ever orphaned. */
const curated = [P1, P2, P3, P4, P5, P6, P7].flat();
const P8 = IMAGE_FILES.filter((n) => !curated.includes(n));

const all = [P1, P2, P3, P4, P5, P6, P7, P8].flat();
const missing = all.filter((n) => !has(n));
if (missing.length) {
  console.error('[generate] FATAL — referenced images missing from disk:', missing);
  process.exit(1);
}

const g = (names) => names.map(relWeb);

/* ---------------------------------------------------------------- */
/* 4. Emit data                                                      */
/* ---------------------------------------------------------------- */
const projects = [
  {
    id: 'yuvika-editorial-master',
    title: 'YUVIKA EDITORIAL — MONOCHROME SYMPHONY',
    category: 'FASHION',
    subCategories: ['FASHION', 'PORTRAITS', 'EDITORIAL'],
    year: '2026',
    location: 'Jaipur Studio',
    client: 'Editorial Session',
    role: 'Lead Photographer & Art Director',
    heroImage: relWeb('yuvika-hero.jpg'),
    aspectRatio: 'large',
    gallery: g(P1),
    tagline: 'Comprehensive editorial fashion study featuring model Yuvika exploring silhouette, key light contours, and dramatic gaze.',
    description: 'Shot during an exclusive editorial session in Jaipur. Single-source directional key light highlights cheekbone contours, delicate garment textures and a piercing emotional gaze. Every frame balances high fashion minimalism with intimate portraiture.',
    quote: 'Editorial portraiture should feel like a dialog between shadow and gaze.',
  },
  {
    id: 'heritage-couture-frames',
    title: 'HERITAGE COUTURE — STONE & SILK',
    category: 'FASHION',
    subCategories: ['FASHION', 'EDITORIAL'],
    year: '2026',
    location: 'Jaipur, Rajasthan',
    client: 'Fashion Editorial',
    role: 'Campaign Photographer',
    heroImage: relWeb('fashion-editorial-1.jpg'),
    aspectRatio: 'wide',
    gallery: g(P2),
    tagline: 'High fashion colliding with historic Rajasthani stone arches and silk draping.',
    description: 'A commercial fashion editorial shot at golden hour. Flowing royal garments juxtaposed against rugged stone walls, emphasizing form, texture and movement.',
    quote: 'We wanted garment movement that felt like poetry suspended in motion.',
  },
  {
    id: 'intimate-portrait-studies',
    title: 'INTIMATE PORTRAIT STUDIES',
    category: 'PORTRAITS',
    subCategories: ['PORTRAITS', 'EDITORIAL'],
    year: '2026',
    location: 'Jaipur, India',
    client: 'Personal Series',
    role: 'Lead Photographer',
    heroImage: relWeb('DSC01053.jpg'),
    aspectRatio: 'tall',
    gallery: g(P3),
    tagline: 'A study of presence, mood and the split second where light meets emotion.',
    description: 'A portrait series exploring contrast between sculpted light and human presence. Every frame tells a story of timeless grace.',
    quote: "Atmosphere isn't created in post-production. It's caught in the split second when light meets emotion.",
  },
  {
    id: 'product-and-macro',
    title: 'PRODUCT & MACRO — STUDIO DETAIL',
    category: 'PRODUCTS',
    subCategories: ['PRODUCTS', 'BRANDS'],
    year: '2026',
    location: 'Jaipur Studio',
    client: 'Studio Session',
    role: 'Product & Studio Photographer',
    heroImage: relWeb('brand-product-shoot.jpg'),
    aspectRatio: 'wide',
    gallery: g(P4),
    tagline: 'Precision product and macro lighting built for commercial catalogs.',
    description: 'Commercial studio product work with controlled speculars, deep shadows and micro-detail emphasis. Designed for e-commerce, catalogs and campaign assets.',
    quote: 'Luxury product photography requires extreme discipline — every reflection must be intentional.',
  },
  {
    id: 'amber-fort-cinematic',
    title: 'THE SILENT FORT — AMBER TWILIGHT',
    category: 'CINEMATIC',
    subCategories: ['CINEMATIC', 'STREET / LIFESTYLE'],
    year: '2025',
    location: 'Amer, Rajasthan',
    client: 'Personal Visual Series',
    role: 'Visual Storyteller',
    heroImage: relWeb('cinematic-amber-fort.jpg'),
    aspectRatio: 'wide',
    gallery: g(P5),
    tagline: 'Cinematic widescreen frames capturing twilight shadows over 16th century royal ramparts.',
    description: 'A cinematic photo essay capturing twilight shadows over royal ramparts. Wide atmospheric frames with filmic depth.',
    quote: 'Frame it like a still from a movie that was never finished.',
  },
  {
    id: 'pink-city-chronicles',
    title: 'CHRONICLES OF THE PINK CITY',
    category: 'STREET / LIFESTYLE',
    subCategories: ['STREET / LIFESTYLE', 'CINEMATIC'],
    year: '2025',
    location: 'Jaipur, India',
    client: 'Personal Series',
    role: 'Street Photographer',
    heroImage: relWeb('desktop-5-DSC05420.jpg'),
    aspectRatio: 'tall',
    gallery: g(P6),
    tagline: 'Unfiltered urban life, traditional artisans and morning geometry across historic alleyways.',
    description: 'Candid street documentation across historic alleyways. High contrast sunlight piercing through narrow old-city corridors.',
    quote: 'The street rewards those who wait quietly in the shadows.',
  },
  {
    id: 'live-and-documentary',
    title: 'LIVE & DOCUMENTARY FRAMES',
    category: 'EVENTS',
    subCategories: ['EVENTS', 'PORTRAITS'],
    year: '2026',
    location: 'Jaipur, India',
    client: 'Live Coverage',
    role: 'Documentary Photographer',
    heroImage: relWeb('DSC04910.JPG'),
    aspectRatio: 'wide',
    gallery: g(P7),
    tagline: 'Raw energy, low light and authentic moments in motion.',
    description: 'Low-light hand-held coverage preserving authentic mood and atmosphere without disruptive flash photography.',
    quote: "Event photography isn't about snapping crowd shots. It's capturing the soul of the room.",
  },
  {
    id: 'everyday-visual-log',
    title: 'EVERYDAY VISUAL LOG',
    category: 'STREET / LIFESTYLE',
    subCategories: ['STREET / LIFESTYLE', 'EVENTS', 'PORTRAITS'],
    year: '2026',
    location: 'Jaipur, India',
    client: 'Personal Archive',
    role: 'Visual Storyteller',
    heroImage: relWeb('20251231_083620.jpg'),
    aspectRatio: 'small',
    gallery: g(P8),
    tagline: 'Frames from the road, the set and the city between shoots.',
    description: 'A personal archive of moments collected between assignments — phone frames, set visits and quiet observations of daily life.',
    quote: 'The best frames are often the ones you were not paid to take.',
  },
].map((p) => ({
  ...p,
  /* A project needs at least 3 frames to be showcased as a portfolio card. */
  visible: p.gallery.length >= 3,
}));

const visibleProjects = projects.filter((p) => p.visible).map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }));
console.log(`[generate] projects: ${visibleProjects.length} visible` + (visibleProjects.length < projects.length ? `, ${projects.length - visibleProjects.length} hidden (too few frames)` : ''));

const services = [
  { number: '01', title: 'PORTRAIT PHOTOGRAPHY', subtitle: 'Cinematic, character-driven personal & celebrity portraits.', description: 'Creating powerful, intimate portraits that uncover personality, atmosphere and presence. Designed for artists, executives, public figures and personal brand building.', deliverables: ['Creative direction', 'Studio & location shoots', 'High-end retouching', 'Commercial usage rights'], image: relWeb('DSC01053.jpg') },
  { number: '02', title: 'FASHION & EDITORIAL', subtitle: 'High-fashion lookbooks, magazine spreads & couture imagery.', description: 'Editorial photography that elevates apparel and designer couture into artistic statements. Focus on movement, garment texture, lighting narrative and magazine-ready polish.', deliverables: ['Lookbooks & campaign assets', 'On-location / Set styling', 'Model direction', 'Publication licensing'], image: relWeb('yuvika-hero.jpg') },
  { number: '03', title: 'BRAND CAMPAIGNS', subtitle: 'Commercial visual storytelling built for market impact.', description: 'Translating brand identity into unforgettable imagery. Full-service visual production from moodboards to final color-graded campaign assets for print, web and billboards.', deliverables: ['Campaign strategy', 'Multi-asset deliverables', 'Social & print formats', 'Commercial licensing'], image: relWeb('d12c2336-0641-452a-95fc-04d965ec3a26.jpeg') },
  { number: '04', title: 'EVENT COVERAGE', subtitle: 'Documentary-style event & concert coverage.', description: 'Discreet, high-impact photography capturing authentic energy, key moments and ambient lighting during exclusive galas, music performances and fashion shows.', deliverables: ['Same-day highlight selects', 'Complete document gallery', 'High-res print files'], image: relWeb('DSC04910.JPG') },
  { number: '05', title: 'PRODUCT PHOTOGRAPHY', subtitle: 'Luxury jewellery, pendants, rings & lifestyle goods.', description: 'Precision macro photography highlighting craftsmanship, precious stones and fine textures. Specialized in high-end jewellery, timepieces and luxury product catalogs.', deliverables: ['Macro close-Ups', 'Refinement & specular control', 'E-commerce & editorial cutouts'], image: relWeb('brand-product-shoot.jpg') },
  { number: '06', title: 'SOCIAL MEDIA CONTENT', subtitle: 'High-volume cinematic imagery optimized for digital feeds.', description: 'Visual content engineered to stand out in fast-scrolling environments while maintaining a distinctive, premium brand aesthetic.', deliverables: ['Vertical & square formats', 'Batch content packs', 'Reels & photo carousels'], image: relWeb('21860.jpg') },
  { number: '07', title: 'CREATIVE DIRECTION', subtitle: 'Concept design, moodboard curation & visual strategy.', description: 'Comprehensive creative control over lighting, location, talent sourcing, color palette and narrative arc before a single frame is shot.', deliverables: ['Moodboards & storyboards', 'Set design consultation', 'Talent & styling curation'], image: relWeb('yuvika-1-DSC08153.jpg') },
  { number: '08', title: 'CINEMATIC VISUALS', subtitle: 'Anamorphic stills & motion frames for film & music.', description: 'Widescreen imagery with filmic color grading, depth of field and dramatic atmospheric lighting suited for film stills, album art and creative media.', deliverables: ['Widescreen ratio stills', 'Custom filmic color grading', 'Key-art poster compositions'], image: relWeb('cinematic-amber-fort.jpg') },
];

const whyKhush = [
  { number: '01', title: 'A DISTINCT VISUAL LANGUAGE', description: "I don't want every shoot to look like everyone else's. I craft custom lighting moods, deep shadows and color palettes tailored strictly to the subject." },
  { number: '02', title: 'STORY OVER SNAPSHOTS', description: 'Every frame should communicate something meaningful. Whether visible for a 30-second scroll or a physical gallery wall, the image must stop people in their tracks.' },
  { number: '03', title: 'BUILT FOR PEOPLE & BRANDS', description: 'From personal portraits to multi-channel commercial campaigns, the objective remains singular: create commercial value through timeless artistic visual direction.' },
  { number: '04', title: 'FROM IDEA TO FINAL FRAME', description: 'Concept, mood boarding, shooting, lighting and color grading all live seamlessly under one cohesive creative vision.' },
];

const instagramGrid = [
  { id: 1, image: relWeb('yuvika-hero.jpg'), caption: 'Yuvika editorial session. Key light & shadow.' },
  { id: 2, image: relWeb('DSC01053.jpg'), caption: 'Conversations in light.' },
  { id: 3, image: relWeb('brand-product-shoot.jpg'), caption: 'Studio detail & specular control.' },
  { id: 4, image: relWeb('03084d87-f055-4544-8548-e1e54195a2f6.jpeg'), caption: 'Full frame editorial still.' },
  { id: 5, image: relWeb('cinematic-amber-fort.jpg'), caption: 'Dusk over Jaipur fort walls.' },
  { id: 6, image: relWeb('DSC04910.JPG'), caption: 'Stage lights & live energy.' },
];

const data = `// AUTO-GENERATED by generate_data.cjs — do not edit by hand.
// Regenerate with: npm run generate

export const PORTFOLIO_CATEGORIES = [
  "ALL",
  "PORTRAITS",
  "FASHION",
  "BRANDS",
  "EVENTS",
  "PRODUCTS",
  "STREET / LIFESTYLE",
  "EDITORIAL",
  "CINEMATIC"
];

export const ARCHIVE_IMAGES = ${JSON.stringify(IMAGE_FILES.map(relWeb), null, 2)};

export const PORTFOLIO_PROJECTS = ${JSON.stringify(visibleProjects, null, 2)};

export const SERVICES_DATA = ${JSON.stringify(services, null, 2)};

export const WHY_KHUSH_PILLARS = ${JSON.stringify(whyKhush, null, 2)};

export const INSTAGRAM_GRID = ${JSON.stringify(instagramGrid, null, 2)};
`;

fs.writeFileSync(DATA_PATH, data);

const manifest = IMAGE_FILES.map((f) => ({
  relPath: relWeb(f),
  originalFile: f,
  webFile: webName(f),
}));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

console.log(`[generate] SUCCESS — ${IMAGE_FILES.length} photos written to portfolioData.js`);
console.log(`[generate] excluded (non-photographs): ${EXCLUDED_BY_NAME.join(', ')}`);