'use client'

import { useCopyFeedback } from '@/components/ui/useCopyFeedback'

interface ShareBoxProps {
  category: string
  slug: string
  title: string
}

export default function ShareBox({ category, slug, title }: ShareBoxProps) {
  const url = `https://futurefinder.blog/${category}/${slug}/`
  const text = encodeURIComponent(`${title} — via Future Finder`)
  const encodedUrl = encodeURIComponent(url)
  const copy = useCopyFeedback()

  const links = [
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${text}%20${encodedUrl}`, icon: <WhatsAppIcon /> },
    { label: 'Share on Telegram', href: `https://t.me/share/url?url=${encodedUrl}&text=${text}`, icon: <TelegramIcon /> },
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`, icon: <XIcon /> },
  ]

  return (
    <section className="detail-share" aria-label="Share this opportunity">
      <h2>Share</h2>
      <div className="detail-share-row">
        {links.map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>
            {link.icon}
          </a>
        ))}
        <button type="button" onClick={() => copy.copy(url, 'Link copied.')} aria-label="Copy link to this opportunity">
          <LinkIcon />
          <span>Copy link</span>
        </button>
      </div>
      <p className="detail-copy-notice" role="status">{copy.notice}</p>
      {copy.fallback ? (
        <input ref={copy.fallbackRef} className="detail-copy-fallback" readOnly value={copy.fallback} aria-label="Link to copy" />
      ) : null}
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 3C7.31 3 3.47 6.84 3.47 11.57c0 1.5.39 2.96 1.13 4.25L3 21l5.32-1.55a8.5 8.5 0 0 0 3.72.86h.01c4.73 0 8.57-3.84 8.57-8.57C20.62 6.84 16.77 3 12.04 3zm4.99 12.16c-.21.59-1.22 1.08-1.68 1.15-.43.06-.97.09-1.57-.1-.36-.11-.83-.27-1.43-.53-2.52-1.09-4.16-3.63-4.29-3.8-.12-.17-1.04-1.38-1.04-2.63 0-1.25.66-1.86.89-2.11.23-.26.51-.32.68-.32h.49c.16 0 .37-.06.57.43.21.51.72 1.77.78 1.9.06.13.1.28.02.45-.08.17-.12.28-.24.43-.12.15-.25.33-.36.44-.12.12-.24.25-.1.48.14.23.62 1.02 1.33 1.65.91.81 1.68 1.07 1.92 1.19.24.11.38.1.52-.06.14-.17.6-.7.76-.94.16-.23.32-.19.54-.12.22.08 1.4.66 1.64.78.24.12.4.17.46.27.06.1.06.57-.15 1.16z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5 4.5 2.8 11.2c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.4-1.7-1.4-1.3zM9.2 14.3l8.8-5.5c.4-.3.8-.1.5.2l-7.5 6.8-.3 3.2-1.5-4.7z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.7 2H2.2l8.1 11.2L2.2 22h1.8l7.1-7.6L15.3 22h6.5l-7.1-11.7zm-2.5 2.7-.8-1.1L4.7 3.5h2.8l5.3 7.1.8 1.1 6.9 9.3h-2.8l-5.5-7.9z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.1.1l2.1-2.1a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
      <path d="M14 11a5 5 0 0 0-7.1-.1L4.8 13a5 5 0 0 0 7.1 7.1l1.2-1.2" />
    </svg>
  )
}
