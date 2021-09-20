import { Link } from 'types'

interface ButtonTextType {
  text: string
}

interface LinkButton extends ButtonTextType {
  link: Link
  onClick?: never
}

interface OnClickButton extends ButtonTextType {
  link?: never
  onClick?: () => void
}

export type ModalButtonsType = LinkButton | OnClickButton

export interface ModalContent {
  id: string
  title: string
  content: string[]
  buttons: ModalButtonsType[]
}

export type ModalsContent = ModalContent[]

export type OpenCustomModalType = (modalContent: ModalContent) => void
export type OpenModalByIdType = (
  modalId: string,
  customButtons?: ModalButtonsType[]
) => void
export type CloseModalType = () => void
