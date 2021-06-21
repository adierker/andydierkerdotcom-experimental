import {useState, useCallback, ReactNode} from 'react'
// import { motion } from 'framer-motion' // not using this yet but soon

import {PlainX} from 'icons/Icons'

interface ModalProps {
  title?: string
  children: ReactNode
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen])
  const openModal = useCallback(() => setIsOpen(true), [setIsOpen])
  const toggleModal = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  return {
    isOpen,
    setIsOpen,
    closeModal,
    openModal,
    toggleModal
  }
}

const Modal = ({
  title,
  children
}: ModalProps) => {
  const {isOpen, closeModal} = useModal()

  console.log('isOpen?', isOpen)

  return (
    <div className={`${isOpen ? 'flex' : 'hidden'} container h-full items-center justify-center absolute`}>
      <div className="w-24 h-24 bg-drkr-white">
        <div className="p-4 flex flex-row items-center justify-between">
          <div className="headline">
            {title}
          </div>
          <PlainX className="drkr-red" onClick={closeModal}/>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export {Modal, useModal}