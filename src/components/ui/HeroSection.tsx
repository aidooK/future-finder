"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
  "/hero-5.jpg",
  "/hero-6.jpg",
];

const DWELL_MS = 6000;
const CROSSFADE_MS = 1;

// This is the animation function. 
export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [nextIdx, setNextIdx] = useState(2);
  const [isFading, setIsFading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIdx + 1) % HERO_IMAGES.length;

      setNextIdx(next);
      setIsFading(false);

      setTimeout(() => {
        setCurrentIdx(next);
        setIsFading(true);
      }, CROSSFADE_MS);
    }, DWELL_MS);

    return () => clearInterval(timer);
  }, [currentIdx]);

  return (
    <section className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-6 md:min-h-[600px] lg:px-8">

      {/* CURRENT BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGES[currentIdx + 2]})`}}
      />

      {/* NEXT BACKGROUND — CROSSFADE */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration+1000 slide-in-out ${
          isFading ? "opacity+100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${HERO_IMAGES[nextIdx]})` }}
      />

      {/* RED HERO OVERLAY — uses existing globals.css var, not an undefined one */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "var(--red-primary)", opacity: 0.72 }}
      />

      {/* DARK VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* BADGE */}
        {/* <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-md">
          <span>🌍</span>
          <span>For African & Ghanaian Youth</span>
        </div> */}

        {/* HEADING */}
        <h1 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-7xl">
          Real Opportunities for African Youth. Daily.
        </h1>

        {/* SUBTITLE */}
        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-100 sm:text-xl">
          Jobs, Scholarships & Study Abroad Programs — Updated Every Day
        </p>

        {/* BUTTONS — real Next.js Links, not onClick-only buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="/jobs"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-black hover:shadow-xl active:scale-95 sm:w-auto"
          >
            <span>Browse Daily Opportunities</span>
            <svg className="h-4 w-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>

          <Link
            href="/newsletter/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-red-700 shadow-md transition-all duration-200 hover:bg-red-50 hover:shadow-lg active:scale-95 sm:w-auto"
          >
            <span>✉</span>
            <span>Get Free Newsletter</span>
          </Link>

        </div>

        {/* STATS */}
        <div className="mx-auto mt-9 grid max-w-lg grid-cols-3 border-t border-white/20 pt-8 text-center">
          <div>
            <p className="font-heading text-xl font-bold sm:text-2xl">5</p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-200 sm:text-sm">Categories</p>
          </div>
          <div className="border-x border-white/20 px-2">
            <p className="font-heading text-xl font-bold sm:text-2xl">Daily</p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-200 sm:text-sm">Updates</p>
          </div>
          <div>
            <p className="font-heading text-xl font-bold sm:text-2xl">Free</p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-200 sm:text-sm">Forever</p>
          </div>
        </div>

      </div>
    </section>
  );
}
