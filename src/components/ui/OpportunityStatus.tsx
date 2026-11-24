'use client'

import {
  getDeadlineStatus,
  neutralizeClosedHtml,
  normalizeDeadline,
  normalizeExpired,
  type DeadlineInput,
  type DeadlineStatus,
} from '@/lib/opportunity'
import { useEvaluatedNow } from '@/components/ui/useEvaluatedNow'

export type OpportunityClockProps = DeadlineInput & { initialNow: string }

export function DeadlineSummary({ qualifyRolling = false, ...props }: OpportunityClockProps & { qualifyRolling?: boolean }) {
  const status = useStatus(props)
  const hasValue = Boolean(normalizeDeadline(props.deadline)) || normalizeExpired(props.expired)
  if (!hasValue && status.kind === 'unannounced') return null
  const alert = status.state === 'closed' || status.state === 'closing-soon'
  const value = qualifyRolling && status.kind === 'rolling' ? 'Rolling basis' : (status.deadlineLabel ?? status.statusLabel)

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-lato)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.4, color: '#595959', marginBottom: 4 }}>
        Deadline
      </div>
      <div style={{ fontFamily: 'var(--font-lato)', fontSize: 16, fontWeight: 600, lineHeight: 1.45, color: alert ? '#B71C1C' : '#1A1A1A' }}>
        {value}
      </div>
      {qualifyRolling && status.kind === 'rolling' ? (
        <p className="detail-deadline-note">The listing describes a rolling deadline. This does not confirm that recruitment is still open.</p>
      ) : null}
    </div>
  )
}

export function OpportunityArticle({ html, ...clock }: OpportunityClockProps & { html: string }) {
  const status = useStatus(clock)
  const display = status.state === 'closed' ? neutralizeClosedHtml(html) : html
  return <div className="post-content" dangerouslySetInnerHTML={{ __html: display }} />
}

function useStatus(props: OpportunityClockProps): DeadlineStatus {
  const now = useEvaluatedNow(props.initialNow)
  return getDeadlineStatus(props, now)
}
