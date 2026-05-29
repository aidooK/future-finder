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
    <>
      <style>{`
        .nav-link {
          color: #ccc;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-lato);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 8px 10px;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .nav-subscribe {
          margin-left: 8px;
          background: #D32F2F;
          color: #fff;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-lato);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 4px;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .nav-subscribe:hover { background: #B71C1C; }
        .mobile-nav-link {
          display: block;
          color: #ccc;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-lato);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 14px 0;
          border-bottom: 1px solid #222;
        }
        .site-logo {
          height: 90px;
          width: auto;
          filter: brightness(0) invert(1);
          display: block;
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <header style={{ background: '#1A1A1A', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Future Finder"
              className="site-logo"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
            ))}
            <Link href="/newsletter" className="nav-subscribe">Subscribe Free</Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5, display: 'none' }}
            aria-label="Toggle menu"
          >
            <span style={{ width: 24, height: 2, background: '#fff', display: 'block', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ width: 24, height: 2, background: '#fff', display: 'block', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: 24, height: 2, background: '#fff', display: 'block', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{ background: '#111', borderTop: '1px solid #2a2a2a', padding: '8px 20px 24px' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/newsletter" onClick={() => setOpen(false)} style={{ display: 'block', marginTop: 16, background: '#D32F2F', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '13px 20px', borderRadius: 4, textAlign: 'center' }}>
              Subscribe Free
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
