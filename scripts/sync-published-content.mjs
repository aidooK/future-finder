/**
 * Build-time content sync.
 * When CONTENT_API_URL is unset, the public site keeps reading content/*.mdx.
 * When it is set, published Django revisions replace content/.published
 * for the categories named in CONTENT_API_CATEGORIES (jobs, until more are connected).
 * A failed fetch fails the build so a deploy hook cannot ship a silent stale site.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const api = process.env.CONTENT_API_URL?.replace(/\/$/, '').trim()
const categories = (process.env.CONTENT_API_CATEGORIES || 'jobs')
  .split(',')
  .map(category => category.trim())
  .filter(Boolean)
const publishedRoot = path.join(ROOT, 'content', '.published')
const mediaRoot = path.join(ROOT, 'public', 'media', 'published')
const manifestPath = path.join(ROOT, 'public', 'deploy-manifest.json')

if (!api) {
  fs.rmSync(manifestPath, { force: true })
  console.log('CONTENT_API_URL is unset. The public site will build from content MDX files.')
  process.exit(0)
}

const opportunities = []
for (const category of categories) {
  let next = `${api}/api/opportunities/?category=${encodeURIComponent(category)}`
  while (next) {
    const response = await fetch(next)
    if (!response.ok) {
      console.error(`Published content request failed (${response.status}). The website build was stopped.`)
      process.exit(1)
    }
    const body = await response.json()
    if (!Array.isArray(body.results)) {
      console.error('The Django CMS response did not include a results list.')
      process.exit(1)
    }
    opportunities.push(...body.results)
    next = body.next
  }
}

for (const category of categories) {
  fs.rmSync(path.join(publishedRoot, category), { recursive: true, force: true })
}
fs.rmSync(mediaRoot, { recursive: true, force: true })
fs.mkdirSync(mediaRoot, { recursive: true })

const revisionIds = []
for (const opportunity of opportunities) {
  if (!opportunity?.revision_id || !opportunity.slug || !opportunity.category) {
    console.error('A published opportunity was missing its revision, slug, or category.')
    process.exit(1)
  }
  if (!categories.includes(opportunity.category)) continue
  revisionIds.push(opportunity.revision_id)
  const thumbnail = await localImage(opportunity.thumbnail)
  const detailImage = await localImage(opportunity.detail_image)
  const originalPoster = await localImage(opportunity.poster)
  const pageImage = detailImage || originalPoster
  const dir = path.join(publishedRoot, opportunity.category)
  fs.mkdirSync(dir, { recursive: true })
  const applyUrl = opportunity.apply_email
    ? `mailto:${opportunity.apply_email}${opportunity.email_subject ? `?subject=${encodeURIComponent(opportunity.email_subject)}` : ''}`
    : opportunity.apply_url || undefined
  const frontmatter = compact({
    title: opportunity.title,
    category: opportunity.category,
    date: (opportunity.updated_at || '').slice(0, 10),
    deadline: opportunity.deadline,
    deadlineTimezone: opportunity.deadline_timezone,
    location: opportunity.location,
    benefit: opportunity.funding,
    applyUrl,
    excerpt: opportunity.summary,
    type: opportunity.opportunity_type,
    thumbnail,
    coverImage: pageImage,
    poster: originalPoster && originalPoster !== pageImage ? originalPoster : pageImage,
    thumbnailType: opportunity.thumbnail_type,
    imageAlt: opportunity.image_alt,
    imageCaption: opportunity.image_caption,
    imageCredit: opportunity.image_credit,
    illustrative: opportunity.illustrative || undefined,
  })
  fs.writeFileSync(path.join(dir, `${opportunity.slug}.mdx`), matter.stringify(articleBody(opportunity), frontmatter))
}

fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
fs.writeFileSync(
  manifestPath,
  `${JSON.stringify({ source: 'django-cms', revisionIds, generatedAt: new Date().toISOString() }, null, 2)}\n`,
)
console.log(`Wrote ${revisionIds.length} published opportunities for ${categories.join(', ')}.`)

async function localImage(asset) {
  if (!asset?.url) return undefined
  if (asset.url.startsWith('/api/media/')) {
    const response = await fetch(`${api}${asset.url}`)
    if (!response.ok) {
      console.error(`Could not download published media ${asset.url}.`)
      process.exit(1)
    }
    const type = asset.content_type || response.headers.get('content-type') || ''
    const extension = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : '.jpg'
    const filename = `${asset.id}${extension}`
    fs.writeFileSync(path.join(mediaRoot, filename), Buffer.from(await response.arrayBuffer()))
    return `/media/published/${filename}`
  }
  if (asset.url.startsWith('/') && !asset.url.startsWith('//')) return asset.url
  console.error('A published image used an unsupported address.')
  process.exit(1)
}

function articleBody(opportunity) {
  const body = opportunity.body || ''
  const eligibility = (opportunity.eligibility || '').trim()
  if (!eligibility || /^#{2,3}\s+eligibility\b/im.test(body)) return body
  return `${body.trim()}\n\n## Eligibility\n\n${eligibility}\n`
}

function compact(record) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value != null && value !== ''))
}
