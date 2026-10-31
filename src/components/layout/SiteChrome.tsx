'use client'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScamWarningBanner from '@/components/ui/ScamWarningBanner'
import SocialFollowBand from '@/components/ui/SocialFollowBand'

// Partner pages (co-branded) supply their own header and footer,
// so the Future Finder site chrome is skipped for them.
const PARTNER_PREFIXES = ['/webinar']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const isPartnerPage = PARTNER_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))

  if (isPartnerPage) {
    return <main>{children}</main>
  }

  return (
    <>
      <ScamWarningBanner />
      <Header />
      <main>{children}</main>
      <SocialFollowBand />
      <Footer />
    </>
  )
}
