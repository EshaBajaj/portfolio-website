# Portfolio website

The React app lives in **`Portfolio/`** (Vite + React Router).

| Path | Purpose |
|------|---------|
| `Portfolio/index.html` | App entry (dev + build source) |
| `Portfolio/src/` | Source code |
| `Portfolio/dist/` | Production build output (generated) |

## Local development

```bash
cd Portfolio
npm install
npm run dev
```

## GitHub Pages

Deployment is handled by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Builds the app inside `Portfolio/`
2. Publishes `Portfolio/dist/` to GitHub Pages
3. Adds `404.html` so React Router routes work on refresh

**One-time GitHub setting:** Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions** (not “Deploy from branch” on repo root).

Live URL: **https://eshabajaj.github.io/portfolio-website/**
