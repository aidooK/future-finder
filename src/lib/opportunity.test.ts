import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { readPublicImageSize } from './image-file.ts'
import {
  applicationLinkLabel,
  buildJobCard,
  cardSummary,
  cardTypeLabel,
  extractEligibility,
  getDeadlineStatus,
  isConfirmedFullTime,
  isOfficialApplicationUrl,
  listingDescription,
  neutralizeClosedHtml,
  opportunityCardFromJob,
  opportunityCardFromPost,
  opportunityType,
  extractApplicationSubject,
  mailtoAddress,
  opportunityHeading,
  resolveCardMedia,
  resolveDetailImage,
  selectOpenJobs,
  selectRelated,
  summarySupport,
  toCardTitle,
  withMailtoSubject,
} from './opportunity.ts'

const noon = (isoDay: string) => new Date(`${isoDay}T12:00:00Z`)

describe('fixed deadlines', () => {
  it('keeps a date-only deadline open through that UTC date', () => {
    const open = getDeadlineStatus({ deadline: '2026-10-24' }, new Date('2026-10-24T23:30:00Z'))
    assert.equal(open.state, 'closing-soon')
    assert.equal(open.deadlineLabel, 'Apply by 24 October 2026')
    assert.equal(open.deadlineLabel?.includes(':'), false)

    const closed = getDeadlineStatus({ deadline: '2026-10-24' }, new Date('2026-10-25T00:00:00Z'))
    assert.equal(closed.state, 'closed')
    assert.equal(closed.statusLabel, 'Applications closed')
    assert.equal(closed.deadlineLabel, 'Deadline was 24 October 2026')
  })

  it('uses a supplied time zone for the calendar date', () => {
    const stillOpen = getDeadlineStatus(
      { deadline: '2026-10-24', deadlineTimezone: 'America/Los_Angeles' },
      new Date('2026-10-25T06:30:00Z'),
    )
    assert.equal(stillOpen.state, 'closing-soon')

    const closed = getDeadlineStatus(
      { deadline: '2026-10-24', deadlineTimezone: 'America/Los_Angeles' },
      new Date('2026-10-25T07:30:00Z'),
    )
    assert.equal(closed.state, 'closed')
  })

  it('closes a timed deadline at the supplied instant', () => {
    const input = { deadline: '2026-10-24T17:00:00', timezone: 'America/New_York' }
    const before = getDeadlineStatus(input, new Date('2026-10-24T20:30:00Z'))
    assert.equal(before.state, 'closing-soon')
    assert.match(before.deadlineLabel ?? '', /17:00 \(America\/New_York\)/)

    const after = getDeadlineStatus(input, new Date('2026-10-24T21:30:00Z'))
    assert.equal(after.state, 'closed')
  })

  it('does not invent a closing instant when a time has no zone', () => {
    const status = getDeadlineStatus({ deadline: '2026-10-24T17:00:00' }, new Date('2026-10-24T18:00:00Z'))
    assert.notEqual(status.state, 'closed')
    assert.match(status.deadlineLabel ?? '', /time zone not specified/)
  })

  it('marks a deadline within 14 days as closing soon and a later one as open', () => {
    assert.equal(getDeadlineStatus({ deadline: '2026-11-07' }, noon('2026-10-24')).state, 'closing-soon')
    const later = getDeadlineStatus({ deadline: '2026-11-30' }, noon('2026-10-24'))
    assert.equal(later.state, 'open')
    assert.equal(later.statusLabel, 'Open')
    assert.equal(later.deadlineLabel, 'Apply by 30 November 2026')
  })
})

