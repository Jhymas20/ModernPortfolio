export const MOBILE_SCROLL_SECTION_IDS = {
  home: 'mobile-section-home',
  me: 'mobile-section-me',
  projects: 'mobile-section-projects',
  skills: 'mobile-section-skills',
  more: 'mobile-section-more',
  contact: 'mobile-section-contact',
} as const;

export const MOBILE_SCROLL_SECTION_BY_ROUTE = {
  '/me': MOBILE_SCROLL_SECTION_IDS.me,
  '/projects': MOBILE_SCROLL_SECTION_IDS.projects,
  '/skills': MOBILE_SCROLL_SECTION_IDS.skills,
  '/more': MOBILE_SCROLL_SECTION_IDS.more,
  '/contact': MOBILE_SCROLL_SECTION_IDS.contact,
} as const;

