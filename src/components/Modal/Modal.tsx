import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {NextRouter} from 'next/router'

import {Button} from 'components'
import {ModalContent} from 'types'
import {MODALS, LINKS} from 'consts'

interface ModalProps {
  modalContent: ModalContent
  closeModal: () => any
  router: NextRouter
}

export const Modal = ({modalContent, closeModal, router}: ModalProps) => {
  const hiddenButtonToTrickTheInitialFocus = useRef(null)
  return (
    <Transition.Root show={!!modalContent} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={!!modalContent}
        onClose={closeModal}
        initialFocus={hiddenButtonToTrickTheInitialFocus} // this seems to be bugged, it always selects the first element no matter what i put here, so i added a hidden button to steal focus first
      >
        <div
          className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0"
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
          {/* This element is to trick the initialFocus, otherwise when you hit Tab the SECOND button is selected first which is weird */}
          <button className="hidden" ref={hiddenButtonToTrickTheInitialFocus}/>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* the ternary below is a bit of a hack. we display the modal if modalContent exists, but when we wipe the modalContent to close the modal, we need to leave time for the transition animations above to work */}
            {/* Transition.Child is rendering as a Fragment, so it will throw an error if modalContent is null and nothing is rendered within it */}
            {/* so we make it a ternary and render an empty span instead so that it has time to finish its animation */}
            {modalContent ? (
              <section 
                id="modal-content" 
                className="inline-block align-bottom bg-drkr-gray text-drkr-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-fulltext-drkr-black">
                <Dialog.Title as="h3" className="text-3xl headline-spaced-font border-b-2 border-drkr-mid-gray pt-6 px-6 pb-4">
                  {modalContent.title}
                </Dialog.Title>
                <div className="body-font border-b-2 border-drkr-mid-gray p-6">
                  {modalContent.content.map((text, index) => {
                    const isLastItem = modalContent.content.length === index + 1
                    const classes = isLastItem ? '' : 'mb-4'
                    return (
                      <p className={classes} key={`content-${index}`}>{text}</p>
                    )
                  })}
                </div>
                <div className="flex flex-col md:flex-row justify-end p-6">
                  {modalContent.buttons.map(({text, link}, index) => {
                    const isLastItem = modalContent.buttons.length === index + 1
                    const classes = isLastItem ? '' : 'mr-0 mb-3 md:mr-3 md:mb-0'

                    const {type, linkTo} = link
                    let onClick = () => {}
                    if (type === LINKS.MODAL && linkTo === MODALS.CLOSE) {
                      onClick = closeModal
                    }
                    else if (type === LINKS.INTERNAL) {
                      onClick = () => {
                        closeModal()
                        router.push(linkTo)
                      }
                    }
                    return (
                      <Button text={text} onClick={onClick} className={`${classes} focus-visible:bg-drkr-black`} key={`button-${index}`}/>
                    )
                  })}
                </div>
              </section>
            ) : <span/>} 
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}