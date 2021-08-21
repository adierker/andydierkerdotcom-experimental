import {ComponentProps, ReactNode} from 'react'

import {MODALS} from 'consts'
import {Button} from 'components'

type ModalTypeKeys = keyof typeof MODALS
type ModalTypeValues = typeof MODALS[ModalTypeKeys]
export type ModalType = ModalTypeValues | null

export type OpenModalType = (x: ModalType) => void
export type CloseModalType = () => void

export type ButtonPropsType = ComponentProps<typeof Button>

export interface ModalContent {
  title: string
  content: ReactNode
  buttons: ButtonPropsType[]
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