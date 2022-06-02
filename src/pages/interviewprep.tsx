import { ReactElement } from 'react'

import { PageWrapper, Heading, AnimalCollection } from 'components'
import { PaginationContextProvider } from 'contexts'

// use this to generate a new Oauth token:
// curl -d "grant_type=client_credentials&client_id=SKVFZTtXTuoif4a1OQrDxfQl9unshcUkVRMP0uAqzAsr9xoOzm&client_secret=cS10BtgoFNHUQWCopOGJ79mCv8PXAsPFXDfatWpz" https://api.petfinder.com/v2/oauth2/token

// Oauth token (will expire, regenerate with above)
const PETFINDER_OAUTH_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJTS1ZGWlR0WFR1b2lmNGExT1FyRHhmUWw5dW5zaGNVa1ZSTVAwdUFxekFzcjl4b096bSIsImp0aSI6IjE4ODAzMjNiOGE1YWM1NGFjYmYzNzZlNzAxNDQ3ODIzM2Q1YzczZjFkNWMxMmZhOGI2YzYxZTFmYTRhMjYzN2YyY2JjNTIxZDkwZjU0NDE2IiwiaWF0IjoxNjU0MjA3MzY0LCJuYmYiOjE2NTQyMDczNjQsImV4cCI6MTY1NDIxMDk2NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ktUjKhj0JkXyvxXpAE4R-_HXfDXv_5bsysNcjG_xsmdja2cDsBIunANol2L5GzCRpl2Usl0DnzMPFe9-3NJJw1PqyeikQ6nVLHsAUDXlUFi1k0V8zKrVqkPXQx34FNwIpNk2w_phSD_qj4Ti-PxBD5ZQAQYZBcTMjJc9yxijGOgW3zuYPtKzGnJfyrkaS5Rmu5ncEha4lymaoW27VbnW3inq_8vvvfqbpZWILJ2XzZnJ_rFEflXj_KT6Cixueo4wrufWr3XzsJDJhVFvWafzZFWnNfG-sclcLCnFfmZFc5HF23jN4XF8_XydwBNzfOXBlkjXai5bgXnNzArYoghKwQ'

export const InterviewPrepPage = (): ReactElement => {
  return (
    <PageWrapper pageTitle="hello">
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
