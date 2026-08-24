import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Future Finder',
  description: 'Get in touch with the Future Finder team — partnerships, opportunity submissions, feedback, or general enquiries.',
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-hero { background: #1A1A1A; padding: 72px 24px 64px; }
        .contact-wrap { max-width: 1000px; margin: 0 auto; padding: 72px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        @media (max-width: 768px) { .contact-wrap { grid-template-columns: 1fr; gap: 40px; } }
        .ccard { background: #F8F8F8; border: 1px solid #EFEFEF; border-radius: 12px; padding: 24px 20px; display: flex; gap: 16px; align-items: flex-start; margin-bottom: 14px; transition: box-shadow 0.2s, border-color 0.2s; }
        .ccard:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); border-color: #D32F2F; }
        .ccard-icon { flex-shrink: 0; width: 42px; height: 42px; background: #D32F2F; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 19px; }
        .ccard-title { font-family: var(--font-oswald); font-size: 16px; font-weight: 600; color: #1A1A1A; margin-bottom: 5px; }
        .ccard-body { font-family: var(--font-lato); font-size: 13px; color: #666; line-height: 1.65; }
        .ccard-link { display: inline-block; margin-top: 8px; font-family: var(--font-lato); font-size: 12.5px; font-weight: 700; color: #D32F2F; text-decoration: none; }
        .ccard-link:hover { text-decoration: underline; }
        .eyebrow-sm { font-family: var(--font-lato); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #D32F2F; margin-bottom: 10px; }
        .faq-item { border-bottom: 1px solid #EFEFEF; padding: 16px 0; }
        .faq-q { font-family: var(--font-oswald); font-size: 15px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
        .faq-a { font-family: var(--font-lato); font-size: 13.5px; color: #555; line-height: 1.7; }
        .notice-box { background: #FFF8F8; border: 1px solid #FFCDD2; border-left: 4px solid #D32F2F; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-top: 24px; font-family: var(--font-lato); font-size: 13px; color: #555; line-height: 1.7; }
      `}</style>

      <section className="contact-hero">
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p className="eyebrow-sm" style={{ color: '#888' }}>Get In Touch</p>
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>We're Here to Help</h1>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#888', lineHeight: 1.75 }}>
            Whether you want to submit an opportunity, explore a partnership, report a suspect listing, or just say hello — reach out and we'll respond promptly.
          </p>
        </div>
      </section>

      <div className="contact-wrap">
        <div>
          <p className="eyebrow-sm">Contact Channels</p>
          <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>Reach the Team</h2>

          {[
            { icon: '📧', title: 'General Enquiries', body: 'Questions, feedback, corrections — email us and we respond within 24–48 hours.', link: 'mailto:office.futurefinder@gmail.com', linkLabel: 'office.futurefinder@gmail.com' },
            { icon: '🤝', title: 'Partnerships & Sponsorships', body: 'Feature your programme, sponsor content, or run a recruitment partnership with us.', link: 'mailto:office.futurefinder@gmail.com?subject=Partnership%20Enquiry', linkLabel: 'Email: Partnership Enquiry' },
            { icon: '📢', title: 'Submit an Opportunity', body: 'Know of a legitimate opportunity we haven\'t covered? Share it — if it checks out, we\'ll post it.', link: '/submit', linkLabel: 'Use the submission form →' },
            { icon: '🚩', title: 'Report a Scam or Expired Listing', body: 'Spot something suspicious or a passed deadline? Report it immediately and we\'ll act fast.', link: 'mailto:office.futurefinder@gmail.com?subject=Report%20a%20Listing', linkLabel: 'Email: Report a Listing' },
            { icon: '💬', title: 'WhatsApp Community', body: 'Join 840+ subscribers getting daily opportunities on WhatsApp. Fastest way to stay updated.', link: 'https://linktr.ee/future.finder', linkLabel: 'Join via Linktree →', external: true },
          ].map(({ icon, title, body, link, linkLabel, external }) => (
            <div key={title} className="ccard">
              <div className="ccard-icon">{icon}</div>
              <div>
                <div className="ccard-title">{title}</div>
                <div className="ccard-body">{body}</div>
                <a href={link} className="ccard-link" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{linkLabel}</a>
              </div>
            </div>
          ))}

          <div className="notice-box">
            <strong style={{ color: '#D32F2F' }}>Anti-Scam Notice:</strong> Future Finder will never ask you to pay for access to any opportunity. All services for opportunity seekers are completely free. Anyone requesting payment on our behalf is a fraudster.
          </div>
        </div>

        <div>
          <p className="eyebrow-sm">FAQs</p>
          <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>Common Questions</h2>
          {[
            { q: 'Is Future Finder free to use?', a: 'Yes — completely and always. Browsing and applying for any opportunity on Future Finder costs nothing. We will never charge our readers.' },
            { q: 'How do I submit an opportunity?', a: 'Use our Submit an Opportunity page or email office.futurefinder@gmail.com. We review every submission before publishing and only list verified opportunities.' },
            { q: 'Can my organisation pay to feature an opportunity?', a: 'Yes. We offer paid featured listings and partnership packages. Email us with "Partnership Enquiry" in the subject line to discuss options.' },
            { q: 'How quickly are new opportunities posted?', a: 'We add opportunities daily. Join our WhatsApp channel for same-day alerts the moment new listings go live.' },
            { q: 'I found a scam listing. What do I do?', a: 'Email office.futurefinder@gmail.com immediately with "Report a Listing" in the subject. Include the listing name and why you\'re suspicious. We act fast.' },
            { q: 'Do you cover opportunities outside Ghana?', a: 'Yes. We cover opportunities across Africa and international opportunities targeting African applicants — including European scholarships, pan-African grants, and global competitions.' },
            { q: 'How do I know a listing is legitimate?', a: 'We verify every listing before publishing — checking official websites, confirmed deadlines, and real application links. If something seems off after clicking, report it to us.' },
          ].map(({ q, a }) => (
            <div key={q} className="faq-item">
              <div className="faq-q">{q}</div>
              <div className="faq-a">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
