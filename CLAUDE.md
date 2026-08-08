# CLAUDE.md — KHUSH KAPOOR ENGINEERING CONSTITUTION

## PROJECT
Premium interactive photography portfolio for:
**KHUSH KAPOOR** — Photographer & Visual Storyteller (Jaipur, India)

---

## ENGINEERING PRINCIPLES

### 1. QUALITY OVER SPEED
- Do not take shortcuts that reduce the visual quality of the final product.
- A portfolio website is a visual product.

### 2. COMPONENTIZATION
- Create reusable components in `src/components/`.
- Avoid duplicate markup.
- Use props/configuration/data rather than copying components.

### 3. DATA-DRIVEN PORTFOLIO
- Portfolio projects are represented through structured data in `src/data/portfolioData.js`.
- Type structure:
```ts
type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  subCategories: string[];
  year?: string;
  location?: string;
  client?: string;
  role?: string;
  heroImage: string;
  aspectRatio: 'wide' | 'large' | 'tall' | 'small';
  gallery: string[];
  tagline?: string;
  description?: string;
  quote?: string;
};
```
