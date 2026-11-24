/**
 * Deadline and job-card rules shared by the server render and the browser.
 *
 * Date-only deadlines (YYYY-MM-DD) stay open through that calendar date.
 * No clock time is invented for them. When a time zone is supplied, the
 * calendar date is read in that zone. Otherwise the UTC calendar date is
 * used. A scheduled rebuild is still required for no-JS HTML and meta tags;
 * the browser re-evaluates these functions after load.
 */

export type DeadlineKind = 'fixed' | 'rolling' | 'unannounced' | 'stated'

export type DeadlineState = 'open' | 'closing-soon' | 'closed'

export type DeadlineInput = {
  deadline?: string | Date | null
  deadlineTimezone?: string | null
  timezone?: string | null
  expired?: boolean | string | null
}

export type DeadlineStatus = {
  kind: DeadlineKind
  state: DeadlineState
  statusLabel: string
  deadlineLabel: string | null
  summaryLabel: string
}

export type OpportunityType = 'Internship' | 'Recruitment' | 'National Service' | 'Job'

export type JobCardModel = {
  slug: string
  title: string
  cardTitle: string
  href: string
  date?: string
  postedLabel?: string
  location?: string
  eligibility: string[]
  benefit?: string
  benefitIsCompensation: boolean
  opportunityType: OpportunityType
  fullTime: boolean
  deadline?: string
  deadlineTimezone?: string
  expired: boolean
  applyUrl?: string
  officialApplication: boolean
  excerpt?: string
  coverImage?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: string
  thumbnailPosition?: string
}

export type ThumbnailType = 'photo' | 'poster' | 'logo'

export type CardImageFields = {
  title: string
  thumbnail?: string | null
  poster?: string | null
  coverImage?: string | null
  thumbnailType?: string | null
  thumbnailPosition?: string | null
  imageAlt?: string | null
}

export type CardMedia =
  | {
      kind: 'image'
      src: string
      alt: string
      fit: 'cover' | 'contain'
      position: string
      padded: boolean
    }
  | { kind: 'fallback' }

const ROLLING = /rolling|open until filled|ongoing|continuous/i
const UNANNOUNCED = /^(tba|tbc|to be announced|to be confirmed|not announced|unannounced|no deadline|not stated|deadline not announced|n\/a|na|none|unknown)$/i
const CLOSED_WORD = /^(discontinued|closed|expired|filled|position filled|applications closed)$/i
const COMPENSATION = /salary|stipend|allowance|remuneration|\bwages?\b|\bpay\b|compensation|\bpackage\b|\bGHS\b|\bUSD\b|\$|€|£/i
const NON_OFFICIAL_HOSTS = [
  'jobsinghana.com',
  'newsnowgh.com',
  'unchannel.org',
  'bit.ly',
  'tinyurl.com',
  'wa.me',
  'api.whatsapp.com',
  'forms.gle',
  'docs.google.com',
  'drive.google.com',
  'google.com',
]

const URGENT_DAYS = 14

type FixedDeadline = {
  date: string
  time?: string
  zoneLabel?: string
  closesAt?: number
}

export function normalizeDeadline(value: DeadlineInput['deadline']): string | undefined {
  if (value == null) return undefined
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined
    return value.toISOString().slice(0, 10)
  }
  const text = String(value).trim()
  return text || undefined
}

export function normalizeExpired(value: DeadlineInput['expired']): boolean {
  return value === true || value === 'true'
}

export function normalizeTimezone(input: DeadlineInput): string | undefined {
  const zone = input.deadlineTimezone || input.timezone
  if (zone == null) return undefined
  const text = String(zone).trim()
  return text || undefined
}

export function formatCalendarDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
  if (!match) return isoDate
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const utc = new Date(Date.UTC(year, month - 1, day))
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(utc)
}

