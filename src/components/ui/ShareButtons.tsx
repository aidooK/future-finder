'use client'
import { useState } from 'react'

type ShareProps = {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'WhatsApp',
      color: '#25D366',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: '💬'
    },
    {
      name: 'Telegram',
      color: '#0088cc',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: '✈️'
    },
    {
      name: 'Twitter / X',
      color: '#1A1A1A',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: '𝕏'
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'f'
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'in'
    },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <style>{`
        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-lato);
          color: #fff;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
          cursor: pointer;
          border: none;
        }
        .share-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-lato);
          background: #F5F5F5;
          color: #333;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: all 0.15s;
        }
        .copy-btn:hover { background: #eee; }

        /* FF Social links */
        .ff-social-section {
          background: #1A1A1A;
          border-radius: 8px;
          padding: 20px;
          margin-top: 24px;
        }
        .ff-social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 6px;
          text-decoration: none;
          color: #fff;
          font-family: var(--font-lato);
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          transition: opacity 0.15s;
        }
        .ff-social-link:hover { opacity: 0.85; }
        .ff-social-link:last-child { margin-bottom: 0; }
        .social-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 900;
          flex-shrink: 0;
        }
      `}</style>

      {/* Share this post */}
      <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '20px', marginBottom: 24 }}>
        <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A1A1A', marginBottom: 14 }}>
          📤 Share This Opportunity
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {shareLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
              style={{ background: link.color }}
            >
              <span>{link.icon}</span>
              {link.name}
            </a>
          ))}
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '🔗 Copy Link'}
          </button>
        </div>
      </div>

      {/* Follow Future Finder */}
      <div className="ff-social-section">
        <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', marginBottom: 14 }}>
          🌍 Follow Future Finder
        </h4>

        <a href="https://whatsapp.com/channel/YOUR_CHANNEL_ID" target="_blank" rel="noopener noreferrer" className="ff-social-link" style={{ background: '#25D366' }}>
          <div className="social-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>💬</div>
          WhatsApp Channel — Daily Opportunities
        </a>

        <a href="https://chat.whatsapp.com/YOUR_COMMUNITY_ID" target="_blank" rel="noopener noreferrer" className="ff-social-link" style={{ background: '#128C7E' }}>
          <div className="social-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>👥</div>
          WhatsApp Community — Join the Discussion
        </a>

        <a href="https://t.me/YOUR_TELEGRAM" target="_blank" rel="noopener noreferrer" className="ff-social-link" style={{ background: '#0088cc' }}>
          <div className="social-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>✈️</div>
          Telegram Channel
        </a>

        <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="ff-social-link" style={{ background: '#E1306C' }}>
          <div className="social-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>📸</div>
          Instagram — @futurefinder
        </a>

        <a href="https://linkedin.com/company/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer" className="ff-social-link" style={{ background: '#0A66C2' }}>
          <div className="social-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>in</div>
          LinkedIn Page
        </a>
      </div>
    </>
  )
}
