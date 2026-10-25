'use client'

export default function WebinarPage() {
  return (
    <>
      <style>{`
        .webinar-embed-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          border-radius: 10px;
          overflow: hidden;
          background: #000;
        }
        .webinar-embed-wrapper iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: none;
        }
        .streams-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 56px;
        }
        .stream-card {
          background: #fff;
          border: 1.5px solid #E5E5E5;
          border-radius: 12px;
          overflow: hidden;
        }
        .stream-card-header {
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1.5px solid #F0F0F0;
        }
        .stream-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .stream-body { padding: 20px 22px 22px; }
        .watch-btn {
          display: inline-block;
          margin-top: 14px;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: var(--font-lato);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: opacity 0.15s;
        }
        .watch-btn:hover { opacity: 0.85; }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 56px;
        }
        .highlight-card {
          background: #fff;
          border: 1.5px solid #E5E5E5;
          border-radius: 10px;
          padding: 22px 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .highlight-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        @media (max-width: 720px) {
          .streams-grid { grid-template-columns: 1fr; gap: 24px; }
          .highlights-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .highlights-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: '#1A1A1A', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#D32F2F', color: '#fff',
            fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-lato)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 14px', borderRadius: 20, marginBottom: 20
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            Future Finder × Prepared Mind Initiative
          </span>
          <h1 style={{
            fontFamily: 'var(--font-oswald)',
            fontSize: 'clamp(30px, 6vw, 54px)',
            fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20
          }}>
            Poverty is a{' '}
            <span style={{ color: '#D32F2F' }}>Behaviour</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-lato)', fontSize: 17,
            color: '#aaa', lineHeight: 1.8, marginBottom: 28, maxWidth: 600, margin: '0 auto 28px'
          }}>
            And why schools don&rsquo;t teach you about money. A live webinar on financial habits, mindset, and breaking cycles of poverty — hosted jointly by Future Finder and Prepared Mind Initiative.
          </p>
          <a
            href="https://queensu.qualtrics.com/jfe/form/SV_2skpzGTY6MedJJk"
            style={{
              display: 'inline-block', background: '#D32F2F', color: '#fff',
              fontFamily: 'var(--font-lato)', fontWeight: 700, fontSize: 15,
              padding: '14px 32px', borderRadius: 6, textDecoration: 'none',
              letterSpacing: '0.04em', transition: 'background 0.15s'
            }}
            target="_blank" rel="noopener noreferrer"
          >
            Watch Now ↓
          </a>
        </div>
      </section>

      {/* Red bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #D32F2F, #B71C1C)' }} />

      {/* What This Webinar Is About */}
      <section style={{ padding: '60px 24px 48px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-oswald)', fontSize: 28, fontWeight: 700,
            color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8
          }}>
            About This Webinar
          </h2>
          <div style={{ width: 48, height: 3, background: '#D32F2F', margin: '0 auto 20px' }} />
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#444', lineHeight: 1.9 }}>
            Poverty is a behaviour — financial struggle is less about the lack of money and more about the
            patterns and habits people inherit and never question. In this webinar, Future Finder and
            Prepared Mind Initiative unpack why poverty is a behavioural cycle, how schools have failed
            us on financial education, and what African youth can do right now to break those patterns.
          </p>
        </div>
      </section>

      {/* Key Topics */}
      <section style={{ padding: '0 24px 64px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="highlights-grid">
            {[
              { icon: '🧠', title: 'The Poverty Mindset', desc: 'Why behaviour is the real poverty — not the absence of money.' },
              { icon: '🏫', title: 'Schools & Money', desc: 'Why financial education is missing from African curricula and what that costs you.' },
              { icon: '🔄', title: 'Breaking the Cycle', desc: 'Practical patterns and habits that separate those who build wealth from those who don\'t.' },
              { icon: '💡', title: 'Opportunity Awareness', desc: 'How Future Finder connects African youth to the resources that change trajectories.' },
            ].map(item => (
              <div key={item.title} className="highlight-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-oswald)', fontSize: 17, fontWeight: 700,
                  color: '#1A1A1A', marginBottom: 8
                }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watch the Webinar — dual embeds */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700,
              color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8
            }}>
              Watch the Webinar
            </h2>
            <div style={{ width: 48, height: 3, background: '#D32F2F', margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666' }}>
              Available on both channels. Subscribe to stay updated on future sessions.
            </p>
          </div>

          <div className="streams-grid">

            {/* Future Finder channel */}
            <div className="stream-card">
              <div className="stream-card-header" style={{ background: '#FFF5F5' }}>
                <div className="stream-icon" style={{ background: '#D32F2F18' }}>📺</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
                    Future Finder
                  </div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>
                    Subscribe for daily opportunities
                  </div>
                </div>
              </div>
              <div className="stream-body">
                <div className="webinar-embed-wrapper">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/NEn_jmXaPb0?si=_iBmR3MH91KVok66"
                    title="Poverty is a Behaviour — Future Finder"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://www.youtube.com/live/NEn_jmXaPb0"
                  target="_blank" rel="noopener noreferrer"
                  className="watch-btn"
                  style={{ background: '#D32F2F', color: '#fff' }}
                >
                  Open on YouTube →
                </a>
              </div>
            </div>

            {/* PMI channel */}
            <div className="stream-card">
              <div className="stream-card-header" style={{ background: '#F5F8FF' }}>
                <div className="stream-icon" style={{ background: '#1565C018' }}>🎙️</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
                    Prepared Mind Initiative
                  </div>
                  <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#888' }}>
                    Subscribe for more webinars
                  </div>
                </div>
              </div>
              <div className="stream-body">
                <div className="webinar-embed-wrapper">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/RiiducAV31M?si=-LnF1GASKsn9xwFD"
                    title="Poverty is a Behaviour — Prepared Mind Initiative"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://www.youtube.com/live/RiiducAV31M"
                  target="_blank" rel="noopener noreferrer"
                  className="watch-btn"
                  style={{ background: '#1565C0', color: '#fff' }}
                >
                  Open on YouTube →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA — Follow FF */}
      <section style={{ padding: '64px 24px', background: '#1A1A1A' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700,
            color: '#fff', marginBottom: 12
          }}>
            Never Miss an Opportunity
          </h2>
          <p style={{
            fontFamily: 'var(--font-lato)', fontSize: 15, color: '#aaa',
            lineHeight: 1.8, marginBottom: 28
          }}>
            Future Finder publishes verified jobs, scholarships, and programmes for African youth every day.
            Follow us to stay ahead.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://linktr.ee/future.finder"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: '#D32F2F', color: '#fff',
                fontFamily: 'var(--font-lato)', fontWeight: 700, fontSize: 14,
                padding: '13px 28px', borderRadius: 6, textDecoration: 'none',
                letterSpacing: '0.04em'
              }}
            >
              Follow Future Finder →
            </a>
            <a
              href="/"
              style={{
                display: 'inline-block', background: 'transparent', color: '#fff',
                fontFamily: 'var(--font-lato)', fontWeight: 700, fontSize: 14,
                padding: '13px 28px', borderRadius: 6, textDecoration: 'none',
                letterSpacing: '0.04em', border: '1.5px solid #444'
              }}
            >
              Browse Opportunities
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
