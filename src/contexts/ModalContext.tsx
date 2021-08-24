import {createContext, useContext} from 'react'

import {Modal} from 'components'
import {useModal} from 'hooks'

const ModalContext = createContext(null)
export const useModalContext = () => useContext(ModalContext)
export const ModalContextProvider = ({children}) => {
  const {openModal, closeModal, modalContent} = useModal()

  return (
    <ModalContext.Provider value={{openModal, closeModal, modalContent}}>
      {children}
      <Modal 
        modalContent={modalContent} 
        closeModal={closeModal} 
      />
    </ModalContext.Provider>
  )
}
