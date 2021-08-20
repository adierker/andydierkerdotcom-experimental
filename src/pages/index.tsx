import Head from 'next/head'

import {Home, BreakpointHelper} from 'components'
import {useModalContext} from 'contexts'
import {getHomeContent} from 'content'

export default function IndexPage() {
  const {openModal} = useModalContext()

  const homeContent = getHomeContent(openModal)

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>andydierker.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BreakpointHelper/> */}
      <Home {...homeContent}/>
    </div>
  )
}
