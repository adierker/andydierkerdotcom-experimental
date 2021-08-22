import {ComponentProps, ReactNode} from 'react'

import {MODALS} from 'consts'
import {Button} from 'components'
import {LinkedIn, Instagram, Github} from 'icons'

type ModalTypeKeys = keyof typeof MODALS
type ModalTypeValues = typeof MODALS[ModalTypeKeys]
export type ModalType = ModalTypeValues | null

export type OpenModalType = (x: ModalType) => void
export type CloseModalType = () => void

export type ButtonPropsType = ComponentProps<typeof Button>

export interface IconProps {
  className?: string
  onClick?: () => void
}

export interface ModalContent {
  title: string
  content: ReactNode
  buttons: ButtonPropsType[]
}

export interface HomePageContent {
  heading: string
  subheading: string
  links: {
    text: string
    onClick: () => void
    className: string
  }[],
  socials: {
    icon: typeof LinkedIn | typeof Instagram | typeof Github
    className: string
    url: string
  }[]
}

export interface RecipePageContent {
  heading: string
  texts: string[]
}

export interface Recipe {
  name: string
  path: string
  description: ReactNode
  url: string
  isScalable: boolean
  servings: number
  ingredients: {
    num?: number
    unit?: string
    ingredient: string
  }[]
  instructions: (number) => string[]
  notes?: string[]
}

export type RecipeContent = Recipe[]