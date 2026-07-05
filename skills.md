# Future Finder — Operating Skills & Routines

## Delivery Rules (always apply)
- Always zip files that need to be downloaded and pushed — never inline code blocks only.
- FF Linktree (https://linktr.ee/future.finder) in every post's social/follow CTA.
- Keep explanations brief, direct, no sugarcoating.
- Act as an experienced professional in the relevant field per request (web dev, SEO, content strategy, growth).
- Execute without waiting for permission except on critical/destructive actions.
- For business/money topics: bring monetization angle (YouTube, investments, product, revenue streams) proactively.
- Interview Kobie when scoping a new initiative to get full context before building.
- Any new recurring routine or skill discovered in a session gets added to this file.

## Site Audit Routine (run periodically)
1. web_fetch homepage + 1 sample post per category
2. Check for: missing coverImage frontmatter, "Invalid Date" deadline bugs, broken OG tags, missing alt text
3. Check Cloudflare redirect/DNS health if infra was recently touched
4. Report findings as a prioritized punch list, not just observations

## Known Recurring Bugs to Watch For
- Posts missing `deadline` field render as "Invalid Date" on the live site — always validate deadline format before shipping a post. If no real deadline exists anywhere online, use "Rolling basis" — never fabricate a date.
- Posts missing `coverImage` fall back to generic /logo.png in both UI cards and OG/social previews. FIXED July 2026 via build-time static OG image generator — see below.
- www→root redirect requires DNS record for www to exist and be proxied before the Cloudflare redirect rule takes effect.

## Infrastructure Constraint — Cloudflare Pages Static Export
FF is deployed as a Next.js static export (`output: 'export'`) on Cloudflare Pages
(future-finder.pages.dev). This means:
- NO API routes / edge functions run at request time — `next/og`, `/app/api/*`
  routes will 404 in production even though they work locally. Confirmed July 2026.
- Any dynamic-looking feature (OG images, on-the-fly generation) must be
  pre-computed at BUILD TIME and shipped as static files instead.
- Before proposing any "dynamic" feature for FF, check: can Cloudflare Pages
  static export actually run it? If it needs a server/edge runtime, either
  find a build-time alternative or flag the tradeoff of switching to
  @cloudflare/next-on-pages (bigger pipeline change, not to be done silently).

## OG Image Generation (build-time, static)
- Script: scripts/generate-og-images.mjs — run before `next build`
- Uses satori + @resvg/resvg-js (Node-compatible, no edge runtime needed)
- Scans all content/*/*.mdx, skips any post that already has `coverImage` set
- Outputs branded 1200x630 PNG to /public/og/[category]-[slug].png per post
- page.tsx resolves image via: coverImage (if set) > /og/[category]-[slug].png (fallback)
- Same resolved image used for BOTH the visible post hero <img> AND
  the OG/Twitter social share meta tags — one source of truth
- Re-run script anytime new posts are added; it skips existing images
  unless --force flag is passed
- Requires fonts/Oswald.ttf in repo root (Satori needs explicit font data,
  no system fonts in Node)

## Content Format
- MDX frontmatter: title, category, date, deadline (YYYY-MM-DD or "Rolling basis"), location, benefit, applyUrl, excerpt (≤160 char), featured, tags, coverImage (optional but should be added whenever possible)
- Folders: content/jobs, content/scholarships, content/study-abroad, content/entrepreneurship, content/growth-mindset
- World Cup content: African teams + high-stakes matches only, tie in real scholarship/job opportunities relevant to competing nations
