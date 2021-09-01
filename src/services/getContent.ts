import {doc, getDoc, DocumentData, DocumentReference} from 'firebase/firestore'
import axios, {AxiosResponse} from 'axios'

import {db} from 'database'
import {HomePageContent, RecipeListPageContent, RecipeListContent} from 'types'
import {ENDPOINTS, COLLECTIONS} from 'consts'

type PageContentType = HomePageContent | RecipeListPageContent

export const getPageContent = async (requestedPage: string): Promise<PageContentType> => {
  const docRef: DocumentReference<DocumentData> = doc(db, COLLECTIONS.PAGES, requestedPage)
  const document: DocumentData = await getDoc(docRef)

  // DocumentData comes with a bunch of extra stuff, .data() just pulls off the content we care about
  const page: PageContentType = document.data()

  return page
}

export const getRecipeListContent = async (): Promise<RecipeListContent> => {
  const response: AxiosResponse<RecipeListContent> = await axios.get(ENDPOINTS.RECIPES)
  const recipeList: RecipeListContent = response.data
  return recipeList
}