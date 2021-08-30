import type {NextApiRequest} from 'next'

import {HomePageContent} from 'types'

export interface ErrorResponse {
  error: boolean
  errorData: {
    query: NextApiRequest["query"]
    message: string
  }
}

export interface PageContentResponse {
  error: boolean
  content: HomePageContent // add other pages here later
}

export type PageEndpointResponse = ErrorResponse | PageContentResponse