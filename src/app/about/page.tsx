import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Future Finder',
  description: 'Future Finder is a free daily opportunities platform built for African and Ghanaian youth — surfacing real jobs, scholarships, funding, and growth resources every day.',
  openGraph: {
    title: 'About Future Finder | Real Opportunities for African Youth',
    description: 'We find, vet, and deliver the best opportunities for African youth — free, daily, and built with purpose. Partner with us to reach Africa\'s most ambitious generation.',
    url: 'https://futurefinder.blog/about',
    images: [{ url: '/logo.png', width: 400, height: 200, alt: 'Future Finder' }],
  }
}

const pillars = [
  { icon: '💼', label: 'Jobs', desc: 'Entry-level to senior roles across Ghana and Africa — vetted, current, and linked directly to official sources.' },
  { icon: '🎓', label: 'Scholarships', desc: 'Local and international awards from institutions worldwide, with real deadlines and direct application links.' },
  { icon: '✈️', label: 'Study Abroad', desc: 'Exchange programmes, international admissions, and global learning opportunities for African students.' },
  { icon: '🚀', label: 'Entrepreneurship', desc: 'Grants, accelerators, competitions, and funding for African founders — from idea stage to scale.' },
  { icon: '🌱', label: 'Growth Mindset', desc: 'Career guides, application tips, competitions, and development resources to help you show up prepared.' },
]

const stats = [
  { value: '840+', label: 'WhatsApp Subscribers' },
  { value: '5', label: 'Opportunity Categories' },
  { value: 'Daily', label: 'New Opportunities' },
  { value: '100%', label: 'Free, Always' },
]

const values = [
  'Every opportunity is verified before it goes live — we do not post rumours, expired listings, or unverified claims.',
  'Every listing includes a direct application link and a real, confirmed deadline.',
  'We cover the whole continent, with a deliberate focus on Ghana and the wider West African region.',
  'Future Finder is, and will always be, completely free for every opportunity seeker.',
  'We flag scams proactively and remove listings the moment we identify a red flag.',
  'We move fast — new opportunities are added daily so our readers never miss a window.',
]

const partnerReasons = [
  {
    icon: '🎯',
    title: 'A Targeted, Action-Ready Audience',
    desc: 'Our readers are not browsing casually. They are graduates, students, founders, and young professionals who are actively building their futures — and actively looking for what you are offering.',
  },
  {
    icon: '🌍',
    title: 'Real Pan-African Reach',
    desc: 'From Accra to Lagos, Nairobi to Johannesburg — Future Finder serves ambitious young Africans across the continent and the diaspora through our website, WhatsApp channel, and email broadcasts.',
  },
  {
    icon: '✅',
    title: 'A Platform Brands Can Trust',
    desc: 'We have built our credibility by refusing to publish scams, always linking to official sources, and holding every listing to a high standard. When your opportunity appears on Future Finder, it carries that trust.',
  },
  {
    icon: '⚡',
    title: 'Fast, Professional Turnaround',
    desc: 'Share your details and we handle the rest — formatted, published, and broadcast to our audience quickly. No back-and-forth, no delays.',
  },
  {
    icon: '📣',
    title: 'Multi-Channel Distribution',
    desc: 'Your featured opportunity does not just sit on a webpage. It gets pushed through our WhatsApp channel, email list, and social platforms — maximising exposure to the people you want to reach.',
  },
  {
    icon: '🤝',
    title: 'Flexible Partnership Models',
    desc: 'Whether you want a one-time featured listing, an ongoing recruitment partnership, or a co-branded campaign — we work with you to structure something that fits your goals and budget.',
  },
]

