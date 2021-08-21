import {MODALS} from 'consts'
import {
  HomeContent,
  ModalContent,
  ModalType,
  OpenModalType,
  CloseModalType
} from 'types'
import {openInNewTab} from 'utils'

export const getHomeContent = (openModal: OpenModalType): HomeContent => ({
  heading: 'Andy Dierker',
  subheading: 'frontend software type of guy',
  links: [
    {
      text: 'about', 
      onClick: () => openModal(MODALS.ABOUT),
      classes: 'mr-0 sm:mr-4'
    },
    {
      text: 'resume', 
      onClick: () => openInNewTab('/dierker-resume-2021.pdf'),
      classes: 'mt-2 sm:mt-0 mr-0 sm:mr-4'
    },
    {
      text: 'contact', 
      onClick: () => openModal(MODALS.CONTACT),
      classes: 'mt-2 sm:mt-0 mr-0 sm:mr-4'
    },
    {
      text: 'projects', 
      onClick: () => openModal(MODALS.PROJECTS),
      classes: 'mt-2 sm:mt-0'
    },
  ]
})

export const getModalContent = (modalType: ModalType, closeModal: CloseModalType): ModalContent => {
  
  switch (modalType) {
    case MODALS.ABOUT:
      return {
        title: 'About',
        content: (
          <>
            <p className="mb-2">I'm a frontend software engineer. I build interfaces and user experiences with Javascript and React.</p>
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
            <p className="mb-2">E-mail is the best way to get in touch.</p>
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
            <p className="mb-2">This website is a NextJS application that uses modern React features like Hooks and Context. I frequently rebuild this site using different technologies to practice.</p>
            <p className="mb-2">I also use this site to store recipes that I cook with my wife. You can view them using the link below. There's a complete backend CMS I use to manage and add new recipes, but it's password protected. Sorry! I can't have you changing things and screwing up my chili.</p>
            <p>I like photography too, but am shy about sharing a lot of my photos. You can visit my Instagram to see more of a my photos, or use the link below to see a few highlights. Like the recipes, there's a full CMS I use to manage these photos on the backend of the site.</p>
          </>
        ),
        buttons: [
          {
            text: 'Recipes', 
            onClick: closeModal,
            classes: 'mr-2'
          },
          {
            text: 'Photos', 
            onClick: closeModal,
            classes: 'mr-2'
          },
          {
            text: 'Close', 
            onClick: closeModal
          }
        ]
      }
    default:
      return null
  }
}