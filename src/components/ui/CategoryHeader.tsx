import Link from 'next/link'
import type { ReactNode } from 'react'

export default function CategoryHeader({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="category-header">
      <div className="listing-wrap">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{label}</li>
          </ol>
        </nav>
        <div className="category-title-row">
          <span className="category-accent" aria-hidden="true" />
          <h1>{label}</h1>
        </div>
        <p className="category-intro">{description}</p>
        {children}
      </div>
    </section>
  )
}
