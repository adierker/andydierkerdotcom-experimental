import {Link} from 'types'

export type OpenModalType = (x: string) => void
export type CloseModalType = () => void

export interface ModalContent {
  id: string
  title: string
  content: string[]
  buttons: {
    text: string
    link: Link
  }[]
}

export type ModalsContent = ModalContent[]