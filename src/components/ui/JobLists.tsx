'use client'

import OpportunityCard from '@/components/ui/OpportunityCard'
import { useEvaluatedNow } from '@/components/ui/useEvaluatedNow'
import { opportunityCardFromJob, selectOpenJobs, type JobCardModel } from '@/lib/opportunity'

export function LatestJobs({ jobs, initialNow }: { jobs: JobCardModel[]; initialNow: string }) {
  const now = useEvaluatedNow(initialNow)
  const openJobs = selectOpenJobs(jobs, now, 3)

  if (openJobs.length === 0) {
    return (
      <p className="jobs-empty">
        No open jobs or internships right now. Browse all jobs and internships for listings marked Applications closed.
      </p>
    )
  }

  return (
    <ul className="opportunity-grid">
      {openJobs.map(job => (
        <li key={job.slug}>
          <OpportunityCard {...opportunityCardFromJob(job, now)} />
        </li>
      ))}
    </ul>
  )
}
