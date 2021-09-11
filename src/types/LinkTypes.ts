import { LINKS } from 'consts'

export type LinksType = typeof LINKS[keyof typeof LINKS]
export interface Link {
  type: LinksType
  linkTo: string
}
