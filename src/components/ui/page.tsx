import Link from 'next/link'
import { getRecentPosts, categoryMeta } from '@/lib/content'
import PostCard from '@/components/ui/PostCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import HeroSection from '@/components/ui/HeroSection'

export default function HomePage() {
  const jobs = getRecentPosts('jobs', 4)
  const scholarships = getRecentPosts('scholarships', 3)
  const studyAbroad = getRecentPosts('study-abroad', 2)
  const entrepreneurship = getRecentPosts('entrepreneurship', 2)
  const growthMindset = getRecentPosts('growth-mindset', 2)

  return (
    <>
      <style>{`
        .cat-strip-link {
          flex: 1 0 auto;
          text-decoration: none;
          padding: 16px 24px;
          text-align: center;
          border-right: 1px solid #333;
          transition: background 0.15s, color 0.15s;
          font-family: var(--font-lato);
          font-size: 13px;
          font-weight: 700;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .cat-strip-link:hover { background: #D32F2F; color: #fff; }
        .two-col-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 768px) {
          .two-col-section { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── CATEGORY STRIP ── */}
      <section style={{ background: '#1A1A1A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {Object.entries(categoryMeta).map(([slug, meta]) => (
            <Link key={slug} href={`/${slug}`} className="cat-strip-link">{meta.label}</Link>
          ))}
        </div>
      </section>

      {/* ── LATEST JOBS ── */}
      <SectionBlock title="Latest Jobs" href="/jobs/" bg="#fff">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {jobs.length > 0 ? jobs.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="jobs" />}
        </div>
      </SectionBlock>

      {/* ── SCHOLARSHIPS ── */}
      <SectionBlock title="Open Scholarships" href="/scholarships/" bg="#F5F5F5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {scholarships.length > 0 ? scholarships.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="scholarships" />}
        </div>
      </SectionBlock>

      {/* ── STUDY ABROAD + ENTREPRENEURSHIP ── */}
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="two-col-section">
          <div>
            <SectionHeading title="Study Abroad" href="/study-abroad/" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {studyAbroad.length > 0 ? studyAbroad.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="study-abroad" />}
            </div>
          </div>
          <div>
            <SectionHeading title="Entrepreneurship" href="/entrepreneurship/" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {entrepreneurship.length > 0 ? entrepreneurship.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="entrepreneurship" />}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <NewsletterSignup variant="band" />

      {/* ── GROWTH MINDSET ── */}
      <SectionBlock title="Growth Mindset" href="/growth-mindset/" bg="#F5F5F5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {growthMindset.length > 0 ? growthMindset.map(p => <PostCard key={p.slug} post={p} size="large" />) : <EmptyState category="growth-mindset" />}
        </div>
      </SectionBlock>
    </>
  )
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 26, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{title}</h2>
        <Link href={href} style={{ fontFamily: 'var(--font-lato)', fontSize: 12, fontWeight: 700, color: '#D32F2F', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>See All →</Link>
      </div>
      <div style={{ width: 40, height: 3, background: '#D32F2F' }} />
    </div>
  )
}

function SectionBlock({ title, href, bg, children }: { title: string; href: string; bg: string; children: React.ReactNode }) {
  return (
    <section style={{ background: bg, padding: '64px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeading title={title} href={href} />
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
