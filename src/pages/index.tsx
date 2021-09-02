import {GetStaticPropsResult} from 'next'

import {HomePage, PageWrapper} from 'components'
import {getPageContentFromFirestore} from 'services'
import {HomePageContent} from 'types'
import {convertContentToGetStaticPropsResult} from 'utils'

export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageContent>> => {
  const homePageContent = await getPageContentFromFirestore('/home') as HomePageContent
  return convertContentToGetStaticPropsResult(homePageContent)
}

export const Index = (props: HomePageContent) => {
  return (
    <PageWrapper pageTitle="andydierker.com">
      <HomePage {...props}/>
    </PageWrapper>
  )
}

export default Index