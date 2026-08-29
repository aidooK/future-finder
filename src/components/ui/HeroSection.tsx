"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
];

const DWELL_MS = 6000;
const CROSSFADE_MS = 1000;

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIdx + 1) % HERO_IMAGES.length;

      setNextIdx(next);
      setIsFading(true);

      setTimeout(() => {
        setCurrentIdx(next);
        setIsFading(false);
      }, CROSSFADE_MS);
    }, DWELL_MS);

    return () => clearInterval(timer);
  }, [currentIdx]);

  return (
    <section className="relative flex min-h-[540px] w-full items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-6 md:min-h-[620px] lg:px-8">

      {/* CURRENT BACKGROUND WITH SLOW KEN BURNS ZOOM */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns transition-transform duration-1000"
        style={{ backgroundImage: `url(${HERO_IMAGES[currentIdx]})` }}
      />

      {/* NEXT BACKGROUND — CROSSFADE */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isFading ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${HERO_IMAGES[nextIdx]})` }}
      />

      {/* RED OVERLAY WITH VIBRANT GRADIENT */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-700/75 to-red-900/80 backdrop-brightness-95"
      />

      {/* DARK VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in-up">

        {/* HEADING */}
        <h1 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl">
          Real Opportunities for African Youth. Daily.
        </h1>

        {/* SUBTITLE */}
        <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-slate-100 sm:text-xl md:mt-8">
          Jobs, Scholarships & Study Abroad Programs — Verified & Updated Every Day
        </p>

        {/* BUTTONS WITH PULSE & SHIMMER */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="/jobs/"
            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-white/25 bg-slate-950 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:bg-black hover:shadow-2xl hover:shadow-red-950/50 hover:-translate-y-0.5 active:scale-95 sm:w-auto"
          >
            <span>Browse Daily Opportunities</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <Link
            href="/newsletter/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-red-700 shadow-lg transition-all duration-300 hover:bg-red-50 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5 active:scale-95 sm:w-auto"
          >
            <span className="text-lg">✉</span>
            <span>Get Free Newsletter</span>
          </Link>

        </div>

        {/* STATS WITH HOVER CARDS */}
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-2 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:gap-4 sm:p-6">
          <div className="transition-transform duration-200 hover:scale-105">
            <p className="font-heading text-2xl font-bold sm:text-3xl text-white">5</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200 sm:text-sm">Categories</p>
          </div>
          <div className="border-x border-white/20 px-2 transition-transform duration-200 hover:scale-105">
            <p className="font-heading text-2xl font-bold sm:text-3xl text-emerald-400">Daily</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200 sm:text-sm">Updates</p>
          </div>
          <div className="transition-transform duration-200 hover:scale-105">
            <p className="font-heading text-2xl font-bold sm:text-3xl text-amber-300">100%</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200 sm:text-sm">Free Always</p>
          </div>
        </div>

      </div>
    </section>
  );
}
