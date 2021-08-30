import {MODALS} from 'consts'
import {ModalContent, ModalType} from 'types'

export const getModalContent = (modalType: ModalType): ModalContent => {
  switch (modalType) {
    case MODALS.ABOUT:
      return {
        title: 'About',
        content: [
          "I'm a front-end software engineer in Seattle. I build interfaces and user experiences with Javascript and React.",
          "I use this website to store my resume, contact information, and links to a few projects I've built.",
        ],
        buttons: [
          {
            text: 'Nice to meet you', 
            link: {
              type: 'modal',
              linkTo: 'close'
            }
          }
        ]
      }
    case MODALS.CONTACT:
      return {
        title: 'Contact',
        content: [
          "E-mail is the best way to get in touch with me.",
          "dierker [at] gmail [dot] com",
        ],
        buttons: [
          {
            text: 'Sounds good', 
            link: {
              type: 'modal',
              linkTo: 'close'
            }
          }
        ]
      }
    case MODALS.PROJECTS:
      return {
        title: 'Projects',
        content: [
          "This website is a NextJS application that uses modern React features like Hooks and Context, and uses TailwindCSS's new JIT compiler for styles. I frequently rebuild this site using different technologies to try out new stuff.",
          "I also use this site to store recipes that I cook with my wife. There's a complete backend CMS I use to manage and add new recipes, but it's password protected. Sorry! I can't have you changing things and screwing up my chili.",
          "I am an amateur photographer and use this site to keep a few highlights. This is also supported by a full CMS I use to manage these photos on the backend of the site. But my Instagram is where I post most of my photos.",
        ],
        buttons: [
          {
            text: 'Recipes',
            link: {
              type: 'internal',
              linkTo: '/recipes'
            }
          },
          {
            text: 'Photos', 
            link: {
              type: 'internal',
              linkTo: '/photos'
            }
          },
          {
            text: 'Okay bye', 
            link: {
              type: 'modal',
              linkTo: 'close'
            }
          }
        ]
      }
    default:
      return null
  }
}