import {MODALS} from 'consts'
import {HomeContent} from 'types'
import {openInNewTab} from 'utils'

export const getHomeContent = (openModal): HomeContent => ({
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