export const contactEmail = 'office.futurefinder@gmail.com'

export const partnershipSubject = 'Partnership enquiry'
export const opportunitySubject = 'Opportunity submission'
export const reportSubject = 'Report a listing'

export const submissionPath = '/submit/'

export function mailto(subject?: string, body?: string) {
  const params: string[] = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  if (params.length === 0) return `mailto:${contactEmail}`
  return `mailto:${contactEmail}?${params.join('&')}`
}
