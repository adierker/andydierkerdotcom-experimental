import { useState, useCallback } from 'react'

import {
  ModalContent,
  OpenModalType,
  CloseModalType,
  ModalsContent,
} from 'types'

export const useModal = (modalsContent: ModalsContent) => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const closeModal: CloseModalType = useCallback(
    () => setModalContent(null),
    [setModalContent]
  )

  const openModal: OpenModalType = useCallback(
    (modalId: string) => {
      const modalContent = modalsContent.find(
        (content) => content.id === modalId
      )
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
