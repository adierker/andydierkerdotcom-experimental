import {LinkedIn, Instagram, Github} from 'icons'

export const MODALS = {
  ABOUT: 'about',
  CONTACT: 'contact',
  PROJECTS: 'projects',
  CLOSE: 'close'
}

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

export const TAGS = {
  EASY: { tag: 'Easy', emoji: '👌' },
  QUICK: { tag: 'Quick', emoji: '⏩' },
  CHICKEN: { tag: 'Chicken', emoji: '🐓' },
  BEEF: { tag: 'Beef', emoji: '🐄' },
  VEGETARIAN: { tag: 'Vegetarian', emoji: '🌿' },
  HEALTHY: { tag: 'Healthy', emoji: '💪' },
  JUNKY: { tag: 'Junky', emoji: '🍔' },
  FANCY: { tag: 'Fancy', emoji: '🧑‍🍳' },
  SCALABLE: { tag: 'Scalable', emoji: '⚖️' },
}

export const ENDPOINTS = {
  RECIPES: 'api/recipes'
}

// firestore database collections
export const COLLECTIONS = {
  PAGES: 'pages',
  RECIPES: 'recipes'
}