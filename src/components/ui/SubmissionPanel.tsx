'use client'

import { useRef, useState } from 'react'
import { contactEmail, mailto, opportunitySubject } from '@/lib/contact'
import { submissionDraftHref, submissionTemplate } from '@/lib/submission'

export default function SubmissionPanel() {
  const templateRef = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState('')

  async function copyTemplate() {
    const field = templateRef.current
    try {
      await navigator.clipboard.writeText(submissionTemplate)
      setStatus('Template copied. Paste it into the email draft if the draft is empty.')
    } catch {
      field?.focus()
      field?.select()
      setStatus('Clipboard access is unavailable. The template is selected so you can copy it manually.')
    }
  }

  return (
    <section className="submit-panel" aria-labelledby="submission-heading">
      <h2 id="submission-heading">Email submission</h2>
      <p id="draft-note">
        This opens a draft in your email app. It does not send the opportunity. Send the message yourself after you check it.
      </p>
      <p>
        Submissions are reviewed against our editorial criteria. Sending an opportunity does not guarantee publication. We may request additional information before making a decision.
      </p>

      <dl className="submit-meta">
        <div>
          <dt>To</dt>
          <dd>
            <a href={mailto()}>{contactEmail}</a>
          </dd>
        </div>
        <div>
          <dt>Subject</dt>
          <dd>{opportunitySubject}</dd>
        </div>
      </dl>

      <div className="submit-actions">
        <a className="submit-primary" href={submissionDraftHref()} aria-describedby="draft-note">
          Prepare submission email
        </a>
        <button type="button" className="submit-secondary" onClick={copyTemplate}>
          Copy submission template
        </button>
      </div>
      <p className="submit-status" role="status" aria-live="polite">{status}</p>

      <div className="submit-template">
        <label htmlFor="submission-template">Submission template</label>
        <p>
          If copying does not work, select the template and copy it yourself. Write &quot;Unknown&quot; for anything you cannot confirm.
        </p>
        <textarea
          id="submission-template"
          ref={templateRef}
          readOnly
          spellCheck={false}
          rows={14}
          value={submissionTemplate}
        />
      </div>
    </section>
  )
}