export function getDeadlineStatus(input: DeadlineInput, now: Date): DeadlineStatus {
  const expired = normalizeExpired(input.expired)
  const raw = normalizeDeadline(input.deadline)
  const timeZone = normalizeTimezone(input)

  if (expired) {
    const fixed = raw ? parseFixedDeadline(raw, timeZone) : null
    return closedStatus(fixed)
  }

  if (!raw) {
    return {
      kind: 'unannounced',
      state: 'open',
      statusLabel: 'Deadline not announced',
      deadlineLabel: null,
      summaryLabel: 'Deadline not announced',
    }
  }

  const fixed = parseFixedDeadline(raw, timeZone)
  if (fixed) return statusForFixed(fixed, now, timeZone)

  if (ROLLING.test(raw) && !CLOSED_WORD.test(raw)) {
    return {
      kind: 'rolling',
      state: 'open',
      statusLabel: 'Rolling applications',
      deadlineLabel: null,
      summaryLabel: 'Rolling applications',
    }
  }

  if (UNANNOUNCED.test(raw)) {
    return {
      kind: 'unannounced',
      state: 'open',
      statusLabel: 'Deadline not announced',
      deadlineLabel: null,
      summaryLabel: 'Deadline not announced',
    }
  }

  if (CLOSED_WORD.test(raw)) return closedStatus(null)

  return {
    kind: 'stated',
    state: 'open',
    statusLabel: raw,
    deadlineLabel: null,
    summaryLabel: raw,
  }
}

export function selectOpenJobs<T extends DeadlineInput & { date?: string; slug?: string }>(
  jobs: readonly T[],
  now: Date,
  limit: number,
): T[] {
  return jobs
    .filter(job => getDeadlineStatus(job, now).state !== 'closed')
    .slice()
    .sort(compareRecent)
    .slice(0, limit)
}

export type RelatedCandidate = DeadlineInput & {
  slug: string
  title: string
  category?: string
  date?: string
  location?: string
  tags?: string[] | string
}

const RELATED_STOP = new Set(['the', 'and', 'for', 'with', 'from', 'that', 'this', 'your', 'our', 'are', 'was'])
const GENERIC_TAGS = new Set([
  'job', 'jobs', 'internship', 'internships', 'recruitment', 'scholarship', 'scholarships',
  'africa', 'african', 'ghana', 'opportunity', 'opportunities', 'program', 'programme', 'programs', 'programmes',
])

function relatedWords(value?: string | null): string[] {
  return (value || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 2 && !RELATED_STOP.has(word))
}

function relatedTags(tags?: string[] | string): string[] {
  const list = Array.isArray(tags) ? tags : tags ? tags.split(',') : []
  return list
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 2 && !GENERIC_TAGS.has(tag))
}

function relatedScore(current: RelatedCandidate, candidate: RelatedCandidate, now: Date): number {
  if (candidate.slug === current.slug) return -1
  if (getDeadlineStatus(candidate, now).state === 'closed') return -1
  let score = 0
  const currentType = cardTypeLabel({ title: current.title, tags: current.tags, category: current.category || 'jobs' })
  const candidateType = cardTypeLabel({ title: candidate.title, tags: candidate.tags, category: candidate.category || current.category || 'jobs' })
  const broadType = new Set(['Job', 'Opportunity', 'Article', 'Program', 'Guide', 'Scholarship'])
  if (currentType === candidateType && !broadType.has(currentType)) score += 3
  const places = new Set(relatedWords(current.location))
  if (places.size > 0 && relatedWords(candidate.location).some(word => places.has(word))) score += 2
  const tags = new Set(relatedTags(current.tags))
  const sharedTags = relatedTags(candidate.tags).filter(tag => tags.has(tag)).length
  score += Math.min(sharedTags, 3)
  return score >= 2 ? score : -1
}

export function selectRelated<T extends RelatedCandidate>(
  current: T,
  posts: readonly T[],
  now: Date,
  limit = 3,
): T[] {
  return posts
    .map(post => ({ post, score: relatedScore(current, post, now) }))
    .filter(item => item.score >= 2)
    .sort((a, b) => b.score - a.score || (b.post.date || '').localeCompare(a.post.date || '') || a.post.slug.localeCompare(b.post.slug))
    .slice(0, limit)
    .map(item => item.post)
}

