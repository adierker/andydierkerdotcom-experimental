import {useState, useCallback} from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen])
  const openModal = useCallback(() => {
    console.log('openModal')
    setIsOpen(true)
  }, [setIsOpen])
  const toggleModal = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  return {
    isOpen,
    setIsOpen,
    closeModal,
    openModal,
    toggleModal
  }
}

export {useModal}
