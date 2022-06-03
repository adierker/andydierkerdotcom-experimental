import { ReactElement } from 'react'

import { PageWrapper, Heading, AnimalCollection } from 'components'
import { PaginationContextProvider } from 'contexts'

// use this to generate a new Oauth token:
// curl -d "grant_type=client_credentials&client_id=SKVFZTtXTuoif4a1OQrDxfQl9unshcUkVRMP0uAqzAsr9xoOzm&client_secret=cS10BtgoFNHUQWCopOGJ79mCv8PXAsPFXDfatWpz" https://api.petfinder.com/v2/oauth2/token

// Oauth token (will expire, regenerate with above)
const PETFINDER_OAUTH_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJTS1ZGWlR0WFR1b2lmNGExT1FyRHhmUWw5dW5zaGNVa1ZSTVAwdUFxekFzcjl4b096bSIsImp0aSI6IjY2NGUyODQ3MzQ5MTI5NmE3MjUwNTQ4MGI1YjI1ZTIxNTFkNTYxODQyNTZlMjI5ZDY2NTFkZDExMjdhMDQ2ZDcxY2JhNDNmMmQ3MzM5MDQ4IiwiaWF0IjoxNjU0MjI1MzQ1LCJuYmYiOjE2NTQyMjUzNDUsImV4cCI6MTY1NDIyODk0NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.rTRKgpoWi3Q4k21qPucFlKulvl13njt3Yu8ehe1ZlgkKLru-FnwaDLrrCFEHtBqlkIQZr09bmT0uDg86K5UdkFA3N2I-_V8dMGfwxJzAFRAF23cxcKJzmQRQrZryyDC56w_pfKNCsng8Q7izRiSPeWKgCoWYIIBzdanuBXn5ui3FF5dl5-nUX80tRMtL-0DoaJ1cvXByMizMNGUBiSyB3wjZ1MYEHLMy4n0KcV3yJJhcT45jGgZ0RtXOIkgsyrjZpHVMNsq4dHw7-KH6zDZ4TcWEogu3HATQoyKJYI5BiIMfKWbcsgx4PLY9bEoaMy-LOTKq_QysEoCcvZBSyIs6bQ'
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
