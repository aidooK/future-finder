'use client'
import { useState } from 'react'

type Props = { variant?: 'band' | 'inline' }

export default function NewsletterSignup({ variant = 'band' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Replace this URL with your Mailchimp or ConvertKit form action
    setStatus('success')
    setEmail('')
  }

  if (variant === 'inline') {
    return (
      <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '24px', margin: '32px 0' }}>
        <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 18, color: '#D32F2F', marginBottom: 6 }}>
          Get Opportunities in Your Inbox
        </h4>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 16, fontFamily: 'var(--font-lato)' }}>
          Join thousands of African youth getting daily jobs and scholarships.
        </p>
        {status === 'success' ? (
          <p style={{ color: '#2E7D32', fontWeight: 700, fontFamily: 'var(--font-lato)' }}>✓ You're subscribed! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              style={{ flex: 1, minWidth: 200, padding: '10px 14px', border: '1px solid #FFCDD2', borderRadius: 4, fontSize: 14, fontFamily: 'var(--font-lato)', outline: 'none' }} />
            <button type="submit" style={{ background: '#D32F2F', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section style={{ background: '#D32F2F', padding: '72px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFCDD2', marginBottom: 12 }}>
          Free Daily Newsletter
        </p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.15 }}>
          Get Real Opportunities in Your Inbox
        </h2>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#FFCDD2', marginBottom: 32 }}>
          Join thousands of African youth getting daily jobs, scholarships and opportunities every morning.
        </p>
        {status === 'success' ? (
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-lato)' }}>✓ Welcome aboard! Check your inbox for your first email.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required
              style={{ flex: 1, padding: '14px 18px', border: 'none', fontSize: 15, fontFamily: 'var(--font-lato)', outline: 'none' }} />
            <button type="submit" style={{ background: '#1A1A1A', color: '#fff', border: 'none', padding: '14px 24px', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              Subscribe Free
            </button>
          </form>
        )}
        <p style={{ fontSize: 12, color: '#FFCDD2', marginTop: 16, fontFamily: 'var(--font-lato)', opacity: 0.8 }}>
          No spam. Unsubscribe anytime. 100% free.
        </p>
      </div>
    </section>
  )
}