describe('rolling, unannounced, and closed wording', () => {
  it('labels rolling applications and does not treat them as expired', () => {
    const status = getDeadlineStatus({ deadline: 'Rolling basis' }, noon('2026-10-24'))
    assert.equal(status.kind, 'rolling')
    assert.equal(status.state, 'open')
    assert.equal(status.statusLabel, 'Rolling applications')
  })

  it('labels a missing deadline as not announced', () => {
    const status = getDeadlineStatus({}, noon('2026-10-24'))
    assert.equal(status.kind, 'unannounced')
    assert.equal(status.statusLabel, 'Deadline not announced')
  })

  it('honours an explicit expired flag', () => {
    const status = getDeadlineStatus({ deadline: 'Rolling basis', expired: true }, noon('2026-10-24'))
    assert.equal(status.state, 'closed')
    assert.equal(status.statusLabel, 'Applications closed')
  })

  it('does not describe a closed listing as open', () => {
    const description = listingDescription(
      'AfDB Internship',
      'Applications are open for the African Development Bank Internship Program 2027.',
      getDeadlineStatus({ deadline: '2026-10-12' }, noon('2026-10-24')),
    )
    assert.equal(description, 'AfDB Internship. Applications closed.')

    const applyExcerpt = listingDescription(
      'Ghana Armed Forces recruitment',
      'Apply online at apply.mil.gh before September 23, 2026.',
      getDeadlineStatus({ deadline: '2026-09-23' }, noon('2026-10-24')),
    )
    assert.equal(applyExcerpt.includes('Apply online'), false)
    assert.match(applyExcerpt, /Applications closed/)
  })
})

describe('homepage selection', () => {
  const jobs = [
    { slug: 'old-fixed', date: '2026-09-08', deadline: '2026-09-23' },
    { slug: 'rolling-new', date: '2026-09-08', deadline: 'Rolling basis' },
    { slug: 'future', date: '2026-10-21', deadline: '2026-11-30' },
    { slug: 'rolling-old', date: '2026-06-25', deadline: 'Rolling basis' },
    { slug: 'unannounced', date: '2026-08-01' },
  ]

  it('drops expired roles and keeps the newest open roles', () => {
    const selected = selectOpenJobs(jobs, noon('2026-10-24'), 2).map(job => job.slug)
    assert.deepEqual(selected, ['future', 'rolling-new'])
  })

  it('keeps an unannounced deadline in the open list', () => {
    const selected = selectOpenJobs(jobs, noon('2026-10-24'), 10).map(job => job.slug)
    assert.equal(selected.includes('unannounced'), true)
    assert.equal(selected.includes('old-fixed'), false)
  })
})

describe('job card facts', () => {
  it('shortens a repeated Ghana suffix and keeps the full title available to the caller', () => {
    const title = 'Showroom Representative at Neuce — Ghana'
    assert.equal(toCardTitle(title, 'Ghana'), 'Showroom Representative at Neuce')
    assert.equal(toCardTitle(title, 'Accra, Ghana'), 'Showroom Representative at Neuce')
    assert.equal(toCardTitle('Lecturer — Materials Science & Engineering at Academic City University, Accra', 'Accra, Ghana'), 'Lecturer — Materials Science & Engineering at Academic City University, Accra')
  })

  it('reads type, full-time, and eligibility only from supplied content', () => {
    assert.equal(opportunityType('FAO Paid Internship Program', ['internships']), 'Internship')
    assert.equal(opportunityType('Ghana Armed Forces 2026/2027 Recruitment', ['recruitment']), 'Recruitment')
    assert.equal(opportunityType('National Service Personnel — Procurement', []), 'National Service')
    assert.equal(opportunityType('Customer Service Executive', ['jobs']), 'Job')
    assert.equal(isConfirmedFullTime('This is a full-time opportunity.'), true)
    assert.equal(isConfirmedFullTime('Hiring full-time and part-time lecturers.'), false)
    assert.deepEqual(
      extractEligibility('Intro\n\n## Eligibility Requirements\n\n- Must live nearby\n- Previous experience is required\n\n## Benefits\n\n- Salary'),
      ['Must live nearby', 'Previous experience is required'],
    )
  })

  it('uses the official-site label only for a direct organisation link', () => {
    assert.equal(isOfficialApplicationUrl('https://apply.mil.gh'), true)
    assert.equal(isOfficialApplicationUrl('https://www.fao.org/employment/internships/en/'), true)
    assert.equal(isOfficialApplicationUrl('https://www.jobsinghana.com/job-ads/example'), false)
    assert.equal(isOfficialApplicationUrl('mailto:career@acity.edu.gh'), false)
    assert.equal(isOfficialApplicationUrl('https://wa.me/233544962561'), false)
    assert.equal(applicationLinkLabel('https://www.fao.org/employment/internships/en/', false), 'Apply on official site')
    assert.equal(applicationLinkLabel('https://www.jobsinghana.com/job-ads/example', false), 'View application link')
    assert.equal(applicationLinkLabel('https://apply.mil.gh', true), 'View official listing')
  })

  it('builds a card without inventing a missing benefit icon fact', () => {
    const card = buildJobCard({
      slug: 'example',
      title: 'Country Ambassador — International Leadership Competition 2026',
      date: '2026-05-29',
      deadline: '2026-12-31',
      location: 'Ghana (Remote/Flexible)',
      benefit: 'Global recognition certificate + featured on ILC platforms',
      applyUrl: 'https://forms.gle/example',
      tags: ['ambassador'],
      content: '## Eligibility Requirements\n\n- Passion for leadership\n',
    })
    assert.equal(card.benefitIsCompensation, false)
    assert.equal(card.officialApplication, false)
    assert.equal(card.postedLabel, 'Posted 29 May 2026')
    assert.deepEqual(card.eligibility, ['Passion for leadership'])
    assert.equal(card.href, '/jobs/example/')
  })
})

