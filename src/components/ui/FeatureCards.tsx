const features = [
  {
    title: 'Job listings',
    description: 'Curated jobs across Ghana and Africa — entry level to senior.',
    icon: 'briefcase',
  },
  {
    title: 'Scholarship Alerts',
    description: 'Local and international scholarships with deadlines and guides.',
    icon: 'cap',
  },
  {
    title: 'Study Abroad Programs',
    description: 'Exchange programs and international university opportunities.',
    icon: 'globe',
  },
  {
    title: 'Growth Tips',
    description: 'Application guides, CV tips and success stories from African youth.',
    icon: 'bulb',
  },
] as const

export default function FeatureCards() {
  return (
    <section className="feature-section" aria-labelledby="feature-heading">
      <h2 id="feature-heading" className="feature-heading">What You Get</h2>
      <ul className="feature-list">
        {features.map(feature => (
          <li key={feature.title} className="feature-card">
            <span className="feature-badge" aria-hidden="true">
              <FeatureIcon name={feature.icon} />
            </span>
            <div className="feature-copy">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FeatureIcon({ name }: { name: (typeof features)[number]['icon'] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
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

  return (
    <svg {...common}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a5.5 5.5 0 0 0-3.2 9.9c.4.4.7.9.7 1.5V16h5v-1.6c0-.6.3-1.1.7-1.5A5.5 5.5 0 0 0 12 3z" />
    </svg>
  )
}
