import { notFound } from 'next/navigation'
import { getAllPosts, categoryMeta } from '@/lib/content'
import PostCard from '@/components/ui/PostCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import type { Metadata } from 'next'

const validCategories = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']

type Props = { params: { category: string } }

export async function generateStaticParams() {
  return validCategories.map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = categoryMeta[params.category]
  if (!meta) return {}
  return {
    title: `${meta.label} for African Youth`,
    description: meta.description,
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params
  if (!validCategories.includes(category)) notFound()

  const meta = categoryMeta[category]
  const posts = getAllPosts(category)

  return (
    <>
      {/* Category Hero */}
      <section style={{ background: '#1A1A1A', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 40, background: '#D32F2F', borderRadius: 2 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                Future Finder /
              </p>
              <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                {meta.label}
              </h1>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#888', maxWidth: 600, lineHeight: 1.7 }}>
            {meta.description}
          </p>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#555', marginTop: 12 }}>
            {posts.length} {posts.length === 1 ? 'opportunity' : 'opportunities'} listed
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ background: '#F5F5F5', padding: '48px 24px', minHeight: 400 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', border: '2px dashed #ddd', borderRadius: 8, background: '#fff' }}>
              <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 22, color: '#ccc', marginBottom: 12 }}>No posts yet</h3>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa' }}>
                Add MDX files to <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 3 }}>content/{category}/</code> to publish here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {posts.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup variant="band" />
    </>
  )
}
