# Vercel Deploy Test App

A minimal Vite + React app built to test Vercel's SPA routing behaviour and
environment variable handling. It has two client-side routes (`/` and `/about`)
using `react-router-dom` with `BrowserRouter`, plus a client-side catch-all
not-found page. It deliberately does **not** include a `vercel.json`, so the
first deploy should 404 on a direct refresh of `/about` until a rewrite is added.

## Run locally

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env` to see the env-var message with a value.

Build and preview:

```bash
npm run build
npm run preview
```

## Vercel settings

Vercel should auto-detect:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

No install command override or other settings needed.

## Test script

1. **Push to GitHub.** Create a new repository and push this project to the default branch.
2. **Import on Vercel.** Add New > Project > Import Git Repository. Note whether a **second GitHub screen** asks you to install the Vercel app on a repository, and record which repository access option it offers (all repositories vs. selected repositories).
3. **Deploy** and wait for the build to finish.
4. **Open the live URL in a private/incognito window.** `/` should load.
5. **Click through to `/about`, then refresh.** Expected: Vercel **404** (no rewrite yet).
6. **Add `vercel.json`** at the repo root:
   ```json
   {"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}
   ```
   Commit and push. Wait for the new deployment to go live.
7. **Refresh `/about` again** in the private window. Expected: the About page loads.
8. **Add an environment variable.** Project > Settings > Environment Variables. Add `VITE_APP_MESSAGE` = `hello from vercel` for Production (and Preview if wanted).
9. **Open the live site without redeploying.** Expected: still shows `VITE_APP_MESSAGE is not set`, because Vite inlines `VITE_` variables at build time.
10. **Deployments > latest deployment > ... > Redeploy.** Wait for it to finish, then reload `/`. Expected: the message now shows `hello from vercel`, and the `Built:` timestamp has changed.
