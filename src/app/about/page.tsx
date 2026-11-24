import type { Metadata } from 'next'
import Link from 'next/link'
import TeamProfiles from '@/components/ui/TeamProfiles'
import { publishedTeamProfiles } from '@/lib/team'
import {
  contactEmail,
  mailto,
  reportSubject,
  submissionPath,
} from '@/lib/contact'

export const metadata: Metadata = {
  title: 'About Us | Future Finder',
  description: 'Future Finder brings jobs, scholarships, study programmes, and development opportunities for African youth into one place, and explains how listings are reviewed.',
  openGraph: {
    title: 'About Future Finder',
    description: 'How Future Finder selects listings, who is responsible, and where to browse, submit, or report a correction.',
    url: 'https://futurefinder.blog/about',
    images: [{ url: '/logo.png', width: 400, height: 200, alt: 'Future Finder' }],
  },
}

const expectations = [
  'A link to the application page, or the application email when no web page is recorded.',
  'The deadline as stated on the listing, including when it is rolling or not confirmed.',
  'Eligibility and other details when the source provides them.',
  'A public way to report a listing that looks inaccurate.',
]

export default function AboutPage() {
  return (
    <article className="about-page">
      <header className="about-intro">
        <div className="about-measure">
          <p className="about-eyebrow">About Future Finder</p>
          <h1>Helping African youth find their next opportunity.</h1>
          <p className="about-lead">
            Future Finder brings jobs, scholarships, study programmes, and development opportunities into one place—making it easier to understand what is available and how to apply.
          </p>
          <div className="about-actions">
            <Link className="about-primary" href="/jobs/">Explore opportunities</Link>
            <a className="about-text-link" href="#review">How we review listings</a>
          </div>
        </div>
      </header>

      <section className="about-section" aria-labelledby="purpose-heading">
        <div className="about-measure">
          <h2 id="purpose-heading">Why we exist</h2>
          <p>
            Jobs, scholarships, and programmes are often published on separate employer, university, and organisation websites. Future Finder gathers listings that are relevant to African and Ghanaian applicants so a reader can see what is offered, who it is for, and where to apply.
          </p>
          <p>
            The site is for students, graduates, and early-career applicants. Listings cover Ghana, other African countries, and international programmes open to African applicants.
          </p>
          <h3>What you can expect</h3>
          <ul className="about-expect">
            {expectations.map(item => (
              <li key={item}>
                <ExpectMark />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-section" id="review" aria-labelledby="review-heading">
        <div className="about-measure">
          <h2 id="review-heading">How opportunities reach the website</h2>
          <p>
            A listing is added after it is reviewed. There is no fixed posting schedule, and sending a listing does not mean it will be published.
          </p>
          <ol className="about-process">
            <li>
              <span className="about-step" aria-hidden="true">1</span>
              <div>
                <h3>Find</h3>
                <p>
                  Listings come from official employer, institution, and programme information, and from people who <Link href={submissionPath}>submit an opportunity</Link>. A submission without a verifiable official source is not accepted.
                </p>
              </div>
            </li>
            <li>
              <span className="about-step" aria-hidden="true">2</span>
              <div>
                <h3>Review</h3>
                <p>
                  Before publication, the team checks the official source, whether the deadline is still open or the listing is described as rolling, and the application link. A rolling deadline is not treated as proof that recruitment is still open. This check does not guarantee a place on the programme, or that the details will stay the same.
                </p>
              </div>
            </li>
            <li>
              <span className="about-step" aria-hidden="true">3</span>
              <div>
                <h3>Publish and maintain</h3>
                <p>
                  Approved listings are added to the relevant category. If a deadline has passed, the page can stay at the same address and is shown as closed. Listings are not monitored continuously. When a problem is reported, or the team finds one, the listing can be corrected.
                </p>
              </div>
            </li>
          </ol>
          <p className="about-note">
            Opportunity details can change. Review the official source before applying, and <a href={mailto(reportSubject)}>report anything that appears inaccurate</a>.
          </p>
          <p>
            Browsing Future Finder is free. The organisation offering an opportunity may charge an application fee or other costs. Check the official listing before you apply.
          </p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="responsibility-heading">
        <div className="about-measure">
          <h2 id="responsibility-heading">Who is responsible</h2>
          <p>
            Future Finder is operated from Ghana. The editorial team decides which listings are published. Questions, corrections, and privacy requests go to <a href={mailto()}>{contactEmail}</a>.
          </p>
          <ul className="about-routes">
            <li><Link href="/contact/">Contact</Link></li>
            <li><a href={mailto(reportSubject)}>Report a listing</a></li>
            <li><Link href="/privacy/">Privacy policy</Link></li>
          </ul>
          <p>
            Advertisements on the site are described in the privacy policy. To report a listing, include its name and what looks wrong.
          </p>
        </div>
        <TeamProfiles profiles={publishedTeamProfiles()} />
      </section>
    </article>
  )
}

function ExpectMark() {
  return (
    <svg className="about-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12.5 9.2 17 19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
