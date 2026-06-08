'use client'
import { useState } from 'react'
import type { Metadata } from 'next'

const roles = [
  {
    title: 'Social Media',
    slots: '3 volunteers',
    icon: '📱',
    color: '#E1306C',
    description: 'Help us grow and engage our online community through consistent, compelling content across our platforms.',
  },
  {
    title: 'Graphics Design',
    slots: '1–2 volunteers',
    icon: '🎨',
    color: '#F59E0B',
    description: 'Bring our vision to life visually. From social posts to branded materials, your creativity will shape how the world sees us.',
  },
  {
    title: 'Research',
    slots: '3 volunteers',
    icon: '🔍',
    color: '#8B5CF6',
    description: 'Dig deep, find facts, and provide the intelligence that keeps our work grounded and credible.',
  },
  {
    title: 'Writing',
    slots: '3–4 volunteers',
    icon: '✍️',
    color: '#10B981',
    description: 'Tell our story persuasively. From articles, newsletters, scripts, and captions — if you love putting words together, we need you.',
  },
  {
    title: 'Web Development',
    slots: '1 volunteer',
    icon: '💻',
    color: '#3B82F6',
    description: 'If you build for the web, we\'d love your expertise to help maintain and grow the platform.',
  },
  {
    title: 'Community Moderation',
    slots: '5 volunteers',
    icon: '🤝',
    color: '#D32F2F',
    description: 'Be the heartbeat of our community. Help create a safe, welcoming, and lively space for everyone.',
  },
]

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    role: '',
    experience: '',
    why: '',
    availability: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Using Formspree - replace YOUR_FORM_ID with your actual Formspree form ID
      const res = await fetch('https://formspree.io/f/mykaeyye', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `FF Volunteer Application — ${form.role} — ${form.name}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', country: '', role: '', experience: '', why: '', availability: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .vol-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #E5E5E5;
          border-radius: 6px;
          font-size: 14px;
          font-family: var(--font-lato);
          color: #1A1A1A;
          background: #fff;
          transition: border-color 0.15s;
          outline: none;
          box-sizing: border-box;
        }
        .vol-input:focus { border-color: #D32F2F; }
        .vol-label {
          display: block;
          font-family: var(--font-lato);
          font-size: 13px;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .vol-field { margin-bottom: 20px; }
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #D32F2F;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-lato);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.15s;
        }
        .submit-btn:hover { background: #B71C1C; }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; }
        .role-card {
          padding: 20px;
          border-radius: 8px;
          border: 1.5px solid #E5E5E5;
          background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .role-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 56px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: '#1A1A1A', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: '#D32F2F', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-lato)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 20, marginBottom: 20 }}>
            Join the Team
          </span>
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Future Finder is Seeking Volunteers
          </h1>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 17, color: '#aaa', lineHeight: 1.8, marginBottom: 0 }}>
            We are building a passionate, purpose-driven team and we want you to be part of it. Whether you are a wordsmith, a tech whiz, a creative, or simply someone who loves connecting with people — there is a place for you here.
          </p>
        </div>
      </section>

      {/* Red accent bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #D32F2F, #B71C1C)' }} />

      {/* Open Roles */}
      <section style={{ padding: '64px 24px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>
              Open Roles
            </h2>
            <div style={{ width: 48, height: 3, background: '#D32F2F', margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666' }}>
              This is a volunteer opportunity for everyone. You will gain experience, collaborate with a dedicated team, and contribute to something that matters.
            </p>
          </div>

          <div className="roles-grid">
            {roles.map(role => (
              <div key={role.title} className="role-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: role.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>
                      {role.title}
                    </h3>
                    <span style={{ display: 'inline-block', background: role.color + '18', color: role.color, fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-lato)', padding: '2px 10px', borderRadius: 20, letterSpacing: '0.04em' }}>
                      {role.slots}
                    </span>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-lato)', fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 32, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8 }}>
              Apply to Volunteer
            </h2>
            <div style={{ width: 48, height: 3, background: '#D32F2F', margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666' }}>
              Fill in the form below and we will be in touch. We look forward to welcoming you to the team.
            </p>
          </div>

          {status === 'success' ? (
            <div style={{ background: '#ECFDF5', border: '2px solid #10B981', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: 24, color: '#1A1A1A', marginBottom: 12 }}>Application Received!</h3>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 15, color: '#666', lineHeight: 1.7 }}>
                Thank you for your interest in joining Future Finder. We will review your application and be in touch shortly. See you on the team!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1.5px solid #E5E5E5', borderRadius: 12, padding: '40px 36px' }}>

              <div className="form-grid">
                <div className="vol-field">
                  <label className="vol-label">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="vol-input" />
                </div>
                <div className="vol-field">
                  <label className="vol-label">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="vol-input" />
                </div>
              </div>

              <div className="form-grid">
                <div className="vol-field">
                  <label className="vol-label">Phone / WhatsApp Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+233 XX XXX XXXX" className="vol-input" />
                </div>
                <div className="vol-field">
                  <label className="vol-label">Country *</label>
                  <input name="country" value={form.country} onChange={handleChange} required placeholder="Ghana" className="vol-input" />
                </div>
              </div>

              <div className="vol-field">
                <label className="vol-label">Which role are you applying for? *</label>
                <select name="role" value={form.role} onChange={handleChange} required className="vol-input">
                  <option value="">Select a role...</option>
                  {roles.map(r => (
                    <option key={r.title} value={r.title}>{r.title} ({r.slots})</option>
                  ))}
                </select>
              </div>

              <div className="vol-field">
                <label className="vol-label">How many hours per week can you commit? *</label>
                <select name="availability" value={form.availability} onChange={handleChange} required className="vol-input">
                  <option value="">Select availability...</option>
                  <option value="1-3 hours">1–3 hours per week</option>
                  <option value="3-5 hours">3–5 hours per week</option>
                  <option value="5-10 hours">5–10 hours per week</option>
                  <option value="10+ hours">10+ hours per week</option>
                </select>
              </div>

              <div className="vol-field">
                <label className="vol-label">Relevant experience or skills *</label>
                <textarea name="experience" value={form.experience} onChange={handleChange} required rows={3} placeholder="Tell us about your relevant skills, tools you use, or past experience..." className="vol-input" style={{ resize: 'vertical', minHeight: 90 }} />
              </div>

              <div className="vol-field">
                <label className="vol-label">Why do you want to volunteer with Future Finder? *</label>
                <textarea name="why" value={form.why} onChange={handleChange} required rows={4} placeholder="Tell us what draws you to this mission and what you hope to contribute..." className="vol-input" style={{ resize: 'vertical', minHeight: 110 }} />
              </div>

              {status === 'error' && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '12px 16px', marginBottom: 20, fontFamily: 'var(--font-lato)', fontSize: 13, color: '#DC2626' }}>
                  Something went wrong. Please email us directly at office.futurefinder@gmail.com
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="submit-btn">
                {status === 'sending' ? 'Submitting...' : 'Submit Application →'}
              </button>

              <p style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 16 }}>
                We review all applications within 5–7 business days. Questions? Email office.futurefinder@gmail.com
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
