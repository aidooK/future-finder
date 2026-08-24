import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit an Opportunity | Future Finder',
  description: 'Know of a legitimate job, scholarship, grant, or programme? Submit it to Future Finder and help us get it in front of the right people.',
}

export default function SubmitPage() {
  return (
    <>
      <style>{`
        .submit-hero { background: linear-gradient(135deg, #B71C1C, #D32F2F); padding: 72px 24px 64px; text-align: center; }
        .submit-wrap { max-width: 760px; margin: 0 auto; padding: 72px 24px; }
        .submit-card { background: #F8F8F8; border: 1px solid #E8E8E8; border-radius: 12px; padding: 32px; margin-bottom: 20px; display: flex; gap: 20px; align-items: flex-start; }
        .submit-card-icon { flex-shrink: 0; width: 48px; height: 48px; background: #1A1A1A; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .submit-card-title { font-family: var(--font-oswald); font-size: 18px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
        .submit-card-body { font-family: var(--font-lato); font-size: 14px; color: #666; line-height: 1.7; }
        .eyebrow-sm { font-family: var(--font-lato); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #D32F2F; margin-bottom: 10px; }
        .guideline-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #F0F0F0; font-family: var(--font-lato); font-size: 14px; color: #444; line-height: 1.6; }
        .g-icon { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-top: 1px; }
        .btn-red { display: inline-block; background: #D32F2F; color: #fff; font-family: var(--font-lato); font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; padding: 15px 36px; border-radius: 6px; text-decoration: none; transition: background 0.15s; }
        .btn-red:hover { background: #B71C1C; }
      `}</style>

      <section className="submit-hero">
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>Community Submissions</p>
        <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16, maxWidth: 600, margin: '0 auto 16px' }}>
          Know of an Opportunity We Haven't Covered?
        </h1>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
          Help us help more people. Share a legitimate opportunity and if it passes our vetting process, we'll publish it for thousands of young Africans to see.
        </p>
      </section>

      <div className="submit-wrap">
        <p className="eyebrow-sm">How It Works</p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 28 }}>Simple 3-Step Process</h2>

        {[
          { icon: '📝', step: '01', title: 'Email Us the Details', body: 'Send all the opportunity details to office.futurefinder@gmail.com — name, deadline, apply link, eligibility, and benefits. The more detail, the faster we can process it.' },
          { icon: '🔍', step: '02', title: 'We Verify It', body: 'Our team checks the source, confirms the deadline is still open, verifies the application link, and makes sure it\'s a genuine, scam-free opportunity before anything goes live.' },
          { icon: '🚀', step: '03', title: 'We Publish and Broadcast', body: 'Once verified, we format and publish it on the site — and push it to our WhatsApp channel and email list so it reaches thousands of people the same day.' },
        ].map(({ icon, step, title, body }) => (
          <div key={step} className="submit-card">
            <div className="submit-card-icon">{icon}</div>
            <div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 4 }}>Step {step}</p>
              <div className="submit-card-title">{title}</div>
              <div className="submit-card-body">{body}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#1A1A1A', borderRadius: 12, padding: '32px', textAlign: 'center', margin: '40px 0' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Ready to Submit?</p>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#888', marginBottom: 24, lineHeight: 1.7 }}>Send your opportunity details to our email. Use the subject line "Opportunity Submission" and include as many details as possible.</p>
          <a href="mailto:office.futurefinder@gmail.com?subject=Opportunity%20Submission" className="btn-red">Submit via Email</a>
        </div>

        <p className="eyebrow-sm" style={{ marginTop: 40 }}>What We Accept</p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>Submission Guidelines</h2>

        {[
          { pass: true, text: 'Jobs, internships, and graduate trainee programmes with official listings' },
          { pass: true, text: 'Scholarships and bursaries with confirmed deadlines and direct application links' },
          { pass: true, text: 'Grants, accelerators, and competitions open to African applicants' },
          { pass: true, text: 'Study abroad, exchange programmes, and international education opportunities' },
          { pass: true, text: 'Free training, certifications, and development programmes' },
          { pass: false, text: 'Opportunities that require payment to apply or access' },
          { pass: false, text: 'Listings without an official, verifiable source' },
          { pass: false, text: 'Expired opportunities or listings with passed deadlines' },
          { pass: false, text: 'MLM schemes, "earn from home" scams, or unverifiable remote work offers' },
        ].map(({ pass, text }) => (
          <div key={text} className="guideline-item">
            <span className="g-icon" style={{ background: pass ? '#E8F5E9' : '#FFEBEE', color: pass ? '#2E7D32' : '#D32F2F' }}>
              {pass ? '✓' : '✗'}
            </span>
            <span>{text}</span>
          </div>
        ))}

        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#999', marginTop: 24, lineHeight: 1.7 }}>
          We reserve the right to decline any submission that doesn't meet our quality and legitimacy standards. All submissions are reviewed manually and we'll let you know if yours isn't approved.
        </p>
      </div>
    </>
  )
}
