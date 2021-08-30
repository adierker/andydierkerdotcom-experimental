import axios from 'axios'

import {PageEndpointResponse, ErrorResponse, PageContentResponse} from 'types'

export const getPageContent = async (page: string) => {
  const fetchedPage = await axios.get(`api/pages?page=${page}`)
  const response: PageEndpointResponse = fetchedPage.data
  
  if (response.error) {
    const {errorData} = response as ErrorResponse
    console.log('Error while fetching with getPageContent:', errorData)
    throw errorData.message
  }

  const {content} = response as PageContentResponse
  return content
}