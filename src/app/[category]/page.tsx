import { notFound } from 'next/navigation'
import { getOpportunities, getJobCards, categoryMeta } from '@/lib/content'
import CategoryBrowser from '@/components/ui/CategoryBrowser'
import type { Metadata } from 'next'

const validCategories = ['jobs', 'scholarships', 'study-abroad', 'entrepreneurship', 'growth-mindset']

// ============================================================================
// FIX: Next.js 15+ compatibility — `params` is a Promise and MUST be awaited.
// Synchronous access (`params.category`) returned undefined, causing validCategories
// check to fail and triggering 404 (notFound()) on all category pages.
// ============================================================================

// NEW: Props type updated to Promise<{ category: string }>
type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return validCategories.map(category => ({ category }))
}

// NEW: Await `params` in generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category]
  if (!meta) return {}
  return {
    title: `${meta.label} for African Youth`,
    description: meta.description,
  }
}

// NEW: CategoryPage converted to `async` function and `await params` added
export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!validCategories.includes(category)) notFound()

  const meta = categoryMeta[category]
  const jobCards = category === 'jobs' ? getJobCards() : undefined
  const posts = category === 'jobs' ? undefined : getOpportunities(category)
  const jobsEvaluatedAt = new Date().toISOString()

  return (
    <>
      <CategoryBrowser
        label={meta.label}
        description={meta.description}
        initialNow={jobsEvaluatedAt}
        lead={category === 'jobs'
          ? 'Open roles are listed first.'
          : category === 'scholarships'
            ? 'Open scholarships and fellowships are listed first.'
            : 'Open listings are listed first.'}
        folder={category}
        jobs={jobCards}
        posts={posts}
      />
    </>
  )
}
