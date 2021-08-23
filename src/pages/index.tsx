import {Home, PageWrapper} from 'components'
import {useModalContext} from 'contexts'
import {getHomePageContent} from 'content'

export default function IndexPage() {
  const {openModal} = useModalContext()

  const homeContent = getHomePageContent(openModal)

  return (
    <PageWrapper pageTitle="andydierker.com">
      <Home {...homeContent}/>
    </PageWrapper>
  )
}
