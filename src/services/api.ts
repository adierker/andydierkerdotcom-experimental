import axios, { AxiosResponse } from 'axios'

import { ENDPOINTS } from 'consts'
import { RecipeContent, ApiResponse } from 'types'

// the functions on this page proxy requests to NextJS's backend api, which in turn gets the data from firestore
// the frontend must use these functions to fetch data, because it cannot initialize the firestore app on its own
// (it doesn't have access to the credentials in "db", only the backend does)

export const postRecipeContentToApi = async (
  recipe: RecipeContent
): Promise<ApiResponse> => {
  let response: AxiosResponse<any>

  try {
    console.log('trying...')
    response = await axios.post(ENDPOINTS.ADD_RECIPE, recipe)
    console.log('done!')
    if (response?.status === 200) {
      return {
        ok: true,
        message: 'Recipe added.',
      }
    } else {
      return {
        ok: false,
        message: 'Recipe not added, returned non-200 status.',
        errorData: response,
      }
    }
  } catch (e) {
    return {
      ok: false,
      message: 'Recipe not added. Unspecified server error.',
      errorData: e,
    }
  }
}

export const postEditedRecipeContentToApi = async (
  recipe: RecipeContent,
  originalRecipePath: string
): Promise<ApiResponse> => {
  let response: AxiosResponse<any>

  try {
    response = await axios.post(ENDPOINTS.EDIT_RECIPE, {
      ...recipe,
      originalRecipePath,
    })
    if (response?.status === 200) {
      return {
        ok: true,
        message: 'Recipe edited.',
      }
    } else {
      return {
        ok: false,
        message: 'Recipe not edited, returned non-200 status.',
        errorData: response,
      }
    }
  } catch (e) {
    return {
      ok: false,
      message: 'Recipe not edited. Unspecified server error.',
      errorData: e,
    }
  }
}
