import { SOCIALS } from 'consts'

export type SocialsType = typeof SOCIALS[keyof typeof SOCIALS]

export interface Social {
  icon: SocialsType
  url: string
  isRound?: boolean
}
