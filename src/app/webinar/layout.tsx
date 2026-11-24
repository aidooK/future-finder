import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Poverty is a Behavior | Future Finder × The Prepared Mind Initiative' },
  description: 'Free live web conference on YouTube: Poverty is a Behavior, Why Schools Don\'t Teach You About Money. Wednesday 25 November 2026, 7:00 PM GMT. By Future Finder and The Prepared Mind Initiative.',
  alternates: { canonical: 'https://futurefinder.blog/webinar/' },
  openGraph: {
    type: 'website',
    url: 'https://futurefinder.blog/webinar/',
    siteName: 'Future Finder × The Prepared Mind Initiative',
    title: 'Poverty is a Behavior | Future Finder × The Prepared Mind Initiative',
    description: 'Free live web conference on YouTube, Wed 25 Nov 2026, 7:00 PM GMT. Why schools don\'t teach you about money.',
    images: [{ url: '/images/og-webinar.png', width: 1200, height: 630, alt: 'Poverty is a Behavior: a live web conference by Future Finder × The Prepared Mind Initiative' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poverty is a Behavior | Future Finder × The Prepared Mind Initiative',
    description: 'Free live web conference on YouTube, Wed 25 Nov 2026, 7:00 PM GMT. Why schools don\'t teach you about money.',
    images: ['/images/og-webinar.png'],
  },
}

export default function WebConferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
