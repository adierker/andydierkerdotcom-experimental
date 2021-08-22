import {useState, useCallback} from 'react'
import { useRouter, NextRouter } from 'next/router'

import {
  ModalType,
  ModalContent,
  OpenModalType,
  CloseModalType
} from 'types'
import {getModalContent} from 'content'

export const useModal = () => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const router: NextRouter = useRouter()

  const closeModal: CloseModalType = useCallback(() => setModalContent(null), [setModalContent])

  const openModal: OpenModalType = useCallback((modalType: ModalType) => {
    const modalContent = getModalContent(modalType, closeModal, router)
    setModalContent(modalContent)
  }, [setModalContent])

  return {
    openModal,
    closeModal,
    modalContent
  }
}