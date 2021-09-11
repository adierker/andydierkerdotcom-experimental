import { ReactElement } from 'react'

import { GetStaticPropsResult } from 'next'

import { HomePage, PageWrapper } from 'components'
import { COLLECTIONS } from 'consts'
import { ModalContextProvider } from 'contexts'
import { getDocumentFromFirestore, getCollectionFromFirestore } from 'services'
import { HomePageContent, ModalsContent } from 'types'
import { convertContentToGetStaticPropsResult } from 'utils'

type IndexPageProps = {
  homePageContent: HomePageContent
  modalsContent: ModalsContent
}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IndexPageProps>
> => {
  const homePageContent = await getDocumentFromFirestore<HomePageContent>(
    COLLECTIONS.PAGES,
    '/home'
  )
  const modalsContent = await getCollectionFromFirestore<ModalsContent>(
    COLLECTIONS.MODALS
  )
  return convertContentToGetStaticPropsResult<IndexPageProps>({
    homePageContent,
    modalsContent,
  })
}

export const Index = (props: IndexPageProps): ReactElement => {
  return (
    <ModalContextProvider modalsContent={props.modalsContent}>
      <PageWrapper pageTitle="andydierker.com">
        <HomePage {...props.homePageContent} />
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default Index
