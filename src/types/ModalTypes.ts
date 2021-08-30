import {MODALS} from 'consts'
import {ButtonPropsType} from 'types'

export type ModalType = typeof MODALS[keyof typeof MODALS] | null
export type OpenModalType = (x: ModalType) => void
export type CloseModalType = () => void

export interface ModalContent {
  title: string
  content: string[]
  buttons: ButtonPropsType[]
}