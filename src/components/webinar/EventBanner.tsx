'use client'
import { useEffect, useState } from 'react'
import { EVENT } from '@/lib/event'

// Slim announcement bar for the main Future Finder pages. Disappears an hour after the event ends.
export default function EventBanner() {
  const [state, setState] = useState<'hidden' | 'upcoming' | 'live'>('hidden')

  useEffect(() => {
    const now = Date.now()
    const start = Date.parse(EVENT.startISO)
    const end = Date.parse(EVENT.endISO) + 60 * 60 * 1000
    setState(now >= end ? 'hidden' : now >= start ? 'live' : 'upcoming')
  }, [])

  if (state === 'hidden') return null

  return (
    <>
      <style>{`
        .ev-banner { display: block; background: linear-gradient(90deg, #D32F2F 0%, #7B1FA2 50%, #0A53A8 100%); color: #fff;
          text-align: center; padding: 9px 16px; text-decoration: none; font-family: var(--font-lato); font-size: 13px; line-height: 1.5; }
        .ev-banner:hover { filter: brightness(1.08); }
        .ev-banner strong { font-weight: 800; letter-spacing: 0.04em; }
        .ev-banner .ev-cta { text-decoration: underline; font-weight: 700; margin-left: 6px; white-space: nowrap; }
        @media (max-width: 600px) { .ev-banner { font-size: 12px; padding: 8px 12px; } .ev-long { display: none; } }
      `}</style>
      <a href="/webinar/" className="ev-banner">
        {state === 'live' ? (
          <><strong>🔴 LIVE NOW</strong> · {EVENT.short}<span className="ev-cta">Watch on YouTube →</span></>
        ) : (
          <><strong>🎙️ LIVE WEB CONFERENCE</strong> · Wed 25 Nov · 7:00 PM GMT · <span className="ev-long">{EVENT.short} · </span><span className="ev-cta">Set a reminder →</span></>
        )}
      </a>
    </>
  )
}
