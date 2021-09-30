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
  ADMIN: '/admin',
  ADD_RECIPE: '/admin/recipes/add',
  EDIT_RECIPE: '/admin/recipes/edit',
}

export const ENDPOINTS = {
  ADD_RECIPE: '/api/add-recipe',
  EDIT_RECIPE: '/api/edit-recipe',
}

// firestore database collections
export const DB_COLLECTIONS = {
  PAGES: 'pages',
  RECIPES: 'recipes', // dynamic
  MODALS: 'modals',
}

// firestore database documents in DE_COLLECTIONS.PAGES
export const DB_PAGES = {
  HOME: 'home',
  RECIPES: 'recipes',
  EDIT_RECIPES: 'edit-recipes',
}

// firestore database documents in DE_COLLECTIONS.MODALS
export const DB_MODALS = {
  ABOUT: 'about',
  CONTACT: 'contact',
  PROJECTS: 'projects',
}

// firestore database documents, by collection
export const DOCUMENTS_BY_COLLECTION = {
  [DB_COLLECTIONS.PAGES]: {
    DB_PAGES,
    DB_MODALS,
  },
}

export const REGEX = {
  NUMBERS: /^[0-9]*$/,
  NUMBERS_AND_DECIMALS: /^[0-9]\d*(\.\d+)?$/,
  LOWERCASE_AND_NUMBERS_AND_DASHES: /^([a-z0-9-]+)$/,
  URL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
}
