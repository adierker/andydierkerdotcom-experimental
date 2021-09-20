import type { Asserts } from 'yup'

import { addRecipeFormSchema } from 'schemas'

export interface Ingredient {
  num?: number
  unit?: string
  ingredient: string
}

export interface IngredientGrouping {
  name: string | null
  items: Ingredient[]
}

export interface RecipeContent {
  name: string
  path: string
  url: string
  defaultServings: number
  isScalable: boolean
  descriptions: string[]
  ingredients: IngredientGrouping[]
  instructions: string[]
  notes?: string[]
}

export type RecipeListContent = RecipeContent[]

export interface AddRecipeFormType {
  name: string
  path: string
  url: string
  defaultServings: string
  isScalable: string
  descriptions: {
    paragraph: string
  }[]
  ingredientGroupings: {
    groupingName: string
    ingredients?: {
      num?: string
      unit?: string
      ingredient: string
    }[]
  }[]
  instructions: {
    step: string
  }[]
  notes?: {
    note: string
  }[]
}
