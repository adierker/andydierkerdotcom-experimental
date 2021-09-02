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
  descriptions: string[]
  url: string
  isScalable: boolean
  defaultServings: number
  ingredients: IngredientGrouping[]
  instructions: string[]
  notes?: string[]
}

export type RecipeListContent = RecipeContent[]