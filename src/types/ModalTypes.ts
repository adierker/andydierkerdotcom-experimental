import {ReactNode} from 'react'

import {MODALS} from 'consts'
import {ButtonPropsType} from 'types'

type ModalTypeKeys = keyof typeof MODALS
type ModalTypeValues = typeof MODALS[ModalTypeKeys]
export type ModalType = ModalTypeValues | null

export type OpenModalType = (x: ModalType) => void
export type CloseModalType = () => void

export interface ModalContent {
  title: string
  content: ReactNode
  buttons: ButtonPropsType[]
}