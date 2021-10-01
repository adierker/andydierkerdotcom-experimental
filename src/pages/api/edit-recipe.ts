import {
  doc,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DB_COLLECTIONS } from 'consts'
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

  let recipeChanges: RecipeContent
  let documentId: string

  try {
    recipeChanges = req.body
    documentId = recipeChanges.path

    if (!recipeChanges || !documentId) {
      throw 'Missing recipeChanges or documentId.'
    }
  } catch (e) {
    return res.status(500).send({
      message:
        'Error accessing request body (recipeChanges) or document ID (path).',
    })
  }

  let existingRecipeRef: DocumentReference<DocumentData>

  try {
    existingRecipeRef = doc(db, DB_COLLECTIONS.RECIPES, documentId)
    if (!existingRecipeRef) {
      throw 'Could not find existing recipe with that document ID (path).'
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Error fetching existing recipe with that document ID (path).',
    })
  }

  try {
    await updateDoc(existingRecipeRef, { ...recipeChanges })
  } catch (e) {
    return res.status(500).send({ message: 'Error updating document.' })
  }

  return res.status(200).send({ message: 'Recipe updated successfully!' })
}
