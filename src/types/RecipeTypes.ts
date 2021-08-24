import {ReactNode} from 'react'

export interface RecipeListPageContent {
  heading: string
  texts: string[]
}

export interface RecipeContent {
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

export type RecipeListContent = RecipeContent[]