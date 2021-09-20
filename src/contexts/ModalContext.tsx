import { createContext, useContext, ReactElement } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { Modal } from 'components'
import { useModal } from 'hooks'
import {
  ModalsContent,
  OpenCustomModalType,
  OpenModalByIdType,
  CloseModalType,
} from 'types'

const ModalContext = createContext(null)

interface UseModalContextHook {
  openCustomModal: OpenCustomModalType
  openModalById: OpenModalByIdType
  closeModal: CloseModalType
}

export const useModalContext = (): UseModalContextHook =>
  useContext(ModalContext)

interface ModalContextProviderProps {
  children: ReactElement
  modalsContent?: ModalsContent
}

export const ModalContextProvider = ({
  children,
  modalsContent,
}: ModalContextProviderProps): ReactElement => {
  const { openCustomModal, openModalById, closeModal, modalContent } =
    useModal(modalsContent)
  const router: NextRouter = useRouter()

  return (
    <ModalContext.Provider
      value={{ openCustomModal, openModalById, closeModal, modalContent }}
    >
      {children}
      <Modal
        modalContent={modalContent}
        closeModal={closeModal}
        router={router}
      />
    </ModalContext.Provider>
  )
}
