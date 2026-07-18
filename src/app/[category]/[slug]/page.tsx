import { notFound } from 'next/navigation'
import { getPost, getPostSlugs, getAllPosts, categoryMeta, isDeadlineUrgent, formatDate } from '@/lib/content'
import Link from 'next/link'
import PostCard from '@/components/ui/PostCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import type { Metadata } from 'next'

const validCategories = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']
const SITE_URL = 'https://futurefinder.blog'

type Props = { params: { category: string; slug: string } }

// Resolves the image used for BOTH the visible hero <img> and the OG/Twitter
// social preview. Priority: real coverImage from frontmatter > build-time
// generated static PNG at /public/og/[category]-[slug].png (see
// scripts/generate-og-images.mjs, which runs before `next build`).
function resolveOgImage(post: { coverImage?: string }, category: string, slug: string): string {
  if (post.coverImage) {
    return post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`
  }
  return `${SITE_URL}/og/${category}-${slug}.png`
}

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

  const description = post.excerpt || `${post.title} — full details and application guide on Future Finder.`
  const pageUrl = `${SITE_URL}/${params.category}/${params.slug}/`
  const imageUrl = resolveOgImage(post, params.category, params.slug)

  return {
    title: post.title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'article',
      url: pageUrl,
      siteName: 'Future Finder',
      title: post.title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
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
  const heroImageUrl = resolveOgImage(post, category, slug)

  const contentHtml = post.content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^(?!<[hul]|<li|<strong|<em|<a)(.+)$/gm, '<p>$1</p>')
    .replace(/\n\n/g, '')

  return (
    <>
      <style>{`
        .post-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .post-layout { grid-template-columns: 1fr 320px; }
        }
        .post-hero {
          width: 100%;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 32px;
          display: block;
          background: #0F0F0F;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px 24px;
        }
        @media (min-width: 500px) {
          .summary-grid { grid-template-columns: 1fr 1fr; }
        }
        .post-content h2 {
          font-family: var(--font-oswald);
          font-size: 22px;
          font-weight: 700;
          color: #1A1A1A;
          margin: 32px 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .post-content h3 {
          font-family: var(--font-oswald);
          font-size: 18px;
          font-weight: 600;
          color: #1A1A1A;
          margin: 24px 0 8px;
        }
        .post-content p { margin-bottom: 16px; font-family: var(--font-lato); font-size: 16px; line-height: 1.8; color: #333; }
        .post-content ul { margin: 0 0 16px 20px; }
        .post-content li { margin-bottom: 6px; font-family: var(--font-lato); font-size: 15px; line-height: 1.7; color: #333; }
        .post-content a { color: #D32F2F; }
        .post-content strong { color: #1A1A1A; font-weight: 700; }
        .post-content table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        .post-content th { background: #1A1A1A; color: #fff; padding: 10px 14px; font-family: var(--font-oswald); text-align: left; }
        .post-content td { padding: 10px 14px; border-bottom: 1px solid #E5E5E5; font-family: var(--font-lato); font-size: 14px; }
        .apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #D32F2F;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-lato);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: background 0.2s;
        }
        .apply-btn:hover { background: #B71C1C; }
      `}</style>

      <div style={{ background: '#1A1A1A', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-lato)', fontSize: 12, color: '#666' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href={`/${category}`} style={{ color: '#666', textDecoration: 'none' }}>{meta.label}</Link>
          <span>›</span>
          <span style={{ color: '#aaa' }}>{post.title}</span>
        </div>
      </div>

      <div className="post-layout">
        <article>
          <img src={heroImageUrl} alt={post.title} className="post-hero" />

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-lato)', background: (meta.color || '#D32F2F') + '18', color: meta.color }}>
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

          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 32 }}>
            {post.title}
          </h1>

          <div style={{ borderLeft: '4px solid #D32F2F', background: '#FFEBEE', padding: '20px 24px', borderRadius: '0 8px 8px 0', marginBottom: 40 }}>
            <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 600, color: '#D32F2F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
              Quick Summary
            </h3>
            <div className="summary-grid">
              {post.location && <SummaryItem label="Location" value={post.location} />}
              {post.deadline && <SummaryItem label="Deadline" value={formatDate(post.deadline)} urgent={urgent} />}
              {post.benefit && <SummaryItem label="Benefit" value={post.benefit} />}
            </div>
            {post.applyUrl && (
              <a href={post.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-btn" style={{ marginTop: 20, display: 'inline-flex' }}>
                Apply Now →
              </a>
            )}
          </div>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          <NewsletterSignup variant="inline" />

          {post.applyUrl && (
            <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: 8, textAlign: 'center', margin: '32px 0' }}>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', marginBottom: 16 }}>
                Ready to apply? Don't wait — deadlines move fast.
              </p>
              <a href={post.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-btn">
                Apply for this Opportunity →
              </a>
            </div>
          )}
        </article>

        <aside style={{ position: 'sticky', top: 80 }}>
          <ShareBox category={category} slug={slug} title={post.title} />

          {related.length > 0 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Related</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {related.map(p => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}

function ShareBox({ category, slug, title }: { category: string; slug: string; title: string }) {
  const url = `https://futurefinder.blog/${category}/${slug}`
  const text = encodeURIComponent(`${title} — via Future Finder`)
  const encodedUrl = encodeURIComponent(url)

  const buttons = [
    { label: 'WhatsApp', color: '#25D366', href: `https://wa.me/?text=${text}%20${encodedUrl}` },
    { label: 'Telegram', color: '#0088cc', href: `https://t.me/share/url?url=${encodedUrl}&text=${text}` },
    { label: 'X / Twitter', color: '#000', href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}` },
    { label: 'Copy Link', color: '#555', href: url, copy: true },
  ]

  return (
    <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '20px', marginBottom: 24 }}>
      <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Share This Opportunity</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {buttons.map(({ label, color, href, copy }) => (
          <a
            key={label}
            href={copy ? undefined : href}
            target={copy ? undefined : '_blank'}
            rel="noopener noreferrer"
            onClick={copy ? (e) => { e.preventDefault(); navigator.clipboard?.writeText(href) } : undefined}
            style={{ padding: '8px 14px', background: color, color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
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
