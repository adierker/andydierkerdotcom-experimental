import {
  doc,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DB_COLLECTIONS } from 'consts'
import { db } from 'database'
import { RecipeContent, RecipeContentWithOriginalRecipePath } from 'types'

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

  const reqBody: RecipeContentWithOriginalRecipePath = req.body

  let recipeChanges: RecipeContent
  let originalDocumentId: string

  try {
    originalDocumentId = reqBody.originalRecipePath
    // we have stored the originalDocumentId above and no longer
    // want it included with the rest of the recipe changes
    // so we delete it off the request body
    delete reqBody.originalRecipePath
    recipeChanges = reqBody

    if (!recipeChanges || !originalDocumentId) {
      throw 'Missing recipeChanges or originalRecipePath.'
    }
  } catch (e) {
    return res.status(500).send({
      message:
        'Error accessing request body or document ID (originalRecipePath).',
    })
  }

  let existingRecipeRef: DocumentReference<DocumentData>

  try {
    existingRecipeRef = doc(db, DB_COLLECTIONS.RECIPES, originalDocumentId)
    if (!existingRecipeRef) {
      throw 'Could not find existing recipe with that document ID (originalRecipePath).'
    }
  } catch (e) {
    return res.status(500).send({
      message:
        'Error fetching existing recipe with that document ID (originalRecipePath).',
    })
  }

  try {
    await updateDoc(existingRecipeRef, { ...recipeChanges })
  } catch (e) {
    return res.status(500).send({ message: 'Error updating document.' })
  }

  return res.status(200).send({ message: 'Recipe updated successfully!' })
}
