import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Poverty is a Behaviour | Future Finder × Prepared Mind Initiative' },
  description: 'A joint live web conference by Future Finder and Prepared Mind Initiative on financial habits, mindset and why schools do not teach us about money.',
  alternates: { canonical: 'https://futurefinder.blog/webinar/' },
  openGraph: {
    type: 'website',
    url: 'https://futurefinder.blog/webinar/',
    siteName: 'Future Finder × Prepared Mind Initiative',
    title: 'Poverty is a Behaviour | Future Finder × Prepared Mind Initiative',
    description: 'A joint live web conference on financial habits, mindset and breaking cycles of poverty.',
    images: [{ url: '/logo.png', width: 400, height: 200, alt: 'Future Finder × Prepared Mind Initiative' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poverty is a Behaviour | Future Finder × Prepared Mind Initiative',
    description: 'A joint live web conference on financial habits, mindset and breaking cycles of poverty.',
    images: ['/logo.png'],
  },
}

export default function WebConferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
