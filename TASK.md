# Task: Build a small Vite + React app for a Vercel deploy test

## Goal

Create a minimal Vite + React app with two client-side routes (`/` and `/about`). It will be pushed to GitHub and imported into Vercel to test SPA routing behaviour and environment variables.

**The app must deliberately NOT include a `vercel.json` (or any rewrite/redirect config).** The first deploy is supposed to return a 404 when `/about` is refreshed. The human will add `vercel.json` later as part of the test.

## Requirements

### Stack
- Vite + React (JavaScript, not TypeScript, to keep it small)
- `react-router-dom` v6 or later, using `BrowserRouter` (clean URLs, no hash routing)
- No other runtime dependencies, no CSS framework, no state library

### Routes
| Path | Component | Content |
|---|---|---|
| `/` | `Home` | `<h1>Home</h1>`, one sentence of text, a `<Link>` to `/about` |
| `/about` | `About` | `<h1>About</h1>`, one sentence of text, a `<Link>` to `/` |

- A shared nav bar with `<Link>` elements to both pages must appear on every page.
- Add a catch-all route that renders a simple "Not found (client-side)" message. This makes it easy to tell apart a React-level not-found from Vercel's server-level 404.

### Environment variable display
- On the Home page, show the value of `import.meta.env.VITE_APP_MESSAGE`.
- If it is undefined, display the text `VITE_APP_MESSAGE is not set`.
- Render it in an element with `data-testid="env-message"`.
- Do **not** create a `.env` file with this variable in the repo. The human will add it in Vercel later.
- Add a `.env.example` containing `VITE_APP_MESSAGE=hello from env`, for documentation only.

### Build info (helps verify redeploys)
- In `vite.config.js`, define a build-time constant `__BUILD_TIME__` set to `new Date().toISOString()`.
- Show it in the footer of every page as `Built: <timestamp>`.

### Project files
- `package.json` with scripts `dev`, `build`, `preview`
- `index.html`, `src/main.jsx`, `src/App.jsx`, `src/pages/Home.jsx`, `src/pages/About.jsx`
- `vite.config.js`
- `.gitignore` (must include `node_modules`, `dist`, `.env`, `.env.local`, `.vercel`)
- `README.md` (see below)

### Do NOT
- Add `vercel.json`, `_redirects`, `public/404.html`, or any server config
- Commit `node_modules`, `dist`, or `.env`
- Use HashRouter or any hack that makes refreshing `/about` work without a rewrite

## Acceptance checks (run locally before finishing)

1. `npm install` completes without errors.
2. `npm run build` succeeds and produces `dist/`.
3. `npm run dev`: `/` and `/about` both load, and navigating between them via links works.
4. `npm run dev`: an unknown path such as `/xyz` shows the client-side not-found message.
5. Home shows `VITE_APP_MESSAGE is not set` with no env var defined, and shows the value when run as `VITE_APP_MESSAGE=test npm run dev`.
6. `git status` shows no `vercel.json`, `.env`, `dist/` or `node_modules/`.

## README.md contents

The README should be short and include:
- What the app is for (Vercel SPA-routing and env-var test)
- How to run locally
- The framework preset and settings Vercel should detect: **Vite**, build command `npm run build`, output directory `dist`
- A "Test script" section containing the human checklist below, verbatim

### Human checklist (put in README)

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

## Deliverable

A complete project folder, ready to `git init`, commit and push, with all acceptance checks passing. Reply with a short summary and the final file tree.
