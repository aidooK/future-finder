'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { categoryMeta } from '@/lib/categories'

const categoryCount = Object.keys(categoryMeta).length
const SLIDE_MS = 7000

const slides = [
  {
    src: '/hero-3.jpg',
    alt: 'Graduates in caps and gowns smiling together.',
    crop: 'graduates',
  },
  {
    src: '/hero-1.jpg',
    alt: 'Graduates in caps and gowns taking a photo together.',
    crop: 'center',
  },
  {
    src: '/hero-4.jpg',
    alt: 'Students gathered around a laptop.',
    crop: 'center',
  },
  {
    src: '/hero-6.jpg',
    alt: 'Students reading at a shared table.',
    crop: 'center',
  },
  {
    src: '/hero-2.jpg',
    alt: 'Students standing together outside a school.',
    crop: 'center',
  },
  {
    src: '/hero-7.jpg',
    alt: 'Graduates seen from behind at a ceremony.',
    crop: 'center',
  },
]

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const playing = !paused && !reduceMotion
  const outgoing = cycle > 0 ? (index + slides.length - 1) % slides.length : null
  const layers = [...new Set(outgoing == null ? [index] : [outgoing, index])]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!playing) return
    const next = slides[(index + 1) % slides.length]
    const preload = new Image()
    preload.src = next.src
  }, [index, playing])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setCycle(current => current + 1)
      setIndex(current => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [playing])

  return (
    <section className="hero-banner">
      {layers.map(layer => {
        const slide = slides[layer]
        const active = layer === index
        return (
          <div
            key={slide.src}
            className={active ? 'hero-photo is-active' : 'hero-photo'}
            style={{ backgroundImage: `url(${slide.src})`, backgroundPosition: slide.crop === 'graduates' ? 'center 36%' : 'center 20%' }}
            role={active ? 'img' : undefined}
            aria-label={active ? slide.alt : undefined}
            aria-hidden={active ? undefined : true}
          />
        )
      })}
      <div className="hero-scrim" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">
            Real opportunities. For <span className="hero-title-keep">African youth.</span>
          </h1>
          <p className="hero-lead">
            Discover jobs, scholarships, and study opportunities—all in one place.
          </p>
          <div className="hero-actions">
            <Link href="/jobs/" className="hero-cta-primary">
              Browse opportunities
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/#newsletter" className="hero-text-link">
              Join the newsletter
            </Link>
          </div>
          <p className="hero-facts">
            <span>{categoryCount} {categoryCount === 1 ? 'category' : 'categories'}</span>
            <span className="hero-facts-sep" aria-hidden="true">·</span>
            <span>Free access</span>
          </p>
        </div>
      </div>
      
    </section>
  )
}
