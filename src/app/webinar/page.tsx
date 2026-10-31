// Joint FF x PMI live web conference page. Co-branded: the FF site header/footer are hidden
// on this route (see SiteChrome) and replaced by the partnership header/footer below.

// ===== EVENT-DAY CONFIG (edit only this block) =====
// The two video IDs below are TEST streams. On event day, replace each with the ID of that
// channel's live broadcast (the StreamYard broadcast on each YouTube channel).
const FF_VIDEO_ID = 'NEn_jmXaPb0'    // TEST - Future Finder channel
const PMI_VIDEO_ID = 'RiiducAV31M'   // TEST - Prepared Mind Initiative channel
// Shown under the hero text when set, e.g. 'Saturday 15 November 2026, 6:00 PM GMT'. null hides it.
const EVENT_WHEN: string | null = null
// ====================================================

// TODO: replace with each channel's URL once confirmed, e.g.
//   'https://www.youtube.com/@handle?sub_confirmation=1'  (one-click subscribe prompt)
const FF_YT = `https://www.youtube.com/watch?v=${FF_VIDEO_ID}`
const PMI_YT = `https://www.youtube.com/watch?v=${PMI_VIDEO_ID}`

const FF = '#D32F2F'
const PMI = '#1565C0'

const topics = [
  { icon: '🧠', title: 'The Poverty Mindset', desc: 'Why behaviour is the real poverty, not the absence of money.' },
  { icon: '🏫', title: 'Schools & Money', desc: 'Why financial education is missing from African curricula and what that costs you.' },
  { icon: '🔄', title: 'Breaking the Cycle', desc: 'Practical habits that separate those who build wealth from those who do not.' },
  { icon: '🚀', title: 'Your Next Step', desc: 'Where to find real opportunities and mentorship to put what you learn into action.' },
]

