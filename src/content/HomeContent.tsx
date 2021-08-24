import {MODALS} from 'consts'
import {
  HomePageContent,
  OpenModalType,
} from 'types'
import {LinkedIn, Instagram, Github} from 'icons'
import {onClickOpenLink} from 'utils'

export const getHomePageContent = (openModal: OpenModalType): HomePageContent => ({
  heading: 'Andy Dierker',
  subheading: 'front-end software type of guy',
  links: [
    {
      text: 'about', 
      onClick: () => openModal(MODALS.ABOUT),
      className: 'mr-0 sm:mr-4'
    },
    {
      text: 'resume', 
      onClick: () => onClickOpenLink('/dierker-resume-2021.pdf', true),
      className: 'mt-2 sm:mt-0 mr-0 sm:mr-4'
    },
    {
      text: 'contact', 
      onClick: () => openModal(MODALS.CONTACT),
      className: 'mt-2 sm:mt-0 mr-0 sm:mr-4'
    },
    {
      text: 'projects', 
      onClick: () => openModal(MODALS.PROJECTS),
      className: 'mt-2 sm:mt-0'
    },
  ],
  socials: [
    {
      icon: Github,
      className: "mr-6 sm:mr-10 rounded-full",
      url: "https://github.com/adierker"
    },
    {
      icon: LinkedIn,
      className: "mr-6 sm:mr-10",
      url: "https://www.linkedin.com/in/dierker/"
    },
    {
      icon: Instagram,
      className: "",
      url: "https://www.instagram.com/dierker/"
    },
  ]
})