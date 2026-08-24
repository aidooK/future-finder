/**
 * generate-og-images.mjs
 *
 * Build-time script: scans all MDX posts, and for every post that has
 * NO coverImage set in frontmatter, generates a static branded 1200x630
 * PNG at /public/og/[category]-[slug].png using satori + resvg.
 *
 * Run this BEFORE `next build` (see package.json script wiring below).
 * Safe to re-run — it skips any image that already exists unless
 * --force is passed, so it only does work for new posts.
 *
 * Usage:
 *   node scripts/generate-og-images.mjs
 *   node scripts/generate-og-images.mjs --force   (regenerate everything)
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, 'content')
const OUTPUT_DIR = path.join(ROOT, 'public', 'og')
const FONT_PATH = path.join(ROOT, 'fonts', 'Oswald.ttf')

const FORCE = process.argv.includes('--force')

const CATEGORY_COLORS = {
  jobs: '#D32F2F',
  scholarships: '#1565C0',
  'study-abroad': '#2E7D32',
  entrepreneurship: '#EF6C00',
  'growth-mindset': '#6A1B9A',
}

const CATEGORY_LABELS = {
  jobs: 'JOBS',
  scholarships: 'SCHOLARSHIPS',
  'study-abroad': 'STUDY ABROAD',
  entrepreneurship: 'ENTREPRENEURSHIP',
  'growth-mindset': 'GROWTH MINDSET',
}

function isDeadlineUrgent(deadline) {
  if (!deadline || deadline.toLowerCase().includes('rolling')) return false
  const days = (new Date(deadline).getTime() - Date.now()) / 86400000
  return days >= 0 && days <= 14
}

function buildCardTree({ title, category, urgent }) {
  const color = CATEGORY_COLORS[category] || '#D32F2F'
  const label = CATEGORY_LABELS[category] || 'OPPORTUNITY'

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        background: '#0F0F0F',
        position: 'relative',
      },
      children: [
        // Top color band
        {
          type: 'div',
          props: { style: { display: 'flex', height: 14, width: '100%', background: color } },
        },
        // Diagonal accent
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              right: 0,
              width: 420,
              height: 630,
              background: color,
              opacity: 0.08,
              transform: 'skewX(-12deg) translateX(120px)',
              display: 'flex',
            },
          },
        },
        // Content column
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '56px 64px',
              justifyContent: 'space-between',
            },
            children: [
              // Header row
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 14 },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                display: 'flex',
                                width: 48,
                                height: 48,
                                borderRadius: 10,
                                background: color,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: 26,
                                fontWeight: 800,
                              },
                              children: 'F',
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', color: '#fff', fontSize: 24, fontWeight: 700 },
                              children: 'Future Finder',
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          padding: '8px 20px',
                          borderRadius: 24,
                          background: color,
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                        },
                        children: label,
                      },
                    },
                  ],
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    color: '#fff',
                    fontSize: title.length > 70 ? 44 : 56,
                    fontWeight: 800,
                    lineHeight: 1.15,
                    maxWidth: 980,
                  },
                  children: title,
                },
              },
              // Footer row
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
                  children: [
                    {
                      type: 'div',
                      props: { style: { display: 'flex', color: '#999', fontSize: 20 }, children: 'futurefinder.blog' },
                    },
                    urgent
                      ? {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              padding: '8px 20px',
                              borderRadius: 24,
                              background: '#B71C1C',
                              color: '#fff',
                              fontSize: 16,
                              fontWeight: 700,
                            },
                            children: '🔴 URGENT DEADLINE',
                          },
                        }
                      : { type: 'div', props: { children: '' } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function generateOne(fontData, { title, category, urgent, outPath }) {
  const svg = await satori(buildCardTree({ title, category, urgent }), {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Oswald', data: fontData, weight: 700, style: 'normal' }],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  const png = resvg.render().asPng()
  fs.writeFileSync(outPath, png)
}

async function main() {
  if (!fs.existsSync(FONT_PATH)) {
    console.error(`Font not found at ${FONT_PATH}. Add fonts/Oswald.ttf to the repo root.`)
    process.exit(1)
  }
  const fontData = fs.readFileSync(FONT_PATH)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const VALID_CATEGORIES = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']

  const categories = fs.readdirSync(CONTENT_DIR).filter(d =>
    fs.statSync(path.join(CONTENT_DIR, d)).isDirectory() &&
    VALID_CATEGORIES.includes(d)
  )

  let generated = 0
  let skipped = 0
  let failed = 0

  for (const category of categories) {
    const dir = path.join(CONTENT_DIR, category)
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data } = matter(raw)

      // Skip posts that already have a real cover image — don't override editorial images.
      if (data.coverImage) {
        skipped++
        continue
      }

      const outPath = path.join(OUTPUT_DIR, `${category}-${slug}.png`)
      if (fs.existsSync(outPath) && !FORCE) {
        skipped++
        continue
      }

      const urgent = isDeadlineUrgent(data.deadline)
      try {
        await generateOne(fontData, { title: data.title || slug, category, urgent, outPath })
        generated++
        console.log(`✓ generated /public/og/${category}-${slug}.png`)
      } catch (err) {
        // NEVER let one post's OG image failure take down the entire site build.
        // Log it clearly, skip it, keep going — that post just falls back to
        // the default logo.png until the underlying issue is fixed.
        failed++
        console.error(`✗ FAILED to generate OG image for ${category}/${slug} — falling back to default image.`)
        console.error(`  Reason: ${err.message}`)
      }
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}, Failed (using fallback image): ${failed}`)
  if (failed > 0) {
    console.log(`\n⚠ ${failed} post(s) failed OG generation but the build continued. Check the log above and fix when convenient — these posts are still live, just without a custom social preview image.`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
