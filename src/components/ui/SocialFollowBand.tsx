'use client'

import { usePathname } from 'next/navigation'

type AudienceMetric = {
  /** Confirmed current count only. Leave unset until it has been checked. */
  count: number
  unit: 'members' | 'subscribers'
}

type Platform = {
  id: string
  name: string
  href: string
  description?: string
  action: string
  handle?: string
  audience?: AudienceMetric
  iconBg: string
  buttonBg?: string
}

const channels: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: 'https://whatsapp.com/channel/0029Vaz4lUtFMqrXJsFTCR3I',
    description: 'Get opportunity updates on WhatsApp.',
    action: 'Join WhatsApp channel',
    iconBg: '#1E9E52',
    buttonBg: '#0E6B38',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/futurefinder-blog/',
    description: 'Follow opportunity updates on LinkedIn.',
    action: 'Follow on LinkedIn',
    iconBg: '#0A66C2',
    buttonBg: '#004182',
  },
]

const follows: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/futurefinder.blog',
    handle: '@futurefinder.blog',
    action: 'Follow on Instagram',
    iconBg: '#C2185B',
  },
  {
    id: 'x',
    name: 'X',
    href: 'https://x.com/futurefinderblg',
    handle: '@futurefinderblg',
    action: 'Follow on X',
    iconBg: '#111111',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    href: 'https://t.me/futurefinderblog',
    handle: '@futurefinderblog',
    action: 'Join Telegram channel',
    iconBg: '#1A7FB5',
  },
]

function audienceLabel(metric?: AudienceMetric) {
  if (!metric || metric.count <= 0) return null
  return `Join ${metric.count}+ ${metric.unit}`
}

function trackOutbound(platform: string, role: 'primary_channel' | 'secondary_social', href: string) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  gtag('event', 'outbound_click', {
    platform,
    link_role: role,
    placement: 'opportunity_updates',
    link_url: href,
  })
}

export function OpportunityFollowNote() {
  const links = [...channels, ...follows]
  return (
    <section className="detail-follow" aria-label="Follow Future Finder">
      <p>Follow Future Finder for later opportunities.</p>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
        <li>
          <a href="/#newsletter">Newsletter</a>
        </li>
      </ul>
    </section>
  )
}

