# Jordan Hymas — Portfolio

A personal portfolio built to showcase my projects, skills, and background. Designed with a focus on clean typography, smooth animations, and a fully responsive layout that adapts between mobile and desktop experiences.

Live site: [jordanhymas.com](https://jordanhymas.com)

---

## Pages

**[ Home ]** — Landing page with an animated introduction and navigation to the rest of the site.

**[ Me ]** — Background, personal summary, and a resume download link.

**[ Projects ]** — A macOS-style desktop interface on larger screens and a touch-friendly card carousel on mobile, each card linking to full project breakdowns.

**[ Skills ]** — A categorized breakdown of technical skills across systems, development, networking, and tooling.

**[ More ]** — A photo section with a grid gallery layout.

**[ Contact ]** — Social links and email contact with an animated background.

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Icons | Lucide React, Tabler Icons |
| Theming | next-themes (light / dark mode) |
| Dev Server | Turbopack |
| Image Optimization | Sharp (build-time WebP conversion) |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Screenshots

![Home](public/ModernPortfolio/home_page.webp)

![Me](public/ModernPortfolio/me_page.webp)

![Projects](public/ModernPortfolio/projects_page.webp)

![Skills](public/ModernPortfolio/skills_page.webp)

![Contact](public/ModernPortfolio/contact_page.webp)

---

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000` using Turbopack.

To build for production:

```bash
npm run build
npm start
```

---

## Image Optimization

Project images are converted to WebP at build time using a custom script.

```bash
npm run optimize:images
```

Source images go in `public/Projects/`, optimized WebP output is written in place.
