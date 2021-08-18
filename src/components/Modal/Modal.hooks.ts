import {useState, useCallback} from 'react'

const MODALS = {
  ABOUT: 'ABOUT',
  CONTACT: 'CONTACT',
  PROJECTS: 'PROJECTS'
}

type ModalKeys = keyof typeof MODALS
type ModalValues = typeof MODALS[ModalKeys]
export type ModalTypes = ModalValues | null

const useModal = () => {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null)

  const openModal = useCallback((modal: ModalTypes) => setCurrentModal(modal), [setCurrentModal])
  const closeModal = useCallback(() => setCurrentModal(null), [setCurrentModal])

  return {
    openModal,
    closeModal,
    currentModal
  }
}

export {useModal, MODALS}