describe('card media and labels', () => {
  it('keeps poster covers contained and skips generated social images', () => {
    assert.deepEqual(resolveCardMedia('/images/posts/jlmcf-ghana-2027.jpg', 'Jim Leech Fellowship'), {
      kind: 'image',
      src: '/images/posts/jlmcf-ghana-2027.jpg',
      alt: '',
      fit: 'contain',
      position: 'center',
      padded: false,
    })
    assert.deepEqual(resolveCardMedia('/logo.png', 'Future Finder'), {
      kind: 'image',
      src: '/logo.png',
      alt: '',
      fit: 'contain',
      position: 'center',
      padded: true,
    })
    assert.deepEqual(resolveCardMedia({
      title: 'Campus visit',
      thumbnail: '/images/photos/visit.jpg',
      poster: '/images/posts/visit-poster.jpg',
      thumbnailType: 'photo',
      thumbnailPosition: 'left top',
      imageAlt: 'Students outside the campus gate',
    }), {
      kind: 'image',
      src: '/images/photos/visit.jpg',
      alt: 'Students outside the campus gate',
      fit: 'cover',
      position: 'left top',
      padded: false,
    })
    assert.equal(resolveCardMedia({
      title: 'Wide poster',
      coverImage: '/images/posts/udga-2027-bangkok.jpg',
      thumbnailPosition: 'left top',
    }).kind === 'image' && resolveCardMedia({
      title: 'Wide poster',
      coverImage: '/images/posts/udga-2027-bangkok.jpg',
    }).fit, 'contain')
    assert.deepEqual(resolveCardMedia('/og/jobs-fao-paid-internship-programme-2027.png', 'FAO'), { kind: 'fallback' })
    assert.deepEqual(resolveCardMedia(undefined, 'FAO'), { kind: 'fallback' })
    assert.equal(resolveCardMedia({ title: 'Missing file', thumbnail: '   ', coverImage: '' }).kind, 'fallback')
  })

  it('labels fellowships from the title and keeps summaries short', () => {
    assert.equal(cardTypeLabel({ title: 'EPFL Master Excellence Fellowship', category: 'scholarships' }), 'Fellowship')
    assert.equal(cardTypeLabel({ title: 'Chevening Scholarship', category: 'scholarships' }), 'Scholarship')
    assert.equal(cardTypeLabel({ title: 'GrowHer Agribusiness Accelerator Program', category: 'entrepreneurship' }), 'Accelerator')
    assert.equal(cardTypeLabel({ title: 'Spain vs Portugal — World Cup 2026 Preview', category: 'growth-mindset' }), 'Article')
    assert.equal(cardTypeLabel({ title: 'Global South Index Buildathon', tags: ['hackathon'], category: 'entrepreneurship' }), 'Buildathon')
    assert.equal(cardTypeLabel({ title: 'AutoPadi Launch Event', tags: ['event'], category: 'entrepreneurship' }), 'Event')
    const sparse = opportunityCardFromPost({
      slug: 'example',
      category: 'study-abroad',
      title: 'Example Program',
      benefit: '   ',
    }, new Date('2026-10-24T12:00:00Z'))
    assert.equal(sparse.organization, undefined)
    assert.equal(sparse.compensation, undefined)
    const training = opportunityCardFromPost({
      slug: 'training',
      category: 'entrepreneurship',
      title: 'Example Fellowship',
      benefit: 'Coaching and a founder network',
    }, new Date('2026-10-24T12:00:00Z'))
    assert.equal(training.compensation, undefined)
    assert.equal(training.typeLabel, 'Fellowship')
    assert.equal(sparse.eligibility, undefined)
    assert.equal(sparse.deadline, undefined)
    assert.equal(sparse.href, '/study-abroad/example/')
    const paid = opportunityCardFromJob(buildJobCard({
      slug: 'paid',
      title: 'Paid Internship',
      location: 'Accra',
      benefit: 'Monthly stipend',
      content: '## Eligibility\n\n- Degree required\n',
    }), new Date('2026-10-24T12:00:00Z'))
    assert.equal(paid.compensation, 'Monthly stipend')
    assert.equal(paid.eligibility, 'Degree required')
    assert.equal(paid.organization, undefined)
    assert.equal(cardSummary(['Must hold a degree', 'Second point'], 'Long excerpt'), 'Must hold a degree')
    assert.equal(cardSummary([], ' One sentence summary. '), 'One sentence summary.')
  })
})

