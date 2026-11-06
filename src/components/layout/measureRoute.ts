import type { RoverRouteInput } from './roverRoute'

// Crossovers go in measured whitespace. The vertical legs can use a real
// column gap on wide screens or the page gutter when the columns stack.
export function measureRoute(main: HTMLElement, roverWidth: number) {
  const frame = main.getBoundingClientRect()
  const landmarks = {
    hero: '.hero-intro',
    consoleBox: '#tracking-demo',
    heading: '#projects-heading',
    first: '.project-feature:first-child',
    second: '.project-feature:nth-child(2)',
    features: '.project-features',
    catalog: '.project-catalog',
    experience: '#experience',
    timeline: '.experience-intro',
    records: '.history-list',
    role: '.history-heading',
    roleBody: '.history-body',
    about: '#about',
    bio: '.about-layout > div:first-child',
    education: '.education-record',
    skills: '.skills-layout',
    skillsHeading: '#skills-title',
    skillsBody: '.skills-layout > div',
    contact: '#contact',
    contactIntro: '.contact-layout > div:first-child',
    contactLinks: '.contact-links',
  }
  type Landmark = keyof typeof landmarks
  type Box = { left: number; right: number; top: number; bottom: number }
  const boxes = {} as Record<Landmark, Box>
  for (const key of Object.keys(landmarks) as Landmark[]) {
    const element = main.querySelector(landmarks[key])
    if (!element) return null
    const rect = element.getBoundingClientRect()
    boxes[key] = { left: rect.left - frame.left, right: rect.right - frame.left,
      top: rect.top - frame.top, bottom: rect.bottom - frame.top }
  }
  const { hero, consoleBox, heading, first, second, features, catalog, experience, timeline,
    records, role, roleBody, about, bio, education, skills, skillsHeading, skillsBody,
    contact, contactIntro, contactLinks } = boxes
  const inset = hero.left <= 32 ? hero.left / 2 : hero.left - Math.min(48, hero.left / 2)
  const left = inset
  const right = frame.width - inset
  const bands: RoverRouteInput['bands'] = []
  // Let a generous margin meander. In tight grid gaps keep the path centered.
  const outerDrift = Math.max(0, Math.min(30, inset - roverWidth / 2 - 3, hero.left - inset - roverWidth / 2 - 3))
  const gapDrift = (space: number) => Math.max(0, Math.min(18, (space - roverWidth) / 2 - 4))
  function cross(top: number, bottom: number, nextX: number, nextDrift = outerDrift) {
    // Leave room at both ends for the rover's body and the section content.
    if (bottom - top >= 24) {
      const pad = Math.min(roverWidth / 2 + 2, (bottom - top) * .41)
      bands.push({ top: top + pad, bottom: bottom - pad, nextX, nextDrift })
    }
  }

  const startY = Math.max(roverWidth / 2 + 2, Math.min(22, Math.min(hero.top, consoleBox.top) - 25))
  const twoHeroColumns = hero.right < consoleBox.left
  cross(startY, Math.min(hero.top, consoleBox.top), twoHeroColumns ? (hero.right + consoleBox.left) / 2 : right,
    twoHeroColumns ? gapDrift(consoleBox.left - hero.right) : outerDrift)
  if (!twoHeroColumns) cross(hero.bottom, consoleBox.top, left)

  const sideBySide = first.right < second.left
  cross(Math.max(hero.bottom, consoleBox.bottom), heading.top, right)
  if (sideBySide) {
    cross(heading.bottom, first.top, (first.right + second.left) / 2, gapDrift(second.left - first.right))
  } else {
    cross(first.bottom, second.top, left)
  }
  cross(features.bottom, catalog.top, sideBySide ? left : right)

  cross(experience.top, timeline.top, sideBySide ? right : left)
  cross(timeline.bottom, records.top, role.right < roleBody.left ? (role.right + roleBody.left) / 2 : right,
    role.right < roleBody.left ? gapDrift(roleBody.left - role.right) : outerDrift)
  const aboutGap = bio.right < education.left ? (bio.right + education.left) / 2 : left
  cross(about.top, Math.min(bio.top, education.top), aboutGap,
    bio.right < education.left ? gapDrift(education.left - bio.right) : outerDrift)

  const skillsGap = skillsHeading.right < skillsBody.left ? (skillsHeading.right + skillsBody.left) / 2 : right
  cross(Math.max(bio.bottom, education.bottom), skills.top, skillsGap,
    skillsHeading.right < skillsBody.left ? gapDrift(skillsBody.left - skillsHeading.right) : outerDrift)
  cross(contact.top, Math.min(contactIntro.top, contactLinks.top), skillsGap < frame.width / 2 ? right : left)
  const endY = frame.height - 21
  const endX = frame.width * .69
  cross(Math.max(contactIntro.bottom, contactLinks.bottom), endY, endX)

  return {
    width: frame.width, height: frame.height, startY, endY, inset,
    startX: frame.width * (twoHeroColumns ? .22 : .47), endX, bands,
    viewportHeight: window.innerHeight, mainTop: frame.top + window.scrollY,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    darkStart: experience.top / frame.height, darkEnd: experience.bottom / frame.height,
    contactStart: contact.top / frame.height,
  }
}
