---
name: khush-portfolio
description: Creative development skill for Khush Kapoor photography portfolio design, asset intelligence, content architecture, and visual polish.
---

# KHUSH KAPOOR — CREATIVE DEVELOPMENT SKILL

---

# PURPOSE
This skill defines how to design, build, polish and maintain the Khush Kapoor photography portfolio.

---

# PHASE 01 — DISCOVERY
Before coding:
1. Inspect repository.
2. Inspect available images.
3. Identify image dimensions.
4. Identify image categories.
5. Identify existing framework.
6. Identify existing components.
7. Identify fonts.
8. Identify dependencies.
9. Identify routing.
10. Identify deployment setup.

Do not immediately rewrite the project.

---

# PHASE 02 — ASSET INTELLIGENCE
Create a structured understanding of the portfolio.

Classify photographs:
- PORTRAIT
- FASHION
- EDITORIAL
- EVENT
- PRODUCT
- BRAND
- STREET
- LIFESTYLE
- CINEMATIC

Identify:
- Hero candidates (`hero-bg.jpg`)
- Featured candidates
- About candidates (`khush-portrait.jpg`, `khush-behind-lens.jpg`)
- Project covers

Prioritize photographs based on:
- Composition
- Lighting
- Emotion
- Technical quality
- Visual consistency
- Commercial potential

---

# PHASE 03 — CONTENT ARCHITECTURE
Create structured project data in `src/data/portfolioData.js`.

Example format:
```js
{
  id: "night-in-jaipur",
  title: "NIGHT IN JAIPUR",
  category: "PORTRAITS",
  year: "2026",
  location: "Jaipur, India",
  heroImage: "/assets/images/portrait-night-jaipur.jpg",
  gallery: [
    "/assets/images/portrait-night-jaipur.jpg",
    "/assets/images/portrait-shadows.jpg"
  ],
  description: "A visual study of nocturnal shadows in the Pink City."
}
```
