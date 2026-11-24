'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { categoryActionInk } from '@/lib/categories'
import { resolveCardMedia, type CardImageFields } from '@/lib/opportunity'

export type OpportunityCardProps = {
  title: string
  href: string
  organization?: string
  location?: string
  compensation?: string
  eligibility?: string
  typeLabel?: string
  category?: string
  deadline?: string
  image?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: string
  thumbnailPosition?: string
  imageAlt?: string
}

export default function OpportunityCard({
  title,
  href,
  organization,
  location,
  compensation,
  eligibility,
  typeLabel,
  category,
  deadline,
  image,
  thumbnail,
  poster,
  thumbnailType,
  thumbnailPosition,
  imageAlt,
}: OpportunityCardProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const media = resolveCardMedia({
    title,
    thumbnail,
    poster: poster || image,
    coverImage: image,
    thumbnailType,
    thumbnailPosition,
    imageAlt,
  } satisfies CardImageFields)
  const assigned = media.kind === 'image' && failedSrc !== media.src ? media : null
  const statusClass = deadlineStatusClass(deadline)
  const rows = [
    organization ? { key: 'organization', text: organization, clamp: false } : null,
    location ? { key: 'location', text: location, clamp: false } : null,
    compensation ? { key: 'compensation', text: compensation, clamp: true } : null,
    eligibility ? { key: 'eligibility', text: eligibility, clamp: true } : null,
  ].filter((row): row is { key: string; text: string; clamp: boolean } => Boolean(row))

  return (
    <article className="opportunity-card">
      <Link className="opportunity-card-link" href={href}>
        <div className="opportunity-media">
          {assigned ? (
            <img
              src={assigned.src}
              alt={assigned.alt}
              width={800}
              height={450}
              sizes="(min-width: 1024px) 33vw, (min-width: 700px) 50vw, 100vw"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={assigned.padded ? 'is-logo' : 'is-photo'}
              style={assigned.padded ? undefined : { objectPosition: assigned.position }}
              onError={() => setFailedSrc(assigned.src)}
            />
          ) : (
            <CategoryGlyph tone={cardTone(typeLabel, category)} />
          )}
        </div>
        <div className="opportunity-card-body">
          {typeLabel ? <p className="opportunity-type">{typeLabel}</p> : null}
          <h3 className="opportunity-title">{title}</h3>
          {rows.map(row => (
            <p key={row.key} className={row.clamp ? 'opportunity-summary' : 'opportunity-meta'}>{row.text}</p>
          ))}
          {deadline ? <p className={statusClass}>{deadline}</p> : null}
          <span
            className="opportunity-action"
            style={category && categoryActionInk[category] ? { '--action-ink': categoryActionInk[category] } as CSSProperties : undefined}
          >
            <ArrowIcon />
            View opportunity
          </span>
        </div>
      </Link>
    </article>
  )
}

function deadlineStatusClass(deadline?: string): string {
  if (!deadline) return 'opportunity-status'
  if (deadline.startsWith('Applications closed')) return 'opportunity-status is-closed'
  if (deadline.startsWith('Closing soon')) return 'opportunity-status is-soon'
  return 'opportunity-status'
}

function cardTone(typeLabel?: string, category?: string): string {
  if (category === 'jobs' || ['Job', 'Internship', 'Recruitment', 'National Service'].includes(typeLabel || '')) return 'jobs'
  if (['Fellowship', 'Award', 'Grant', 'Funding', 'Accelerator', 'Incubator', 'Competition'].includes(typeLabel || '')) return 'fellowship'
  if (category === 'scholarships' || category === 'study-abroad' || ['Scholarship', 'Program', 'Guide'].includes(typeLabel || '')) return 'scholarships'
  return 'opportunity'
}

function CategoryGlyph({ tone }: { tone: string }) {
  const icon = tone === 'jobs' ? <BriefcaseIcon /> : tone === 'fellowship' ? <RibbonIcon /> : <BookIcon />
  return (
    <span className="opportunity-fallback">
      <span aria-hidden="true">{icon}</span>
      <span className="opportunity-fallback-label">No image</span>
    </span>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
    </svg>
  )
}

function RibbonIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}
