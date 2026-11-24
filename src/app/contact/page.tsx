import type { Metadata } from 'next'
import Link from 'next/link'
import {
  contactEmail,
  mailto,
  opportunitySubject,
  partnershipSubject,
  reportSubject,
  submissionPath,
} from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contact Us | Future Finder',
  description: 'Email Future Finder about a listing, a partnership, or an opportunity submission.',
}

const channels = [
  {
    title: 'General enquiries',
    description: 'Questions, feedback, or a correction to a listing.',
    action: 'Email support',
    href: mailto(),
    icon: 'mail' as const,
  },
  {
    title: 'Partnerships',
    description: 'Discuss sponsorships, featured listings, or collaborations.',
    action: 'Discuss a partnership',
    href: mailto(partnershipSubject),
    icon: 'handshake' as const,
  },
  {
    title: 'Submit an opportunity',
    description: 'Share an opportunity for editorial review.',
    action: 'Submit an opportunity',
    href: submissionPath,
    icon: 'send' as const,
  },
]

const faqs = [
  {
    question: 'Is browsing Future Finder free?',
    answer: (
      <p>Browsing Future Finder is free. Individual opportunity providers may charge application fees or have other costs. Check the official listing before applying.</p>
    ),
  },
  {
    question: 'How do I submit an opportunity?',
    answer: (
      <p>
        Use <Link href={submissionPath}>Submit an opportunity</Link> and send the name, deadline, application link, eligibility, and what the opportunity offers to <a href={mailto()}>{contactEmail}</a>. Use the subject &quot;{opportunitySubject}&quot;. Each submission is reviewed manually. Sending one does not mean it will be published.
      </p>
    ),
  },
  {
    question: 'How do I discuss a partnership?',
    answer: (
      <p>
        Email <a href={mailto(partnershipSubject)}>{contactEmail}</a> with the subject &quot;{partnershipSubject}&quot; to discuss a sponsorship, featured listing, or collaboration.
      </p>
    ),
  },
  {
    question: 'How often are new listings published?',
    answer: (
      <p>Listings are published after they are reviewed. This site does not state a fixed posting schedule.</p>
    ),
  },
  {
    question: 'What if a listing looks wrong?',
    answer: (
      <p>
        Email <a href={mailto(reportSubject)}>{contactEmail}</a> with the subject &quot;{reportSubject}&quot;. Include the listing name and what looks wrong.
      </p>
    ),
  },
  {
    question: 'Do listings include opportunities outside Ghana?',
    answer: (
      <p>Yes. The site lists opportunities in Ghana, elsewhere in Africa, and international programmes for African applicants.</p>
    ),
  },
  {
    question: 'How are listings reviewed?',
    answer: (
      <p>Before a submitted listing is published, the team checks the source, whether the deadline is still open, and the application link. That review does not guarantee acceptance, availability, or that a listing will stay unchanged.</p>
    ),
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-eyebrow">Get in touch</p>
          <h1>We&apos;re here to help</h1>
          <p>Send a question, a partnership enquiry, or an opportunity for review.</p>
        </div>
      </section>

      <div className="contact-wrap">
        <section aria-labelledby="contact-heading">
          <p className="contact-eyebrow">Contact</p>
          <h2 id="contact-heading">Reach the team</h2>
          <ul className="contact-list">
            {channels.map(channel => (
              <li key={channel.title} className="contact-card">
                <span className="contact-badge" aria-hidden="true">
                  <ContactIcon name={channel.icon} />
                </span>
                <div className="contact-copy">
                  <h3>{channel.title}</h3>
                  <p>{channel.description}</p>
                  {channel.icon === 'mail' ? (
                    <p className="contact-address">
                      <a href={mailto()}>{contactEmail}</a>
                    </p>
                  ) : null}
                  {channel.href.startsWith('/') ? (
                    <Link className="contact-action" href={channel.href}>{channel.action}</Link>
                  ) : (
                    <a className="contact-action" href={channel.href}>{channel.action}</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading">
          <p className="contact-eyebrow">FAQs</p>
          <h2 id="faq-heading">Common questions</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} className="faq-item" open={index === 0}>
                <summary>
                  <span>{item.question}</span>
                  <svg className="faq-marker" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                {item.answer}
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

function ContactIcon({ name }: { name: 'mail' | 'handshake' | 'send' }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    focusable: false as const,
  }

  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  }

  if (name === 'handshake') {
    return (
      <svg {...common}>
        <path d="M8.2 13.2 5.6 10.6a1.8 1.8 0 0 1 0-2.5L8 5.7" />
        <path d="m15.8 13.2 2.6-2.6a1.8 1.8 0 0 0 0-2.5L16 5.7" />
        <path d="m8.2 13.2 2.1 2.1a1.6 1.6 0 0 0 2.2 0l1.1-1.1" />
        <path d="M15.8 13.2 13.6 15.4" />
        <path d="M4.2 15.2 7.2 18l2.1-1.3" />
        <path d="M19.8 15.2 16.8 18l-2.1-1.3" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="m21 4-9.2 9.2" />
      <path d="m21 4-6.4 16.2-2.8-6.6L5.2 10.8 21 4z" />
    </svg>
  )
}
