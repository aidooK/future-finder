import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Future Finder',
  description: 'Future Finder\'s privacy policy — how we collect, use, and protect your information.',
}

const LAST_UPDATED = 'July 2026'

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .privacy-hero { background: #1A1A1A; padding: 56px 24px; }
        .privacy-wrap { max-width: 760px; margin: 0 auto; padding: 64px 24px; }
        .privacy-wrap h2 { font-family: var(--font-oswald); font-size: 20px; font-weight: 700; color: #1A1A1A; margin: 40px 0 12px; text-transform: uppercase; letter-spacing: 0.03em; }
        .privacy-wrap p { font-family: var(--font-lato); font-size: 15px; color: #444; line-height: 1.85; margin-bottom: 14px; }
        .privacy-wrap ul { margin: 0 0 16px 20px; }
        .privacy-wrap li { font-family: var(--font-lato); font-size: 15px; color: #444; line-height: 1.75; margin-bottom: 6px; }
        .privacy-wrap a { color: #D32F2F; text-decoration: underline; }
        .privacy-divider { border: none; border-top: 1px solid #EFEFEF; margin: 32px 0; }
      `}</style>

      <section className="privacy-hero">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Legal</p>
          <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: 14, color: '#666' }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="privacy-wrap">
        <p>Future Finder ("we", "us", "our") is committed to protecting the privacy of everyone who visits futurefinder.blog. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data. By using our site, you agree to the practices described here.</p>

        <hr className="privacy-divider" />

        <h2>1. Who We Are</h2>
        <p>Future Finder is a free opportunities platform for African and Ghanaian youth, publishing daily listings of jobs, scholarships, study abroad programmes, entrepreneurship funding, and growth resources. We are operated from Ghana and can be reached at <a href="mailto:office.futurefinder@gmail.com">office.futurefinder@gmail.com</a>.</p>

        <h2>2. Information We Collect</h2>
        <p><strong>Information you provide directly:</strong> If you subscribe to our newsletter or submit a volunteer or opportunity form, we collect the information you enter — typically your name and email address.</p>
        <p><strong>Automatically collected information:</strong> Like most websites, we automatically collect certain technical data when you visit — including your IP address, browser type, device type, pages visited, and time spent on pages. This is collected through Google Analytics 4.</p>
        <p><strong>Cookies:</strong> We use cookies to support Google Analytics and Google AdSense (which serves ads on our site). These cookies help us understand how our site is used and allow Google to serve relevant advertisements.</p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To send you our newsletter if you have subscribed (you can unsubscribe at any time)</li>
          <li>To understand how our content is performing and improve the site</li>
          <li>To serve advertisements through Google AdSense</li>
          <li>To respond to enquiries, submissions, or reports you send us</li>
        </ul>
        <p>We do not sell, rent, or trade your personal information to any third party for marketing purposes.</p>

        <h2>4. Google Analytics</h2>
        <p>We use Google Analytics 4 to understand how visitors interact with our site. This service collects anonymised data including pages visited, time on page, and general geographic location. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

        <h2>5. Google AdSense</h2>
        <p>We use Google AdSense to display advertisements on our site. Google may use cookies and similar technologies to serve ads based on your visits to our site and other sites on the internet. You can manage your Google ad preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>

        <h2>6. Third-Party Links</h2>
        <p>Our site contains links to external websites and official opportunity portals. We are not responsible for the privacy practices or content of these external sites. Always review the privacy policy of any site you visit.</p>

        <h2>7. Data Retention</h2>
        <p>We retain newsletter subscriber data for as long as your subscription is active. If you unsubscribe, your details are removed from our mailing list. Analytics data is retained in accordance with Google Analytics' default retention settings.</p>

        <h2>8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Unsubscribe from our newsletter at any time using the unsubscribe link in any email</li>
          <li>Object to the processing of your personal data for marketing purposes</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:office.futurefinder@gmail.com">office.futurefinder@gmail.com</a>.</p>

        <h2>9. Children's Privacy</h2>
        <p>Future Finder is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.</p>

        <h2>11. Contact</h2>
        <p>If you have any questions about this Privacy Policy, please email us at <a href="mailto:office.futurefinder@gmail.com">office.futurefinder@gmail.com</a>.</p>

        <hr className="privacy-divider" />
        <p style={{ fontSize: 13, color: '#999' }}>© {new Date().getFullYear()} Future Finder. All rights reserved.</p>
      </div>
    </>
  )
}
