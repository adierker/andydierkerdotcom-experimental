import {useRef, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'

import {Button} from 'components/Button'
import {ModalTypes, MODALS} from 'components/Modal'

interface ModalProps {
  currentModal: ModalTypes
  closeModal: () => any
}

interface ModalContentProps {
  title: string
  texts: string[]
  buttons: typeof Button[] | null
}

export const Modal = ({currentModal, closeModal}: ModalProps) => {
  const modalRef = useRef(null)

  const MODAL_TO_CONTENT_MAPPING = {
    [MODALS.ABOUT]: {
      title: "Hello, I'm Andy",
      texts: [
        "I'm a software engineer in Seattle. I work at Invitae (the genetics company), where I'm the tech lead for the marketing site, responsible for deployments and building out the CMS system and component libraries.",
        "Engineering-wise, my areas of expertise are in Javascript, React, HTML and CSS. This site is built using NextJS, React Hooks and context, and TailwindCSS."
      ],
      buttons: [
        <Button onClick={closeModal} text="Nice to meet you"/>
      ]
    },
    [MODALS.CONTACT]: {
      title: "Contact",
      texts: [
        "E-mail is the best way to reach me. Shoot me a message at:",
        "dierker[at]gmail[dot]com"
      ],
      buttons: [
        <Button onClick={closeModal} text="Sounds good, thanks"/>
      ]
    },
    [MODALS.PROJECTS]: {
      title: "My projects",
      texts: [
        "I like to cook and take photos.",
        "The recipes below are mostly just a place for my wife and I to keep the recipes we like. If you try to edit any of the recipes, it will ask you for a password... I don't want you messing my stuff up! Most of these are slight variations of recipes I found online, so some of them may look familiar to you already.",
        "I take a lot of photos too, but I'm kinda shy about sharing them online. You can check out my Instagram for a lot more of my photos, but I'll post a few photos that I like in my photos section."
      ],
      buttons: [
        <Button onClick={closeModal} text="Recipes"/>,
        <Button onClick={closeModal} text="Photos"/>
      ]
    }
  }

  const modalContent = MODAL_TO_CONTENT_MAPPING[currentModal]

  return (
    <Transition.Root show={!!currentModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={!!currentModal}
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
            <div className="inline-block align-bottom bg-drkr-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-drkr-white p-4">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-3xl headline-spaced text-drkr-black mt-2">
                    {modalContent.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    {modalContent.texts.map(text => {
                      return (
                        <p className="text-sm text-drkr-dark-green body mb-5">
                          {text}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-drkr-white p-4 sm:flex sm:flex-row justify-end">
                {modalContent.buttons.map(button => {
                  return button
                })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}