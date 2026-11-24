import FeatureCards from '@/components/ui/FeatureCards'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opportunity updates',
  description: 'Get jobs, scholarships, and funding opportunities for African applicants by email.',
}

export default function NewsletterPage() {
  return (
    <>
      <FeatureCards />
    </>
  )
}
