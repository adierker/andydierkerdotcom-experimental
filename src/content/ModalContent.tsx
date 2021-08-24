import {NextRouter} from 'next/router'

import {MODALS, SITEMAP} from 'consts'
import {
  ModalContent,
  ModalType,
  CloseModalType,
} from 'types'

export const getModalContent = (
  modalType: ModalType, 
  closeModal: CloseModalType,
  router: NextRouter
  ): ModalContent => {
  switch (modalType) {
    case MODALS.ABOUT:
      return {
        title: 'About',
        content: (
          <>
            <p className="mb-4">I'm a front-end software engineer in Seattle. I build interfaces and user experiences with Javascript and React.</p>
            <p>I use this website to store my resume, contact information, and links to a few projects I've built.</p>
          </>
        ),
        buttons: [
          {
            text: 'Nice to meet you', 
            onClick: closeModal
          }
        ]
      }
    case MODALS.CONTACT:
      return {
        title: 'Contact',
        content: (
          <>
            <p className="mb-4">E-mail is the best way to get in touch with me.</p>
            <p>dierker [at] gmail [dot] com</p>
          </>
        ),
        buttons: [
          {
            text: 'Sounds good', 
            onClick: closeModal
          }
        ]
      }
    case MODALS.PROJECTS:
      return {
        title: 'Projects',
        content: (
          <>
            <p className="mb-4">This website is a NextJS application that uses modern React features like Hooks and Context, and uses TailwindCSS's new JIT compiler for styles. I frequently rebuild this site using different technologies to try out new stuff.</p>
            <p className="mb-4">I also use this site to store recipes that I cook with my wife. There's a complete backend CMS I use to manage and add new recipes, but it's password protected. Sorry! I can't have you changing things and screwing up my chili.</p>
            <p>I am an amateur photographer and use this site to keep a few highlights. This is also supported by a full CMS I use to manage these photos on the backend of the site. But my Instagram is where I post most of my photos.</p>
          </>
        ),
        buttons: [
          {
            text: 'Recipes', 
            onClick: () => {
              closeModal()
              router.push(SITEMAP.RECIPES)
            },
            className: 'mr-0 mb-3 md:mr-3 md:mb-0'
          },
          {
            text: 'Photos', 
            onClick: () => {
              closeModal()
              router.push(SITEMAP.PHOTOS)
            },
            className: 'mr-0 mb-3 md:mr-3 md:mb-0'
          },
          {
            text: 'Okay bye', 
            onClick: closeModal
          }
        ]
      }
    default:
      return null
  }
}