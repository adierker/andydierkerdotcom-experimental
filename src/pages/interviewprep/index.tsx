import { ReactElement } from 'react'

import { PageWrapper, Heading, AnimalCollection } from 'components'
import { PETFINDER_OAUTH_TOKEN } from 'consts'
import { PaginationContextProvider } from 'contexts'

export const InterviewPrepPage = (): ReactElement => {
  return (
    <PageWrapper pageTitle="Dog Cacher">
      <PaginationContextProvider>
        <>
          <Heading text="Here Are Some Dogs" className="text-center mt-10" />
          <AnimalCollection oauthToken={PETFINDER_OAUTH_TOKEN} />
        </>
      </PaginationContextProvider>
    </PageWrapper>
  )
}

export default InterviewPrepPage
