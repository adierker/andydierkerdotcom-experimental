import {useState, useCallback, useEffect, ComponentProps} from 'react'

import {Button} from 'components'
import {MODALS} from 'consts'
import {ModalTypes} from 'types'

export interface ModalContent {
  title: string
  texts: string[]
  buttons: ComponentProps<typeof Button>[]
}

export const useModal = () => {
  const [currentModal, setCurrentModal] = useState<ModalContent | null>(null)

  const closeModal = useCallback(() => setCurrentModal(null), [setCurrentModal])

  const openModal = useCallback((modalType: ModalTypes) => {
    switch (modalType) {
      case MODALS.ABOUT:
        setCurrentModal({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      case MODALS.CONTACT:
        setCurrentModal({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      case MODALS.PROJECTS:
        setCurrentModal({
          title: 'about',
          texts: ['hi', 'another'],
          buttons: [
            {text: 'yo', onClick: closeModal}
          ]
        })
        break
      default:
        setCurrentModal(null)
    }
  }, [setCurrentModal])



  return {
    openModal,
    closeModal,
    currentModal
  }
}