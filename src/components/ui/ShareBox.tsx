'use client'

interface ShareBoxProps {
  category: string
  slug: string
  title: string
}

export default function ShareBox({ category, slug, title }: ShareBoxProps) {
  const url = `https://futurefinder.blog/${category}/${slug}/`
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
