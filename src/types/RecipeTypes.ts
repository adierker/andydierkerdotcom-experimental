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
