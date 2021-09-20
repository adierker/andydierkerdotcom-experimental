import { doc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { COLLECTIONS } from 'consts'
import { db } from 'database'
import { RecipeContent } from 'types'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res
      .status(400)
      .send({ message: 'This endpoint only allows POST requests.' })
    return
  }

  let recipe: RecipeContent
  let documentId: string

  try {
    recipe = req.body
    documentId = recipe.path

    if (!recipe || !documentId) {
      throw 'Missing recipe or documentId.'
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Error accessing request body or document ID (path).' })
  }

  try {
    await setDoc(doc(db, COLLECTIONS.RECIPES, documentId), recipe)
  } catch (e) {
    return res.status(500).send({ message: 'Error creating document.' })
  }

  return res.status(200).send({ message: 'Recipe added successfully!' })
}