describe('detail page facts', () => {
  const now = new Date('2026-10-25T12:00:00Z')

  it('splits a role title without inventing an organisation', () => {
    assert.deepEqual(
      opportunityHeading('Filling Station Manager at JD Link Oil Company Limited — Ghana'),
      { heading: 'Filling Station Manager', organization: 'JD Link Oil Company Limited' },
    )
    assert.deepEqual(
      opportunityHeading('Ghana Armed Forces 2026/2027 Recruitment — Officer Cadets and Career Officers'),
      { heading: 'Ghana Armed Forces 2026/2027 Recruitment — Officer Cadets and Career Officers' },
    )
  })

  it('shows compensation only when the text states pay or funding', () => {
    assert.equal(summarySupport('Management role in petroleum and allied products sector', 'jobs'), undefined)
    assert.deepEqual(summarySupport('Monthly stipend, health insurance coverage, and professional mentorship', 'jobs'), {
      label: 'Compensation',
      value: 'Monthly stipend, health insurance coverage, and professional mentorship',
    })
    assert.equal(summarySupport('Full tuition, living allowance, travel costs, and a fully funded Master\'s degree in the UK', 'scholarships')?.label, 'Funding')
  })

  it('reads one exact email subject and encodes it into the mailto link', () => {
    const content = [
      '3. Use **"Filling Station Manager"** as the subject line of your email',
      '- Use the exact email subject line specified: **"Filling Station Manager"** — incorrect subject lines may cause your application to be missed.',
    ].join('\n')
    assert.equal(extractApplicationSubject(content), 'Filling Station Manager')
    assert.equal(extractApplicationSubject('Use **"One role"** as the subject\nUse **"Another role"** as the subject'), undefined)
    assert.equal(extractApplicationSubject('Send a CV.'), undefined)
    assert.equal(mailtoAddress('mailto:recruitment@jdlinkoil.com'), 'recruitment@jdlinkoil.com')
    assert.equal(
      withMailtoSubject('mailto:recruitment@jdlinkoil.com', 'Filling Station Manager'),
      'mailto:recruitment@jdlinkoil.com?subject=Filling%20Station%20Manager',
    )
  })

  it('recommends open listings that share a useful attribute and skips closed ones', () => {
    const current = {
      slug: 'jd-link',
      title: 'Filling Station Manager at JD Link Oil Company Limited — Ghana',
      category: 'jobs',
      location: 'Ghana',
      tags: ['filling station', 'petroleum', 'jobs'],
      deadline: 'Rolling basis',
      date: '2026-09-08',
    }
    const related = selectRelated(current, [
      current,
      {
        slug: 'gaf',
        title: 'Ghana Armed Forces 2026/2027 Recruitment — Officer Cadets',
        category: 'jobs',
        location: 'Ghana',
        tags: ['recruitment'],
        deadline: '2026-09-23',
        date: '2026-09-08',
      },
      {
        slug: 'retail',
        title: 'Retail Supervisor at Shell Ghana',
        category: 'jobs',
        location: 'Accra, Ghana',
        tags: ['retail', 'petroleum'],
        deadline: '2026-12-01',
        date: '2026-10-01',
      },
      {
        slug: 'kenya-analyst',
        title: 'Research Analyst',
        category: 'jobs',
        location: 'Nairobi, Kenya',
        tags: ['research'],
        deadline: '2026-12-15',
        date: '2026-10-02',
      },
    ], now, 3)
    assert.deepEqual(related.map(item => item.slug), ['retail'])
  })
})

