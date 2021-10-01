import {
  deleteDoc,
  doc,
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

  let documentId: string

  try {
    documentId = req.body.documentId

    if (!documentId) {
      throw 'Missing documentId.'
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Error accessing document ID.',
    })
  }

  let recipeDocument: DocumentReference<DocumentData>

  try {
    recipeDocument = doc(db, DB_COLLECTIONS.RECIPES, documentId)
    if (!recipeDocument) {
      throw 'Could not find existing recipe with that document ID.'
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Error fetching existing recipe with that document ID.',
    })
  }

  try {
    await deleteDoc(recipeDocument)
  } catch (e) {
    return res.status(500).send({
      message: 'Error deleting recipe document.',
    })
  }

  return res.status(200).send({ message: 'Recipe deleted successfully!' })
}
