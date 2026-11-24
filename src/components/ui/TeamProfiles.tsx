'use client'

import { useEffect, useRef, useState } from 'react'
import {
  marqueeCopyCount,
  memberPortrait,
  profileInitials,
  profileRoleLabel,
  publicProfileLinks,
  teamHeading,
  teamStripSpeed,
  wrapMarqueeOffset,
  type TeamProfile,
  type TeamProfileLink,
} from '@/lib/team'

export default function TeamProfiles({ profiles }: { profiles: TeamProfile[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLUListElement>(null)
  const offsetRef = useRef(0)
  const loopRef = useRef(0)
  const reducedRef = useRef(false)
  const dragRef = useRef<{ id: number; x: number; origin: number; moved: boolean } | null>(null)
  const [copies, setCopies] = useState(2)
  const [reduced, setReduced] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [stripFocus, setStripFocus] = useState(false)
  const [interacting, setInteracting] = useState(false)

  const moving = !reduced && !hovering && !stripFocus && !interacting

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      reducedRef.current = media.matches
      setReduced(media.matches)
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const set = setRef.current
    const track = trackRef.current
    if (!viewport || !set || !track) return

    const measure = () => {
      const styles = getComputedStyle(track)
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
      const loop = set.getBoundingClientRect().width + gap
      loopRef.current = loop
      const needed = reducedRef.current ? 1 : marqueeCopyCount(viewport.clientWidth, loop)
      setCopies(current => current === needed ? current : needed)
      if (reducedRef.current) track.style.transform = ''
      else paint(track, offsetRef.current)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(set)
    return () => observer.disconnect()
  }, [profiles.length, reduced])

  useEffect(() => {
    const track = trackRef.current
    if (!track || !moving) return

    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const elapsed = Math.min(0.05, (now - last) / 1000)
      last = now
      offsetRef.current = wrapMarqueeOffset(offsetRef.current - teamStripSpeed * elapsed, loopRef.current)
      paint(track, offsetRef.current)
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [moving])

  if (profiles.length === 0) return null

  const heading = teamHeading(profiles)
  const visibleCopies = reduced ? 1 : copies

  function reveal(card: HTMLElement) {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const view = viewport.getBoundingClientRect()
    const box = card.getBoundingClientRect()
    const fullyVisible = box.left >= view.left + 12 && box.right <= view.right - 12
    if (fullyVisible) return
    if (reducedRef.current) {
      viewport.scrollLeft += box.left - view.left - 16
      return
    }
    offsetRef.current = wrapMarqueeOffset(offsetRef.current - (box.left - view.left - 16), loopRef.current)
    paint(track, offsetRef.current)
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current || dragRef.current.id !== event.pointerId) return
    dragRef.current = null
    setInteracting(false)
  }

  return (
    <section className="about-team-band" aria-labelledby="team-heading">
      <div className="about-team-panel">
        <p className="about-team-eyebrow"><span aria-hidden="true" />TEAM</p>
        <h3 id="team-heading">{heading}</h3>
        <div
          ref={viewportRef}
          className={reduced ? 'about-team-viewport is-manual' : 'about-team-viewport'}
          aria-roledescription="carousel"
          aria-label={heading}
          onPointerEnter={event => {
            if (event.pointerType !== 'touch') setHovering(true)
          }}
          onPointerLeave={event => {
            if (event.pointerType !== 'touch') setHovering(false)
          }}
          onPointerDown={event => {
            if (reduced || (event.pointerType === 'mouse' && event.button !== 0)) return
            dragRef.current = { id: event.pointerId, x: event.clientX, origin: offsetRef.current, moved: false }
          }}
          onPointerMove={event => {
            const drag = dragRef.current
            const track = trackRef.current
            if (!drag || drag.id !== event.pointerId || !track || reduced) return
            const distance = event.clientX - drag.x
            if (!drag.moved && Math.abs(distance) < 8) return
            if (!drag.moved) {
              drag.moved = true
              setInteracting(true)
              event.currentTarget.setPointerCapture(event.pointerId)
            }
            offsetRef.current = wrapMarqueeOffset(drag.origin + distance, loopRef.current)
            paint(track, offsetRef.current)
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={trackRef} className="about-team-track">
            {Array.from({ length: visibleCopies }, (_, copy) => (
              <ul
                key={copy === 0 ? 'profiles' : `visual-copy-${copy}`}
                ref={copy === 0 ? setRef : undefined}
                className="about-team-set"
                aria-hidden={copy === 0 ? undefined : true}
                onFocus={copy === 0 ? () => setStripFocus(true) : undefined}
                onBlur={copy === 0 ? event => {
                  const next = event.relatedTarget
                  if (!(next instanceof Node) || !event.currentTarget.contains(next)) setStripFocus(false)
                } : undefined}
              >
                {profiles.map(profile => (
                  <ProfileCard
                    key={copy === 0 ? profile.id : `${profile.id}-visual-${copy}`}
                    profile={profile}
                    decorative={copy > 0}
                    onReveal={copy === 0 ? reveal : undefined}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function paint(track: HTMLDivElement, offset: number) {
  track.style.transform = `translate3d(${offset}px,0,0)`
}

function ProfileCard({
  profile,
  decorative,
  onReveal,
}: {
  profile: TeamProfile
  decorative: boolean
  onReveal?: (card: HTMLElement) => void
}) {
  const role = profileRoleLabel(profile)
  const links = decorative ? [] : publicProfileLinks(profile.links)
  const portrait = memberPortrait(profile)
  const label = role ? `${profile.name}, ${role}` : profile.name

  return (
    <li
      className="about-team-card"
      tabIndex={decorative ? undefined : 0}
      aria-label={decorative ? undefined : label}
      onFocus={event => {
        if (!decorative && event.currentTarget.contains(event.target as Node)) onReveal?.(event.currentTarget)
      }}
    >
      <div className="about-team-photo">
        {portrait ? (
          <img
            src={portrait.src}
            alt={decorative ? '' : (portrait.alt.trim() || label)}
            width={420}
            height={520}
            style={{ objectPosition: portrait.focal || 'center 18%' }}
          />
        ) : (
          <div className="about-team-fallback" aria-hidden="true">{profileInitials(profile.name)}</div>
        )}
      </div>
      <div className="about-team-caption">
        <h4>{profile.name}</h4>
        {role ? <p>{role}</p> : null}
        {links.length > 0 ? (
          <ul className="about-team-social">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon link={link} />
                  <span className="sr-only">{link.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}

function SocialIcon({ link }: { link: TeamProfileLink }) {
  const host = safeHost(link.href)
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
    focusable: false as const,
  }
  if (host.includes('linkedin')) {
    return <svg {...common}><path fill="currentColor" d="M6.5 9H4V20h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20z" /></svg>
  }
  if (host === 'x.com' || host.includes('twitter')) {
    return <svg {...common}><path fill="currentColor" d="M14.7 4h2.4l-5.2 6 6.1 8h-4.8l-3.8-4.9L5.2 18H2.8l5.6-6.4L2.6 4h4.9l3.4 4.5L14.7 4zm-.8 12.6h1.3L7.2 5.3H5.8l8.1 11.3z" /></svg>
  }
  if (host.includes('instagram')) {
    return <svg {...common}><path fill="currentColor" d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8 1.8H8A2.2 2.2 0 0 0 5.8 8v8A2.2 2.2 0 0 0 8 18.2h8a2.2 2.2 0 0 0 2.2-2.2V8A2.2 2.2 0 0 0 16 5.8zM12 8.4A3.6 3.6 0 1 1 8.4 12 3.6 3.6 0 0 1 12 8.4zm0 1.6A2 2 0 1 0 14 12a2 2 0 0 0-2-2zm4.3-2.5a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8z" /></svg>
  }
  if (host.includes('facebook')) {
    return <svg {...common}><path fill="currentColor" d="M14.2 20v-7.1h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4H17V4.5A18 18 0 0 0 14.8 4c-2.2 0-3.7 1.3-3.7 3.8v1.3H8.6v2.8h2.5V20h3.1z" /></svg>
  }
  return <svg {...common}><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="M10 14a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.1" /><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="M14 10a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.1" /></svg>
}

function safeHost(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
