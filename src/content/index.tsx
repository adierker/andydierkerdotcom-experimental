import {MODALS} from 'consts'
import {
  HomeContent,
  ModalContent,
  ModalType,
  OpenModalType,
  CloseModalType
} from 'types'
import {LinkedIn, Instagram, Github} from 'icons'
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
  ],
  socials: [
    {
      icon: Github,
      classes: "mr-6 sm:mr-10",
      url: "https://github.com/adierker"
    },
    {
      icon: LinkedIn,
      classes: "mr-6 sm:mr-10",
      url: "https://www.linkedin.com/in/dierker/"
    },
    {
      icon: Instagram,
      classes: "",
      url: "https://www.instagram.com/dierker/"
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
            <p className="mb-4">I'm a frontend software engineer in Seattle. I build interfaces and user experiences with Javascript and React.</p>
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
            <p className="mb-4">This website is a NextJS application that uses modern React features like Hooks and Context. I frequently rebuild this site using different technologies to try out new stuff.</p>
            <p className="mb-4">I also use this site to store recipes that I cook with my wife. You can view them using the link below. There's a complete backend CMS I use to manage and add new recipes, but it's password protected. Sorry! I can't have you changing things and screwing up my chili.</p>
            <p>I like photography too, but am shy about sharing a lot of my photos. You can visit my Instagram to see more of a my photos, or use the link below to see a few highlights. Like the recipes, there's a full CMS I use to manage these photos on the backend of the site.</p>
          </>
        ),
        buttons: [
          {
            text: 'Recipes', 
            onClick: closeModal,
            classes: 'mr-0 mb-2 md:mr-2 md:mb-0'
          },
          {
            text: 'Photos', 
            onClick: closeModal,
            classes: 'mr-0 mb-2 md:mr-2 md:mb-0'
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