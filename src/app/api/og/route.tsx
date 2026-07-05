import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const categoryColors: Record<string, string> = {
  jobs: '#D32F2F',
  scholarships: '#1565C0',
  'study-abroad': '#2E7D32',
  entrepreneurship: '#EF6C00',
  'growth-mindset': '#6A1B9A',
}

const categoryLabels: Record<string, string> = {
  jobs: 'JOBS',
  scholarships: 'SCHOLARSHIPS',
  'study-abroad': 'STUDY ABROAD',
  entrepreneurship: 'ENTREPRENEURSHIP',
  'growth-mindset': 'GROWTH MINDSET',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Future Finder'
  const category = searchParams.get('category') || 'jobs'
  const urgent = searchParams.get('urgent') === 'true'

  const color = categoryColors[category] || '#D32F2F'
  const label = categoryLabels[category] || 'OPPORTUNITY'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#0F0F0F',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top color band */}
        <div style={{ display: 'flex', height: 14, width: '100%', background: color }} />

        {/* Diagonal accent shape */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 420,
            height: 630,
            background: color,
            opacity: 0.08,
            transform: 'skewX(-12deg) translateX(120px)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 64px', justifyContent: 'space-between' }}>
          {/* Header row: logo mark + category pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                F
              </div>
              <div style={{ display: 'flex', color: '#fff', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Future Finder
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                borderRadius: 24,
                background: color,
                color: '#fff',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {label}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              color: '#fff',
              fontSize: title.length > 70 ? 44 : 56,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 980,
            }}
          >
            {title}
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', color: '#999', fontSize: 20 }}>futurefinder.blog</div>
            {urgent && (
              <div
                style={{
                  display: 'flex',
                  padding: '8px 20px',
                  borderRadius: 24,
                  background: '#B71C1C',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                🔴 URGENT DEADLINE
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
