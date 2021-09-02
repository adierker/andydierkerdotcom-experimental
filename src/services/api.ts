import axios, {AxiosResponse} from 'axios'

import {RecipeListContent} from 'types'
import {ENDPOINTS} from 'consts'

// the functions on this page proxy requests to NextJS's backend api, which in turn gets the data from firestore
// the frontend must use these functions to fetch data, because it cannot initialize the firestore app on its own
// (it doesn't have access to the credentials in "db", only the backend does)

export const getRecipeListContentFromApi = async (): Promise<RecipeListContent> => {
  const response: AxiosResponse<RecipeListContent> = await axios.get(ENDPOINTS.RECIPES)
  const recipeList: RecipeListContent = response.data
  return recipeList
}