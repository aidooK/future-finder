'use client'

import OpportunityCard from '@/components/ui/OpportunityCard'
import { useEvaluatedNow } from '@/components/ui/useEvaluatedNow'
import type { PostMeta } from '@/lib/content'
import { opportunityCardFromPost, selectOpenJobs, selectRelated, toCardTitle } from '@/lib/opportunity'

export function OpenPosts({
  posts,
  limit,
  initialNow,
  empty,
  layout = 'grid',
}: {
  posts: PostMeta[]
  limit: number
  initialNow: string
  empty: string
  layout?: 'grid' | 'stack'
}) {
  const now = useEvaluatedNow(initialNow)
  const open = selectOpenJobs(posts, now, limit)

  if (open.length === 0) return <p className="jobs-empty">{empty}</p>

  return <CardList posts={open} now={now} layout={layout} />
}

export function ListingCards({
  posts,
  initialNow,
  layout = 'grid',
}: {
  posts: PostMeta[]
  initialNow: string
  layout?: 'grid' | 'stack'
}) {
  const now = useEvaluatedNow(initialNow)
  if (posts.length === 0) return null
  return <CardList posts={posts} now={now} layout={layout} />
}

export function RelatedOpportunities({
  current,
  posts,
  initialNow,
}: {
  current: PostMeta
  posts: PostMeta[]
  initialNow: string
}) {
  const now = useEvaluatedNow(initialNow)
  const related = selectRelated(current, posts, now, 3)
  if (related.length === 0) return null

  return (
    <section className="detail-related" aria-labelledby="related-opportunities">
      <h2 id="related-opportunities">Related opportunities</h2>
      <ul className="opportunity-grid">
        {related.map(post => {
          const card = opportunityCardFromPost(post, now)
          return (
            <li key={`${post.category}-${post.slug}`}>
              <OpportunityCard {...card} title={post.category === 'jobs' ? toCardTitle(post.title, post.location) : card.title} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function CardList({
  posts,
  now,
  layout,
}: {
  posts: PostMeta[]
  now: Date
  layout: 'grid' | 'stack'
}) {
  return (
    <ul className={layout === 'stack' ? 'opportunity-stack' : 'opportunity-grid'}>
      {posts.map(post => (
        <li key={post.slug}>
          <OpportunityCard {...opportunityCardFromPost(post, now)} />
        </li>
      ))}
    </ul>
  )
}
