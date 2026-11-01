import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Poverty is a Behaviour | Future Finder × The Prepared Mind Initiative' },
  description: 'A joint live web conference by Future Finder and The Prepared Mind Initiative on financial habits, mindset and why schools do not teach us about money.',
  alternates: { canonical: 'https://futurefinder.blog/webinar/' },
  openGraph: {
    type: 'website',
    url: 'https://futurefinder.blog/webinar/',
    siteName: 'Future Finder × The Prepared Mind Initiative',
    title: 'Poverty is a Behaviour | Future Finder × The Prepared Mind Initiative',
    description: 'A joint live web conference on financial habits, mindset and breaking cycles of poverty.',
    images: [{ url: '/images/og-webinar.png', width: 1200, height: 630, alt: 'Poverty is a Behaviour: a live web conference by Future Finder × The Prepared Mind Initiative' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poverty is a Behaviour | Future Finder × The Prepared Mind Initiative',
    description: 'A joint live web conference on financial habits, mindset and breaking cycles of poverty.',
    images: ['/images/og-webinar.png'],
  },
}

export default function WebConferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
