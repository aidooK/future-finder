import Link from 'next/link'

const explore = [
  { label: 'Jobs', href: '/jobs/' },
  { label: 'Scholarships', href: '/scholarships/' },
  { label: 'Study Abroad', href: '/study-abroad/' },
  { label: 'Entrepreneurship', href: '/entrepreneurship/' },
  { label: 'Growth Mindset', href: '/growth-mindset/' },
]

const support = [
  { label: 'About Future Finder', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Newsletter', href: '/#newsletter' },
]

const socials = [
  { name: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Vaz4lUtFMqrXJsFTCR3I' },
  { name: 'Instagram', href: 'https://www.instagram.com/futurefinder.blog' },
  { name: 'Telegram', href: 'https://t.me/futurefinderblog' },
  { name: 'X', href: 'https://x.com/futurefinderblg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/futurefinder-blog/' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        .site-footer {
          background: #111;
          color: #A3A3A3;
        }
        .site-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 24px 0;
        }
        .footer-news {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px 40px;
          padding: 28px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        .footer-news h2 {
          margin: 0 0 6px;
          font-family: var(--font-lato);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.35;
          color: #fff;
          letter-spacing: 0;
          text-transform: none;
        }
        .footer-news p {
          margin: 0;
          max-width: 460px;
          font-family: var(--font-lato);
          font-size: 15px;
          line-height: 1.5;
          color: #A3A3A3;
        }
        .footer-news-action,
        .footer-submit,
        .footer-link,
        .footer-legal a,
        .footer-social a {
          text-decoration: none;
        }
        .footer-news-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          background: #D32F2F;
          color: #fff;
          font-family: var(--font-lato);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
          transition: background 160ms ease;
        }
        .footer-news-action:hover { background: #B71C1C; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          column-gap: 56px;
          align-items: start;
          padding: 40px 0 36px;
        }
        .footer-brand-link {
          display: inline-flex;
          align-items: center;
          margin-bottom: 16px;
          text-decoration: none;
        }
        .footer-logo {
          display: block;
          height: 52px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
        }
        .footer-brand p {
          max-width: 340px;
          margin: 0;
          font-family: var(--font-lato);
          font-size: 15px;
          line-height: 1.6;
          color: #A3A3A3;
        }
        .footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }
        .footer-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid transparent;
          border-radius: 10px;
          background: #1C1C1C;
          color: #E8E8E8;
          transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
        }
        .footer-social a:hover {
          border-color: #D32F2F;
          background: rgba(211, 47, 47, 0.16);
          color: #fff;
        }
        .footer-social svg { display: block; }
        .footer-heading {
          margin: 0 0 14px;
          font-family: var(--font-lato);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0;
          text-transform: none;
          color: #fff;
        }
        .footer-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer-list li { margin: 0; }
        .footer-link {
          display: inline-block;
          padding: 5px 0;
          color: #A3A3A3;
          font-family: var(--font-lato);
          font-size: 15px;
          line-height: 1.45;
          transition: color 160ms ease;
        }
        .footer-link:hover {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .footer-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          margin-top: 12px;
          padding: 0 16px;
          border: 1px solid rgba(211, 47, 47, 0.85);
          border-radius: 999px;
          color: #fff;
          font-family: var(--font-lato);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
          transition: background 160ms ease, border-color 160ms ease;
        }
        .footer-submit:hover {
          background: rgba(211, 47, 47, 0.16);
          border-color: #D32F2F;
        }
        .footer-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 16px 24px;
          border-top: 1px solid #2A2A2A;
          background: #0F0F0F;
        }
        .footer-notice-label {
          flex-shrink: 0;
          padding: 3px 7px;
          border-radius: 3px;
          background: #D32F2F;
          color: #fff;
          font-family: var(--font-lato);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .footer-notice p {
          margin: 0;
          max-width: 820px;
          color: #A3A3A3;
          font-family: var(--font-lato);
          font-size: 13px;
          line-height: 1.6;
          text-align: center;
        }
        .footer-notice strong { color: #F0B4B4; font-weight: 700; }
        .footer-legal {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 24px 22px;
          border-top: 1px solid #2A2A2A;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px 24px;
        }
        .footer-legal p,
        .footer-legal a {
          margin: 0;
          color: #A3A3A3;
          font-family: var(--font-lato);
          font-size: 14px;
          line-height: 1.5;
        }
        .footer-legal a:hover {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .site-footer a:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
          border-radius: 4px;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            column-gap: 40px;
            row-gap: 36px;
          }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-news,
          .footer-legal {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            row-gap: 32px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-news-action,
          .footer-social a,
          .footer-link,
          .footer-submit,
          .footer-legal a {
            transition: none;
          }
        }
      `}</style>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <section className="footer-news" aria-label="Newsletter">
            <div>
              <h2>Your next opportunity could be one email away.</h2>
              <p>Get updates on jobs, scholarships, and funding opportunities.</p>
            </div>
            <Link className="footer-news-action" href="/#newsletter">Join the newsletter</Link>
          </section>

          <div className="footer-grid">
            <div className="footer-brand">
              <Link className="footer-brand-link" href="/">
                <img className="footer-logo" src="/logo.png" alt="Future Finder" width={400} height={200} />
              </Link>
              <p>Helping African youth discover jobs, scholarships, study opportunities, and funding to build their future.</p>
              <nav className="footer-social" aria-label="Social media">
                {socials.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Future Finder on ${social.name}`}
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </nav>
            </div>

            <nav aria-label="Explore">
              <h2 className="footer-heading">Explore</h2>
              <ul className="footer-list">
                {explore.map(item => (
                  <li key={item.href}>
                    <Link className="footer-link" href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="About and support">
              <h2 className="footer-heading">About & support</h2>
              <ul className="footer-list">
                {support.map(item => (
                  <li key={item.href}>
                    <Link className="footer-link" href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
              <Link className="footer-submit" href="/submit/">Post an Opportunity</Link>
            </nav>
          </div>
        </div>

        <div className="footer-notice">
          <span className="footer-notice-label">Official notice</span>
          <p>
            <strong>Future Finder will never ask you for money.</strong>{' '}
            All opportunities on this site are free to access and apply for. Anyone claiming to be from Future Finder and requesting payment is a fraudster — do not engage.
          </p>
        </div>

        <div className="footer-legal">
          <p>© {year} Future Finder. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy/">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}

function SocialIcon({ name }: { name: (typeof socials)[number]['name'] }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const }

  if (name === 'WhatsApp') {
    return (
      <svg {...common}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  }

  if (name === 'Instagram') {
    return (
      <svg {...common}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    )
  }

  if (name === 'Telegram') {
    return (
      <svg {...common}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    )
  }

  if (name === 'X') {
    return (
      <svg {...common}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
