'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import CategoryHeader from '@/components/ui/CategoryHeader'
import OpportunityCard from '@/components/ui/OpportunityCard'
import { useEvaluatedNow } from '@/components/ui/useEvaluatedNow'
import type { PostMeta } from '@/lib/content'
import {
  getDeadlineStatus,
  opportunityCardFromJob,
  opportunityCardFromPost,
  sortJobsForBoard,
  type DeadlineInput,
  type JobCardModel,
  type OpportunityType,
} from '@/lib/opportunity'

const TYPE_ORDER: OpportunityType[] = ['Internship', 'Job', 'Recruitment', 'National Service']

type SortMode = 'open-first' | 'newest'

export default function CategoryBrowser({
  label,
  description,
  initialNow,
  lead,
  folder,
  jobs,
  posts,
}: {
  label: string
  description: string
  initialNow: string
  lead: string
  folder: string
  jobs?: JobCardModel[]
  posts?: PostMeta[]
}) {
  const now = useEvaluatedNow(initialNow)
  const isJobs = Boolean(jobs)
  const [query, setQuery] = useState('')
  const [jobType, setJobType] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState<SortMode>('open-first')
  const typeSelectRef = useRef<HTMLSelectElement>(null)
  const filtersToggleRef = useRef<HTMLButtonElement>(null)
  const source = jobs ?? posts ?? []
  const types = useMemo(() => {
    if (!jobs) return []
    const present = new Set(jobs.map(job => job.opportunityType))
    return TYPE_ORDER.filter(type => present.has(type))
  }, [jobs])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matchesText = (item: { title: string; location?: string }) => {
      if (!needle) return true
      return item.title.toLowerCase().includes(needle) || (item.location || '').toLowerCase().includes(needle)
    }
    const order = <T extends DeadlineInput & { date?: string; slug?: string }>(items: T[]) => {
      if (sort === 'newest') {
        return items.slice().sort((a, b) => {
          const byDate = (b.date || '').localeCompare(a.date || '')
          if (byDate !== 0) return byDate
          return (a.slug || '').localeCompare(b.slug || '')
        })
      }
      return sortJobsForBoard(items, now)
    }
    if (jobs) {
      return order(jobs.filter(job => {
        if (jobType && job.opportunityType !== jobType) return false
        return matchesText(job)
      }))
    }
    return order((posts ?? []).filter(matchesText))
  }, [jobs, posts, jobType, query, sort, now])

  const filtering = query.trim() !== '' || jobType !== ''
  const closedCount = filtered.filter(item => getDeadlineStatus(item, now).state === 'closed').length
  const countLabel = `${filtered.length} ${filtered.length === 1 ? 'opportunity' : 'opportunities'}`

  useEffect(() => {
    if (filtersOpen) typeSelectRef.current?.focus()
  }, [filtersOpen])

  function reset() {
    setQuery('')
    setJobType('')
  }

  return (
    <>
      <CategoryHeader label={label} description={description}>
        {source.length > 0 ? (
          <div className={`category-controls${filtersOpen ? ' is-filters-open' : ''}`}>
            <div className="category-field category-field-search">
              <label htmlFor="listing-search">{isJobs ? 'Search jobs or organizations' : 'Search listings'}</label>
              <input
                id="listing-search"
                type="search"
                value={query}
                placeholder={isJobs ? 'Title, organization, or location' : 'Title or location'}
                onChange={event => setQuery(event.target.value)}
              />
            </div>
            {isJobs && types.length > 0 ? (
              <>
                <button
                  ref={filtersToggleRef}
                  className="category-filters-toggle"
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-controls="listing-filters"
                  onClick={() => setFiltersOpen(open => !open)}
                >
                  {jobType ? 'Filters (1)' : 'Filters'}
                </button>
                <div
                  id="listing-filters"
                  className="category-field category-field-type"
                  onKeyDown={event => {
                    if (event.key !== 'Escape' || !window.matchMedia('(max-width: 699px)').matches) return
                    setFiltersOpen(false)
                    filtersToggleRef.current?.focus()
                  }}
                >
                  <label htmlFor="listing-type">Job type</label>
                  <select
                    ref={typeSelectRef}
                    id="listing-type"
                    value={jobType}
                    onChange={event => setJobType(event.target.value)}
                  >
                    <option value="">All types</option>
                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </>
            ) : null}
            {filtering ? (
              <button className="category-reset" type="button" onClick={reset}>Reset</button>
            ) : null}
          </div>
        ) : null}
      </CategoryHeader>

      <section className="category-results">
        <div className="listing-wrap">
          {source.length === 0 ? (
            <div className="category-empty-source">
              <h2>No posts yet</h2>
              <p>Add MDX files to <code>content/{folder}/</code> to publish here.</p>
            </div>
          ) : (
            <>
              <div className="results-toolbar">
                <p className="results-count" aria-live="polite">{countLabel}</p>
                <div className="category-field category-field-sort">
                  <label htmlFor="listing-sort">Sort</label>
                  <select id="listing-sort" value={sort} onChange={event => setSort(event.target.value as SortMode)}>
                    <option value="open-first">Open first</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              {sort === 'open-first' ? (
                <p className="jobs-board-note">
                  {lead}
                  {closedCount > 0 ? ' Listings whose applications have closed stay here and are marked Applications closed.' : ''}
                </p>
              ) : null}
              {filtered.length === 0 ? (
                <p className="jobs-empty" role="status">
                  No listings match this search.{' '}
                  <button className="results-reset" type="button" onClick={reset}>Reset filters</button>
                </p>
              ) : isJobs ? (
                <ul className="opportunity-grid">
                  {(filtered as JobCardModel[]).map(job => (
                    <li key={job.slug}>
                      <OpportunityCard {...opportunityCardFromJob(job, now)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="opportunity-grid">
                  {(filtered as PostMeta[]).map(post => (
                    <li key={post.slug}>
                      <OpportunityCard {...opportunityCardFromPost(post, now)} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
