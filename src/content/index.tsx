import {NextRouter} from 'next/router'

import {MODALS, SITEMAP} from 'consts'
import {
  HomePageContent,
  ModalContent,
  RecipesContent,
  ModalType,
  OpenModalType,
  CloseModalType
} from 'types'
import {LinkedIn, Instagram, Github} from 'icons'
import {openExternalLink} from 'utils'

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
      onClick: () => openExternalLink('/dierker-resume-2021.pdf', true),
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

export const getRecipePageContent = () => ({
  heading: 'Recipes',
  texts: [
    "This is where my family stores recipes that we cook frequently.",
    "I didn't come up with ANY of these recipes on my own, we found them online and over time have tweaked the preparation or ingredients to our liking. So I built this app to keep track of our adjustments.",
    "This recipe app has a backend CMS that I use to update them as the recipes evolve, but it's not publicly available, sorry! You're welcome to browse the recipes themselves though. Maybe lower your expectations though, most of these tend to fall in the 'extremely easy-to-prepare weeknight dinner' category, not a lot of fancy stuff."
  ]
})

export const getRecipeContent = (): RecipesContent => ([
  {
    name: 'Salsa Chicken',
    path: 'salsa-chicken',
    description: <p>Salsa chicken recipe based on the one from Budget Bytes.</p>,
    url: 'https://www.budgetbytes.com/salsa-chicken-meal-prep-bowls/',
    isScalable: true,
    servings: 6,
    ingredients: [
      {num: 1.5,    unit: 'cup',    ingredient: 'white rice'},
      {num: 3,      unit: 'cup',    ingredient: 'water'},
      {num: 2,      unit: 'lb',    ingredient: 'chicken breast'},
      {num: 24,     unit: 'oz',     ingredient: 'salsa'},
      {num: 0.75,   unit: 'cup',    ingredient: 'chicken broth'},
      {num: 1.5,    unit: 'tsp',    ingredient: 'chili powder'},
      {num: 4.5,                    ingredient: 'red bell pepper'},
      {num: 6,      unit: 'tbsp',   ingredient: 'sour cream'},
      {                             ingredient: 'olive oil'},
      {                             ingredient: 'sliced green onions'},
      {                             ingredient: 'hot sauce'},
    ],
    instructions: (coeff: number) => ([
      `Preheat the oven to 425ºF.`,
      `Cook the rice: add rice, water, a squirt of olive oil and some salt to small pot. Put it on a cold burner uncovered, turn to high heat. When the rice and water is boiling, turn the burner to low, cover the pot and let it simmer for 15 minutes (do not open the lid to check on it). After 15 minutes, leave the lid on and remove the pot from the burner and let sit for 10 minutes.`,
      `While the rice is cooking, add the chicken breasts to the dutch oven along with the salsa, chicken broth, and chili powder. Give everything a stir.`,
      `Place a lid on the pot and bring it to a boil over high heat. Once the liquid starts boiling, turn the heat down to low and let the chicken simmer over low for 30 minutes. Make sure it's simmering the whole time, adjusting the heat slightly if needed.`,
      `While the rice and chicken are cooking, prepare the bell peppers. Slice the bell peppers into 1/2-inch-wide strips. Place them on a baking sheet and drizzle with cooking oil. Toss the peppers to coat them in oil, then sprinkle with a pinch of salt.`,
      `Roast the peppers in the preheated oven until they are browned on the edges (about 25 minutes), stirring once half way through.`,
      `After the chicken has simmered for 30 minutes, remove it from the salsa mixture and use two forks to shred the meat. Return the shredded chicken to the pot of salsa and stir to combine.`,
      `Once the rice has rested, the chicken has been shredded, and the peppers have finished roasting, it's time to build the bowls.`,
      `Add about 3/4 cup rice to each container, followed by 1/4 of the roasted peppers, and 1/4 of the shredded chicken. Spoon the salsa mixture from the pot over the shredded chicken in the containers. This will act as a sauce to help moisten the entire dish. Top with sliced green onions, a dollop of sour cream, hot sauce, and salt. Serve immediately or refrigerate for up to 4 days.`,
    ])
  },
  {
    name: 'Jerk Chicken with Pineapple Black Bean Salsa',
    path: 'jerk-chicken-pineapple-black-bean-salsa',
    description: <p>Jerk chicken with pineapple black bean salsa recipe based on the one from Budget Bytes.</p>,
    url: 'https://www.budgetbytes.com/jerk-chicken-with-pineapple-black-bean-salsa/',
    isScalable: true,
    servings: 6,
    ingredients: [
      {num: 1.5,    unit: 'cup',            ingredient: 'white rice'},
      {num: 3,      unit: 'cup',            ingredient: 'water'},
      {num: 3,      unit: 'cup',            ingredient: 'pineapple tidbits'},
      {num: 1.5,    unit: '15 oz cans',     ingredient: 'black beans'},
      {num: 0.5,    unit: 'cup',            ingredient: 'diced red onion'},
      {num: 0.75,   unit: 'cup',            ingredient: 'chopped cilantro'},
      {num: 2,      unit: 'lb',             ingredient: 'chicken breast'},
      {num: 1.5,                            ingredient: 'lime'},
      {                                     ingredient: 'crushed red pepper flakes'},
      {                                     ingredient: 'jerk seasoning'},
      {                                     ingredient: 'olive oil'},
      {                                     ingredient: 'sliced green onions'},
      {                                     ingredient: 'hot sauce'},
    ],
    instructions: (coeff: number) => ([
      `Cook the rice: add rice, water, a squirt of olive oil and some salt to small pot. Put it on a cold burner uncovered, turn to high heat. When the rice and water is boiling, turn the burner to low, cover the pot and let it simmer for 15 minutes (do not open the lid to check on it). After 15 minutes, leave the lid on and remove the pot from the burner and let sit for 10 minutes.`,
      `While the rice is cooking, prepare the pineapple black bean salsa. Coarsely chop the pineapple tidbits into smaller pieces, similar in size to the black beans. Place the chopped pineapple, rinsed black beans, diced red onion, and chopped cilantro in a large bowl.`,
      `Squeeze the juice of half the lime over the ingredients in the bowl. Also add salt and red pepper flakes. Stir the ingredients together, give it a taste, and add more salt or lime juice if needed. Any unused lime will be cut into wedges for squeezing over the chicken before serving.`,
      `Next, prepare the jerk chicken. Pat the chicken breasts dry with a paper towel. Place a piece of plastic wrap over the chicken to eliminate splatter, then gently pound the chicken breasts into an even thickness using either a rolling pin or a mallet. Sprinkle the jerk seasoning over both sides of the chicken and use your hands to rub it into the surface, making sure they're completely coated.`,
      `Add the cooking oil to a large skillet, or preheat your grill. Once hot, add the chicken and cook until well browned on both sides, and the chicken is completely cooked through (about 7 minutes each side). It should no longer be pink in the center and the juices should run clear. For extra safety, use an instant read meat thermometer and cook until the internal temperature reaches 165ºF.`,
      `Transfer the cooked chicken to a clean cutting board and let it rest for five minutes. After five minutes, slice the chicken into 1/2-wide strips.`,
      `To serve, place about a cup of cooked rice on a plate, or in your meal prep container, top with about a cup of the pineapple black bean salsa, and a few strips of the jerk chicken. Slice the remaining lime into wedges and squeeze fresh juice over the chicken just before eating.`,
    ])
  }
])