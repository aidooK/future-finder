'use client'
import { useState } from 'react'

type Props = { url: string; text: string }

export default function ShareButtons({ url, text }: Props) {
  const [copied, setCopied] = useState(false)
  const msg = encodeURIComponent(`${text} ${url}`)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <div className="pw-share">
      <a href={`https://wa.me/?text=${msg}`} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366' }}>WhatsApp</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" style={{ background: '#0A66C2' }}>LinkedIn</a>
      <a href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer" style={{ background: '#111', border: '1px solid #444' }}>X</a>
      <button type="button" onClick={copy} style={{ background: '#444' }}>{copied ? 'Copied ✓' : 'Copy link'}</button>
    </div>
  )
}
