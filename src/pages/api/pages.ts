import type { NextApiRequest, NextApiResponse } from 'next'
import {doc, getDoc} from 'firebase/firestore'

import {db} from 'database'
import {PageEndpointResponse} from 'types'

const PAGE_COLLECTION = 'pages'

export default async (req: NextApiRequest, res: NextApiResponse<PageEndpointResponse>) => {
  res.setHeader('Content-Type', 'application/json')
  
  // req.query.x returns a string or a string[] so we need to cast it
  let requestedPage = req.query.page as string

  // bad request
  if (!requestedPage) {
    return res.status(400).json({
      error: true,
      errorData: {
        query: req.query,
        message: 'Request is missing a page query param.'
      }
    })
  }

  let page
  // fetch the document from the 'pages' collection
  try {
    const docRef = doc(db, PAGE_COLLECTION, requestedPage)
    page = await getDoc(docRef)
  } catch(error) {
    return res.status(500).json({
      error: true,
      errorData: {
        query: req.query,
        message: `Server error while fetching document from Firestore: ${error}`
      }
    })
  }

  // not found
  if (!page || !page.exists()) {
    return res.status(400).json({
      error: true,
      errorData: {
        query: req.query,
        message: `No document found for id: ${requestedPage}`
      }
    })
  }

  const pageContent = page.data()
  // TODO: validate the JSON against the typescript interface 
  // and throw an error if it doesn't match the typescript interface's shape

  return res.status(200).json({
    error: false,
    content: pageContent
  })
}