import { useState, useCallback } from 'react'

import {
  ModalContent,
  OpenModalType,
  CloseModalType,
  ModalsContent,
  ModalButtonsType,
} from 'types'

interface UseModalHook {
  openModal: OpenModalType
  closeModal: CloseModalType
  modalContent: ModalContent | null
}

export const useModal = (modalsContent: ModalsContent): UseModalHook => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const closeModal: CloseModalType = useCallback(
    () => setModalContent(null),
    [setModalContent]
  )

  const openModal: OpenModalType = useCallback(
    (modalId: string, customButtons: ModalButtonsType[] = undefined) => {
      const modalContent = modalsContent.find(
        (content) => content.id === modalId
      )
      // replace the default buttons if customButtons are passed
      if (customButtons && customButtons.length > 0) {
        modalContent.buttons = customButtons
      }
      modalContent
        ? setModalContent(modalContent)
        : console.warn(`No modal found for id: ${modalId}`)
    },
    [setModalContent]
  )

  return {
    openModal,
    closeModal,
    modalContent,
  }
}
