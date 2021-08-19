import {useState, useCallback} from 'react'

import {ModalTypes} from 'components/Modal'

export const useModal = () => {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null)

  const openModal = useCallback((modal: ModalTypes) => setCurrentModal(modal), [setCurrentModal])
  const closeModal = useCallback(() => setCurrentModal(null), [setCurrentModal])

  return {
    openModal,
    closeModal,
    currentModal
  }
}