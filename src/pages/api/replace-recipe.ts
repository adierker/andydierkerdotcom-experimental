import {
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
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
  let newDocumentId: string

  try {
    originalDocumentId = reqBody.originalRecipePath
    // we have stored the originalDocumentId above and no longer
    // want it included with the rest of the recipe changes
    // so we delete it off the request body
    delete reqBody.originalRecipePath
    recipeChanges = reqBody
    newDocumentId = recipeChanges.path

    if (!recipeChanges || !originalDocumentId || !newDocumentId) {
      throw 'Missing recipeChanges or originalRecipePath.'
    }
  } catch (e) {
    return res.status(500).send({
      message:
        'Error accessing request body (recipeChanges), original document ID (originalDocumentId), or new document ID (recipeChanges.path).',
    })
  }

  let existingRecipeRef: DocumentReference<DocumentData>

  try {
    existingRecipeRef = doc(db, DB_COLLECTIONS.RECIPES, originalDocumentId)
    if (!existingRecipeRef) {
      throw 'Could not find existing recipe with that document ID (originalDocumentId).'
    }
  } catch (e) {
    return res.status(500).send({
      message:
        'Error fetching existing recipe with that document ID (originalDocumentId).',
    })
  }

  try {
    await setDoc(doc(db, DB_COLLECTIONS.RECIPES, newDocumentId), recipeChanges)
  } catch (e) {
    return res.status(500).send({
      message:
        'Error creating replacement document. Replacement may have been created, but old recipe was not deleted.',
    })
  }

  try {
    await deleteDoc(existingRecipeRef)
  } catch (e) {
    return res
      .status(500)
      .send({
        message:
          'Error deleting old document. Replacement was created already, though.',
      })
  }

  return res.status(200).send({ message: 'Recipe replaced successfully!' })
}
