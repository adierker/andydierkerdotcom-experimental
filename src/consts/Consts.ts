import {LinkedIn, Instagram, Github} from 'icons'

export const CLOSEMODAL = 'close'

export const LINKS = {
  MODAL: 'modal',
  EXTERNAL: 'external',
  INTERNAL: 'internal'
}

export const SOCIALS = {
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  INSTAGRAM: 'instagram'
}

export const SOCIALS_MAP = {
  [SOCIALS.GITHUB]: Github,
  [SOCIALS.LINKEDIN]: LinkedIn,
  [SOCIALS.INSTAGRAM]: Instagram
}

export const SITEPATHS = {
  HOME: '/',
  RECIPES: '/recipes',
  PHOTOS: '/photos',
}

export const ENDPOINTS = {
  RECIPES: 'api/recipes'
}

// firestore database collections
export const COLLECTIONS = {
  PAGES: 'pages',
  RECIPES: 'recipes',
  MODALS: 'modals'
}