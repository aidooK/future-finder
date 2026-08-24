import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScamWarningBanner from '@/components/ui/ScamWarningBanner'
import SocialFollowBand from '@/components/ui/SocialFollowBand'

export const metadata: Metadata = {
  title: {
    default: 'Future Finder | Jobs, Scholarships & Opportunities for African Youth',
    template: '%s | Future Finder'
  },
  description: 'Daily jobs, scholarships, study abroad programs and entrepreneurship opportunities for African and Ghanaian youth. Real opportunities, updated every day.',
  keywords: ['scholarships for African students', 'jobs in Ghana', 'study abroad Africa', 'opportunities for African youth', 'Ghana scholarships 2026'],
  authors: [{ name: 'Future Finder' }],
  creator: 'Future Finder',
  metadataBase: new URL('https://futurefinder.blog'),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://futurefinder.blog',
    siteName: 'Future Finder',
    title: 'Future Finder | Jobs, Scholarships & Opportunities for African Youth',
    description: 'Real opportunities for African youth — updated daily.',
    images: [{ url: '/logo.png', width: 400, height: 200, alt: 'Future Finder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Finder',
    description: 'Real opportunities for African youth — updated daily.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true }
}

const GA_ID = 'G-MSYRMXTCST'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8702312820055642"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        <ScamWarningBanner />
        <Header />
        <main>{children}</main>
        <SocialFollowBand />
        <Footer />
      </body>
    </html>
  )
}
