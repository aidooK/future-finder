# Installing the OG Image Generator

## 1. Copy files into your project
- scripts/generate-og-images.mjs → your repo's scripts/
- fonts/Oswald.ttf → your repo root (create fonts/ folder)
- src/app/[category]/[slug]/page.tsx → replaces your existing file

## 2. Install dependencies
```bash
npm install satori @resvg/resvg-js gray-matter
```

## 3. Wire into your build — add to package.json scripts:
```json
"scripts": {
  "generate-og": "node scripts/generate-og-images.mjs",
  "prebuild": "node scripts/generate-og-images.mjs",
  "build": "next build"
}
```
`prebuild` runs automatically before `next build` on most setups (including
Cloudflare Pages' npm build step) — no extra Cloudflare config needed.

## 4. First run — generate images for ALL existing posts
```bash
npm run generate-og
```
This creates /public/og/[category]-[slug].png for every post that doesn't
already have a coverImage set. Commit these PNGs to git — Cloudflare Pages
serves /public as static assets directly.

## 5. Fix the 2 Academic City deadline bugs
See deadline-fix-instructions.md — change both files' `deadline:` field to
"Rolling basis" (no fixed deadline exists for either role).

## 6. Push
```bash
git add .
git commit -m "Add static build-time OG image generator, fix deadline bugs, add hero images to posts"
git push
```

## 7. Verify after Cloudflare redeploys
- Visit any post — should show a branded hero image at the top now
- Visit /og/jobs-[some-slug].png directly — should load as a PNG image
- Re-scrape with Facebook Sharing Debugger to confirm new previews
