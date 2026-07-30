# Sanjay Manigandan — Portfolio

A React + Three.js portfolio with a 3D animated "skill graph" hero, scroll
reveals, and interactive 3D-tilt project cards.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it with `npm run preview`.

## Deploy

**Vercel**
1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com → it auto-detects Vite. No config needed.

**Netlify**
1. Push this folder to a GitHub repo.
2. New site from Git → Build command: `npm run build` → Publish directory: `dist`.

## Editing content

- Text and section content: `src/components/*.jsx` (one file per section).
- Colors/fonts: `tailwind.config.js` and `index.html` (Google Fonts link).
- Profile photo: `src/assets/sanjay.jpeg` — swap the file to update it.
- 3D hero animation: `src/components/NeuralCanvas.jsx`.
- Skill graph: `src/components/Skills.jsx` — edit the `CATEGORIES` array.