describe('detail images', () => {
  it('uses a poster at its real size and ignores a thumbnail-only listing', () => {
    const measured = readPublicImageSize('/images/posts/udga-2027-bangkok.jpg')
    assert.deepEqual(measured, { width: 2160, height: 820 })
    assert.deepEqual(resolveDetailImage({
      title: 'United Diplomats Global Assembly 2027',
      poster: '/images/posts/udga-2027-bangkok.jpg',
      thumbnailType: 'poster',
    }, measured), {
      src: '/images/posts/udga-2027-bangkok.jpg',
      alt: 'Poster for United Diplomats Global Assembly 2027',
      width: 2160,
      height: 820,
      kind: 'poster',
    })
    assert.equal(resolveDetailImage({
      title: 'Card only',
      thumbnail: '/images/posts/jlmcf-ghana-2027.jpg',
    }, { width: 2576, height: 1449 }), null)
    assert.equal(resolveDetailImage({
      title: 'Generated title card',
      coverImage: '/og/jobs-example.png',
    }, { width: 1200, height: 630 }), null)
    assert.equal(resolveDetailImage({
      title: 'Missing file',
      poster: '/images/posts/missing.jpg',
    }, null), null)
    assert.equal(readPublicImageSize('/images/posts/missing.jpg'), null)
  })

  it('keeps a portrait size and marks an illustrative photograph', () => {
    const image = resolveDetailImage({
      title: 'Campus visit',
      poster: '/images/photos/visit.jpg',
      thumbnail: '/images/photos/visit.jpg',
      thumbnailType: 'photo',
      imageAlt: 'Students outside the campus gate',
      imageCaption: 'The host campus.',
      imageCredit: 'Host university',
      illustrative: true,
    }, { width: 600, height: 1400 })
    assert.equal(image?.width, 600)
    assert.equal(image?.height, 1400)
    assert.equal(image?.kind, 'photo')
    assert.equal(image?.alt, 'Students outside the campus gate')
    assert.equal(image?.illustrative, true)
    assert.equal(image?.caption, 'The host campus.')
    assert.equal(image?.credit, 'Host university')
  })

  it('reads the landscape fellowship poster from its file', () => {
    const measured = readPublicImageSize('/images/posts/jlmcf-ghana-2027.jpg')
    assert.ok(measured)
    assert.equal(measured.width > measured.height, true)
    const image = resolveDetailImage({
      title: 'Jim Leech Mastercard Foundation Fellowship 2027 — Ghana Chapter (Applications Open)',
      poster: '/images/posts/jlmcf-ghana-2027.jpg',
      coverImage: '/images/posts/jlmcf-ghana-2027.jpg',
      thumbnailType: 'poster',
    }, measured)
    assert.equal(image?.kind, 'poster')
    assert.equal(image?.width, measured.width)
    assert.equal(image?.height, measured.height)
    const detail = resolveDetailImage({
      title: 'Separate files',
      coverImage: '/images/posts/udga-2027-bangkok.jpg',
      poster: '/images/posts/jlmcf-ghana-2027.jpg',
      thumbnail: '/images/posts/jlmcf-ghana-2027.jpg',
    }, measured)
    assert.equal(detail?.src, '/images/posts/udga-2027-bangkok.jpg')
  })
})

describe('closed article copy', () => {
  it('removes apply-now lines and rewrites open-application claims', () => {
    const html = [
      '<p>The fund is inviting applications for this programme.</p>',
      '<p><strong>Deadline: 2 September 2026. Apply now at the link above.</strong></p>',
      '<p>Applications close 23 September 2026 and the portal opened 4 September 2026.</p>',
    ].join('')
    const result = neutralizeClosedHtml(html)
    assert.equal(result.includes('Apply now'), false)
    assert.equal(result.includes('inviting applications'), false)
    assert.match(result, /invited applications/)
    assert.match(result, /Applications closed 23 September 2026/)
  })
})
