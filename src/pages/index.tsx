import {HomePage, PageWrapper} from 'components'
import {getPageContent} from 'services'
import {HomePageContent} from 'types'

export const getStaticProps = async () => {
  const homePageContent = await getPageContent('/home') as HomePageContent
  // raw data must be converted to json before being sent through nextjs as props
  const jsonHomePageContent = JSON.parse(JSON.stringify(homePageContent))

  return {
    props: jsonHomePageContent,
    revalidate: true
  }
}

export const Index = (props: HomePageContent) => {
  return (
    <PageWrapper pageTitle="andydierker.com">
      <HomePage {...props}/>
    </PageWrapper>
  )
}

export default Index