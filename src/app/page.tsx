import Link from 'next/link'
import { getRecentPosts, categoryMeta } from '@/lib/content'
import PostCard from '@/components/ui/PostCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

export default function HomePage() {
  const jobs = getRecentPosts('jobs', 4)
  const scholarships = getRecentPosts('scholarships', 3)
  const studyAbroad = getRecentPosts('study-abroad', 2)
  const entrepreneurship = getRecentPosts('entrepreneurship', 2)
  const growthMindset = getRecentPosts('growth-mindset', 2)

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: '#D32F2F', padding: '80px 24px 72px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFCDD2', marginBottom: 16 }}>
            🌍 For African & Ghanaian Youth
          </p>
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>
            Real Opportunities<br />for African Youth.<br />Daily.
          </h1>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 18, color: '#FFCDD2', marginBottom: 36, maxWidth: 520, lineHeight: 1.6 }}>
            Jobs, Scholarships &amp; Study Abroad Programs — Updated Every Day
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: '#1A1A1A', textDecoration: 'none', padding: '14px 28px', borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s' }}>
              Browse Daily Opportunities
            </Link>
            <Link href="/newsletter" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-lato)', textTransform: 'uppercase', letterSpacing: '0.05em', border: '2px solid rgba(255,255,255,0.5)', transition: 'all 0.2s' }}>
              Get Free Newsletter
            </Link>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
            {[['5', 'Categories'], ['Daily', 'Updates'], ['Free', 'Forever']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-oswald)', fontSize: 28, fontWeight: 700, color: '#fff' }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-lato)', fontSize: 12, color: '#FFCDD2', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY QUICK LINKS ── */}
      <section style={{ background: '#1A1A1A', padding: '0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {Object.entries(categoryMeta).map(([slug, meta]) => (
            <Link key={slug} href={`/${slug}`} style={{
              flex: '1 0 auto', textDecoration: 'none', padding: '16px 24px', textAlign: 'center',
              borderRight: '1px solid #333', transition: 'background 0.15s',
              fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 700, color: '#aaa',
              textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap'
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = '#D32F2F'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#aaa' }}
            >
              {meta.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST JOBS ── */}
      <SectionBlock title="Latest Jobs" href="/jobs" bg="#fff">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {jobs.length > 0 ? jobs.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="jobs" />}
        </div>
      </SectionBlock>

      {/* ── SCHOLARSHIPS ── */}
      <SectionBlock title="Open Scholarships" href="/scholarships" bg="#F5F5F5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {scholarships.length > 0 ? scholarships.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="scholarships" />}
        </div>
      </SectionBlock>

      {/* ── STUDY ABROAD + ENTREPRENEURSHIP ── */}
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="two-col-section">

          <div>
            <SectionHeading title="Study Abroad" href="/study-abroad" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {studyAbroad.length > 0 ? studyAbroad.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="study-abroad" />}
            </div>
          </div>

          <div>
            <SectionHeading title="Entrepreneurship" href="/entrepreneurship" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {entrepreneurship.length > 0 ? entrepreneurship.map(p => <PostCard key={p.slug} post={p} />) : <EmptyState category="entrepreneurship" />}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <NewsletterSignup variant="band" />

      {/* ── GROWTH MINDSET ── */}
      <SectionBlock title="Growth Mindset" href="/growth-mindset" bg="#F5F5F5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {growthMindset.length > 0 ? growthMindset.map(p => <PostCard key={p.slug} post={p} size="large" />) : <EmptyState category="growth-mindset" />}
        </div>
      </SectionBlock>

      <style>{`
        @media (max-width: 768px) {
          .two-col-section { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

/* ── Helpers ── */
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
        No posts yet in this category. Add your first <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 3 }}>content/{category}/</code> MDX file to get started.
      </p>
    </div>
  )
}