export function sortJobsForBoard<T extends DeadlineInput & { date?: string; slug?: string }>(
  jobs: readonly T[],
  now: Date,
): T[] {
  return jobs.slice().sort((a, b) => {
    const aClosed = getDeadlineStatus(a, now).state === 'closed' ? 1 : 0
    const bClosed = getDeadlineStatus(b, now).state === 'closed' ? 1 : 0
    if (aClosed !== bClosed) return aClosed - bClosed
    return compareRecent(a, b)
  })
}

export function toCardTitle(title: string, location?: string): string {
  let next = title.trim()
  if (location && /\bghana\b/i.test(location)) {
    next = next.replace(/\s+[—–-]\s+Ghana\s*$/i, '')
  }
  return next
}

const JOB_TYPES: OpportunityType[] = ['Job', 'Internship', 'Recruitment', 'National Service']

export function statedJobType(value?: string | null): OpportunityType | undefined {
  const text = value?.replace(/\s+/g, ' ').trim().toLowerCase()
  return JOB_TYPES.find(kind => kind.toLowerCase() === text)
}

export function opportunityType(title: string, tags?: string[] | string): OpportunityType {
  const tagText = Array.isArray(tags) ? tags.join(' ') : tags ?? ''
  const haystack = `${title} ${tagText}`.toLowerCase()
  if (/\bintern(?:ship|ships)?\b/.test(haystack)) return 'Internship'
  if (/national service/.test(haystack)) return 'National Service'
  if (/\brecruitment\b/.test(haystack)) return 'Recruitment'
  return 'Job'
}

export function isConfirmedFullTime(content: string): boolean {
  const text = content.toLowerCase()
  const fullTime = /\bfull-time\b/.test(text) || /\bfull time\b/.test(text)
  const partTime = /\bpart-time\b/.test(text) || /\bpart time\b/.test(text)
  return fullTime && !partTime
}

export function extractEligibility(content: string, limit = 3): string[] {
  const lines = content.split(/\r?\n/)
  let inSection = false
  const bullets: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (/^#{2,3}\s+eligibility\b/i.test(trimmed)) {
      inSection = true
      continue
    }
    if (inSection && /^#{1,3}\s+\S/.test(trimmed)) break
    if (!inSection) continue
    const match = line.match(/^\s*[-*]\s+(.+?)\s*$/)
    if (!match) continue
    const text = match[1].replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
    if (text) bullets.push(text)
  }

  return bullets.slice(0, limit)
}

export function isCompensation(benefit?: string): boolean {
  if (!benefit) return false
  return COMPENSATION.test(benefit)
}

export function isOfficialApplicationUrl(url?: string): boolean {
  if (!url) return false
  if (/^mailto:/i.test(url)) return false
  try {
    const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase()
    return !NON_OFFICIAL_HOSTS.some(blocked => host === blocked || host.endsWith(`.${blocked}`))
  } catch {
    return false
  }
}

export function applicationLinkLabel(url: string, closed: boolean): string {
  const official = isOfficialApplicationUrl(url)
  if (closed) return official ? 'View official listing' : 'View application link'
  if (/^mailto:/i.test(url)) return 'Apply by email'
  if (/wa\.me|api\.whatsapp\.com/i.test(url)) return 'Apply on WhatsApp'
  if (official) return 'Apply on official site'
  return 'View application link'
}

export function mailtoAddress(url?: string): string | undefined {
  if (!url) return undefined
  const match = /^mailto:([^?]+)/i.exec(url.trim())
  if (!match) return undefined
  try {
    const address = decodeURIComponent(match[1]).trim()
    return address || undefined
  } catch {
    return match[1].trim() || undefined
  }
}

export function withMailtoSubject(url: string, subject?: string): string {
  const address = mailtoAddress(url)
  if (!address || !subject?.trim()) return url.trim()
  if (/[?&]subject=/i.test(url)) return url.trim()
  return `mailto:${address}?subject=${encodeURIComponent(subject.trim())}`
}

