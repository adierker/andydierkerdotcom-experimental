import {doc, getDoc, DocumentData, DocumentReference, getDocs, collection, QuerySnapshot} from 'firebase/firestore'

import {db} from 'database'
import {PageContentType, RecipeContent, RecipeListContent, ModalsContent} from 'types'
import {COLLECTIONS} from 'consts'
import {convertQuerySnapshotToData} from 'utils'

// the functions on this page fetch content from firestore directly
// the frontend cannot call these methods on its own, because it cannot initialize the firestore app
// (it doesn't have access to the credentials in "db", only the backend does)

// instead, these functions can be called from two places:
// - from NextJS's SSR/static generation helpers, "getStaticProps" and "getStaticPaths"
// - or from NextJS's backend /pages/api files, which can be called from the frontend using axios


// TODO: lots of duplication here! see if we can combine these methods but still infer types correctly
export const getPageContentFromFirestore = async (requestedPage: string): Promise<PageContentType> => {
  // get the document from the "pages" collection
  const docRef: DocumentReference<DocumentData> = doc(db, COLLECTIONS.PAGES, requestedPage)
  const document: DocumentData = await getDoc(docRef)
  const page: PageContentType = document.data()
  return page
}

export const getRecipeContentFromFirestore = async (requestedRecipe: string): Promise<RecipeContent> => {
  // get the document from the "pages" collection
  const docRef: DocumentReference<DocumentData> = doc(db, COLLECTIONS.RECIPES, requestedRecipe)
  const document: DocumentData = await getDoc(docRef)
  const recipe: RecipeContent = document.data()
  return recipe
}

export const getModalsContentFromFirestore = async (): Promise<ModalsContent> => {
  // get all documents in the "modals" collection
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, COLLECTIONS.MODALS))
  const modalContent: ModalsContent = convertQuerySnapshotToData(querySnapshot)
  return modalContent
}

export const getRecipeListContentFromFirestore = async (): Promise<RecipeListContent> => {
  // get all documents in the "recipes" collection
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, COLLECTIONS.RECIPES))
  const recipeListContent: RecipeListContent = convertQuerySnapshotToData(querySnapshot)
  return recipeListContent
}