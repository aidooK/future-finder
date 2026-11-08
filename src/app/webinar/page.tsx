// Joint FF x PMI live web conference page. Co-branded: the FF site chrome is hidden on this
// route (see SiteChrome) and replaced by the partnership header/footer below.
// Event facts (date, stream IDs, channel IDs, speaker) live in src/lib/event.ts.
import Countdown from '@/components/webinar/Countdown'
import ShareButtons from '@/components/webinar/ShareButtons'
import { EVENT, subscribeUrl, shareText } from '@/lib/event'

const FF = '#D32F2F'
const PMI = '#0A53A8' // sampled from the PMI logo
const GOLD = '#F5C063'

const FF_SUB = subscribeUrl(EVENT.ffChannelId)
const PMI_SUB = subscribeUrl(EVENT.pmiChannelId)

const learn = [
  { n: '1', title: 'The Hard Truths About Money', desc: 'What money really represents beyond coins and banknotes, and whether it can solve all your problems.' },
  { n: '2', title: 'The Schooling System and Financial Education', desc: 'Why schools leave financial literacy out, and what you need to learn beyond the classroom.' },
  { n: '3', title: 'Why Financial Struggles Keep Repeating', desc: 'The three things people must start doing differently to change their financial trajectory.' },
  { n: '4', title: 'A Practical Five-Step Wealth-Building Roadmap', desc: 'Actionable steps to begin building wealth from Africa or the diaspora.' },
  { n: '5', title: 'Entrepreneurship, Investment and the AI Era', desc: 'Using AI and digital tools to spot opportunities, plus investment principles for smarter decisions.' },
]

const attend = [
  'University students and recent graduates',
  'Young professionals seeking financial independence',
  'Aspiring entrepreneurs and digital business owners',
  'Young Africans interested in wealth creation and investment',
  'Anyone ready to rethink their relationship with money',
]

const cities: [string, string][] = [
  ['Accra', 'Africa/Accra'], ['Lagos', 'Africa/Lagos'], ['Johannesburg', 'Africa/Johannesburg'],
  ['Nairobi', 'Africa/Nairobi'], ['Dubai', 'Asia/Dubai'], ['London', 'Europe/London'], ['New York', 'America/New_York'],
]
const timeIn = (tz: string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }).format(new Date(EVENT.startISO))

const faqs = [
  { q: 'Is it free?', a: 'Yes. The web conference is free to watch live on YouTube.' },
  { q: 'Where do I watch?', a: 'It streams live on both the Future Finder and The Prepared Mind Initiative YouTube channels at the same time. Use either player on this page, or open YouTube directly. You can also tap Notify me on YouTube to get a reminder.' },
  { q: 'What time does it start?', a: 'Wednesday 25 November 2026 at 7:00 PM GMT, which is the same as Ghana time. The table on this page shows the time in other cities.' },
  { q: 'Who is it for?', a: 'Young Africans in school, in the workforce or building a business, and anyone ready to rethink how they approach money.' },
]

const gcalDetails = `Free live web conference for young Africans by Future Finder and The Prepared Mind Initiative. Watch live on YouTube: ${EVENT.url}`
const gcal =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(EVENT.name + ' (Live on YouTube)')}` +
  '&dates=20261125T190000Z/20261125T210000Z' +
  `&details=${encodeURIComponent(gcalDetails)}` +
  `&location=${encodeURIComponent(EVENT.url)}`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: EVENT.name,
  description:
    'A free financial education web conference for young Africans on money, wealth, the schooling system and building wealth from Africa or the diaspora, presented by Future Finder and The Prepared Mind Initiative.',
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: { '@type': 'VirtualLocation', url: EVENT.url },
  image: [`https://futurefinder.blog${EVENT.flyer}`],
  inLanguage: 'en',
  isAccessibleForFree: true,
  organizer: [
    { '@type': 'Organization', name: 'Future Finder', url: 'https://futurefinder.blog' },
    { '@type': 'Organization', name: 'The Prepared Mind Initiative' },
  ],
  performer: { '@type': 'Person', name: EVENT.speaker.name, jobTitle: 'Entrepreneurship Coach, Systems and Data Professional' },
  offers: { '@type': 'Offer', url: EVENT.url, price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', validFrom: '2026-11-07' },
}

