import {useRef, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'

import {Button} from 'components'
import {ModalContent} from 'hooks/useModal'

interface ModalProps {
  modalContent: ModalContent
  closeModal: () => any
}

export const Modal = ({modalContent, closeModal}: ModalProps) => {
  const modalRef = useRef(null)

  return (
    <Transition.Root show={!!modalContent} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={!!modalContent}
        onClose={closeModal}
        initialFocus={modalRef}
      >
        <div
          ref={modalRef}
          className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-drkr-black bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <section id="modal-content" className="inline-block align-bottom bg-drkr-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-drkr-white p-4">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-3xl headline-spaced text-drkr-black mt-2">
                    {modalContent.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    {modalContent.texts.map(text => (
                      <p>{text}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-drkr-white p-4 sm:flex sm:flex-row justify-end">
                {modalContent.buttons.map(button => <Button text={button.text} onClick={button.onClick}/>)}
              </div>
            </section>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}