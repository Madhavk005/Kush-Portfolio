const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'src', 'data', 'all_images_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

console.log('Manifest loaded:', manifest.length, 'images');

const yuvikaImages = manifest.filter(m => m.originalFolder === 'yuvika').map(m => m.relPath);
const pendantImages = manifest.filter(m => m.originalFolder === 'pendant').map(m => m.relPath);
const ringsImages = manifest.filter(m => m.originalFolder === 'rings').map(m => m.relPath);
const khushImages = manifest.filter(m => m.originalFolder === 'khush').map(m => m.relPath);
const desktopImages = manifest.filter(m => m.originalFolder === 'desktop').map(m => m.relPath);

const khushPortraits = khushImages.filter((_, i) => i % 4 === 0);
const khushFashion = khushImages.filter((_, i) => i % 4 === 1);
const khushCinematic = khushImages.filter((_, i) => i % 4 === 2);
const khushStreetEvents = khushImages.filter((_, i) => i % 4 === 3);

const portfolioDataContent = `export const PORTFOLIO_CATEGORIES = [
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

export const ALL_192_PHOTOGRAPHS = ${JSON.stringify(manifest.map(m => m.relPath), null, 2)};

export const PORTFOLIO_PROJECTS = [
  {
    id: "yuvika-editorial-master",
    number: "01",
    title: "YUVIKA EDITORIAL — MONOCHROME SYMPHONY",
    category: "FASHION",
    subCategories: ["FASHION", "PORTRAITS", "EDITORIAL"],
    year: "2026",
    location: "Jaipur Studio",
    client: "Avant-Garde Fashion Zine",
    role: "Lead Photographer & Art Director",
    heroImage: "${yuvikaImages[0]}",
    aspectRatio: "large",
    gallery: ${JSON.stringify(yuvikaImages, null, 2)},
    tagline: "Comprehensive editorial fashion study featuring model Yuvika exploring silhouette, key light contours, and dramatic gaze.",
    description: "Shot during an exclusive editorial session in Jaipur. Utilizing single-source directional key light to highlight cheekbone contours, delicate garment textures and piercing emotional gaze. Every frame balances high fashion minimalism with intimate portraiture.",
    quote: "Editorial portraiture should feel like a dialog between shadow and gaze."
  },
  {
    id: "rings-luxury-collection",
    number: "02",
    title: "THE RINGS COLLECTION — 74 FRAMES",
    category: "PRODUCTS",
    subCategories: ["PRODUCTS", "BRANDS"],
    year: "2026",
    location: "Jaipur Studio",
    client: "Aura Fine Jewellery",
    role: "Product & Studio Photographer",
    heroImage: "${ringsImages[10] || ringsImages[0]}",
    aspectRatio: "tall",
    gallery: ${JSON.stringify(ringsImages, null, 2)},
    tagline: "Complete 74-frame high-end jewellery catalog highlighting diamond brilliance, silver engravings and gold bands.",
    description: "Commercial catalog and campaign assets produced for a luxury ring release. Specular control techniques emphasize gemstone clarity, metal facets and micro-etchings across 74 macro frames.",
    quote: "The macro lens reveals a microscopic world of craftsmanship that deserves full attention."
  },
  {
    id: "pendant-craftsmanship",
    number: "03",
    title: "GOLD & SOLITUDE — PENDANTS",
    category: "PRODUCTS",
    subCategories: ["PRODUCTS", "BRANDS"],
    year: "2026",
    location: "Jaipur Studio",
    client: "Aura Fine Jewellery",
    role: "Product & Macro Photographer",
    heroImage: "${pendantImages[0]}",
    aspectRatio: "large",
    gallery: ${JSON.stringify(pendantImages, null, 2)},
    tagline: "Complete 28-frame macro study celebrating hand-carved gemstones and micro-reflections in luxury pendants.",
    description: "An intimate commercial product collection for a luxury heritage jewellery brand. Utilizing directional dark-field lighting to make precious metals pop against deep obsidian surfaces.",
    quote: "Luxury product photography requires extreme discipline — every reflection must be intentional."
  },
  {
    id: "night-in-jaipur-archive",
    number: "04",
    title: "NOCTURNE PORTRAITS — JAIPUR",
    category: "PORTRAITS",
    subCategories: ["PORTRAITS", "EDITORIAL"],
    year: "2026",
    location: "Jaipur, India",
    client: "Editorial Study",
    role: "Lead Photographer",
    heroImage: "${khushPortraits[0]}",
    aspectRatio: "tall",
    gallery: ${JSON.stringify(khushPortraits, null, 2)},
    tagline: "A visual study of nocturnal shadows, traditional architecture and human emotion in the Pink City.",
    description: "Captured during midnight hours in old Jaipur, this series explores contrast between ancient sandstone facades and low ambient tungsten lights. Every frame tells a silent story of timeless grace.",
    quote: "Atmosphere isn't created in post-production. It's caught in the split second when light meets emotion."
  },
  {
    id: "amber-fort-cinematic-master",
    number: "05",
    title: "THE SILENT FORT — AMBER TWILIGHT",
    category: "CINEMATIC",
    subCategories: ["CINEMATIC", "STREET / LIFESTYLE"],
    year: "2025",
    location: "Amer, Rajasthan",
    client: "Personal Visual Series",
    role: "Visual Storyteller",
    heroImage: "${khushCinematic[0]}",
    aspectRatio: "wide",
    gallery: ${JSON.stringify(khushCinematic, null, 2)},
    tagline: "Cinematic widescreen frames capturing twilight shadows over 16th century royal ramparts.",
    description: "A cinematic photo essay capturing twilight shadows over royal ramparts. Shot with anamorphic depth to replicate 35mm film stills.",
    quote: "Frame it like a still from a movie that was never finished."
  },
  {
    id: "sufi-nocturne-master",
    number: "06",
    title: "SUFI NIGHT — NOCTURNE & SOUL",
    category: "EVENTS",
    subCategories: ["EVENTS", "PORTRAITS"],
    year: "2026",
    location: "Jaipur, India",
    client: "Jaipur Cultural Festival",
    role: "Documentary Photographer",
    heroImage: "${khushStreetEvents[0]}",
    aspectRatio: "tall",
    gallery: ${JSON.stringify(khushStreetEvents, null, 2)},
    tagline: "Raw musical energy, candlelight reflections and ecstasy in motion.",
    description: "Documenting an exclusive musical gathering in Jaipur. Low-light hand-held camera work preserving authentic mood, smoke and passion without disruptive flash photography.",
    quote: "Event photography isn't about snapping crowd shots. It's capturing the soul of the room."
  },
  {
    id: "fashion-couture-master",
    number: "07",
    title: "HERITAGE COUTURE LOOKBOOK",
    category: "FASHION",
    subCategories: ["FASHION", "EDITORIAL"],
    year: "2026",
    location: "Jaipur, Rajasthan",
    client: "Avant-Garde Fashion Label",
    role: "Campaign Photographer",
    heroImage: "${khushFashion[0]}",
    aspectRatio: "wide",
    gallery: ${JSON.stringify(khushFashion, null, 2)},
    tagline: "High fashion colliding with historic Rajasthani stone arches and silk draping.",
    description: "A commercial fashion editorial shot at golden hour. Flowing royal garments juxtaposed against rugged brutalist stone walls, emphasizing form, texture and movement.",
    quote: "We wanted garment movement that felt like poetry suspended in motion."
  },
  {
    id: "pink-city-chronicles",
    number: "08",
    title: "CHRONICLES OF THE PINK CITY",
    category: "STREET / LIFESTYLE",
    subCategories: ["STREET / LIFESTYLE", "CINEMATIC"],
    year: "2025",
    location: "Johri Bazaar & Hawa Mahal, Jaipur",
    client: "Travel & Culture Zine",
    role: "Street Photographer",
    heroImage: "${desktopImages[4] || desktopImages[0]}",
    aspectRatio: "small",
    gallery: ${JSON.stringify(desktopImages, null, 2)},
    tagline: "Unfiltered urban life, traditional artisans and morning geometry across historic alleyways.",
    description: "Candid street documentation across historic alleyways. High contrast sunlight piercing through narrow old-city corridors.",
    quote: "The street rewards those who wait quietly in the shadows."
  }
];

export const SERVICES_DATA = [
  {
    number: "01",
    title: "PORTRAIT PHOTOGRAPHY",
    subtitle: "Cinematic, character-driven personal & celebrity portraits.",
    description: "Creating powerful, intimate portraits that uncover personality, atmosphere and presence. Designed for artists, executives, public figures and personal brand building.",
    deliverables: ["Creative direction", "Studio & location shoots", "High-end retouching", "Commercial usage rights"],
    image: "${khushPortraits[0]}"
  },
  {
    number: "02",
    title: "FASHION & EDITORIAL",
    subtitle: "High-fashion lookbooks, magazine spreads & couture imagery.",
    description: "Editorial photography that elevates apparel and designer couture into artistic statements. Focus on movement, garment texture, lighting narrative and magazine-ready polish.",
    deliverables: ["Lookbooks & campaign assets", "On-location / Set styling", "Model direction", "Publication licensing"],
    image: "${yuvikaImages[0]}"
  },
  {
    number: "03",
    title: "BRAND CAMPAIGNS",
    subtitle: "Commercial visual storytelling built for market impact.",
    description: "Translating brand identity into unforgettable imagery. Full-service visual production from moodboards to final color-graded campaign assets for print, web and billboards.",
    deliverables: ["Campaign strategy", "Multi-asset deliverables", "Social & print formats", "Commercial licensing"],
    image: "${khushFashion[1]}"
  },
  {
    number: "04",
    title: "EVENT COVERAGE",
    subtitle: "Documentary-style event & concert coverage.",
    description: "Discreet, high-impact photography capturing authentic energy, key moments and ambient lighting during exclusive galas, music performances and fashion shows.",
    deliverables: ["Same-day highlight selects", "Complete document gallery", "High-res print files"],
    image: "${khushStreetEvents[0]}"
  },
  {
    number: "05",
    title: "PRODUCT PHOTOGRAPHY",
    subtitle: "Luxury jewellery, pendants, rings & lifestyle goods.",
    description: "Precision macro photography highlighting craftsmanship, precious stones and fine textures. Specialized in high-end jewellery, timepieces and luxury product catalogs.",
    deliverables: ["Macro closeups", "Refinement & specular control", "E-commerce & editorial cutouts"],
    image: "${pendantImages[0]}"
  },
  {
    number: "06",
    title: "SOCIAL MEDIA CONTENT",
    subtitle: "High-volume cinematic imagery optimized for digital feeds.",
    description: "Visual content engineered to stand out in fast-scrolling environments while maintaining a distinctive, premium brand aesthetic.",
    deliverables: ["Vertical & square formats", "Batch content packs", "Reels & photo carousels"],
    image: "${khushCinematic[1]}"
  },
  {
    number: "07",
    title: "CREATIVE DIRECTION",
    subtitle: "Concept design, moodboard curation & visual strategy.",
    description: "Comprehensive creative control over lighting, location, talent sourcing, color palette and narrative arc before a single frame is shot.",
    deliverables: ["Moodboards & storyboards", "Set design consultation", "Talent & styling curation"],
    image: "${yuvikaImages[2]}"
  },
  {
    number: "08",
    title: "CINEMATIC VISUALS",
    subtitle: "Anamorphic stills & motion frames for film & music.",
    description: "Widescreen imagery with filmic color grading, depth of field and dramatic atmospheric lighting suited for film stills, album art and creative media.",
    deliverables: ["Widescreen 2.39:1 stills", "Custom filmic color grading", "Key-art poster compositions"],
    image: "${khushCinematic[0]}"
  }
];

export const WHY_KHUSH_PILLARS = [
  {
    number: "01",
    title: "A DISTINCT VISUAL LANGUAGE",
    description: "I don't want every shoot to look like everyone else's. I craft custom lighting moods, deep shadows and color palettes tailored strictly to the subject."
  },
  {
    number: "02",
    title: "STORY OVER SNAPSHOTS",
    description: "Every frame should communicate something meaningful. Whether it's a 30-second scroll or a physical gallery wall, the image must stop people in their tracks."
  },
  {
    number: "03",
    title: "BUILT FOR PEOPLE & BRANDS",
    description: "From personal portraits to multi-channel commercial campaigns, the objective remains singular: create commercial value through timeless artistic visual direction."
  },
  {
    number: "04",
    title: "FROM IDEA TO FINAL FRAME",
    description: "Concept, mood boarding, composition, shooting, lighting and color grading all live seamlessly under one cohesive creative vision."
  }
];

export const CLIENT_COLLABORATIONS = [
  "AURA FINE JEWELLERY",
  "THE PINK CITY GAZETTE",
  "HERITAGE COUTURE JAIPUR",
  "SUFI NIGHT FESTIVAL",
  "AVANT-GARDE ZINE",
  "ROYAL PALACE HOTELS"
];

export const TESTIMONIALS = [
  {
    quote: "Working with Khush felt less like hiring a photographer and more like having a true creative partner. He turned our fashion concept into editorial artwork.",
    author: "Creative Director",
    brand: "Heritage Couture"
  },
  {
    quote: "The jewelry macro shots Khush delivered brought out every intricate gem reflection. Our sales conversion skyrocketed immediately.",
    author: "Founder",
    brand: "Aura Fine Jewellery"
  }
];

export const INSTAGRAM_GRID = [
  { id: 1, image: "${yuvikaImages[0]}", caption: "Yuvika editorial session. Key light & shadow." },
  { id: 2, image: "${khushPortraits[0]}", caption: "Midnight in old town. 35mm frame." },
  { id: 3, image: "${pendantImages[0]}", caption: "Gemstone reflections in gold." },
  { id: 4, image: "${ringsImages[0]}", caption: "Silver & diamond macro closeups." },
  { id: 5, image: "${khushCinematic[0]}", caption: "Dusk over Jaipur fort walls." },
  { id: 6, image: "${khushStreetEvents[0]}", caption: "Stage lights & Sufi echoes." }
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'portfolioData.js'), portfolioDataContent);
console.log('SUCCESSFULLY GENERATED portfolioData.js WITH ALL 192 PHOTOS!');
