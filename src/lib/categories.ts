export const categoryMeta: Record<string, { label: string; color: string; tagClass: string; description: string }> = {
  'jobs': {
    label: 'Jobs',
    color: '#1565C0',
    tagClass: 'tag-jobs',
    description: 'Explore jobs across Ghana and Africa, from entry-level to senior roles.'
  },
  'scholarships': {
    label: 'Scholarships',
    color: '#2E7D32',
    tagClass: 'tag-scholarships',
    description: 'Local and international scholarships open to African and Ghanaian students — fully funded and partial awards.'
  },
  'study-abroad': {
    label: 'Study Abroad',
    color: '#6A1B9A',
    tagClass: 'tag-study-abroad',
    description: 'Study abroad programs, exchange opportunities and international university admissions for African youth.'
  },
  'entrepreneurship': {
    label: 'Entrepreneurship',
    color: '#E65100',
    tagClass: 'tag-entrepreneurship',
    description: 'Grants, accelerators, competitions and funding programs for African entrepreneurs and startups.'
  },
  'growth-mindset': {
    label: 'Growth Mindset',
    color: '#F9A825',
    tagClass: 'tag-growth-mindset',
    description: 'Career guides, application tips, personal development and success stories from African youth.'
  },
}

/** Readable text color for the card action, paired with each category hue. */
export const categoryActionInk: Record<string, string> = {
  jobs: '#0D47A1',
  scholarships: '#1B5E20',
  'study-abroad': '#4A148C',
  entrepreneurship: '#BF360C',
  'growth-mindset': '#7A4E00',
}
