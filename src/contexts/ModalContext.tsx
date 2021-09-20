import { createContext, useContext, ReactElement } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { Modal } from 'components'
import { useModal } from 'hooks'
import { ModalsContent, OpenModalType, CloseModalType } from 'types'

const ModalContext = createContext(null)

interface UseModalContextHook {
  openModal: OpenModalType
  closeModal: CloseModalType
}

export const useModalContext = (): UseModalContextHook =>
  useContext(ModalContext)

interface ModalContextProviderProps {
  children: ReactElement
  modalsContent: ModalsContent
}

export const ModalContextProvider = ({
  children,
  modalsContent,
}: ModalContextProviderProps): ReactElement => {
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
