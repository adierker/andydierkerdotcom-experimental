import {ComponentProps} from 'react'

import {MODALS} from 'consts'
import {Button} from 'components'

type ModalTypesKeys = keyof typeof MODALS
type ModalTypesValues = typeof MODALS[ModalTypesKeys]
export type ModalTypes = ModalTypesValues | null

export interface ModalContent {
  title: string
  texts: string[]
  buttons: ComponentProps<typeof Button>[]
}

export interface HomeContent {
  heading: string
  subheading: string
  links: {
    text: string
    onClick: () => void
    classes: string
  }[]
}