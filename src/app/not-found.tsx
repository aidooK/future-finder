import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-wrap { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 24px; text-align: center; }
        .nf-code { font-family: var(--font-oswald); font-size: clamp(80px, 20vw, 160px); font-weight: 700; color: #F0F0F0; line-height: 1; margin-bottom: 0; }
        .nf-title { font-family: var(--font-oswald); font-size: clamp(22px, 4vw, 34px); font-weight: 700; color: #1A1A1A; margin-bottom: 14px; }
        .nf-body { font-family: var(--font-lato); font-size: 15px; color: #666; line-height: 1.75; max-width: 480px; margin-bottom: 36px; }
        .nf-links { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .nf-btn { display: inline-block; background: #D32F2F; color: #fff; font-family: var(--font-lato); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; padding: 13px 28px; border-radius: 6px; text-decoration: none; transition: background 0.15s; }
        .nf-btn:hover { background: #B71C1C; }
        .nf-btn-ghost { display: inline-block; background: transparent; color: #1A1A1A; font-family: var(--font-lato); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; padding: 11px 28px; border-radius: 6px; text-decoration: none; border: 2px solid #E0E0E0; transition: all 0.15s; }
        .nf-btn-ghost:hover { border-color: #1A1A1A; }
        .nf-cats { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 40px; }
        .nf-cat { display: inline-block; background: #F5F5F5; color: #555; font-family: var(--font-lato); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 8px 16px; border-radius: 20px; text-decoration: none; transition: all 0.15s; }
        .nf-cat:hover { background: #D32F2F; color: #fff; }
      `}</style>
      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <h1 className="nf-title">This Page Doesn't Exist</h1>
        <p className="nf-body">
          The page you're looking for may have been moved, deleted, or never existed. But don't worry — there are plenty of real opportunities waiting for you.
        </p>
        <div className="nf-links">
          <Link href="/" className="nf-btn">Go to Homepage</Link>
          <Link href="/jobs/" className="nf-btn-ghost">Browse Jobs</Link>
        </div>
        <div className="nf-cats">
          {[
            { label: '💼 Jobs', href: '/jobs' },
            { label: '🎓 Scholarships', href: '/scholarships' },
            { label: '✈️ Study Abroad', href: '/study-abroad' },
            { label: '🚀 Entrepreneurship', href: '/entrepreneurship' },
            { label: '🌱 Growth Mindset', href: '/growth-mindset' },
          ].map(c => <Link key={c.href} href={c.href} className="nf-cat">{c.label}</Link>)}
        </div>
      </div>
    </>
  )
}
