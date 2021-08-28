import {HomePage, PageWrapper} from 'components'
import {useModalContext} from 'contexts'
import {getHomePageContent} from 'content'

export default function Index() {
  const {openModal} = useModalContext()

  const homeContent = getHomePageContent(openModal)

  return (
    <PageWrapper pageTitle="andydierker.com">
      <HomePage {...homeContent}/>
    </PageWrapper>
  )
}
g