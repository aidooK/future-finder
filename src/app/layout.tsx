import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Future Finder | Jobs, Scholarships & Opportunities for African Youth',
    template: '%s | Future Finder'
  },
  description: 'Daily jobs, scholarships, study abroad programs and entrepreneurship opportunities for African and Ghanaian youth. Real opportunities, updated every day.',
  keywords: ['scholarships for African students', 'jobs in Ghana', 'study abroad Africa', 'opportunities for African youth', 'Ghana scholarships 2025'],
  authors: [{ name: 'Future Finder' }],
  creator: 'Future Finder',
  metadataBase: new URL('https://futurefinderafrica.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://futurefinderafrica.com',
    siteName: 'Future Finder',
    title: 'Future Finder | Jobs, Scholarships & Opportunities for African Youth',
    description: 'Real opportunities for African youth — updated daily.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Finder',
    description: 'Real opportunities for African youth — updated daily.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