/** Returns a subject only when the listing states one exact email subject. */
export function extractApplicationSubject(content: string): string | undefined {
  const patterns = [
    /use\s+\*\*"([^"]+)"\*\*\s+as the subject/gi,
    /use\s+"([^"]+)"\s+as the subject/gi,
    /subject line(?:\s+of your email)?(?:\s+specified)?\s*:\s*\*\*"([^"]+)"\*\*/gi,
    /subject line(?:\s+of your email)?(?:\s+specified)?\s*:\s*"([^"]+)"/gi,
    /(?:email\s+)?subject(?:\s+line)?\s*(?:is|:)\s*\*\*"([^"]+)"\*\*/gi,
    /(?:email\s+)?subject(?:\s+line)?\s*(?:is|:)\s*"([^"]+)"/gi,
  ]
  const found = new Set<string>()
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const subject = match[1]?.replace(/\s+/g, ' ').trim()
      if (subject && subject.length <= 120) found.add(subject)
    }
  }
  if (found.size !== 1) return undefined
  return [...found][0]
}

export function opportunityHeading(title: string): { heading: string; organization?: string } {
  const cleaned = title.replace(/\s+/g, ' ').trim()
  const match = /^(.+?)\s+at\s+(.+?)(?:\s+[—–-]\s+.+)?$/i.exec(cleaned)
  if (!match) return { heading: cleaned }
  const heading = match[1].trim()
  const organization = match[2].trim()
  if (heading.length < 3 || heading.length > 90 || organization.length < 2 || organization.length > 90) {
    return { heading: cleaned }
  }
  return { heading, organization }
}

export function summarySupport(benefit?: string, category?: string): { label: 'Compensation' | 'Funding'; value: string } | undefined {
  const text = present(benefit)
  if (!text) return undefined
  const funding = /\bfunded\b|\btuition\b|\bgrants?\b|\bseed capital\b|\baward\b|\bsponsorship\b|\bstipend\b|\ballowance\b|\bscholarship\b/i.test(text)
  const paid = isCompensation(text)
  if (!paid && !funding) return undefined
  return { label: category === 'jobs' && paid ? 'Compensation' : 'Funding', value: text }
}

export function postedLabel(date?: string): string | undefined {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined
  return `Posted ${formatCalendarDate(date)}`
}

export function listingDescription(title: string, excerpt: string | undefined, status: DeadlineStatus): string {
  if (status.state === 'closed') return `${title}. Applications closed.`
  const clean = excerpt?.trim()
  return clean || `${title} — full details and application guide on Future Finder.`
}

export function neutralizeClosedHtml(html: string): string {
  const urgency = /\b(apply now|apply today|apply immediately|apply as soon as possible|don't wait|do not wait|deadlines move fast)\b/i
  const stripped = html.replace(/<(p|li|strong)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    if (urgency.test(text)) return ''
    return `<${tag}${attrs}>${rewriteOpenClaims(inner)}</${tag}>`
  })
  return rewriteOpenClaims(stripped)
}

export function buildJobCard(post: {
  slug: string
  title: string
  date?: string
  deadline?: string | Date | null
  deadlineTimezone?: string | null
  timezone?: string | null
  location?: string
  benefit?: string
  applyUrl?: string
  tags?: string[] | string
  expired?: boolean | string | null
  content?: string
  excerpt?: string
  type?: string
  coverImage?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: string
  thumbnailPosition?: string
}): JobCardModel {
  const deadline = normalizeDeadline(post.deadline)
  const deadlineTimezone = normalizeTimezone(post)
  const location = post.location?.trim() || undefined
  const benefit = post.benefit?.trim() || undefined
  const content = post.content ?? ''

  return {
    slug: post.slug,
    title: post.title,
    cardTitle: toCardTitle(post.title, location),
    href: `/jobs/${post.slug}/`,
    date: post.date,
    postedLabel: postedLabel(post.date),
    location,
    eligibility: content ? extractEligibility(content) : [],
    benefit,
    benefitIsCompensation: isCompensation(benefit),
    opportunityType: statedJobType(post.type) || opportunityType(post.title, post.tags),
    fullTime: content ? isConfirmedFullTime(content) : false,
    deadline,
    deadlineTimezone,
    expired: normalizeExpired(post.expired),
    applyUrl: post.applyUrl?.trim() || undefined,
    officialApplication: isOfficialApplicationUrl(post.applyUrl),
    excerpt: post.excerpt?.trim() || undefined,
    coverImage: present(post.coverImage),
    thumbnail: present(post.thumbnail),
    poster: present(post.poster),
    thumbnailType: present(post.thumbnailType),
    thumbnailPosition: present(post.thumbnailPosition),
  }
}

