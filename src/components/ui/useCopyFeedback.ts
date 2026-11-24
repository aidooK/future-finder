'use client'

import { useEffect, useRef, useState } from 'react'

export function useCopyFeedback() {
  const [notice, setNotice] = useState('')
  const [fallback, setFallback] = useState('')
  const fallbackRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fallback) fallbackRef.current?.select()
  }, [fallback])

  async function copy(value: string, success: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable')
      await navigator.clipboard.writeText(value)
      setFallback('')
      setNotice(success)
    } catch {
      setFallback(value)
      setNotice('Clipboard is unavailable. Select the text below and copy it.')
    }
  }

  return { notice, fallback, fallbackRef, copy }
}
