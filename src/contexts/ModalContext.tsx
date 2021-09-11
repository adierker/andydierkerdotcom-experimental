import { createContext, useContext } from 'react'
import { useRouter, NextRouter } from 'next/router'

import { Modal } from 'components'
import { useModal } from 'hooks'

const ModalContext = createContext(null)
export const useModalContext = () => useContext(ModalContext)
export const ModalContextProvider = ({ children, modalsContent }) => {
  const { openModal, closeModal, modalContent } = useModal(modalsContent)
  const router: NextRouter = useRouter()

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalContent }}>
      {children}
      <Modal
        modalContent={modalContent}
        closeModal={closeModal}
        router={router}
      />
    </ModalContext.Provider>
  )
}