const testimonialNote = `"We're not just a job board or a scholarship aggregator. We are a daily companion for young Africans who refuse to let geography, information gaps, or lack of networks limit what they can achieve."`

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── Layout ── */
        .ab-section { max-width: 860px; margin: 0 auto; padding: 72px 24px; }
        .ab-section-wide { max-width: 1100px; margin: 0 auto; padding: 72px 24px; }
        .ab-hero { background: linear-gradient(135deg, #B71C1C 0%, #D32F2F 60%, #E53935 100%); padding: 96px 24px 88px; text-align: center; position: relative; overflow: hidden; }
        .ab-hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }

        /* ── Typography ── */
        .eyebrow { font-family: var(--font-lato); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #D32F2F; margin-bottom: 12px; }
        .section-title { font-family: var(--font-oswald); font-size: clamp(26px, 4vw, 36px); font-weight: 700; color: #1A1A1A; line-height: 1.15; margin-bottom: 18px; }
        .section-body { font-family: var(--font-lato); font-size: 15.5px; color: #555; line-height: 1.85; margin-bottom: 16px; }
        .divider { border: none; border-top: 1px solid #EFEFEF; margin: 0; }

        /* ── Pillar grid ── */
        .pillar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 40px; }
        @media (max-width: 768px) { .pillar-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .pillar-grid { grid-template-columns: 1fr; } }
        .pillar-card { background: #FAFAFA; border: 1px solid #EFEFEF; border-radius: 10px; padding: 24px 20px; transition: box-shadow 0.2s, transform 0.2s; }
        .pillar-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .pillar-icon { font-size: 26px; margin-bottom: 10px; }
        .pillar-label { font-family: var(--font-oswald); font-size: 17px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
        .pillar-desc { font-family: var(--font-lato); font-size: 13px; color: #666; line-height: 1.65; }

        /* ── Stats ── */
        .stats-strip { background: #1A1A1A; padding: 56px 24px; }
        .stats-grid { max-width: 860px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        @media (max-width: 600px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-value { font-family: var(--font-oswald); font-size: 42px; font-weight: 700; color: #D32F2F; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-family: var(--font-lato); font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; }

        /* ── Values list ── */
        .values-list { list-style: none; padding: 0; margin-top: 28px; }
        .values-list li { font-family: var(--font-lato); font-size: 15px; color: #444; line-height: 1.7; padding: 12px 0; border-bottom: 1px solid #F0F0F0; display: flex; align-items: flex-start; gap: 14px; }
        .values-list li:last-child { border-bottom: none; }
        .check-dot { flex-shrink: 0; width: 22px; height: 22px; background: #D32F2F; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; margin-top: 1px; }

        /* ── Partner grid ── */
        .partner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
        @media (max-width: 900px) { .partner-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .partner-grid { grid-template-columns: 1fr; } }
        .partner-card { border: 1px solid #E8E8E8; border-radius: 10px; padding: 28px 22px; background: #fff; transition: box-shadow 0.2s, border-color 0.2s; }
        .partner-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); border-color: #D32F2F; }
        .partner-icon { font-size: 26px; margin-bottom: 12px; }
        .partner-title { font-family: var(--font-oswald); font-size: 17px; font-weight: 600; color: #1A1A1A; margin-bottom: 8px; }
        .partner-desc { font-family: var(--font-lato); font-size: 13.5px; color: #666; line-height: 1.7; }

        /* ── CTA block ── */
        .cta-block { background: linear-gradient(135deg, #B71C1C, #D32F2F); border-radius: 14px; padding: 56px 40px; text-align: center; margin-top: 52px; }
        .cta-block h3 { font-family: var(--font-oswald); font-size: clamp(22px, 4vw, 30px); font-weight: 700; color: #fff; margin-bottom: 14px; }
        .cta-block p { font-family: var(--font-lato); font-size: 15px; color: rgba(255,255,255,0.88); margin-bottom: 32px; line-height: 1.75; max-width: 540px; margin-left: auto; margin-right: auto; }
        .btn-white { display: inline-block; background: #fff; color: #D32F2F; font-family: var(--font-lato); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; padding: 14px 30px; border-radius: 6px; text-decoration: none; transition: background 0.15s; margin: 6px 8px; }
        .btn-white:hover { background: #f0f0f0; }
        .btn-ghost { display: inline-block; background: transparent; color: #fff; font-family: var(--font-lato); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; padding: 12px 30px; border-radius: 6px; text-decoration: none; border: 2px solid rgba(255,255,255,0.55); transition: all 0.15s; margin: 6px 8px; }
        .btn-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

        /* ── Pull quote ── */
        .pull-quote { border-left: 4px solid #D32F2F; padding: 20px 28px; background: #FFF8F8; border-radius: 0 8px 8px 0; margin: 32px 0; }
        .pull-quote p { font-family: var(--font-lato); font-size: 16px; color: #333; line-height: 1.8; font-style: italic; margin: 0; }

        /* ── Scam callout ── */
        .scam-callout { background: #1A1A1A; border-radius: 10px; padding: 28px 32px; display: flex; align-items: flex-start; gap: 18px; margin-top: 48px; }
        .scam-callout-icon { flex-shrink: 0; width: 40px; height: 40px; background: #D32F2F; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .scam-callout-body h4 { font-family: var(--font-oswald); font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 6px; }
        .scam-callout-body p { font-family: var(--font-lato); font-size: 13.5px; color: #999; line-height: 1.7; margin: 0; }
        .scam-callout-body span { color: #FF5252; font-weight: 700; }
        @media (max-width: 560px) { .scam-callout { flex-direction: column; gap: 12px; padding: 22px 20px; } }

        /* ── Team strip ── */
        .team-strip { background: #F5F5F5; padding: 72px 24px; text-align: center; }
      `}</style>

      {/* ── HERO ── */}
      <section className="ab-hero">
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16, position: 'relative' }}>
          Our Story
        </p>
        <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(34px, 6vw, 60px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: 22, maxWidth: 720, margin: '0 auto 22px', position: 'relative' }}>
          We Find the Opportunities.<br />You Chase the Dream.
        </h1>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 17, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px', position: 'relative' }}>
          Future Finder is a free, daily opportunities platform built for African and Ghanaian youth — surfacing real jobs, scholarships, funding, and growth resources so the next big break is always within reach.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <Link href="/jobs" className="btn-white">Browse Opportunities</Link>
          <a href="mailto:office.futurefinder@gmail.com" className="btn-ghost">Partner With Us</a>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="ab-section">
        <p className="eyebrow">Why We Exist</p>
        <h2 className="section-title">Africa's Talent Has Never Been the Problem.<br />Access Is.</h2>
        <p className="section-body">
          Every year, thousands of scholarships go unfilled, accelerator programmes miss their strongest applicants, and job listings never reach the people who need them most — not because the talent isn't there, but because the right information never arrives in time. The gap between opportunity and the people it was built for is not a talent gap. It's an information gap.
        </p>
        <p className="section-body">
          Future Finder was built to close that gap. We spend our days finding, verifying, and formatting the best opportunities across five categories — then delivering them directly to African youth through our website and WhatsApp channel, every single day, completely free.
        </p>

        <div className="pull-quote">
          <p>{testimonialNote}</p>
        </div>

        <p className="section-body">
          We do not post rumours. We do not share expired listings. We do not charge our readers a single pesewa. What we share is real, current, and direct — because that is what the next generation of African leaders deserves.
        </p>

        <ul className="values-list">
          {values.map((v, i) => (
            <li key={i}>
              <span className="check-dot">✓</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>

        {/* Scam callout */}
        <div className="scam-callout" role="note" aria-label="Anti-fraud notice">
          <div className="scam-callout-icon" aria-hidden="true">🛡️</div>
          <div className="scam-callout-body">
            <h4>Official Anti-Fraud Notice</h4>
            <p>
              Future Finder is <span>100% free</span> for all opportunity seekers — always. We will <span>never</span> contact you to request payment, a processing fee, or any form of financial contribution to access or apply for any opportunity on this platform. If anyone reaches out claiming to be from Future Finder and asks for money, they are a <span>fraudster</span>. Do not pay, and report it immediately.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── WHAT WE COVER ── */}
      <section className="ab-section">
        <p className="eyebrow">What We Cover</p>
        <h2 className="section-title">Five Pillars. One Mission.</h2>
        <p className="section-body">
          From your first job application to your first funded startup — Future Finder covers every stage of the journey from student to leader.
        </p>
        <div className="pillar-grid">
          {pillars.map(p => (
            <div key={p.label} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <div className="pillar-label">{p.label}</div>
              <div className="pillar-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-strip">
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* ── PARTNER SECTION ── */}
      <section className="ab-section-wide">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p className="eyebrow">Partner With Us</p>
          <h2 className="section-title">Reach Africa's Most Ambitious Generation</h2>
          <p className="section-body">
            If you run a scholarship programme, graduate trainee scheme, accelerator, grant competition, or recruitment campaign — Future Finder can place your opportunity directly in front of the qualified, motivated young Africans you are trying to reach. No noise. No wasted impressions. Just your opportunity in front of people who are ready to act.
          </p>
          <p className="section-body">
            Organisations that partner with Future Finder are not just buying ad space. They are associating their brand with a trusted, purpose-driven platform — and reaching an audience that respects the source of the opportunities they apply for. That trust transfers to you.
          </p>
        </div>

        <div className="partner-grid" style={{ maxWidth: 1060, margin: '0 auto' }}>
          {partnerReasons.map(r => (
            <div key={r.title} className="partner-card">
              <div className="partner-icon">{r.icon}</div>
              <div className="partner-title">{r.title}</div>
              <div className="partner-desc">{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="cta-block">
            <h3>Let's Build Something Together</h3>
            <p>
              Whether you want to feature a paid listing, run an ongoing recruitment partnership, co-brand a campaign, or simply explore what collaboration with Future Finder looks like — we are open to the conversation. Reach out and let's talk.
            </p>
            <a href="mailto:office.futurefinder@gmail.com" className="btn-white">
              Contact Us
            </a>
            <Link href="/newsletter" className="btn-ghost">
              See Our Audience
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR READERS CTA ── */}
      <section className="team-strip">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>For Our Readers</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Your Opportunity Is Out There.</h2>
          <p className="section-body" style={{ textAlign: 'center' }}>
            You have already done the hard part — you showed up, you stayed curious, and you kept pushing. Let us help you take the next step. Browse our latest listings — it costs nothing, and it only takes a moment to find something that could change everything.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/scholarships" className="btn-primary">Browse Scholarships</Link>
            <Link href="/jobs" className="btn-secondary">Browse Jobs</Link>
          </div>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#999', textAlign: 'center', marginTop: 24 }}>
            Follow us on{' '}
            <a href="https://linktr.ee/future.finder" target="_blank" rel="noopener noreferrer" style={{ color: '#D32F2F', textDecoration: 'underline' }}>
              all our channels
            </a>
            {' '}— and never miss another opportunity.
          </p>
        </div>
      </section>
    </>
  )
}
