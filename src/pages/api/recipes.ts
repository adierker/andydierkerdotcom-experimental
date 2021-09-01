import type { NextApiRequest, NextApiResponse } from 'next'
import {getDocs, DocumentData, collection, QuerySnapshot} from 'firebase/firestore'

import {RecipeListContent} from 'types'
import {COLLECTIONS} from 'consts'
import {db} from 'database'

export default async (req: NextApiRequest, res: NextApiResponse<RecipeListContent>) => {
  res.setHeader('Content-Type', 'application/json')

  // get all documents in the "recipes" collection
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, COLLECTIONS.RECIPES))

  // QuerySnapshot<DocumentData> is annoying to deal with. even after mapping over it and
  // getting all the data() out, we still have to spread it into an array because it comes
  // as a big object from Firestore
  const recipeListContent = [...querySnapshot.docs.map(doc => doc.data())]

  // we return the list as a RecipeListContent
  return res.status(200).json(recipeListContent as RecipeListContent)
}