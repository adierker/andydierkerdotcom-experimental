import {useState, useCallback, ComponentProps} from 'react'

import {Button} from 'components'
import {MODALS} from 'consts'
import {ModalTypes} from 'types'

export interface ModalContent {
  title: string
  texts: string[]
  buttons: ComponentProps<typeof Button>[]
}

export const useModal = () => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const closeModal = useCallback(() => setModalContent(null), [setModalContent])

  const openModal = useCallback((modalType: ModalTypes) => {
    switch (modalType) {
      case MODALS.ABOUT:
        setModalContent({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      case MODALS.CONTACT:
        setModalContent({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      case MODALS.PROJECTS:
        setModalContent({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      default:
        setModalContent(null)
    }
  }, [setModalContent])



  return {
    openModal,
    closeModal,
    modalContent
  }
}