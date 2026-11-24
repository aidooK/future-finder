// Single source of truth for the FF x PMI live web conference.
// Used by the /webinar page, the countdown, the site-wide banner, share links and structured data.
export const EVENT = {
  name: "Poverty is a Behavior: Why Schools Don't Teach You About Money",
  short: 'Poverty is a Behavior',
  subtitle: "Why Schools Don't Teach You About Money",
  // 7:00 PM GMT (Ghana time) on Wednesday 25 November 2026
  startISO: '2026-11-25T19:00:00Z',
  // End time is only used for the calendar block and the "live" window. Adjust if the run time changes.
  endISO: '2026-11-25T21:00:00Z',
  url: 'https://futurefinder.blog/webinar/',
  flyer: '/images/events/poverty-is-a-behavior-flyer.jpg',
  ffVideoId: 'oE-M43hslaU',
  pmiVideoId: 'YgmWDWJsA8w',
  ffChannelId: 'UCEv5mvhnKe6qx7IfbKeEqvQ',
  pmiChannelId: 'UCKkCVFDj42HYwvX0hA2wSmg',
  speaker: { name: 'Solomon Aidoo Taufiq', title: 'Entrepreneurship Coach | Systems & Data Professional' },
}

export const subscribeUrl = (channelId: string) =>
  `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`

export const shareText =
  `Join the live web conference "${EVENT.name}" on Wed 25 Nov, 7:00 PM GMT, live on YouTube. Free to watch.`
