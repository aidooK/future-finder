import Link from 'next/link'

const categories = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Study Abroad', href: '/study-abroad' },
  { label: 'Entrepreneurship', href: '/entrepreneurship' },
  { label: 'Growth Mindset', href: '/growth-mindset' },
]

const company = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Post an Opportunity', href: '/submit' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          display: block;
          color: #888;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 10px;
          transition: color 0.15s;
          font-family: var(--font-lato);
        }
        .footer-link:hover { color: #D32F2F; }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>

      <footer style={{ background: '#111', color: '#aaa', paddingTop: 56 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} className="footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: '#D32F2F', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff' }}>F</div>
              <span style={{ fontFamily: 'var(--font-oswald)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Future Finder</span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#888', maxWidth: 280, fontFamily: 'var(--font-lato)' }}>
              Connecting African youth to real opportunities — jobs, scholarships, study abroad programs and entrepreneurship funding. Updated every day.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['W', 'T', 'I', 'X'].map((s, i) => (
                <div key={i} style={{ width: 36, height: 36, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#666', cursor: 'pointer', fontFamily: 'var(--font-lato)', fontWeight: 700 }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Explore</h4>
            {categories.map(c => (
              <Link key={c.href} href={c.href} className="footer-link">{c.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Company</h4>
            {company.map(c => (
              <Link key={c.href} href={c.href} className="footer-link">{c.label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', padding: '20px 24px', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 13, color: '#555', fontFamily: 'var(--font-lato)' }}>© {new Date().getFullYear()} Future Finder. All rights reserved.</p>
          <p style={{ fontSize: 13, color: '#555', fontFamily: 'var(--font-lato)' }}>Built for African Youth 🌍</p>
        </div>
      </footer>
    </>
  )
}
