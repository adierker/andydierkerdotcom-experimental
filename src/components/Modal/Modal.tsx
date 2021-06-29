import {useRef, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  closeModal: () => any
}

const Modal = ({
  isOpen,
  closeModal
}: ModalProps) => {

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-drkr-dark-green bg-opacity-75 transition-opacity" />
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
            <div className="inline-block align-bottom bg-drkr-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-drkr-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-2xl leading-6 headline-spaced text-drkr-dark-green">
                    hi, i'm a frontend dev
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-drkr-dark-green body">
                      i use this website for stupid little personal projects.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-drkr-white px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-drkr-yellow text-base font-medium text-drkr-white hover:bg-drkr-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drkr-yellow sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  my linkedin
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-drkr-green text-base font-medium text-drkr-white hover:bg-drkr-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drkr-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  admin section
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-drkr-orange text-base font-medium text-drkr-white hover:bg-drkr-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drkr-orange sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  okay, bye bye
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export {Modal}