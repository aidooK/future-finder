import type { Metadata } from 'next'
import Link from 'next/link'
import SubmissionPanel from '@/components/ui/SubmissionPanel'

export const metadata: Metadata = {
  title: 'Submit an Opportunity | Future Finder',
  description: 'Share a job, scholarship, grant, or programme for the Future Finder team to review.',
}

const accepted = [
  'Jobs, internships, and graduate trainee programmes with official listings.',
  'Scholarships and bursaries with a direct application link and either a deadline or a confirmed rolling status.',
  'Grants, accelerators, and competitions open to African applicants.',
  'Study abroad, exchange programmes, and international education opportunities.',
  'Free training, certifications, and development programmes.',
]

const declined = [
  'Expired listings or listings with passed deadlines.',
  'Listings without a verifiable official source.',
  'MLM schemes, “earn from home” claims, or unverifiable remote work offers.',
  'Opportunities that require payment to apply or access.',
]

const steps = [
  { title: 'Submit details', body: 'Share the official source and key information.' },
  { title: 'Editorial review', body: 'We assess the submission against our criteria.' },
  { title: 'Publication', body: 'Approved opportunities are added to the site.' },
]

export default function SubmitPage() {
  return (
    <div className="submit-page">
      <header className="submit-header">
        <div className="submit-container">
          <p className="submit-eyebrow">Community submissions</p>
          <h1>Submit an opportunity</h1>
          <p className="submit-lead">Share a job, scholarship, grant, or programme for our team to review.</p>
        </div>
      </header>

      <div className="submit-container submit-body">
        <div className="submit-layout">
          <SubmissionPanel />

          <aside className="submit-criteria" aria-labelledby="criteria-heading">
            <h2 id="criteria-heading">Eligibility</h2>
            <h3>We accept</h3>
            <ul className="submit-accept">
              {accepted.map(item => <li key={item}>{item}</li>)}
            </ul>
            <h3>We do not accept</h3>
            <ul className="submit-decline">
              {declined.map(item => <li key={item}>{item}</li>)}
            </ul>
          </aside>

          <section className="submit-notes" aria-labelledby="review-heading">
            <h2 id="review-heading">Review</h2>
            <p>
              The team checks the official source, the deadline or confirmed rolling status, and the application link.
            </p>
            <p>
              Your contact email is for follow-up and is not intended for public display. Read the <Link href="/privacy/">privacy policy</Link>.
            </p>
          </section>
        </div>

        <section className="submit-process" aria-labelledby="process-heading">
          <h2 id="process-heading">What happens next</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
