import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  buildJobCard,
  formatCalendarDate,
  normalizeDeadline,
  normalizeExpired,
  type JobCardModel,
} from './opportunity'

import { categoryMeta } from './categories'

export { categoryMeta }

const contentDir = path.join(process.cwd(), 'content')
const publishedDir = path.join(contentDir, '.published')

export type PostMeta = {
  slug: string
  category: string
  title: string
  date: string
  deadline?: string
  deadlineTimezone?: string
  timezone?: string
  expired?: boolean
  location?: string
  benefit?: string
  applyUrl?: string
  excerpt?: string
  type?: string
  featured?: boolean
  tags?: string[]
  coverImage?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: 'photo' | 'poster' | 'logo' | string
  thumbnailPosition?: string
  imageAlt?: string
  imageCaption?: string
  imageCredit?: string
  illustrative?: boolean
}

export type Post = PostMeta & { content: string }

export function getPostSlugs(category: string): string[] {
  const slugs = new Set<string>()
  for (const dir of [path.join(publishedDir, category), path.join(contentDir, category)]) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) slugs.add(file.replace(/\.mdx?$/, ''))
    }
  }
  return [...slugs]
}

export function getPost(category: string, slug: string): Post | null {
  const publishedPath = path.join(publishedDir, category, `${slug}.mdx`)
  const fullPath = path.join(contentDir, category, `${slug}.mdx`)
  const fallback = path.join(contentDir, category, `${slug}.md`)
  const filePath = fs.existsSync(publishedPath) ? publishedPath : fs.existsSync(fullPath) ? fullPath : fs.existsSync(fallback) ? fallback : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    category,
    content,
    ...data,
    deadline: normalizeDeadline(data.deadline),
    expired: normalizeExpired(data.expired) || undefined,
  } as Post
}

export function getOpportunities(category?: string): PostMeta[] {
  return getAllPosts(category)
}

export function getOpportunityBySlug(category: string, slug: string): Post | null {
  return getPost(category, slug)
}

export function getJobCards(): JobCardModel[] {
  return getPostSlugs('jobs')
    .map(slug => getOpportunityBySlug('jobs', slug))
    .filter((post): post is Post => post !== null)
    .map(post => buildJobCard(post))
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.slug.localeCompare(b.slug))
}

export function getAllPosts(category?: string): PostMeta[] {
  const VALID_CATEGORIES = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']
  const categories = category
    ? (VALID_CATEGORIES.includes(category) ? [category] : [])
    : VALID_CATEGORIES

  const posts: PostMeta[] = []
  for (const cat of categories) {
    const slugs = getPostSlugs(cat)
    for (const slug of slugs) {
      const post = getPost(cat, slug)
      if (post) {
        const { content, ...meta } = post
        posts.push(meta)
      }
    }
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentPosts(category?: string, limit = 6): PostMeta[] {
  return getAllPosts(category).slice(0, limit)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(dateStr.trim())
  if (!match) return dateStr
  return formatCalendarDate(match[1])
}
