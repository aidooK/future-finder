import Link from 'next/link'
import { PostMeta, categoryMeta, isDeadlineUrgent, formatDate } from '@/lib/content'

type Props = { post: PostMeta; size?: 'default' | 'large' }

export default function PostCard({ post, size = 'default' }: Props) {
  const meta = categoryMeta[post.category]
  const urgent = isDeadlineUrgent(post.deadline)
  // NEW: Added trailing slash to match next.config.mjs `trailingSlash: true` configuration
  const href = `/${post.category}/${post.slug}/`

  return (
    <>
      <style>{`
        .post-card-link {
          text-decoration: none;
          display: block;
          height: 100%;
        }
        .post-card {
          background: #fff;
          border: 1px solid #E5E5E5;
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .post-card-accent {
          height: 4px;
          transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .post-card-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .post-card-link:hover .post-card {
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          transform: translateY(-4px);
          border-color: #D32F2F40;
        }
        .post-card-link:hover .post-card-accent {
          height: 6px;
        }
        .post-card-link:hover .post-card-arrow {
          transform: translateX(4px);
        }
        .post-card-tag {
          transition: transform 0.2s ease;
        }
        .post-card-link:hover .post-card-tag {
          transform: scale(1.05);
        }
      `}</style>
      <Link href={href} className="post-card-link">
        <article className="post-card">
          {/* Color accent bar */}
          <div className="post-card-accent" style={{ background: meta?.color || '#D32F2F' }} />

          <div style={{ padding: size === 'large' ? '24px' : '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Category tag + deadline */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
              <span className="post-card-tag" style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11,
                fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                fontFamily: 'var(--font-lato)', background: (meta?.color || '#D32F2F') + '18', color: meta?.color || '#D32F2F'
              }}>{meta?.label || post.category}</span>

              {post.deadline && (
                <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? '#D32F2F' : '#888', fontFamily: 'var(--font-lato)' }}>
                  {urgent ? '🔴 ' : ''}Deadline: {formatDate(post.deadline)}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-oswald)', fontSize: size === 'large' ? 22 : 17,
              fontWeight: 600, color: '#1A1A1A', lineHeight: 1.25, flex: 1
            }}>{post.title}</h3>

            {/* Meta info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {post.location && (
                <span style={{ fontSize: 12, color: '#666', fontFamily: 'var(--font-lato)' }}>📍 {post.location}</span>
              )}
              {post.benefit && (
                <span style={{ fontSize: 12, color: '#666', fontFamily: 'var(--font-lato)' }}>💰 {post.benefit}</span>
              )}
            </div>

            {post.excerpt && (
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, fontFamily: 'var(--font-lato)' }}>
                {post.excerpt}
              </p>
            )}

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'var(--font-lato)' }}>{formatDate(post.date)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#D32F2F', fontFamily: 'var(--font-lato)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Read More <span className="post-card-arrow">→</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </>
  )
}
