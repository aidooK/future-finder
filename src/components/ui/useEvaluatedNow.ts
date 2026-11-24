'use client'

import { useEffect, useState } from 'react'

/**
 * Static export freezes the clock at build time. The first render uses that
 * instant so the HTML and hydration match. After mount, the browser clock
 * replaces it, so open/closed labels and the homepage list do not wait for
 * the next deployment. No-JS visitors and crawlers still see the build-time
 * result until a scheduled rebuild.
 */
export function useEvaluatedNow(initialNow: string): Date {
  const [iso, setIso] = useState(initialNow)

  useEffect(() => {
    setIso(new Date().toISOString())
  }, [])

  const parsed = new Date(iso)
  return Number.isNaN(parsed.getTime()) ? new Date(initialNow) : parsed
}
