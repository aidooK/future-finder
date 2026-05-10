'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Study Abroad', href: '/study-abroad' },
  { label: 'Entrepreneurship', href: '/entrepreneurship' },
  { label: 'Growth Mindset', href: '/growth-mindset' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ background: '#1A1A1A', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, background: '#D32F2F', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff'
          }}>F</div>
          <span style={{ fontFamily: 'var(--font-oswald)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Future Finder
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              color: '#ccc', textDecoration: 'none', fontSize: 13, fontWeight: 700,
              fontFamily: 'var(--font-lato)', letterSpacing: '0.04em', textTransform: 'uppercase',
              padding: '8px 12px', borderRadius: 4, transition: 'color 0.15s, background 0.15s'
            }}
              onMouseOver={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = '#333' }}
              onMouseOut={e => { (e.target as HTMLElement).style.color = '#ccc'; (e.target as HTMLElement).style.background = 'transparent' }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" style={{
            marginLeft: 8, background: '#D32F2F', color: '#fff', textDecoration: 'none',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-lato)', letterSpacing: '0.06em',
            textTransform: 'uppercase', padding: '8px 16px', borderRadius: 4,
            transition: 'background 0.15s'
          }}
            onMouseOver={e => (e.target as HTMLElement).style.background = '#B71C1C'}
            onMouseOut={e => (e.target as HTMLElement).style.background = '#D32F2F'}
          >
            Subscribe Free
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 2, background: '#fff', margin: '5px 0', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: '#fff', margin: '5px 0', opacity: open ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: '#fff', margin: '5px 0', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: '#111', borderTop: '1px solid #333', padding: '16px 24px 24px' }} className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', color: '#ccc', textDecoration: 'none', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '12px 0', borderBottom: '1px solid #222' }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" onClick={() => setOpen(false)} style={{ display: 'block', marginTop: 16, background: '#D32F2F', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 20px', borderRadius: 4, textAlign: 'center' }}>
            Subscribe Free
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