export function cardTypeLabel(input: {
  title: string
  tags?: string[] | string
  category: string
  opportunityType?: OpportunityType
}): string {
  const tagText = Array.isArray(input.tags) ? input.tags.join(' ') : input.tags ?? ''
  const haystack = `${input.title} ${tagText}`.toLowerCase()
  if (/\bfellowships?\b/.test(haystack)) return 'Fellowship'
  if (/\bintern(?:ship|ships)?\b/.test(haystack)) return 'Internship'
  if (/national service/.test(haystack)) return 'National Service'
  if (/\brecruitment\b/.test(haystack)) return 'Recruitment'
  if (/\bhow to\b|\bguide\b/.test(haystack)) return 'Guide'
  if (/\bpreview\b|world cup/.test(haystack)) return 'Article'
  if (/\bscholarships?\b/.test(haystack)) return 'Scholarship'
  if (/\baccelerators?\b/.test(haystack)) return 'Accelerator'
  if (/\bincubators?\b/.test(haystack)) return 'Incubator'
  if (/\bcompetitions?\b|\bquiz\b/.test(haystack)) return 'Competition'
  if (/\bawards?\b/.test(haystack)) return 'Award'
  if (/\bgrants?\b/.test(haystack)) return 'Grant'
  if (/\bfunding\b|\bfund\b/.test(haystack)) return 'Funding'
  if (/\bprogram(?:me|mes|s)?\b/.test(haystack)) return 'Program'
  if (/\bbuildathons?\b/.test(haystack)) return 'Buildathon'
  if (/\bhackathons?\b/.test(haystack)) return 'Hackathon'
  if (/\bevents?\b/.test(haystack)) return 'Event'
  if (input.opportunityType) return input.opportunityType
  if (input.category === 'jobs') return 'Job'
  if (input.category === 'scholarships') return 'Scholarship'
  if (input.category === 'study-abroad') return 'Program'
  if (input.category === 'growth-mindset') return 'Article'
  return 'Opportunity'
}

export type OpportunityCardData = {
  title: string
  href: string
  organization?: string
  location?: string
  compensation?: string
  eligibility?: string
  typeLabel?: string
  category?: string
  deadline?: string
  image?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: string
  thumbnailPosition?: string
}

function present(value?: string | null): string | undefined {
  const text = value?.replace(/\s+/g, ' ').trim()
  return text || undefined
}

function cardCompensation(benefit?: string): string | undefined {
  const text = present(benefit)
  if (!text) return undefined
  if (isCompensation(text) || /\bfunded\b|\btuition\b|\bgrants?\b|\bseed capital\b|\baward\b|\bsponsorship\b/i.test(text)) return text
  return undefined
}

function cardDeadline(status: DeadlineStatus, raw?: string | null): string | undefined {
  if (status.kind === 'unannounced' && !present(raw)) return undefined
  return status.summaryLabel
}

export function opportunityCardFromJob(job: JobCardModel, now: Date): OpportunityCardData {
  const status = getDeadlineStatus(job, now)
  const location = [job.fullTime && job.location ? 'Full-time' : undefined, job.location].filter(Boolean).join(' · ')
  return {
    title: job.cardTitle,
    href: job.href,
    location: present(location),
    compensation: job.benefitIsCompensation ? present(job.benefit) : undefined,
    eligibility: present(job.eligibility.find(item => item.trim())),
    typeLabel: cardTypeLabel({ title: job.title, category: 'jobs', opportunityType: job.opportunityType }),
    category: 'jobs',
    deadline: cardDeadline(status, job.deadline),
    image: present(job.coverImage),
    thumbnail: job.thumbnail,
    poster: job.poster || job.coverImage,
    thumbnailType: job.thumbnailType,
    thumbnailPosition: job.thumbnailPosition,
  }
}

