import {GetStaticPropsResult} from 'next'

import {HomePage, PageWrapper} from 'components'
import {getPageContentFromFirestore, getModalsContentFromFirestore} from 'services'
import {HomePageContent, ModalsContent} from 'types'
import {convertContentToGetStaticPropsResult} from 'utils'
import {ModalContextProvider} from 'contexts'

export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageContent>> => {
  const homePageContent = await getPageContentFromFirestore('/home') as HomePageContent
  const modalsContent = await getModalsContentFromFirestore() as ModalsContent
  return {
    props: JSON.parse(JSON.stringify({
      homePageContent, 
      modalsContent,
    })),
    revalidate: true
  }
  
  // convertContentToGetStaticPropsResult({
  //   homePageContent: {...homePageContent}, 
  //   modalsContent: {...modalsContent}
  // })

  // return convertContentToGetStaticPropsResult(modalsContent)
}

export const Index = (props) => {
  return (
    <ModalContextProvider modalsContent={props.modalsContent}>
      <PageWrapper pageTitle="andydierker.com">
        <HomePage {...props.homePageContent}/>
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default Index