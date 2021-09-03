import type { NextApiRequest, NextApiResponse } from 'next'

import {RecipeListContent} from 'types'
import {getCollectionFromFirestore} from 'services'
import {COLLECTIONS} from 'consts'

export default async (req: NextApiRequest, res: NextApiResponse<RecipeListContent>) => {
  res.setHeader('Content-Type', 'application/json')
  const recipeListContent: RecipeListContent = await getCollectionFromFirestore(COLLECTIONS.RECIPES)
  return res.status(200).json(recipeListContent)
}