'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'

type Variant = 'band' | 'inline'
type Props = { variant?: Variant; headingLevel?: 'h1' | 'h2' }
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type Confirmation = 'accepted' | 'pending'

type SubscribeResult =
  | { ok: true; confirmation: Confirmation }
  | { ok: false; reason: 'unavailable' | 'failed' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT?.trim()
  if (!endpoint) return { ok: false, reason: 'unavailable' }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) return { ok: false, reason: 'failed' }

    let confirmation: Confirmation = 'accepted'
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await response.json() as { pending?: boolean; doubleOptIn?: boolean; status?: string }
      if (data?.pending === true || data?.doubleOptIn === true || data?.status === 'pending') {
        confirmation = 'pending'
      }
    }
    return { ok: true, confirmation }
  } catch {
    return { ok: false, reason: 'failed' }
  }
}

export default function NewsletterSignup({ variant = 'band', headingLevel = 'h2' }: Props) {
  const reactId = useId()
  const emailId = `${reactId}-email`
  const errorId = `${reactId}-error`
  const statusId = `${reactId}-status`
  const headingId = `${reactId}-heading`
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [confirmation, setConfirmation] = useState<Confirmation>('accepted')
  const Heading = headingLevel

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'submitting') return

    const nextEmail = email.trim()
    if (!EMAIL_PATTERN.test(nextEmail)) {
      setError('Enter a valid email address, such as you@example.com.')
      setState('error')
      return
    }

    setError('')
    setState('submitting')
    const result = await subscribeToNewsletter(nextEmail)
    if (!result.ok) {
      setError(result.reason === 'unavailable'
        ? 'Email signup isn’t connected yet, so this address was not sent.'
        : 'We couldn’t complete your subscription. Your email is still here — try again.')
      setState('error')
      return
    }

    setConfirmation(result.confirmation)
    setState('success')
  }

  const successMessage = confirmation === 'pending'
    ? 'Check your inbox to confirm your subscription.'
    : 'You’re subscribed.'

  const form = state === 'success' ? (
    <p id={statusId} className="newsletter-status" role="status">{successMessage}</p>
  ) : (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate aria-busy={state === 'submitting'}>
      <label className="newsletter-label" htmlFor={emailId}>Email address</label>
      <div className="newsletter-row">
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={event => {
            setEmail(event.target.value)
            if (error) setError('')
          }}
        />
        <button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Subscribing…' : 'Get free updates'}
        </button>
      </div>
      {error ? <p id={errorId} className="newsletter-message" role="alert">{error}</p> : null}
    </form>
  )

  const note = (
    <p className="newsletter-note">
      Unsubscribe anytime.{' '}
      <Link href="/privacy/">Privacy Policy</Link>
    </p>
  )

  if (variant === 'inline') {
    return (
      <aside className="newsletter-inline" aria-labelledby={headingId}>
        <p className="newsletter-eyebrow">Free opportunity updates</p>
        <Heading id={headingId} className="newsletter-heading">Jobs and scholarships, straight to your inbox.</Heading>
        <p className="newsletter-copy">Discover jobs, scholarships, and funding opportunities for African applicants.</p>
        {form}
        {note}
      </aside>
    )
  }

  return (
    <section id="newsletter" className="newsletter-band" aria-labelledby={headingId}>
      <div className="newsletter-inner">
        <p className="newsletter-eyebrow">Free opportunity updates</p>
        <Heading id={headingId} className="newsletter-heading">Jobs and scholarships, straight to your inbox.</Heading>
        <p className="newsletter-copy">Discover jobs, scholarships, and funding opportunities for African applicants.</p>
        {form}
        {note}
      </div>
    </section>
  )
}
