import { LinkedIn, Instagram, Github } from 'icons'

export const CLOSEMODAL = 'close'

export const LINKS = {
  MODAL: 'modal',
  EXTERNAL: 'external',
  INTERNAL: 'internal',
}

export const SOCIALS = {
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  INSTAGRAM: 'instagram',
}

export const SOCIALS_MAP = {
  [SOCIALS.GITHUB]: Github,
  [SOCIALS.LINKEDIN]: LinkedIn,
  [SOCIALS.INSTAGRAM]: Instagram,
}

export const SITEPATHS = {
  HOME: '/',
  RECIPES: '/recipes',
  PHOTOS: '/photos',
}

export const ENDPOINTS = {
  RECIPES: 'api/recipes',
}

// firestore database collections
export const COLLECTIONS = {
  PAGES: 'pages',
  RECIPES: 'recipes',
  MODALS: 'modals',
}

export const REGEX = {
  EMPTY_STRING: /^$/,
  NUMBERS_AND_DECIMALS: /^[0-9]\d*(\.\d+)?$/,
  LOWERCASE_AND_NUMBERS_AND_DASHES: /^([a-z0-9-]+)$/,
  URL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
}
