import type { NextApiRequest, NextApiResponse } from 'next'

import {RecipeListContent} from 'types'
import {getRecipeListContentFromFirestore} from 'services'

export default async (req: NextApiRequest, res: NextApiResponse<RecipeListContent>) => {
  res.setHeader('Content-Type', 'application/json')

  const recipeListContent: RecipeListContent = await getRecipeListContentFromFirestore()

  return res.status(200).json(recipeListContent)
}