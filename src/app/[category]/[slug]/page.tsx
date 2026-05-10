import { notFound } from 'next/navigation'
import { getPost, getPostSlugs, getAllPosts, categoryMeta, isDeadlineUrgent, formatDate } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import PostCard from '@/components/ui/PostCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import type { Metadata } from 'next'

const validCategories = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']

type Props = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  const paths: { category: string; slug: string }[] = []
  for (const category of validCategories) {
    const slugs = getPostSlugs(category)
    slugs.forEach(slug => paths.push({ category, slug }))
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.category, params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — full details, eligibility and application guide on Future Finder.`,
    openGraph: { title: post.title, description: post.excerpt }
  }
}

export default function PostPage({ params }: Props) {
  const { category, slug } = params
  if (!validCategories.includes(category)) notFound()

  const post = getPost(category, slug)
  if (!post) notFound()

  const meta = categoryMeta[category]
  const urgent = isDeadlineUrgent(post.deadline)
  const related = getAllPosts(category).filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#1A1A1A', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-lato)', fontSize: 12, color: '#666' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href={`/${category}`} style={{ color: '#666', textDecoration: 'none' }}>{meta.label}</Link>
          <span>›</span>
          <span style={{ color: '#aaa' }}>{post.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }} className="post-layout">

        {/* Main content */}
        <article>
          {/* Category + Deadline */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-lato)', background: meta.color + '18', color: meta.color }}>
              {meta.label}
            </span>
            {post.deadline && (
              <span style={{ fontSize: 12, fontWeight: 700, color: urgent ? '#D32F2F' : '#888', fontFamily: 'var(--font-lato)' }}>
                {urgent ? '🔴 URGENT — ' : ''}Deadline: {formatDate(post.deadline)}
              </span>
            )}
            <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'var(--font-lato)', marginLeft: 'auto' }}>
              Published {formatDate(post.date)}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 32 }}>
            {post.title}
          </h1>

          {/* Quick Summary Box */}
          <div style={{ borderLeft: '4px solid #D32F2F', background: '#FFEBEE', padding: '20px 24px', borderRadius: '0 8px 8px 0', marginBottom: 40 }}>
            <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 600, color: '#D32F2F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
              Quick Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }} className="summary-grid">
              {post.location && <SummaryItem label="Location" value={post.location} />}
              {post.deadline && <SummaryItem label="Deadline" value={formatDate(post.deadline)} urgent={urgent} />}
              {post.benefit && <SummaryItem label="Benefit" value={post.benefit} />}
            </div>
            {post.applyUrl && (
              <a href={post.applyUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, background: '#D32F2F', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Apply Now →
              </a>
            )}
          </div>

          {/* MDX Content */}
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: 16, lineHeight: 1.8, color: '#333' }} className="post-content">
            <MDXRemote source={post.content} />
          </div>

          {/* Inline newsletter */}
          <NewsletterSignup variant="inline" />

          {/* Apply CTA at bottom */}
          {post.applyUrl && (
            <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: 8, textAlign: 'center', margin: '32px 0' }}>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', marginBottom: 16 }}>Ready to apply? Don't wait — deadlines move fast.</p>
              <a href={post.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Apply for this Opportunity →
              </a>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 80 }}>
          {/* Share */}
          <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '20px', marginBottom: 24 }}>
            <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Share this Opportunity</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['WhatsApp', '#25D366'], ['Telegram', '#0088cc'], ['Twitter', '#1DA1F2'], ['Facebook', '#1877F2']].map(([name, color]) => (
                <span key={name} style={{ padding: '8px 14px', background: color, color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer' }}>{name}</span>
              ))}
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Related Opportunities</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {related.map(p => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .post-layout { grid-template-columns: 1fr !important; }
        @media (min-width: 900px) { .post-layout { grid-template-columns: 1fr 320px !important; } }
        .summary-grid { grid-template-columns: 1fr !important; }
        @media (min-width: 500px) { .summary-grid { grid-template-columns: 1fr 1fr !important; } }
        .post-content h2 { font-family: var(--font-oswald); font-size: 24px; font-weight: 700; color: #1A1A1A; margin: 32px 0 12px; text-transform: uppercase; letter-spacing: 0.02em; }
        .post-content h3 { font-family: var(--font-oswald); font-size: 18px; font-weight: 600; color: #1A1A1A; margin: 24px 0 8px; }
        .post-content p { margin-bottom: 16px; }
        .post-content ul, .post-content ol { margin: 0 0 16px 20px; }
        .post-content li { margin-bottom: 6px; }
        .post-content a { color: #D32F2F; }
        .post-content strong { color: #1A1A1A; }
      `}</style>
    </>
  )
}

function SummaryItem({ label, value, urgent }: { label: string; value: string; urgent?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-lato)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-lato)', fontSize: 14, fontWeight: 700, color: urgent ? '#D32F2F' : '#1A1A1A' }}>{value}</div>
    </div>
  )
}