export function opportunityCardFromPost(post: {
  slug: string
  category: string
  title: string
  deadline?: string | Date | null
  deadlineTimezone?: string | null
  timezone?: string | null
  expired?: boolean | string | null
  location?: string
  benefit?: string
  tags?: string[] | string
  coverImage?: string
  thumbnail?: string
  poster?: string
  thumbnailType?: string
  thumbnailPosition?: string
}, now: Date): OpportunityCardData {
  const status = getDeadlineStatus(post, now)
  return {
    title: post.title,
    href: `/${post.category}/${post.slug}/`,
    location: present(post.location),
    compensation: cardCompensation(post.benefit),
    typeLabel: cardTypeLabel({ title: post.title, tags: post.tags, category: post.category }),
    category: post.category,
    deadline: cardDeadline(status, typeof post.deadline === 'string' ? post.deadline : undefined),
    image: present(post.coverImage),
    thumbnail: present(post.thumbnail),
    poster: present(post.poster) || present(post.coverImage),
    thumbnailType: present(post.thumbnailType),
    thumbnailPosition: present(post.thumbnailPosition),
  }
}

export function cardSummary(eligibility: string[] | undefined, excerpt?: string): string | undefined {
  const line = eligibility?.map(item => item.trim()).find(Boolean)
  if (line) return line
  const text = excerpt?.replace(/\s+/g, ' ').trim()
  return text || undefined
}

function cleanAsset(value?: string | null): string | undefined {
  const text = value?.replace(/\s+/g, ' ').trim()
  return text || undefined
}

function normalizeThumbnailType(value?: string | null): ThumbnailType | undefined {
  const text = value?.trim().toLowerCase()
  if (text === 'photo' || text === 'poster' || text === 'logo') return text
  return undefined
}

function inferThumbnailType(path: string): ThumbnailType {
  if (/logo|favicon|apple-touch|\bicon\b/.test(path) || /\.(png|svg|gif|ico)$/.test(path)) return 'logo'
  return 'poster'
}

function focalPosition(value?: string | null): string {
  const text = value?.trim().toLowerCase() || 'center'
  if (/^(?:left|center|right|top|bottom)(?:\s+(?:left|center|right|top|bottom))?$/.test(text)) return text
  if (/^(?:\d{1,3})%\s+(?:\d{1,3})%$/.test(text)) return text
  return 'center'
}

export type DetailImageData = {
  src: string
  alt: string
  width: number
  height: number
  kind: ThumbnailType
  caption?: string
  credit?: string
  illustrative?: boolean
}

export function resolveDetailImage(input: {
  title: string
  poster?: string | null
  coverImage?: string | null
  thumbnail?: string | null
  thumbnailType?: string | null
  imageAlt?: string | null
  imageCaption?: string | null
  imageCredit?: string | null
  illustrative?: boolean | string | null
  width?: number | null
  height?: number | null
}, measured?: { width: number; height: number } | null): DetailImageData | null {
  const poster = cleanAsset(input.poster)
  const cover = cleanAsset(input.coverImage)
  const thumbnail = cleanAsset(input.thumbnail)
  const src = [cover, poster].find(value => value && !value.includes('/og/'))
  if (!src) return null
  if (!poster && thumbnail && src === thumbnail) return null
  const width = measured?.width || positiveDimension(input.width)
  const height = measured?.height || positiveDimension(input.height)
  if (!width || !height) return null
  const explicit = normalizeThumbnailType(input.thumbnailType)
  const inferred = inferThumbnailType(src.split('?')[0].toLowerCase())
  const sameAsset = Boolean(thumbnail && thumbnail === src)
  const kind: ThumbnailType = inferred === 'logo'
    ? 'logo'
    : (sameAsset || !thumbnail) && explicit
      ? explicit
      : inferred
  const caption = cleanAsset(input.imageCaption)
  const credit = cleanAsset(input.imageCredit)
  const illustrative = input.illustrative === true || input.illustrative === 'true'
  const alt = cleanAsset(input.imageAlt) || (kind === 'poster' ? `Poster for ${input.title}` : illustrative ? 'Illustrative image' : '')
  return {
    src,
    alt,
    width,
    height,
    kind,
    ...(caption ? { caption } : {}),
    ...(credit ? { credit } : {}),
    ...(illustrative ? { illustrative: true } : {}),
  }
}