export default function WebConferencePage() {
  return (
    <div id="top">
      <style>{`
        html { scroll-behavior: smooth; }
        .pw-section { scroll-margin-top: 76px; }
        .pw-header { background: rgba(26,26,26,0.96); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 50; box-shadow: 0 4px 20px rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .pw-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .pw-lockup { display: flex; align-items: center; gap: 12px; text-decoration: none; min-width: 0; }
        .pw-logo-pill { background: #fff; border-radius: 8px; padding: 5px 12px; height: 44px; display: flex; align-items: center; flex-shrink: 0; }
        .pw-logo-pill img { height: 32px; width: auto; display: block; }
        .pw-x { color: #777; font-size: 20px; font-weight: 300; font-family: var(--font-lato); }
        .pw-pmi-mark { width: 44px; height: 44px; border-radius: 8px; background: ${PMI}; color: #fff; display: flex; align-items: center; justify-content: center;
          font-family: var(--font-oswald); font-weight: 700; font-size: 15px; letter-spacing: 0.04em; flex-shrink: 0; }
        .pw-pmi-name { color: #fff; font-family: var(--font-oswald); font-weight: 700; font-size: 15px; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.1; }
        .pw-nav { display: flex; align-items: center; gap: 4px; }
        .pw-nav a { color: #ccc; text-decoration: none; font-family: var(--font-lato); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 8px 12px; border-radius: 4px; transition: color .15s, background .15s; }
        .pw-nav a:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .pw-nav a.pw-nav-cta { background: ${FF}; color: #fff; margin-left: 6px; padding: 9px 16px; }
        .pw-nav a.pw-nav-cta:hover { background: #B71C1C; }

        .pw-partner { max-width: 720px; margin: 0 auto 36px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 18px 22px; text-align: left; }
        .pw-partner-lead { font-family: var(--font-lato); font-size: 15px; font-weight: 700; color: #fff; line-height: 1.6; margin: 0 0 12px; }
        .pw-partner-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 8px; }
        .pw-dot { width: 9px; height: 9px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
        .pw-partner-row p { font-family: var(--font-lato); font-size: 14px; color: #bbb; line-height: 1.6; margin: 0; }
        .pw-partner-row strong { color: #fff; }

        .pw-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
        .pw-topic { background: #fff; border: 1.5px solid #E5E5E5; border-radius: 10px; padding: 22px 20px; transition: box-shadow .2s, transform .2s; }
        .pw-topic:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }

        .pw-streams { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .pw-card { background: #fff; border: 1.5px solid #E5E5E5; border-radius: 12px; overflow: hidden; }
        .pw-card-head { padding: 16px 20px; display: flex; align-items: center; gap: 12px; border-bottom: 1.5px solid #F0F0F0; }
        .pw-card-head .pw-grow { flex: 1; min-width: 0; }
        .pw-card-body { padding: 20px; }
        .pw-embed { position: relative; width: 100%; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; background: #000; }
        .pw-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .pw-sub-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 6px; color: #fff; text-decoration: none;
          font-family: var(--font-lato); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; transition: opacity .15s, transform .15s; }
        .pw-sub-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .pw-sub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px; margin: 0 auto; }
        .pw-sub-card { background: #222; border: 1px solid #333; border-radius: 14px; padding: 28px 24px; text-align: center; }

        .pw-footer-inner { max-width: 1000px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

        @media (max-width: 760px) {
          .pw-streams, .pw-sub-grid, .pw-footer-inner { grid-template-columns: 1fr; }
          .pw-pmi-name, .pw-nav a.pw-nav-link { display: none; }
          .pw-card-head { flex-wrap: wrap; }
        }
      `}</style>

      {/* Co-branded header */}
      <header className="pw-header">
        <div className="pw-header-inner">
          <a href="#top" className="pw-lockup" aria-label="Future Finder and Prepared Mind Initiative">
            <span className="pw-logo-pill"><img src="/logo.png" alt="Future Finder" /></span>
            <span className="pw-x">×</span>
            <span className="pw-pmi-mark">PMI</span>
            <span className="pw-pmi-name">Prepared Mind<br />Initiative</span>
          </a>
          <nav className="pw-nav" aria-label="Page sections">
            <a href="#about" className="pw-nav-link">About</a>
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
              <p><strong>Prepared Mind Initiative</strong> brings growth-mindset and digital-skills content, building minds that win.</p>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(34px, 7vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, margin: '0 0 18px' }}>
            Poverty is a <span style={{ color: FF }}>Behaviour</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 17, color: '#aaa', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 28px' }}>
            And why schools don&rsquo;t teach you about money. A live web conference on financial habits, mindset and breaking cycles of poverty, presented jointly by both organisations and broadcast on both YouTube channels.
          </p>
          {EVENT_WHEN && (
            <p style={{ display: 'inline-block', fontFamily: 'var(--font-lato)', fontSize: 14, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '8px 18px', margin: '0 0 24px' }}>
              📅 {EVENT_WHEN}
            </p>
          )}
          <a href="#watch" style={{ display: 'inline-block', background: FF, color: '#fff', fontFamily: 'var(--font-lato)', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Watch Live ↓
          </a>
        </div>
      </section>

      <div style={{ height: 4, background: `linear-gradient(90deg, ${FF} 50%, ${PMI} 50%)` }} />

      {/* About */}
      <section id="about" className="pw-section" style={{ padding: '60px 24px 40px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>
            About This Web Conference
          </h2>
          <div style={{ width: 48, height: 3, background: FF, margin: '0 auto 20px' }} />
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#444', lineHeight: 1.9 }}>
            Poverty is a behaviour. Financial struggle is less about the lack of money and more about the patterns and habits people inherit and never question. In this live web conference, Future Finder and Prepared Mind Initiative unpack why poverty is a behavioural cycle, how schools have failed us on financial education, and what African youth can do right now to break those patterns.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section style={{ padding: '0 24px 64px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pw-topics">
            {topics.map(t => (
              <div key={t.title} className="pw-topic">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{t.title}</h3>
                <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watch: each channel with its own subscribe button */}
      <section id="watch" className="pw-section" style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>
              Watch Live
            </h2>
            <div style={{ width: 48, height: 3, background: FF, margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666' }}>
              Broadcast live on both YouTube channels. Subscribe to each one so you never miss a session.
            </p>
          </div>

          <div className="pw-streams">
            <div className="pw-card">
              <div className="pw-card-head" style={{ background: '#FFF5F5' }}>
                <div className="pw-grow">
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>Future Finder</div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>YouTube channel</div>
                </div>
                <a href={FF_YT} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: FF }}>▶ Subscribe</a>
              </div>
              <div className="pw-card-body">
                <div className="pw-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${FF_VIDEO_ID}`}
                    title="Poverty is a Behaviour, Future Finder channel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <div className="pw-card">
              <div className="pw-card-head" style={{ background: '#F5F8FF' }}>
                <div className="pw-grow">
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>Prepared Mind Initiative</div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>YouTube channel</div>
                </div>
                <a href={PMI_YT} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: PMI }}>▶ Subscribe</a>
              </div>
              <div className="pw-card-body">
                <div className="pw-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${PMI_VIDEO_ID}`}
                    title="Poverty is a Behaviour, Prepared Mind Initiative channel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe: equal weight for both organisations */}
      <section id="subscribe" className="pw-section" style={{ padding: '64px 24px', background: '#1A1A1A' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              Subscribe to Both Channels
            </h2>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#aaa', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              This is the first of many conversations. Subscribe to both channels so you know when the next web conference goes live.
            </p>
          </div>
          <div className="pw-sub-grid">
            <div className="pw-sub-card" style={{ borderTop: `4px solid ${FF}` }}>
              <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Future Finder</div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', lineHeight: 1.7, margin: '0 0 20px' }}>Verified jobs, scholarships and opportunities for African youth.</p>
              <a href={FF_YT} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: FF, padding: '12px 24px', fontSize: 13 }}>▶ Subscribe on YouTube</a>
              <div style={{ marginTop: 14 }}>
                <a href="https://linktr.ee/future.finder" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontFamily: 'var(--font-lato)', fontSize: 13, textDecoration: 'underline' }}>More ways to follow</a>
              </div>
            </div>
            <div className="pw-sub-card" style={{ borderTop: `4px solid ${PMI}` }}>
              <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Prepared Mind Initiative</div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa', lineHeight: 1.7, margin: '0 0 20px' }}>Growth-mindset and digital-skills content, building minds that win.</p>
              <a href={PMI_YT} target="_blank" rel="noopener noreferrer" className="pw-sub-btn" style={{ background: PMI, padding: '12px 24px', fontSize: 13 }}>▶ Subscribe on YouTube</a>
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
            <a href={FF_YT} target="_blank" rel="noopener noreferrer" style={{ color: FF, fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Subscribe on YouTube →</a>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Prepared Mind Initiative</div>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, lineHeight: 1.7, margin: '0 0 8px' }}>Building minds that win.</p>
            <a href={PMI_YT} target="_blank" rel="noopener noreferrer" style={{ color: '#42A5F5', fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Subscribe on YouTube →</a>
          </div>
        </div>
        <div style={{ maxWidth: 1000, margin: '28px auto 0', padding: '18px 24px 0', borderTop: '1px solid #222', textAlign: 'center', fontFamily: 'var(--font-lato)', fontSize: 12, color: '#666' }}>
          © 2026 Future Finder × Prepared Mind Initiative. Hosted at futurefinder.blog.
        </div>
      </footer>
    </div>
  )
}
