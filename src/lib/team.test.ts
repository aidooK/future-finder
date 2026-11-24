import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  memberPortrait,
  profileInitials,
  profileLines,
  profileRoleLabel,
  publicProfileLinks,
  marqueeCopyCount,
  publishedTeamProfiles,
  teamHeading,
  teamProfiles,
  teamStripSpeed,
  wrapMarqueeOffset,
  type TeamProfile,
} from './team.ts'

function profile(overrides: Partial<TeamProfile> = {}): TeamProfile {
  return {
    id: 'person',
    name: 'Ama Mensah',
    founder: true,
    role: 'Editor',
    order: 1,
    published: true,
    ...overrides,
  }
}

describe('published team profiles', () => {
  it('keeps published profiles that have a name and role, in display order', () => {
    const profiles = publishedTeamProfiles([
      profile({ id: 'b', name: 'Kwame Boateng', order: 2 }),
      profile({ id: 'a', name: 'Ama Mensah', order: 1 }),
      profile({ id: 'draft', published: false }),
      profile({ id: 'blank-name', name: '  ' }),
      profile({ id: 'blank-role', role: ' ' }),
    ])

    assert.deepEqual(profiles.map(item => item.id), ['a', 'b'])
  })

  it('uses the founders heading only when every published profile is a founder', () => {
    assert.equal(teamHeading([profile()]), 'Meet the minds behind Future Finder')
    assert.equal(teamHeading([profile(), profile({ id: 'staff', founder: false, role: 'Editor' })]), 'Our Team')
    assert.equal(teamHeading([]), 'Our Team')
  })

  it('shows founder separately from a confirmed operational role', () => {
    assert.deepEqual(profileLines(profile({ role: 'Editor' })), { designation: 'Founder', role: 'Editor' })
    assert.deepEqual(profileLines(profile({ role: 'Founder' })), { designation: 'Founder', role: '' })
    assert.deepEqual(profileLines(profile({ founder: false, role: 'Editor' })), { designation: '', role: 'Editor' })
    assert.equal(profileRoleLabel(profile({ role: 'Editor' })), 'Founder, Editor')
  })

  it('keeps named web profile links and drops empty or private destinations', () => {
    const links = publicProfileLinks([
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/example' },
      { label: 'Email', href: 'mailto:person@example.com' },
      { label: '', href: 'https://example.com' },
      { label: 'Notes', href: 'javascript:alert(1)' },
    ])

    assert.deepEqual(links, [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/example' }])
  })

  it('builds initials from the first and last name', () => {
    assert.equal(profileInitials('Ama Mensah'), 'AM')
    assert.equal(profileInitials('Ama'), 'AM')
  })

  it('loops the visible strip without adding profile records', () => {
    assert.ok(teamStripSpeed >= 20 && teamStripSpeed <= 30)
    assert.equal(marqueeCopyCount(1200, 300), 5)
    assert.equal(wrapMarqueeOffset(-300, 300), 0)
    assert.equal(wrapMarqueeOffset(-301, 300), -1)
    assert.equal(wrapMarqueeOffset(12, 300), -288)
  })

  it('publishes each member from their own portrait file', () => {
    const published = publishedTeamProfiles()
    assert.deepEqual(published.map(item => [item.name, profileRoleLabel(item)]), [
      ['Solomon Aidoo', 'Founder'],
      ['Abigail Odukuwaa Sackey', 'Community Moderator'],
      ['Antaniba Marvelous', 'Community Moderator Officer'],
      ['Blessed Sillaniin Anaah', 'Graphics Designer'],
      ['Emmanuel Aidoo', 'Web Developer'],
      ['Gideo Agli', 'Administrator'],
      ['Olivia Kafui Kwamegah', 'Social Media Lead'],
      ['Rahmatu', 'Social Media Lead'],
      ['Theo', 'Verification Member'],
    ])
    assert.equal(teamProfiles.length, published.length)
    assert.ok(published.every(item => !item.example))
    const sources = published.map(item => memberPortrait(item)?.src)
    assert.equal(new Set(sources).size, sources.length)
    assert.ok(sources.every(src => src?.startsWith('/images/Members/')))
    assert.equal(teamHeading(published), 'Our Team')
  })

  it('shows a portrait only when that member has one', () => {
    const ama = profile({
      id: 'ama',
      name: 'Solomon Aidoo',
      portrait: { src: '/images/Members/Emmanuel.jpeg', alt: '  ' },
    })
    const kwesi = profile({ id: 'kwesi', name: 'Kwesi Mensah', portrait: { src: '  ', alt: 'Kwesi' } })

    assert.deepEqual(memberPortrait(ama), {
      src: '/images/Members/Emmanuel.jpeg',
      alt: 'Solomon Aidoo, Founder, Editor',
      focal: undefined,
    })
    assert.equal(memberPortrait(kwesi), null)
    assert.notEqual(memberPortrait(ama)?.src, memberPortrait(profile({
      id: 'other',
      portrait: { src: '/team/other.jpg', alt: 'Other' },
    }))?.src)
  })
})
