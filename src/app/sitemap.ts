import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content'

const SITE_URL = 'https://futurefinder.blog'

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
  { url: `${SITE_URL}/jobs/`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${SITE_URL}/scholarships/`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${SITE_URL}/study-abroad/`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${SITE_URL}/entrepreneurship/`, lastModified: new Date(), changeFrequency: 'daily',priority: 0.9 },
  { url: `${SITE_URL}/growth-mindset/`,lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${SITE_URL}/about/`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/contact/`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/submit/`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/newsletter/`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/volunteer/`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/privacy/`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/${post.category}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.9 : 0.8,
  }))

  return [...STATIC_PAGES, ...postPages]
}
