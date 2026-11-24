import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { categoryActionInk } from '@/lib/categories'
import { formatDate, getOpportunities, getOpportunityBySlug, categoryMeta } from '@/lib/content'
import { renderOpportunityArticle } from '@/lib/article'
import { readPublicImageSize } from '@/lib/image-file'
import {
  cardTypeLabel,
  extractApplicationSubject,
  extractEligibility,
  getDeadlineStatus,
  isConfirmedFullTime,
  listingDescription,
  mailtoAddress,
  normalizeDeadline,
  normalizeExpired,
  normalizeTimezone,
  opportunityHeading,
  resolveDetailImage,
  summarySupport,
} from '@/lib/opportunity'
import OpportunityImage from '@/components/ui/OpportunityImage'
import ShareBox from '@/components/ui/ShareBox'
import ApplicationActions from '@/components/ui/ApplicationActions'
import { RelatedOpportunities } from '@/components/ui/OpenPosts'
import { DeadlineSummary, OpportunityArticle } from '@/components/ui/OpportunityStatus'
import { OpportunityFollowNote } from '@/components/ui/SocialFollowBand'

const validCategories = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']
const SITE_URL = 'https://futurefinder.blog'

type Props = { params: Promise<{ category: string; slug: string }> }

function resolveOgImage(post: { poster?: string; coverImage?: string }, category: string, slug: string): string {
  const src = post.poster?.trim() || post.coverImage?.trim()
  if (src && !src.includes('/og/')) {
    return src.startsWith('http') ? src : `${SITE_URL}${src}`
  }
  return `${SITE_URL}/og/${category}-${slug}.png`
}

export async function generateStaticParams() {
  const paths: { category: string; slug: string }[] = []
  for (const category of validCategories) {
    for (const post of getOpportunities(category)) paths.push({ category, slug: post.slug })
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const post = getOpportunityBySlug(category, slug)
  if (!post) return {}

  const description = listingDescription(post.title, post.excerpt, getDeadlineStatus({
    deadline: post.deadline,
    deadlineTimezone: post.deadlineTimezone,
    timezone: post.timezone,
    expired: post.expired,
  }, new Date()))
  const pageUrl = `${SITE_URL}/${category}/${slug}/`
  const imageUrl = resolveOgImage(post, category, slug)

  return {
    title: post.title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'article',
      url: pageUrl,
      siteName: 'Future Finder',
      title: post.title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params
  if (!validCategories.includes(category)) notFound()

  const post = getOpportunityBySlug(category, slug)
  if (!post) notFound()

  const meta = categoryMeta[category]
  const initialNow = new Date().toISOString()
  const clock = {
    deadline: normalizeDeadline(post.deadline),
    deadlineTimezone: normalizeTimezone(post),
    expired: normalizeExpired(post.expired),
    initialNow,
  }
  const heading = opportunityHeading(post.title)
  const typeLabel = post.type?.trim() || cardTypeLabel({ title: post.title, tags: post.tags, category })
  const fullTime = category === 'jobs' && isConfirmedFullTime(post.content)
  const typeValue = fullTime ? `${typeLabel} · Full-time` : typeLabel
  const eligibility = extractEligibility(post.content, 1)[0]
  const support = summarySupport(post.benefit, category)
  const subject = mailtoAddress(post.applyUrl) ? extractApplicationSubject(post.content) : undefined
  const article = renderOpportunityArticle(post.content)
  const related = getOpportunities(category)
  const detailSource = post.poster || post.coverImage || ''
  const detailImage = resolveDetailImage(post, readPublicImageSize(detailSource))

  return (
    <div className="opportunity-detail">
      <nav className="detail-crumb" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href={`/${category}/`}>{meta.label}</Link></li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <div className="detail-layout">
        <article className="detail-article">
          <header className="detail-header">
            <p className="detail-type" style={{ color: categoryActionInk[category] || '#1A1A1A' }}>{typeValue}</p>
            <h1>{heading.heading}</h1>
            {heading.organization ? <p className="detail-organization">{heading.organization}</p> : null}
            {post.location ? <p className="detail-location">{post.location}</p> : null}
          </header>

          <section className="detail-summary" aria-labelledby="at-a-glance">
            <h2 id="at-a-glance">At a glance</h2>
            <div className="detail-summary-grid">
              {post.location ? <Fact label="Location" value={post.location} /> : null}
              <Fact label="Type" value={typeValue} />
              {eligibility ? <Fact label="Eligibility" value={eligibility} /> : null}
              {support ? <Fact label={support.label} value={support.value} /> : null}
              <DeadlineSummary qualifyRolling {...clock} />
            </div>
          </section>

          <div className="detail-apply-mobile">
            <ApplicationActions href={post.applyUrl} subject={subject} variant="panel" {...clock} />
          </div>

          <OpportunityImage image={detailImage} />

          <OpportunityArticle html={article.html} {...clock} />

          <ApplicationActions href={post.applyUrl} subject={subject} variant="actions" {...clock} />
          <ShareBox category={category} slug={slug} title={post.title} />
          {article.showFollow ? <OpportunityFollowNote /> : null}
        </article>

        <aside className="detail-aside">
          <div className="detail-apply-desktop">
            <ApplicationActions href={post.applyUrl} subject={subject} variant="panel" {...clock} />
          </div>
          <SourceNotes applyUrl={post.applyUrl} date={post.date} />
        </aside>
      </div>

      <RelatedOpportunities
        current={{
          slug: post.slug,
          category: post.category,
          title: post.title,
          date: post.date,
          deadline: post.deadline,
          deadlineTimezone: post.deadlineTimezone,
          timezone: post.timezone,
          expired: post.expired,
          location: post.location,
          benefit: post.benefit,
          tags: post.tags,
          coverImage: post.coverImage,
          thumbnail: post.thumbnail,
          poster: post.poster,
          thumbnailType: post.thumbnailType,
          thumbnailPosition: post.thumbnailPosition,
        }}
        posts={related}
        initialNow={initialNow}
      />
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="detail-fact-label">{label}</div>
      <div className="detail-fact-value">{value}</div>
    </div>
  )
}

function SourceNotes({ applyUrl, date }: { applyUrl?: string; date?: string }) {
  const email = mailtoAddress(applyUrl)
  let host = ''
  if (applyUrl && !email) {
    try {
      host = new URL(applyUrl).hostname.replace(/^www\./, '')
    } catch {
      host = ''
    }
  }

  return (
    <section className="detail-source" aria-labelledby="detail-source-title">
      <h2 id="detail-source-title">Source</h2>
      {email ? (
        <p>No official web page is recorded for this listing. Applications use {email}.</p>
      ) : applyUrl && host ? (
        <p>
          Application destination:{' '}
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            {host}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      ) : (
        <p>No application destination is recorded for this listing.</p>
      )}
      {date ? <p>Listed on Future Finder on {formatDate(date)}.</p> : null}
    </section>
  )
}
