import {Link, Social} from 'types'

export interface HomePageContent {
  heading: string
  subheading: string
  links: {
    text: string
    link: Link
  }[],
  socials: Social[]
}