function positiveDimension(value?: number | null): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= 20000 ? value : undefined
}

export function resolveCardMedia(input: CardImageFields | string | undefined, title = ''): CardMedia {
  const fields: CardImageFields = typeof input === 'string' || input == null
    ? { title, coverImage: input }
    : input
  const poster = cleanAsset(fields.poster) || cleanAsset(fields.coverImage)
  const src = cleanAsset(fields.thumbnail) || poster
  if (!src) return { kind: 'fallback' }
  const path = src.split('?')[0].toLowerCase()
  if (path.includes('/og/')) return { kind: 'fallback' }

  const type = normalizeThumbnailType(fields.thumbnailType) || inferThumbnailType(path)
  const photo = type === 'photo'
  return {
    kind: 'image',
    src,
    alt: photo ? (cleanAsset(fields.imageAlt) || '') : '',
    fit: photo ? 'cover' : 'contain',
    position: photo ? focalPosition(fields.thumbnailPosition) : 'center',
    padded: type === 'logo',
  }
}

function compareRecent<T extends { date?: string; slug?: string }>(a: T, b: T): number {
  const byDate = (b.date || '').localeCompare(a.date || '')
  if (byDate !== 0) return byDate
  return (a.slug || '').localeCompare(b.slug || '')
}

function closedStatus(fixed: FixedDeadline | null): DeadlineStatus {
  const deadlineLabel = fixed ? `Deadline was ${describeWhen(fixed)}` : null
  return {
    kind: fixed ? 'fixed' : 'stated',
    state: 'closed',
    statusLabel: 'Applications closed',
    deadlineLabel,
    summaryLabel: 'Applications closed',
  }
}

function statusForFixed(fixed: FixedDeadline, now: Date, timeZone?: string): DeadlineStatus {
  const closed = isFixedClosed(fixed, now, timeZone)
  const when = describeWhen(fixed)
  if (closed) return closedStatus(fixed)

  const days = daysUntil(fixed.date, todayIso(now, fixed.closesAt == null ? timeZone : undefined))
  if (fixed.closesAt == null && days >= 0 && days <= URGENT_DAYS) {
    return {
      kind: 'fixed',
      state: 'closing-soon',
      statusLabel: 'Closing soon',
      deadlineLabel: `Apply by ${when}`,
      summaryLabel: `Closing soon · Apply by ${when}`,
    }
  }

  if (fixed.closesAt != null) {
    const msLeft = fixed.closesAt - now.getTime()
    if (msLeft >= 0 && msLeft <= URGENT_DAYS * 24 * 60 * 60 * 1000) {
      return {
        kind: 'fixed',
        state: 'closing-soon',
        statusLabel: 'Closing soon',
        deadlineLabel: `Apply by ${when}`,
        summaryLabel: `Closing soon · Apply by ${when}`,
      }
    }
  }

  return {
    kind: 'fixed',
    state: 'open',
    statusLabel: 'Open',
    deadlineLabel: `Apply by ${when}`,
    summaryLabel: `Apply by ${when}`,
  }
}

function describeWhen(fixed: FixedDeadline): string {
  const date = formatCalendarDate(fixed.date)
  if (!fixed.time) return date
  const clock = fixed.time.slice(0, 5)
  return `${date}, ${clock}${fixed.zoneLabel ? ` (${fixed.zoneLabel})` : ''}`
}

function isFixedClosed(fixed: FixedDeadline, now: Date, timeZone?: string): boolean {
  if (fixed.closesAt != null) return now.getTime() > fixed.closesAt
  return todayIso(now, timeZone) > fixed.date
}

function daysUntil(deadlineDate: string, today: string): number {
  return utcDayNumber(deadlineDate) - utcDayNumber(today)
}

function utcDayNumber(isoDate: string): number {
  const [year, month, day] = isoDate.split('-').map(Number)
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000)
}

function todayIso(now: Date, timeZone?: string): string {
  const parts = wallClockParts(now, timeZone || 'UTC')
  if (parts) return parts.date
  return now.toISOString().slice(0, 10)
}

