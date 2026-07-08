# FUTURE FINDER — OPERATING SKILLS & ROUTINES
# Merged & updated: 2026-07-08

## DELIVERY RULES (always apply)
- Always zip ANY file Kobie needs to download and push (MDX, code, images, flyers, exports) — never inline-only.
- FF Linktree (https://linktr.ee/future.finder) in every post's social/follow CTA.
- Keep explanations brief, direct, no sugarcoating.
- Act as an experienced professional in the relevant field per request (web dev, SEO, content strategy, growth).
- Execute without waiting for permission except on critical/destructive actions (e.g. handing over credentials, deleting content).
- For business/money topics: bring monetization angle (YouTube, investments, product, revenue streams) proactively.
- Interview Kobie when scoping a new initiative to get full context before building.
- Any new recurring routine or skill discovered in a session gets added to this file.

---

## 1. SITE FUNDAMENTALS
- **Live URL:** futurefinder.blog
- **GitHub:** github.com/aidooK/future-finder
- **Local path:** C:\Users\blank\Desktop\future-finder
- **Stack:** Next.js 14 (static export, `output: 'export'`) + Tailwind + gray-matter (MDX)
- **Hosting:** Cloudflare Pages (future-finder.pages.dev), domain via Hostinger, nameservers on Cloudflare
- **GA4 ID:** G-MSYRMXTCST
- **Connected Gmail (Claude):** office.futurefinder@gmail.com (connected July 2026)
- **GitHub automation:** Fine-grained PAT (Contents read/write, future-finder repo only) provided July 2026 — enables direct clone/commit/push, skipping the manual zip-download-place-push cycle for routine updates
- **Linktree:** https://linktr.ee/future.finder
- **WhatsApp channel:** 840+ subscribers as of June 2026

---

## 2. INFRASTRUCTURE CONSTRAINT — CLOUDFLARE PAGES STATIC EXPORT (critical)
FF is a Next.js static export. This means:
- NO API routes / edge functions run at request time — `next/og`, `/app/api/*` routes 404 in production even though they work locally. Confirmed July 2026.
- Any "dynamic" feature (OG images, on-the-fly generation) must be pre-computed at BUILD TIME and shipped as static files.
- Before proposing any dynamic feature: check whether static export can run it. If it needs a server/edge runtime, either find a build-time alternative or explicitly flag the tradeoff of switching to `@cloudflare/next-on-pages` (bigger pipeline change — never do this silently).

---

## 3. OG IMAGE GENERATION (build-time, static — fixed July 2026)
- Script: `scripts/generate-og-images.mjs` — run before `next build`
- Uses satori + @resvg/resvg-js (Node-compatible, no edge runtime needed)
- Scans all `content/*/*.mdx`, skips any post that already has `coverImage` set
- Outputs branded 1200x630 PNG to `/public/og/[category]-[slug].png` per post
- `page.tsx` resolves image via: `coverImage` (if set) → `/og/[category]-[slug].png` (fallback)
- Same resolved image used for BOTH the visible post hero `<img>` AND the OG/Twitter share meta tags — one source of truth
- Re-run script anytime new posts are added; skips existing images unless `--force` passed
- Requires `fonts/Oswald.ttf` in repo root (Satori needs explicit font data, no system fonts in Node)

---

## 4. CONTENT STRUCTURE
```
content/jobs/
content/scholarships/
content/study-abroad/
content/entrepreneurship/
content/growth-mindset/
```
Five categories only — new content types fold into these.

### Frontmatter template
```yaml
---
title: "Full title"
category: "jobs"
date: "YYYY-MM-DD"
deadline: "YYYY-MM-DD"        # or "Rolling basis" — NEVER fabricate a date
location: "City, Country"
benefit: "What is offered"
applyUrl: "https://direct-application-link.com"
excerpt: "Max 160 chars"
featured: false
tags: ["tag1", "tag2"]
coverImage: "/images/posts/x.jpg"   # optional — falls back to auto-generated OG image
---
```

### Deadline rules
- No verifiable date anywhere online → `"Rolling basis"` (this is accurate for open-until-filled roles, e.g. Academic City lecturer posts — not a placeholder/workaround)
- `urgentDeadline: true` if closing within ~14 days (renders red on site)
- Expired posts → `expired: true` + `[CLOSED]` title prefix (keep live for SEO, never delete)

### Editorial rules
- Skip duplicates already covered in prior batches; merge near-identical listings for the same role
- Skip listings with no company name
- Include informal/local postings (WhatsApp-apply roles) if legitimate
- Never invent details — ask if something critical is missing

---

## 5. WORLD CUP 2026 MATCH POST FORMAT
File naming: `wc2026-[team1]-vs-[team2]-june-[dd].mdx` → `content/growth-mindset/`

Structure per post:
1. Match preview — **always include kickoff time, stadium name, city, group**
2. What to Watch For (tactical angle)
3. Country-specific scholarship/opportunity tie-in
4. "Watch Free" CTA → streaming site link (placeholder `https://futurefinder.blog`, Kobie replaces before push)
5. WhatsApp + Linktree CTA block

Prioritize: African teams + major study-destination countries (UK, France, Germany, Belgium, Portugal, Spain, Netherlands, Türkiye, Japan, Canada, USA).

**Proof of concept:** Ghana vs Panama post (June 17) drove 79 visitors in one day, 64 from Ghana, 67 brand-new sessions.

---

## 6. GIT WORKFLOW
Windows PowerShell — run commands **separately**, never chained with `&&`:
```powershell
git add .
git commit -m "message"
git push
```
- "no upstream branch" → `git push --set-upstream origin main`
- Diverged histories → `git fetch origin` then `git reset --hard origin/main`

**Claude-side automation (when PAT is active in-session):** clone via `https://<TOKEN>@github.com/aidooK/future-finder.git`, edit, commit, push directly — skips zip cycle for that session. Token is session-scoped only; new chats need it re-supplied unless Kobie stores it for reuse.

---

## 7. EMAIL OPPORTUNITY INTAKE (office.futurefinder@gmail.com — connected)
- Search inbox for opportunity-shaped subject lines/senders, flag likely candidates
- **Limitation:** newsletter-style digests (e.g. ALX Ghana weekly digest) often link out via tracked redirect URLs rather than containing full listings in-body — these still need Kobie to paste the real listing text in; full auto-scrape isn't reliable for that format
- Plain-text forwarded opportunity emails work best as automation input

---

## 8. DESIGN / FLYER GENERATION (Canva — connected)
- No Brand Kit set up yet in Canva as of July 2026 — recommend creating one (colors + fonts) so future generations don't need explicit re-description each time
- Brand specs: Red #D32F2F, Dark #1A1A1A, White · Oswald (headings) · Lato (body)
- Canva is a third-party consumer tool — confirm connector choice before generating unless Kobie has already named Canva in-session

---

## 9. SOCIAL / VIDEO CONTENT
- **Platforms:** IG, LinkedIn, WhatsApp channel, YouTube, TikTok
- Every asset includes Linktree: https://linktr.ee/future.finder
- Repurpose MDX posts into captions/scripts rather than writing from scratch each time

### SEQUENCING RULE — CRITICAL
Flyers, captions, video scripts, and broadcast messages tied to a SPECIFIC post must only be generated AFTER that post is live and Kobie confirms the push succeeded — so assets link to the real, live URL, not a placeholder.
**Exception:** general brand-awareness flyers (not tied to one post) can be generated anytime.

**Rollout order (per Kobie, July 2026):**
1. Flyers — in use now (WhatsApp + Instagram)
2. Short-form video scripts — apply to subsequent/future posts
3. Broadcast calendar — apply to subsequent/future posts
4. Canva Brand Kit setup — whenever convenient

---

## 10. SITE AUDIT ROUTINE (run periodically)
1. web_fetch homepage + 1 sample post per category
2. Check for: missing `coverImage` frontmatter, "Invalid Date" deadline bugs, broken OG tags, missing alt text
3. Check Cloudflare redirect/DNS health if infra was recently touched
4. Report findings as a prioritized punch list, not just observations

---

## 11. KNOWN ISSUES LOG
| Issue | Status | Fix |
|---|---|---|
| Posts missing `deadline` → "Invalid Date" on live site | Ongoing risk | Always validate deadline format before shipping; "Rolling basis" if no real date exists |
| Academic City lecturer posts had invalid deadline | ✅ Fixed | Set to "Rolling basis" — role is genuinely open-until-filled |
| Posts missing `coverImage` fell back to generic logo.png | ✅ Fixed July 2026 | Build-time OG image generator (see section 3) |
| www / pages.dev duplicate content (GSC) | Open | Cloudflare Redirect Rule: www → root; requires www DNS record to exist + be proxied first |
| Sitemap manually maintained | Ongoing | Update after each content batch, resubmit in GSC |
| GSC "some fixes failed" (Jul 3 email) | Open — not yet investigated | Pending |
| Formspree volunteer form | ✅ Fixed | Real form ID installed, confirmed working |
| Logo sizing/favicon | ✅ Fixed | White pill background, original colors preserved |

---

## 12. MONETISATION ROADMAP
- 0–1,000 monthly visitors: content only, no monetisation
- 1,000+: apply Google AdSense
- 5,000+: sponsored posts ($100–500/post)
- Later: affiliate partnerships (Coursera, edX, etc.)

---

## OTHER REPO DOCS (reference, not duplicated here)
- `README-INSTALL.md` — local setup instructions
- `CONTENT-GUIDE.md` — category-specific writing templates
- `scripts/generate-og-images.mjs` — OG image build script (see section 3)
