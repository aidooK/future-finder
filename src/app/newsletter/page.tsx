import NewsletterSignup from '@/components/ui/NewsletterSignup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe — Get Daily Opportunities Free',
  description: 'Join thousands of African youth getting daily jobs, scholarships and study abroad opportunities in their inbox. Free forever.',
}

export default function NewsletterPage() {
  return (
    <>
      <div style={{ background: '#1A1A1A', padding: '64px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Never Miss an Opportunity
        </h1>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: 16, color: '#888', maxWidth: 500, margin: '0 auto' }}>
          Get the best jobs, scholarships and study abroad programs delivered to your inbox every morning. Free. No spam.
        </p>
      </div>
      <NewsletterSignup variant="band" />
      <div style={{ padding: '64px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 28, color: '#1A1A1A', marginBottom: 24 }}>What You Get</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
          {[
            ['📋 Daily Job Listings', 'Curated jobs across Ghana and Africa — entry level to senior.'],
            ['🎓 Scholarship Alerts', 'Local and international scholarships with deadlines and guides.'],
            ['✈️ Study Abroad Programs', 'Exchange programs and international university opportunities.'],
            ['💡 Growth Tips', 'Application guides, CV tips and success stories from African youth.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, padding: '16px', background: '#F5F5F5', borderRadius: 8 }}>
              <div style={{ fontSize: 24 }}>{(title as string).split(' ')[0]}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{(title as string).slice(3)}</div>
                <div style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
