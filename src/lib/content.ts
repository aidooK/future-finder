import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type PostMeta = {
  slug: string
  category: string
  title: string
  date: string
  deadline?: string
  location?: string
  benefit?: string
  applyUrl?: string
  excerpt?: string
  featured?: boolean
  tags?: string[]
  coverImage?: string
}

export type Post = PostMeta & { content: string }

export function getPostSlugs(category: string): string[] {
  const dir = path.join(contentDir, category)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.mdx?$/, ''))
}

export function getPost(category: string, slug: string): Post | null {
  const fullPath = path.join(contentDir, category, `${slug}.mdx`)
  const fallback = path.join(contentDir, category, `${slug}.md`)
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(fallback) ? fallback : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, category, content, ...data } as Post
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

export function getFeaturedPosts(limit = 6): PostMeta[] {
  return getAllPosts().filter(p => p.featured).slice(0, limit)
}

export function getRecentPosts(category?: string, limit = 6): PostMeta[] {
  return getAllPosts(category).slice(0, limit)
}

export function isDeadlineUrgent(deadline?: string): boolean {
  if (!deadline) return false
  const d = new Date(deadline)
  const now = new Date()
  const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= 14
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  // Return non-date strings as-is (e.g. "Rolling basis", "Discontinued")
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export const categoryMeta: Record<string, { label: string; color: string; tagClass: string; description: string }> = {
  'jobs': {
    label: 'Jobs',
    color: '#1565C0',
    tagClass: 'tag-jobs',
    description: 'Real job opportunities across Ghana and Africa — from entry-level to senior roles, NGOs, tech, finance and more.'
  },
  'scholarships': {
    label: 'Scholarships',
    color: '#2E7D32',
    tagClass: 'tag-scholarships',
    description: 'Local and international scholarships open to African and Ghanaian students — fully funded and partial awards.'
  },
  'study-abroad': {
    label: 'Study Abroad',
    color: '#6A1B9A',
    tagClass: 'tag-study-abroad',
    description: 'Study abroad programs, exchange opportunities and international university admissions for African youth.'
  },
  'entrepreneurship': {
    label: 'Entrepreneurship',
    color: '#E65100',
    tagClass: 'tag-entrepreneurship',
    description: 'Grants, accelerators, competitions and funding programs for African entrepreneurs and startups.'
  },
  'growth-mindset': {
    label: 'Growth Mindset',
    color: '#F9A825',
    tagClass: 'tag-growth-mindset',
    description: 'Career guides, application tips, personal development and success stories from African youth.'
  },
}