export default function WebConferencePage() {
  return (
    <div id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        html { scroll-behavior: smooth; }
        .pw-section { scroll-margin-top: 84px; }
        .pw-header { background: rgba(26,26,26,0.96); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 50; box-shadow: 0 4px 20px rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .pw-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .pw-lockup { display: flex; align-items: center; gap: 12px; text-decoration: none; min-width: 0; }
        .pw-logo-pill { background: #fff; border-radius: 8px; padding: 5px 12px; height: 56px; display: flex; align-items: center; flex-shrink: 0; }
        .pw-logo-pill img { height: 34px; width: auto; display: block; }
        .pw-pmi-pill { padding: 4px 10px; }
        .pw-pmi-pill img { height: 48px; }
        .pw-x { color: #777; font-size: 20px; font-weight: 300; font-family: var(--font-lato); }
        .pw-pmi-name { color: #fff; font-family: var(--font-oswald); font-weight: 700; font-size: 15px; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.1; }
        .pw-nav { display: flex; align-items: center; gap: 4px; }
        .pw-nav a { color: #ccc; text-decoration: none; font-family: var(--font-lato); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 8px 12px; border-radius: 4px; transition: color .15s, background .15s; }
        .pw-nav a:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .pw-nav a.pw-nav-cta { background: ${FF}; color: #fff; margin-left: 6px; padding: 9px 16px; }
        .pw-nav a.pw-nav-cta:hover { background: #B71C1C; }

        .pw-partner { max-width: 720px; margin: 0 auto 32px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 18px 22px; text-align: left; }
        .pw-partner-lead { font-family: var(--font-lato); font-size: 15px; font-weight: 700; color: #fff; line-height: 1.6; margin: 0 0 12px; }
        .pw-partner-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 8px; }
        .pw-dot { width: 9px; height: 9px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
        .pw-partner-row p { font-family: var(--font-lato); font-size: 14px; color: #bbb; line-height: 1.6; margin: 0; }
        .pw-partner-row strong { color: #fff; }

        .pw-count { display: flex; justify-content: center; gap: 12px; margin: 0 auto 14px; }
        .pw-count-box { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16); border-radius: 12px; min-width: 76px; padding: 12px 8px 10px; display: flex; flex-direction: column; align-items: center; }
        .pw-count-num { font-family: var(--font-oswald); font-size: 38px; font-weight: 700; color: #fff; line-height: 1.1; font-variant-numeric: tabular-nums; }
        .pw-count-lbl { font-family: var(--font-lato); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #999; margin-top: 4px; }
        .pw-local { font-family: var(--font-lato); font-size: 13px; color: #aaa; margin: 0 0 24px; }
        .pw-local strong { color: #fff; }
        .pw-state { display: inline-block; font-family: var(--font-lato); font-size: 16px; color: #fff; border-radius: 10px; padding: 14px 24px; margin: 0 0 24px; }
        .pw-state a { color: #fff; font-weight: 700; text-decoration: underline; margin-left: 8px; }
        .pw-state-live { background: ${FF}; }
        .pw-state-done { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); }
        .pw-live-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #fff; margin-right: 6px; animation: pwpulse 1.2s infinite; }
        @keyframes pwpulse { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

        .pw-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-lato); font-weight: 700; font-size: 14px; letter-spacing: 0.03em; padding: 13px 22px; border-radius: 6px; text-decoration: none; color: #fff; transition: opacity .15s, transform .15s; }
        .pw-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .pw-btn-ghost { background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.28); }
        .pw-cta-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

        .pw-details { display: grid; grid-template-columns: minmax(0, 440px) 1fr; gap: 44px; align-items: start; }
        .pw-flyer { width: 100%; height: auto; display: block; border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,0.22); }
        .pw-row { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #EEE; align-items: flex-start; }
        .pw-row:last-child { border-bottom: none; }
        .pw-row-ic { font-size: 20px; width: 28px; flex-shrink: 0; text-align: center; }
        .pw-row-lbl { font-family: var(--font-lato); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 2px; }
        .pw-row-val { font-family: var(--font-lato); font-size: 16px; font-weight: 700; color: #1A1A1A; line-height: 1.5; }
        .pw-row-sub { font-family: var(--font-lato); font-size: 13px; color: #666; font-weight: 400; }
        .pw-cities { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; margin-top: 10px; }
        .pw-city { background: #F5F5F5; border-radius: 8px; padding: 8px 12px; font-family: var(--font-lato); font-size: 13px; color: #444; display: flex; justify-content: space-between; gap: 8px; }
        .pw-city strong { color: #1A1A1A; }
        .pw-share { display: flex; gap: 8px; flex-wrap: wrap; }
        .pw-share a, .pw-share button { border: none; cursor: pointer; color: #fff; text-decoration: none; font-family: var(--font-lato); font-size: 12px; font-weight: 700; letter-spacing: 0.04em; padding: 9px 16px; border-radius: 6px; }

        .pw-learn { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .pw-learn-card { background: #fff; border: 1.5px solid #E5E5E5; border-radius: 12px; padding: 22px 22px 20px; display: flex; gap: 16px; transition: box-shadow .2s, transform .2s; }
        .pw-learn-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .pw-learn-n { width: 36px; height: 36px; border-radius: 50%; background: ${FF}; color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-oswald); font-weight: 700; font-size: 17px; flex-shrink: 0; }

        .pw-streams { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .pw-card { background: #fff; border: 1.5px solid #E5E5E5; border-radius: 12px; overflow: hidden; }
        .pw-card-head { padding: 16px 20px; display: flex; align-items: center; gap: 12px; border-bottom: 1.5px solid #F0F0F0; }
        .pw-grow { flex: 1; min-width: 0; }
        .pw-card-body { padding: 20px; }
        .pw-embed { position: relative; width: 100%; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; background: #000; }
        .pw-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .pw-sub-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 6px; color: #fff; text-decoration: none; font-family: var(--font-lato); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; transition: opacity .15s, transform .15s; }
        .pw-sub-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .pw-faq details { background: #fff; border: 1.5px solid #E5E5E5; border-radius: 10px; padding: 0 20px; margin-bottom: 10px; }
        .pw-faq summary { cursor: pointer; font-family: var(--font-lato); font-weight: 700; font-size: 15px; color: #1A1A1A; padding: 16px 0; list-style: none; display: flex; justify-content: space-between; gap: 12px; }
        .pw-faq summary::-webkit-details-marker { display: none; }
        .pw-faq summary::after { content: '+'; color: ${FF}; font-size: 20px; line-height: 1; }
        .pw-faq details[open] summary::after { content: '–'; }
        .pw-faq p { font-family: var(--font-lato); font-size: 14px; color: #555; line-height: 1.8; margin: 0 0 16px; }

        .pw-sub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px; margin: 0 auto; }
        .pw-sub-card { background: #222; border: 1px solid #333; border-radius: 14px; padding: 28px 24px; text-align: center; }
        .pw-footer-inner { max-width: 1000px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

        @media (max-width: 860px) { .pw-details { grid-template-columns: 1fr; gap: 28px; } .pw-flyer { max-width: 440px; margin: 0 auto; } }
        @media (max-width: 760px) {
          .pw-streams, .pw-sub-grid, .pw-footer-inner { grid-template-columns: 1fr; }
          .pw-pmi-name, .pw-nav a.pw-nav-link { display: none; }
          .pw-card-head { flex-wrap: wrap; }
          .pw-count { gap: 8px; } .pw-count-box { min-width: 66px; } .pw-count-num { font-size: 30px; }
        }
      `}</style>

      {/* Co-branded header */}
      <header className="pw-header">
        <div className="pw-header-inner">
          <a href="#top" className="pw-lockup" aria-label="Future Finder and The Prepared Mind Initiative">
            <span className="pw-logo-pill"><img src="/logo.png" alt="Future Finder" /></span>
            <span className="pw-x">×</span>
            <span className="pw-logo-pill pw-pmi-pill"><img src="/pmi-logo.png" alt="The Prepared Mind Initiative (PMI)" /></span>
            <span className="pw-pmi-name">The Prepared Mind<br />Initiative</span>
          </a>
          <nav className="pw-nav" aria-label="Page sections">
            <a href="#details" className="pw-nav-link">Details</a>
            <a href="#about" className="pw-nav-link">What you&rsquo;ll learn</a>
            <a href="#watch" className="pw-nav-link">Watch</a>
            <a href="#subscribe" className="pw-nav-cta">Subscribe</a>
          </nav>
        </div>
      </header>

      {/* Hero: partnership intro first, conference title as the main focus */}
      <section style={{ background: '#1A1A1A', padding: '48px 24px 56px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

          <div className="pw-partner">
            <p className="pw-partner-lead">
              A partnership to equip African youth with the mindset, skills and opportunities to build better futures.
            </p>
            <div className="pw-partner-row">
              <span className="pw-dot" style={{ background: FF }} />
              <p><strong>Future Finder</strong> brings verified daily jobs, scholarships and opportunities for African youth.</p>
            </div>
            <div className="pw-partner-row">
              <span className="pw-dot" style={{ background: '#42A5F5' }} />
              <p><strong>The Prepared Mind Initiative</strong> brings growth-mindset and digital-skills content, building thoughtful, purposeful minds.</p>
            </div>
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: FF, color: '#fff', fontFamily: 'var(--font-lato)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} /> Live Web Conference
          </span>
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(36px, 7vw, 66px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, margin: '0 0 12px' }}>
            Poverty is a <span style={{ color: FF }}>Behavior</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(18px, 3.4vw, 28px)', color: GOLD, letterSpacing: '0.02em', textTransform: 'uppercase', margin: '0 0 20px' }}>
            {EVENT.subtitle}
          </p>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#aaa', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 22px' }}>
            A free, power-packed financial education web conference for young Africans, streaming live on YouTube.
          </p>
          <p style={{ display: 'inline-block', fontFamily: 'var(--font-lato)', fontSize: 15, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24, padding: '9px 20px', margin: '0 0 26px' }}>
            📅 Wednesday, 25 November 2026 · 7:00 PM GMT
          </p>

          <Countdown startISO={EVENT.startISO} endISO={EVENT.endISO} />

          <div className="pw-cta-row">
            <a href={gcal} target="_blank" rel="noopener noreferrer" className="pw-btn" style={{ background: FF }}>🔔 Add to Google Calendar</a>
            <a href="/calendar/poverty-is-a-behavior.ics" download className="pw-btn pw-btn-ghost">📅 Apple / Outlook</a>
            <a href="#watch" className="pw-btn pw-btn-ghost">Watch Live ↓</a>
          </div>
        </div>
      </section>

      <div style={{ height: 4, background: `linear-gradient(90deg, ${FF} 50%, ${PMI} 50%)` }} />

      {/* Event details + flyer */}
      <section id="details" className="pw-section" style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pw-details">
            <div>
              <img className="pw-flyer" src={EVENT.flyer} width={1080} height={1080}
                alt="Event flyer: Poverty is a Behavior, Why Schools Don't Teach You About Money. Future Finder and The Prepared Mind Initiative web conference, Wednesday 25 November 2026, 7:00 PM GMT, live on YouTube." />
              <p style={{ textAlign: 'center', margin: '12px 0 0' }}>
                <a href={EVENT.flyer} download style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', textDecoration: 'underline' }}>⬇ Download the flyer</a>
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 30, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 6px' }}>Event Details</h2>
              <div style={{ width: 48, height: 3, background: FF, marginBottom: 12 }} />

              <div className="pw-row"><span className="pw-row-ic">📅</span><div><div className="pw-row-lbl">Date</div><div className="pw-row-val">Wednesday, 25 November 2026</div></div></div>
              <div className="pw-row"><span className="pw-row-ic">🕖</span><div><div className="pw-row-lbl">Time</div><div className="pw-row-val">7:00 PM GMT <span className="pw-row-sub">(same as Ghana time)</span></div></div></div>
              <div className="pw-row"><span className="pw-row-ic">📺</span><div><div className="pw-row-lbl">Where</div><div className="pw-row-val">Live on YouTube <span className="pw-row-sub">on both the Future Finder and The Prepared Mind Initiative channels</span></div></div></div>
              <div className="pw-row"><span className="pw-row-ic">🎟️</span><div><div className="pw-row-lbl">Cost</div><div className="pw-row-val">Free</div></div></div>
              <div className="pw-row"><span className="pw-row-ic">🎤</span><div><div className="pw-row-lbl">Speaker</div><div className="pw-row-val">{EVENT.speaker.name}<br /><span className="pw-row-sub">{EVENT.speaker.title}</span></div></div></div>
              <div className="pw-row"><span className="pw-row-ic">🌍</span>
                <div style={{ flex: 1 }}>
                  <div className="pw-row-lbl">Time around the world</div>
                  <div className="pw-cities">
                    {cities.map(([name, tz]) => (
                      <div key={name} className="pw-city"><span>{name}</span><strong>{timeIn(tz)}</strong></div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div className="pw-row-lbl" style={{ marginBottom: 8 }}>Share with a friend</div>
                <ShareButtons url={EVENT.url} text={shareText} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section id="about" className="pw-section" style={{ padding: '64px 24px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 780, margin: '0 auto 40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 30, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>What You Will Learn</h2>
            <div style={{ width: 48, height: 3, background: FF, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#444', lineHeight: 1.9 }}>
              Why do so many people spend years in school, earn qualifications, and still struggle to build financial stability? Poverty is a behavior. It examines the beliefs, habits, financial decisions and patterns that can keep people trapped in cycles of financial limitation, and how education, practical knowledge, entrepreneurship and intentional action can create a different outcome.
            </p>
          </div>

          <div className="pw-learn">
            {learn.map(item => (
              <div key={item.n} className="pw-learn-card">
                <div className="pw-learn-n">{item.n}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', margin: '0 0 6px', lineHeight: 1.25 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 780, margin: '48px auto 0' }}>
            <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 22, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', margin: '0 0 16px' }}>Who Should Attend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {attend.map(a => (
                <li key={a} style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#444', background: '#fff', border: '1.5px solid #E5E5E5', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 10 }}>
                  <span style={{ color: FF, fontWeight: 700 }}>✓</span> {a}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', margin: '28px 0 0', lineHeight: 1.7 }}>
              Your education may have prepared you for a career, but are you financially prepared for life?
            </p>
          </div>
        </div>
      </section>

      {/* Watch: each channel with its own subscribe button */}
      <section id="watch" className="pw-section" style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>Watch Live</h2>
            <div style={{ width: 48, height: 3, background: FF, margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
              The same broadcast is streaming on both channels. Watch on either player. Before we go live the player counts down to the start, and you can tap <strong>Notify me</strong> on YouTube for a reminder.
            </p>
          </div>

          <div className="pw-streams">
            <div className="pw-card">
              <div className="pw-card-head" style={{ background: '#FFF5F5' }}>
                <div className="pw-grow">
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>Future Finder</div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>YouTube channel</div>
                </div>
                <a href={FF_SUB} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: FF }}>▶ Subscribe</a>
              </div>
              <div className="pw-card-body">
                <div className="pw-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${EVENT.ffVideoId}?rel=0`}
                    title="Poverty is a Behavior, live on the Future Finder YouTube channel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p style={{ margin: '12px 0 0', textAlign: 'center' }}>
                  <a href={`https://www.youtube.com/watch?v=${EVENT.ffVideoId}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', textDecoration: 'underline' }}>Open on YouTube</a>
                </p>
              </div>
            </div>

            <div className="pw-card">
              <div className="pw-card-head" style={{ background: '#F5F8FF' }}>
                <div className="pw-grow">
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>The Prepared Mind Initiative</div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>YouTube channel</div>
                </div>
                <a href={PMI_SUB} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: PMI }}>▶ Subscribe</a>
              </div>
              <div className="pw-card-body">
                <div className="pw-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${EVENT.pmiVideoId}?rel=0`}
                    title="Poverty is a Behavior, live on The Prepared Mind Initiative YouTube channel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p style={{ margin: '12px 0 0', textAlign: 'center' }}>
                  <a href={`https://www.youtube.com/watch?v=${EVENT.pmiVideoId}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', textDecoration: 'underline' }}>Open on YouTube</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pw-section" style={{ padding: '56px 24px', background: '#F5F5F5' }}>
        <div className="pw-faq" style={{ maxWidth: 780, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', textAlign: 'center', marginBottom: 24 }}>Quick Answers</h2>
          {faqs.map(f => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      {/* Subscribe: equal weight for both organisations */}
      <section id="subscribe" className="pw-section" style={{ padding: '64px 24px', background: '#1A1A1A' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Subscribe to Both Channels</h2>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#aaa', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              This is the first of many conversations. Subscribe to both channels so you know when the next web conference goes live.
            </p>
          </div>
          <div className="pw-sub-grid">
            <div className="pw-sub-card" style={{ borderTop: `4px solid ${FF}` }}>
              <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Future Finder</div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', lineHeight: 1.7, margin: '0 0 20px' }}>Verified jobs, scholarships and opportunities for African youth.</p>
              <a href={FF_SUB} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: FF, padding: '12px 24px', fontSize: 13 }}>▶ Subscribe on YouTube</a>
              <div style={{ marginTop: 14 }}>
                <a href="https://linktr.ee/future.finder" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontFamily: 'var(--font-lato)', fontSize: 13, textDecoration: 'underline' }}>More ways to follow</a>
              </div>
            </div>
            <div className="pw-sub-card" style={{ borderTop: `4px solid ${PMI}` }}>
              <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>The Prepared Mind Initiative</div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', lineHeight: 1.7, margin: '0 0 20px' }}>Growth-mindset and digital-skills content, building thoughtful, purposeful minds.</p>
              <a href={PMI_SUB} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: PMI, padding: '12px 24px', fontSize: 13 }}>▶ Subscribe on YouTube</a>
            </div>
          </div>
        </div>
      </section>

      {/* Co-branded footer */}
      <footer style={{ background: '#111', color: '#888', padding: '40px 0 28px' }}>
        <div className="pw-footer-inner">
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Future Finder</div>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, lineHeight: 1.7, margin: '0 0 8px' }}>Verified opportunities for African youth.</p>
            <a href={FF_SUB} target="_blank" rel="noopener noreferrer" style={{ color: FF, fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Subscribe on YouTube →</a>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>The Prepared Mind Initiative</div>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, lineHeight: 1.7, margin: '0 0 8px' }}>Building Thoughtful, Purposeful Minds.</p>
            <a href={PMI_SUB} target="_blank" rel="noopener noreferrer" style={{ color: '#42A5F5', fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Subscribe on YouTube →</a>
          </div>
        </div>
        <div style={{ maxWidth: 1000, margin: '28px auto 0', padding: '18px 24px 0', borderTop: '1px solid #222', textAlign: 'center', fontFamily: 'var(--font-lato)', fontSize: 12, color: '#666' }}>
          © 2026 Future Finder × The Prepared Mind Initiative. Hosted at futurefinder.blog.
        </div>
      </footer>
    </div>
  )
}
