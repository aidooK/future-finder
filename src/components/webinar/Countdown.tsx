'use client'
import { useEffect, useState } from 'react'

type Props = { startISO: string; endISO: string }

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown({ startISO, endISO }: Props) {
  const start = Date.parse(startISO)
  // keep the "live" state for an hour past the scheduled end in case the session runs long
  const end = Date.parse(endISO) + 60 * 60 * 1000
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Placeholder until mounted so server and client markup match
  if (now === null) {
    return <div className="pw-count" aria-hidden="true">{['Days', 'Hours', 'Mins', 'Secs'].map(l => (
      <div key={l} className="pw-count-box"><span className="pw-count-num">--</span><span className="pw-count-lbl">{l}</span></div>
    ))}</div>
  }

  if (now >= end) {
    return (
      <div className="pw-state pw-state-done">
        <strong>The live session has ended.</strong> Thank you for joining us. Catch the replay below.
      </div>
    )
  }

  if (now >= start) {
    return (
      <div className="pw-state pw-state-live">
        <span className="pw-live-dot" /> <strong>WE ARE LIVE NOW.</strong> <a href="#watch">Watch on YouTube ↓</a>
      </div>
    )
  }

  const diff = start - now
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const local = new Intl.DateTimeFormat(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(start))

  return (
    <div>
      <div className="pw-count" role="timer" aria-label="Time until the web conference starts">
        {[['Days', String(d)], ['Hours', pad(h)], ['Mins', pad(m)], ['Secs', pad(s)]].map(([l, v]) => (
          <div key={l} className="pw-count-box"><span className="pw-count-num">{v}</span><span className="pw-count-lbl">{l}</span></div>
        ))}
      </div>
      <p className="pw-local">In your local time: <strong>{local}</strong></p>
    </div>
  )
}
