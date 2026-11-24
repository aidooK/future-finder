import Link from 'next/link'
import { getRecentPosts, getAllPosts, getJobCards } from '@/lib/content'
import { LatestJobs } from '@/components/ui/JobLists'
import { ListingCards, OpenPosts } from '@/components/ui/OpenPosts'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import HeroSection from '@/components/ui/HeroSection'
import CategoryNav from '@/components/ui/CategoryNav'

export default function HomePage() {
  const jobs = getJobCards()
  const evaluatedAt = new Date().toISOString()
  const scholarships = getAllPosts('scholarships')
  const studyAbroad = getAllPosts('study-abroad')
  const entrepreneurship = getAllPosts('entrepreneurship')
  const growthMindset = getRecentPosts('growth-mindset', 2)

  return (
    <>
      <style>{`
        .two-col-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .see-all-link {
          font-family: var(--font-lato);
          font-size: 12px;
          font-weight: 700;
          color: #D32F2F;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: transform 0.2s ease, color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .see-all-link:hover {
          color: #B71C1C;
          transform: translateX(3px);
        }
        .see-all-link:focus-visible {
          outline: 3px solid #1565C0;
          outline-offset: 3px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .see-all-link,
          .see-all-link:hover { transition: none; transform: none; }
        }
        @media (max-width: 768px) {
          .two-col-section { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <HeroSection />

      <CategoryNav />

      {/* ── LATEST JOBS ── */}
      <SectionBlock
        plain
        title="Latest jobs and internships"
        subtitle="Open roles and internships, with who can apply and when applications close."
        href="/jobs/"
        linkLabel="Browse all jobs and internships"
        linkClassName="jobs-index-link"
        bg="#F4F6F8"
      >
        {jobs.length > 0 ? <LatestJobs jobs={jobs} initialNow={evaluatedAt} /> : <EmptyState category="jobs" />}
      </SectionBlock>

      {/* ── SCHOLARSHIPS ── */}
      <SectionBlock
        plain
        title="Open scholarships"
        href="/scholarships/"
        linkLabel="Browse all scholarships"
        linkClassName="jobs-index-link"
        bg="#F4F6F8"
      >
        {scholarships.length > 0 ? (
          <OpenPosts posts={scholarships} limit={3} initialNow={evaluatedAt} empty="No scholarships with an open deadline right now." />
        ) : <EmptyState category="scholarships" />}
      </SectionBlock>

      {/* ── STUDY ABROAD + ENTREPRENEURSHIP ── */}
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="two-col-section">
          <div>
            <SectionHeading title="Study Abroad" href="/study-abroad/" />
            {studyAbroad.length > 0 ? (
              <OpenPosts posts={studyAbroad} limit={2} initialNow={evaluatedAt} layout="stack" empty="No study abroad programs with an open deadline right now." />
            ) : <EmptyState category="study-abroad" />}
          </div>
          <div>
            <SectionHeading title="Entrepreneurship" href="/entrepreneurship/" />
            {entrepreneurship.length > 0 ? (
              <OpenPosts posts={entrepreneurship} limit={2} initialNow={evaluatedAt} layout="stack" empty="No entrepreneurship programs with an open deadline right now." />
            ) : <EmptyState category="entrepreneurship" />}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <NewsletterSignup variant="band" />

      {/* ── GROWTH MINDSET ── */}
      <SectionBlock title="Growth Mindset" href="/growth-mindset/" bg="#F5F5F5">
        {growthMindset.length > 0 ? <ListingCards posts={growthMindset} initialNow={evaluatedAt} /> : <EmptyState category="growth-mindset" />}
      </SectionBlock>
    </>
  )
}

function SectionHeading({
  title,
  href,
  subtitle,
  linkLabel = 'See All',
  linkClassName = 'see-all-link',
  plain = false,
}: {
  title: string
  href: string
  subtitle?: string
  linkLabel?: string
  linkClassName?: string
  plain?: boolean
}) {
  return (
    <div className={plain ? 'opportunity-section-head' : undefined} style={plain ? undefined : { marginBottom: 24 }}>
      <div className={plain ? 'opportunity-head-row' : undefined} style={plain ? undefined : { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <h2 className={plain ? 'opportunity-heading' : undefined} style={plain ? undefined : { fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{title}</h2>
        <Link href={href} className={linkClassName}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      {plain ? null : <div style={{ width: 44, height: 3, background: '#D32F2F', borderRadius: 2 }} />}
    </div>
  )
}

function SectionBlock({
  title,
  href,
  bg,
  children,
  subtitle,
  linkLabel,
  linkClassName,
  plain = false,
}: {
  title: string
  href: string
  bg: string
  children: React.ReactNode
  subtitle?: string
  linkLabel?: string
  linkClassName?: string
  plain?: boolean
}) {
  return (
    <section style={{ background: bg, padding: '64px 24px' }}>
      <div style={{ maxWidth: plain ? 1160 : 1200, margin: '0 auto' }}>
        <SectionHeading title={title} href={href} subtitle={subtitle} linkLabel={linkLabel} linkClassName={linkClassName} plain={plain} />
        {children}
      </div>
    </section>
  )
}

function EmptyState({ category }: { category: string }) {
  return (
    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', border: '2px dashed #E5E5E5', borderRadius: 8 }}>
      <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#aaa' }}>
        Add your first <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 3 }}>content/{category}/</code> MDX file to publish here.
      </p>
    </div>
  )
}
