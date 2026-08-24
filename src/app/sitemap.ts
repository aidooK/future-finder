import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content'

const SITE_URL = 'https://futurefinder.blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                  lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/jobs/`,             lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/scholarships/`,     lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/study-abroad/`,     lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/entrepreneurship/`, lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/growth-mindset/`,   lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/about/`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact/`,          lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/submit/`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/newsletter/`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/volunteer/`,        lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy/`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const posts = getAllPosts()

  const postPages: MetadataRoute.Sitemap = posts.map(post => {
    // Parse post date safely — fall back to now if invalid
    const d = new Date(post.date)
    const lastMod = isNaN(d.getTime()) ? now : d

    return {
      url: `${SITE_URL}/${post.category}/${post.slug}/`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.9 : 0.8,
    }
  })

  return [...staticPages, ...postPages]
}