function parseFixedDeadline(raw: string, timeZone?: string): FixedDeadline | null {
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw)
  if (dateOnly) {
    const year = Number(dateOnly[1])
    const month = Number(dateOnly[2])
    const day = Number(dateOnly[3])
    if (!isValidDateParts(year, month, day)) return null
    return { date: `${dateOnly[1]}-${dateOnly[2]}-${dateOnly[3]}` }
  }

  const timed = /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(?::(\d{2}))?(?:\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/.exec(raw)
  if (!timed) return null

  const date = timed[1]
  const [year, month, day] = date.split('-').map(Number)
  if (!isValidDateParts(year, month, day)) return null
  const hourMinute = timed[2]
  const seconds = timed[3] ?? '00'
  const offset = timed[4]
  const time = `${hourMinute}:${seconds}`

  if (offset) {
    const closesAt = instantFromOffset(date, time, offset)
    if (closesAt == null) return null
    return {
      date,
      time,
      zoneLabel: offset === 'Z' ? 'UTC' : `UTC${offset.includes(':') ? offset : `${offset.slice(0, 3)}:${offset.slice(3)}`}`,
      closesAt,
    }
  }

  if (timeZone) {
    const closesAt = zonedWallTimeToUtc(date, time, timeZone)
    if (closesAt == null) {
      return { date, time, zoneLabel: 'time zone not specified' }
    }
    return { date, time, zoneLabel: timeZone, closesAt: closesAt.getTime() }
  }

  return { date, time, zoneLabel: 'time zone not specified' }
}

function isValidDateParts(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false
  const utc = new Date(Date.UTC(year, month - 1, day))
  return utc.getUTCFullYear() === year && utc.getUTCMonth() === month - 1 && utc.getUTCDate() === day
}

function instantFromOffset(date: string, time: string, offset: string): number | null {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute, second] = time.split(':').map(Number)
  const offsetMs = offsetToMs(offset)
  if (offsetMs == null) return null
  const wallAsUtc = Date.UTC(year, month - 1, day, hour, minute, second || 0)
  return wallAsUtc - offsetMs
}

function offsetToMs(offset: string): number | null {
  if (offset === 'Z') return 0
  const match = /^([+-])(\d{2}):?(\d{2})$/.exec(offset)
  if (!match) return null
  const sign = match[1] === '-' ? -1 : 1
  return sign * (Number(match[2]) * 60 + Number(match[3])) * 60 * 1000
}

function wallClockParts(instant: Date, timeZone: string): { date: string; time: string } | null {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(instant)
    const read = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value
    const year = read('year')
    const month = read('month')
    const day = read('day')
    let hour = read('hour')
    const minute = read('minute')
    const second = read('second')
    if (!year || !month || !day || !hour || !minute || !second) return null
    if (hour === '24') hour = '00'
    return {
      date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`,
    }
  } catch {
    return null
  }
}

function zonedWallTimeToUtc(date: string, time: string, timeZone: string): Date | null {
  const [hour = '00', minute = '00', second = '00'] = time.split(':')
  const padded = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
  const asUtc = new Date(`${date}T${padded}Z`)
  if (Number.isNaN(asUtc.getTime())) return null
  const shown = wallClockParts(asUtc, timeZone)
  if (!shown) return null
  const shownAsUtc = new Date(`${shown.date}T${shown.time}Z`)
  if (Number.isNaN(shownAsUtc.getTime())) return null
  return new Date(asUtc.getTime() - (shownAsUtc.getTime() - asUtc.getTime()))
}

function rewriteOpenClaims(value: string): string {
  return value
    .replace(/applications are open/gi, 'Applications are closed')
    .replace(/\bapplication is open\b/gi, 'application is closed')
    .replace(/\b(?:is|are) accepting applications\b/gi, 'accepted applications')
    .replace(/\b(?:is|are) inviting applications\b/gi, 'invited applications')
    .replace(/\bhas opened its\b/gi, 'opened its')
    .replace(/\bApplications close\b/g, 'Applications closed')
    .replace(/\bapplications close\b/g, 'applications closed')
}
