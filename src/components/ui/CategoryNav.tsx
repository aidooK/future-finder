import Link from 'next/link'
import { categoryMeta } from '@/lib/categories'

const categories = [
  { slug: 'jobs', summary: 'Work and internships', icon: 'briefcase' },
  { slug: 'scholarships', summary: 'Education funding', icon: 'cap' },
  { slug: 'study-abroad', summary: 'International study', icon: 'globe' },
  { slug: 'entrepreneurship', summary: 'Business development', icon: 'bulb' },
  { slug: 'growth-mindset', summary: 'Skills and personal growth', icon: 'sprout' },
] as const

export default function CategoryNav() {
  return (
    <nav className="category-nav" aria-labelledby="category-nav-heading">
      <h2 id="category-nav-heading" className="category-nav-heading">Explore by category</h2>
      <ul className="category-nav-grid">
        {categories.map(category => {
          const meta = categoryMeta[category.slug]
          return (
            <li key={category.slug}>
              <Link className={`category-nav-link category-nav-${category.slug}`} href={`/${category.slug}/`}>
                <span className="category-nav-icon" aria-hidden="true">
                  <CategoryIcon name={category.icon} />
                </span>
                <span className="category-nav-text">
                  <span className="category-nav-title">{meta.label}</span>
                  <span className="category-nav-copy">{category.summary}</span>
                </span>
                <span className="category-nav-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function CategoryIcon({ name }: { name: (typeof categories)[number]['icon'] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (name === 'briefcase') {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
        <path d="M3 12h18" />
      </svg>
    )
  }

  if (name === 'cap') {
    return (
      <svg {...common}>
        <path d="M3 10 12 5l9 5-9 5-9-5z" />
        <path d="M7 12.2V16c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5v-3.8" />
        <path d="M21 10v6" />
      </svg>
    )
  }

  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17" />
        <path d="M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5s1.2-6.2 3.6-8.5z" />
      </svg>
    )
  }

  if (name === 'bulb') {
    return (
      <svg {...common}>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a5.5 5.5 0 0 0-3.2 9.9c.4.4.7.9.7 1.5V16h5v-1.6c0-.6.3-1.1.7-1.5A5.5 5.5 0 0 0 12 3z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M12 21V11" />
      <path d="M12 15c0-3.2 2.6-5.2 6.2-5.2-.6 3.4-2.8 5.2-6.2 5.2z" />
      <path d="M12 17.2c0-2.4-2.4-4.2-5.4-4.2.6 2.6 2.4 4.2 5.4 4.2z" />
    </svg>
  )
}