export default function SocialFollowBand() {
  const pathname = usePathname()
  const showBand = pathname === '/' || pathname === '/newsletter' || pathname === '/newsletter/'
  if (!showBand) return null

  return (
    <>
      <style>{`
        .sfb-wrap {
          background: #1A1A1A;
          padding: 56px 24px;
          border-top: 1px solid #252525;
        }
        .sfb-inner { max-width: 1040px; margin: 0 auto; }
        .sfb-header { text-align: center; margin-bottom: 32px; }
        .sfb-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-lato);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #D32F2F;
        }
        .sfb-title {
          margin: 0 0 12px;
          font-family: var(--font-oswald);
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0;
          text-transform: none;
          color: #fff;
        }
        .sfb-sub {
          max-width: 680px;
          margin: 0 auto;
          font-family: var(--font-lato);
          font-size: 16px;
          line-height: 1.55;
          color: #B8B8B8;
        }
        .sfb-primary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .sfb-channel,
        .sfb-social {
          color: inherit;
          text-decoration: none;
        }
        .sfb-channel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          min-height: 100%;
          padding: 24px;
          border: 1px solid #3A3A3A;
          border-radius: 18px;
          background: #262626;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
          transition: border-color 160ms ease, background 160ms ease;
        }
        .sfb-channel:hover { border-color: #555; background: #2C2C2C; }
        .sfb-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          color: #fff;
        }
        .sfb-icon svg { display: block; }
        .sfb-name {
          margin: 0;
          font-family: var(--font-lato);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          color: #fff;
        }
        .sfb-copy,
        .sfb-handle,
        .sfb-proof {
          margin: 0;
          font-family: var(--font-lato);
          font-size: 15px;
          line-height: 1.5;
          color: #B8B8B8;
        }
        .sfb-channel-text { display: flex; flex-direction: column; gap: 6px; }
        .sfb-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 44px;
          margin-top: auto;
          padding: 0 18px;
          border-radius: 999px;
          color: #fff;
          font-family: var(--font-lato);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
        }
        .sfb-follow-label {
          margin: 28px 0 12px;
          font-family: var(--font-lato);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.4;
          color: #fff;
        }
        .sfb-social-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .sfb-social {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 76px;
          padding: 12px 14px;
          border: 1px solid #333;
          border-radius: 16px;
          background: #202020;
          transition: border-color 160ms ease, background 160ms ease;
        }
        .sfb-social:hover { border-color: #555; background: #262626; }
        .sfb-social-icon {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          color: #fff;
        }
        .sfb-social-text { min-width: 0; }
        .sfb-social-name {
          display: block;
          font-family: var(--font-lato);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.3;
          color: #fff;
        }
        .sfb-social-action {
          display: block;
          margin-top: 2px;
          font-family: var(--font-lato);
          font-size: 14px;
          line-height: 1.4;
          color: #B8B8B8;
        }
        .sfb-channel:focus-visible,
        .sfb-social:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }
        @media (max-width: 800px) {
          .sfb-primary { grid-template-columns: 1fr; }
          .sfb-channel {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            padding: 16px;
          }
          .sfb-channel-text { flex: 1 1 180px; }
          .sfb-action { width: auto; margin-top: 0; margin-left: auto; }
        }
        @media (max-width: 640px) {
          .sfb-social-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .sfb-action { flex: 1 1 100%; width: 100%; margin-left: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sfb-channel,
          .sfb-social { transition: none; }
        }
      `}</style>

      <section className="sfb-wrap" aria-label="Opportunity updates">
        <div className="sfb-inner">
          <div className="sfb-header">
            <p className="sfb-eyebrow">Stay connected</p>
            <h2 className="sfb-title">Get opportunity updates</h2>
            <p className="sfb-sub">Choose where you’d like to receive opportunity updates and stay connected with Future Finder.</p>
          </div>

          <div className="sfb-primary">
            {channels.map(platform => {
              const proof = audienceLabel(platform.audience)
              return (
                <a
                  key={platform.id}
                  className="sfb-channel"
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(platform.id, 'primary_channel', platform.href)}
                >
                  <span className="sfb-icon" style={{ background: platform.iconBg }} aria-hidden="true">
                    <PlatformIcon id={platform.id} size={22} />
                  </span>
                  <span className="sfb-channel-text">
                    <span className="sfb-name">{platform.name}</span>
                    {platform.description ? <span className="sfb-copy">{platform.description}</span> : null}
                    {platform.handle ? <span className="sfb-handle">{platform.handle}</span> : null}
                    {proof ? <span className="sfb-proof">{proof}</span> : null}
                  </span>
                  <span className="sfb-action" style={{ background: platform.buttonBg }}>{platform.action}</span>
                </a>
              )
            })}
          </div>

          <h3 className="sfb-follow-label">Prefer to follow us on social media?</h3>
          <div className="sfb-social-row">
            {follows.map(platform => (
              <a
                key={platform.id}
                className="sfb-social"
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound(platform.id, 'secondary_social', platform.href)}
              >
                <span className="sfb-social-icon" style={{ background: platform.iconBg }} aria-hidden="true">
                  <PlatformIcon id={platform.id} size={18} />
                </span>
                <span className="sfb-social-text">
                  <span className="sfb-social-name">{platform.name}</span>
                  {platform.handle ? <span className="sfb-handle">{platform.handle}</span> : null}
                  <span className="sfb-social-action">{platform.action}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PlatformIcon({ id, size }: { id: string; size: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const }

  if (id === 'whatsapp') {
    return (
      <svg {...common}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  }

  if (id === 'telegram') {
    return (
      <svg {...common}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    )
  }

  if (id === 'instagram') {
    return (
      <svg {...common}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    )
  }

  if (id === 'x') {
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
