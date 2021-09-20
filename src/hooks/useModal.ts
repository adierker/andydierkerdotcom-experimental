import { useState, useCallback } from 'react'

import {
  ModalContent,
  OpenCustomModalType,
  OpenModalByIdType,
  CloseModalType,
  ModalsContent,
  ModalButtonsType,
} from 'types'

interface UseModalHook {
  openCustomModal: OpenCustomModalType
  openModalById: OpenModalByIdType
  closeModal: CloseModalType
  modalContent: ModalContent | null
}

export const useModal = (modalsContent: ModalsContent): UseModalHook => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const closeModal: CloseModalType = useCallback(
    () => setModalContent(null),
    [setModalContent]
  )

  // use this function to open a modal that is passed in directly
  // we tend to use this when the buttons need to call functions that are within components
  const openCustomModal: OpenCustomModalType = useCallback(
    (modalContent: ModalContent) => {
      setModalContent(modalContent)
    },
    [setModalContent]
  )

  // use this function to open a modal that was loaded into the ModalContext
  // we tend to use this when we fetch the modals from the database and the content/links are static
  // that said, we also offer a way to pass in custom buttons in case we want to fetch the content from the database,
  // while still allowing buttons to call logic from within their components
  const openModalById: OpenModalByIdType = useCallback(
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
    openCustomModal,
    openModalById,
    closeModal,
    modalContent,
  }
}
