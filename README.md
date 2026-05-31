# Portfolio website

The React app lives in **`Portfolio/`** (Vite + React Router + Supabase).

| Path | Purpose |
|------|---------|
| `Portfolio/index.html` | App entry (dev + build source) |
| `Portfolio/src/` | Source code |
| `Portfolio/dist/` | Production build output (generated) |
| `Portfolio/vercel.json` | SPA routing for Vercel |

## Local development

```bash
cd Portfolio
npm install
npm run dev
```

Create `Portfolio/.env.local` (not committed) with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

## Deploy on Vercel

1. Import this GitHub repo on [Vercel](https://vercel.com).
2. Set **Root Directory** to `Portfolio`.
3. Add environment variables (Production + Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Deploy. Vercel runs `npm run build` and serves `dist/`.

After changing env vars, trigger a redeploy so Vite picks them up at build time.

## Supabase

Blog posts on `/writer` read from the `blogs` table. Ensure Row Level Security allows public `SELECT` if the site has no login.
