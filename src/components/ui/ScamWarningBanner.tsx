'use client'
import { useState, useEffect } from 'react'

export default function ScamWarningBanner() {
  const [dismissed, setDismissed] = useState(true) // default true avoids flash

  useEffect(() => {
    const d = sessionStorage.getItem('ff_scam_v2')
    setDismissed(!!d)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('ff_scam_v2', '1')
    setDismissed(true)
  }

  return (
    <>
      <style>{`
        /* ── Persistent footer strip (always visible) ── */
        .scam-strip {
          background: #1A1A1A;
          border-top: 3px solid #D32F2F;
          padding: 10px 20px;
          text-align: center;
          font-family: var(--font-lato);
          font-size: 12px;
          color: #999;
          line-height: 1.5;
          position: relative;
          z-index: 10;
        }
        .scam-strip strong { color: #fff; }
        .scam-strip .red { color: #FF5252; font-weight: 700; }
        .scam-strip a { color: #FF5252; text-decoration: underline; }

        /* ── Dismissable top banner ── */
        .scam-banner {
          background: #B71C1C;
          padding: 0;
          overflow: hidden;
          max-height: 200px;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }
        .scam-banner.hidden {
          max-height: 0;
        }
        .scam-banner-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          padding: 11px 20px;
        }
        .scam-badge {
          flex-shrink: 0;
          background: #fff;
          color: #B71C1C;
          font-size: 10px;
          font-weight: 900;
          font-family: var(--font-lato);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .scam-banner-text {
          font-family: var(--font-lato);
          font-size: 12.5px;
          color: rgba(255,255,255,0.92);
          line-height: 1.5;
          text-align: center;
        }
        .scam-banner-text strong { color: #fff; }
        .scam-dismiss {
          flex-shrink: 0;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
          font-size: 11px;
          font-family: var(--font-lato);
          padding: 4px 12px;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .scam-dismiss:hover { background: rgba(255,255,255,0.25); color: #fff; }
        @media (max-width: 600px) {
          .scam-banner-inner { padding: 10px 14px; gap: 8px; }
          .scam-banner-text { font-size: 11.5px; }
          .scam-badge { display: none; }
        }
      `}</style>

      {/* Dismissable top alert */}
      <div className={`scam-banner${dismissed ? ' hidden' : ''}`} role="alert">
        <div className="scam-banner-inner">
          <span className="scam-badge">⚠ Notice</span>
          <p className="scam-banner-text">
            <strong>Future Finder is 100% free.</strong> We will{' '}
            <strong>never</strong> ask you to pay to view, apply for, or access any opportunity.
            Anyone requesting payment on our behalf is a scammer — do not pay.
          </p>
          <button className="scam-dismiss" onClick={dismiss} aria-label="Dismiss notice">
            Got it ×
          </button>
        </div>
      </div>
    </>
  )
}
