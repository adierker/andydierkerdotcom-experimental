import {LinkedIn, Instagram, Github} from 'icons'

export interface HomePageContent {
  heading: string
  subheading: string
  links: {
    text: string
    onClick: () => void
    className: string
  }[],
  socials: {
    icon: typeof LinkedIn | typeof Instagram | typeof Github
    className: string
    url: string
  }[]
}