import { categoryMeta } from './categories'
import { mailto, opportunitySubject } from './contact'

const categoryLabels = Object.values(categoryMeta).map(category => category.label)

function categoryChoices(labels: string[]) {
  if (labels.length <= 1) return labels.join('')
  return `${labels.slice(0, -1).join(', ')}, or ${labels[labels.length - 1]}`
}

export const submissionTemplate = [
  'Opportunity title:',
  `Category: ${categoryChoices(categoryLabels)}`,
  'Organisation:',
  'Official source/application link:',
  'Deadline and time zone, or confirmed rolling status:',
  'Eligible applicants:',
  'Location or remote status:',
  'Funding, compensation, or benefits:',
  'Application fees, if any:',
  'Your contact email:',
  '',
  'If you do not know an item, write "Unknown". Do not guess.',
  'Your contact email is for follow-up and is not intended for public display.',
].join('\n')

export function submissionDraftHref() {
  return mailto(opportunitySubject, submissionTemplate)
}
