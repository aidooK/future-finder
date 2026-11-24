'use client'

import { applicationLinkLabel, getDeadlineStatus, mailtoAddress, withMailtoSubject } from '@/lib/opportunity'
import { useEvaluatedNow } from '@/components/ui/useEvaluatedNow'
import { useCopyFeedback } from '@/components/ui/useCopyFeedback'
import type { OpportunityClockProps } from '@/components/ui/OpportunityStatus'

type ApplicationActionsProps = OpportunityClockProps & {
  href?: string
  subject?: string
  variant: 'panel' | 'actions'
}

export default function ApplicationActions({
  href,
  subject,
  variant,
  deadline,
  deadlineTimezone,
  timezone,
  expired,
  initialNow,
}: ApplicationActionsProps) {
  const now = useEvaluatedNow(initialNow)
  const copy = useCopyFeedback()
  if (!href) return null

  const status = getDeadlineStatus({ deadline, deadlineTimezone, timezone, expired }, now)
  const email = mailtoAddress(href)
  const closed = status.state === 'closed'
  const destination = email ? withMailtoSubject(href, subject) : href
  const label = applicationLinkLabel(email ? href : destination, closed)
  const external = !email

  const explanation = email
    ? closed
      ? 'Applications are closed. You can still open an email to the original address. That does not submit an application.'
      : 'Apply by email opens your email application with the recipient and subject filled in. It does not submit your application.'
    : closed
      ? 'Applications are closed. This link still opens the original listing. It does not submit an application.'
      : 'This opens the application destination in a new tab. It does not submit your application.'

  return (
    <section className={variant === 'panel' ? 'detail-apply detail-apply-panel' : 'detail-apply detail-apply-actions'} aria-label={variant === 'actions' ? 'Application actions' : undefined}>
      {variant === 'panel' ? <h2>Apply</h2> : null}
      {variant === 'panel' ? <p className="detail-apply-note">{explanation}</p> : null}
      {variant === 'panel' && email ? (
        <p className="detail-address">
          <span>Email</span>
          <strong>{email}</strong>
        </p>
      ) : null}
      {variant === 'panel' && email && subject ? (
        <p className="detail-address">
          <span>Required subject</span>
          <strong>{subject}</strong>
        </p>
      ) : null}
      <div className="detail-apply-row">
        <a
          className="detail-apply-primary"
          href={destination}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
        {email ? (
          <button type="button" className="detail-apply-secondary" onClick={() => copy.copy(email, 'Email address copied.')}>
            Copy email
          </button>
        ) : null}
        {email && subject ? (
          <button type="button" className="detail-apply-secondary" onClick={() => copy.copy(subject, 'Subject copied.')}>
            Copy subject
          </button>
        ) : null}
      </div>
      <p className="detail-copy-notice" role="status">{copy.notice}</p>
      {copy.fallback ? (
        <input
          ref={copy.fallbackRef}
          className="detail-copy-fallback"
          readOnly
          value={copy.fallback}
          aria-label="Text to copy"
        />
      ) : null}
    </section>
  )
}
