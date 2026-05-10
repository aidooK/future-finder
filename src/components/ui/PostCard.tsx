import Link from 'next/link'
import { PostMeta, categoryMeta, isDeadlineUrgent, formatDate } from '@/lib/content'

type Props = { post: PostMeta; size?: 'default' | 'large' }

export default function PostCard({ post, size = 'default' }: Props) {
  const meta = categoryMeta[post.category]
  const urgent = isDeadlineUrgent(post.deadline)
  const href = `/${post.category}/${post.slug}`

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8,
        overflow: 'hidden', transition: 'all 0.2s', height: '100%',
        display: 'flex', flexDirection: 'column'
      }}
        onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-2px)' }}
        onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'none' }}
      >
        {/* Color accent bar */}
        <div style={{ height: 4, background: meta?.color || '#D32F2F' }} />

        <div style={{ padding: size === 'large' ? '24px' : '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Category tag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11,
              fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
              fontFamily: 'var(--font-lato)', background: meta?.color + '18', color: meta?.color
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
              <span style={{ fontSize: 12, color: '#666', fontFamily: 'var(--font-lato)' }}>
                📍 {post.location}
              </span>
            )}
            {post.benefit && (
              <span style={{ fontSize: 12, color: '#666', fontFamily: 'var(--font-lato)' }}>
                💰 {post.benefit}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, fontFamily: 'var(--font-lato)' }}>
              {post.excerpt}
            </p>
          )}

          {/* Read more */}
          <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'var(--font-lato)' }}>{formatDate(post.date)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#D32F2F', fontFamily: 'var(--font-lato)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
