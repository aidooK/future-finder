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
            <button type="submit" style={{ background: '#D32F2F', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)' }}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section style={{
      background: 'radial-gradient(circle at 80% 20%, rgba(255, 82, 82, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(138, 10, 18, 0.4) 0%, transparent 55%), linear-gradient(135deg, #3B0206 0%, #6B0912 25%, #9E101B 50%, #D32F2F 75%, #F44336 100%)',
      padding: '84px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 12px 36px rgba(0,0,0,0.35), inset 0 -12px 36px rgba(0,0,0,0.35)'
    }}>
      {/* Ambient glowing light spots */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 114, 114, 0.25) 0%, rgba(211, 47, 47, 0) 70%)',
        pointerEvents: 'none',
        filter: 'blur(30px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(168, 19, 29, 0.35) 0%, rgba(59, 2, 6, 0) 70%)',
        pointerEvents: 'none',
        filter: 'blur(30px)'
      }} />

      <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFCDD2', marginBottom: 12, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Free Daily Newsletter
        </p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.15, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          Get Real Opportunities in Your Inbox
        </h2>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: 'rgba(255, 255, 255, 0.92)', marginBottom: 36, lineHeight: 1.6 }}>
          Join thousands of African youth getting daily jobs, scholarships and opportunities every morning.
        </p>
        {status === 'success' ? (
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-lato)', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 8 }}>
            ✓ Welcome aboard! Check your inbox for your first email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto', borderRadius: 8, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required
              style={{ flex: 1, padding: '16px 20px', border: 'none', fontSize: 15, fontFamily: 'var(--font-lato)', outline: 'none', background: '#ffffff' }} />
            <button type="submit" style={{ background: '#111111', color: '#fff', border: 'none', padding: '16px 26px', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-lato)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}>
              Subscribe Free
            </button>
          </form>
        )}
        <p style={{ fontSize: 12, color: 'rgba(255, 205, 210, 0.85)', marginTop: 18, fontFamily: 'var(--font-lato)' }}>
          No spam. Unsubscribe anytime. 100% free.
        </p>
      </div>
    </section>
  )
}

