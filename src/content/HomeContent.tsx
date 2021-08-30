import {HomePageContent} from 'types'

export const getHomePageContent = (): HomePageContent => ({
  heading: 'Andy Dierker',
  subheading: 'front-end software type of guy',
  links: [
    {
      text: 'about', 
      link: {
        type: 'modal',
        linkTo: 'about'
      }
    },
    {
      text: 'resume', 
      link: {
        type: 'modal',
        linkTo: '/dierker-resume-2021.pdf'
      }
    },
    {
      text: 'contact',
      link: {
        type: 'modal',
        linkTo: 'contact'
      }
    },
    {
      text: 'projects', 
      link: {
        type: 'modal',
        linkTo: 'projects'
      }
    },
  ],
  socials: [
    {
      icon: 'github',
      isRound: true,
      url: "https://github.com/adierker"
    },
    {
      icon: 'linkedin',
      url: "https://www.linkedin.com/in/dierker/"
    },
    {
      icon: 'instagram',
      url: "https://www.instagram.com/dierker/"
    },
  ]
})