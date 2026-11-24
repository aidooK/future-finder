export type TeamProfileLink = {
  label: string
  href: string
}

export type TeamPortrait = {
  src: string
  alt: string
  /** CSS object-position, such as "center 20%". */
  focal?: string
}

/** A public founder or team profile. A name is required before publication. */
export type TeamProfile = {
  id: string
  name: string
  /** True only when the person is a founder. This is separate from the operational role. */
  founder: boolean
  role: string
  portrait?: TeamPortrait
  links?: TeamProfileLink[]
  order: number
  published: boolean
  /** True for stand-in profiles. Remove this when confirmed details replace the example. */
  example?: boolean
}

/**
 * The only profile source for the public site.
 * Names, positions, and portraits come from the files in public/images/Members.
 * The Django CMS is not the public content source while CONTENT_API_URL is unset.
 */
export const teamProfiles: TeamProfile[] = [
  {
    id: 'solomon-aidoo',
    name: 'Solomon Aidoo',
    founder: true,
    role: 'Founder',
    portrait: { src: '/images/Members/Solomo%20Aidoo_Founder.jpeg', alt: '' },
    order: 1,
    published: true,
  },
  {
    id: 'abigail-odukuwaa-sackey',
    name: 'Abigail Odukuwaa Sackey',
    founder: false,
    role: 'Community Moderator',
    portrait: { src: '/images/Members/Abigail%20Odukuwaa%20Sackey%20Community%20Moderator.jpeg', alt: '' },
    order: 2,
    published: true,
  },
  {
    id: 'antaniba-marvelous',
    name: 'Antaniba Marvelous',
    founder: false,
    role: 'Community Moderator Officer',
    portrait: { src: '/images/Members/Antaniba%20Marvelous%20Community%20Moderator%20officer.jpeg', alt: '' },
    order: 3,
    published: true,
  },
  {
    id: 'blessed-sillaniin-anaah',
    name: 'Blessed Sillaniin Anaah',
    founder: false,
    role: 'Graphics Designer',
    portrait: { src: '/images/Members/BLESSED%20SILLANIIN%20ANAAH_Graphics%20Designer.jpeg', alt: '' },
    order: 4,
    published: true,
  },
  {
    id: 'emmanuel-aidoo',
    name: 'Emmanuel Aidoo',
    founder: false,
    role: 'Web Developer',
    portrait: { src: '/images/Members/Emmanuel%20Aidoo.jpeg', alt: '' },
    order: 5,
    published: true,
  },
  {
    id: 'gideo-agli',
    name: 'Gideo Agli',
    founder: false,
    role: 'Administrator',
    portrait: { src: '/images/Members/Gideo%20Agli%20Administrator.jpeg', alt: '' },
    order: 6,
    published: true,
  },
  {
    id: 'olivia-kafui-kwamegah',
    name: 'Olivia Kafui Kwamegah',
    founder: false,
    role: 'Social Media Lead',
    portrait: { src: '/images/Members/Olivia%20kafui%20kwamegah_Social%20media%20Lead.jpeg', alt: '' },
    order: 7,
    published: true,
  },
  {
    id: 'rahmatu',
    name: 'Rahmatu',
    founder: false,
    role: 'Social Media Lead',
    portrait: { src: '/images/Members/Rahmatu%20Social%20Media%20Lead.jpeg', alt: '' },
    order: 8,
    published: true,
  },
  {
    id: 'theo',
    name: 'Theo',
    founder: false,
    role: 'Verification Member',
    portrait: { src: '/images/Members/Theo_Verification%20Member.jpeg', alt: '' },
    order: 9,
    published: true,
  },
]

export function publishedTeamProfiles(profiles: TeamProfile[] = teamProfiles): TeamProfile[] {
  return profiles
    .filter(profile => profile.published && profile.name.trim() && (profile.role.trim() || profile.portrait?.src.trim()))
    .slice()
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
}

export function teamHeading(profiles: TeamProfile[]): 'Meet the minds behind Future Finder' | 'Our Team' {
  return profiles.length > 0 && profiles.every(profile => profile.founder)
    ? 'Meet the minds behind Future Finder'
    : 'Our Team'
}

/** The portrait stored on this member. Never borrows another member's photograph. */
export function memberPortrait(profile: TeamProfile): TeamPortrait | null {
  const src = profile.portrait?.src.trim()
  if (!src) return null
  const role = profileRoleLabel(profile)
  return {
    src,
    alt: profile.portrait?.alt.trim() || (role ? `${profile.name}, ${role}` : profile.name),
    focal: profile.portrait?.focal,
  }
}

export function profileRoleLabel(profile: TeamProfile): string {
  const lines = profileLines(profile)
  if (lines.designation && lines.role) return `${lines.designation}, ${lines.role}`
  return lines.designation || lines.role
}

/** Pixels per second for the profile strip. Slow enough to read a name and role. */
export const teamStripSpeed = 24

/**
 * How many visual copies fill the viewport and leave one extra set for a seamless loop.
 * Copies after the first are a rendering technique. They are not extra profile records.
 */
export function marqueeCopyCount(viewport: number, setWidth: number): number {
  if (viewport <= 0 || setWidth <= 0) return 2
  return Math.max(2, Math.ceil(viewport / setWidth) + 1)
}

/** Keep the strip offset inside one loop so the repeated set can jump without a visible gap. */
export function wrapMarqueeOffset(offset: number, loop: number): number {
  if (!(loop > 0)) return 0
  let next = offset
  while (next <= -loop) next += loop
  while (next > 0) next -= loop
  return next
}

export function profileLines(profile: TeamProfile): { designation: string; role: string } {
  const role = profile.role.trim()
  if (profile.founder && role.toLowerCase() !== 'founder') {
    return { designation: 'Founder', role }
  }
  if (profile.founder) return { designation: 'Founder', role: '' }
  return { designation: '', role }
}

export function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function publicProfileLinks(links: TeamProfileLink[] | undefined): TeamProfileLink[] {
  return (links ?? []).filter(link => {
    const label = link.label.trim()
    if (!label) return false
    try {
      const url = new URL(link.href)
      return url.protocol === 'https:' || url.protocol === 'http:'
    } catch {
      return false
    }
  })
}
