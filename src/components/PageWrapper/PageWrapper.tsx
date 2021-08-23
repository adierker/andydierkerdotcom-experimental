import {ReactNode} from 'react'
import Head from 'next/head'

import {BreakpointHelper, Header} from 'components'

interface PageWrapperProps {
  children: ReactNode
  pageTitle: string
  hasHeader?: boolean
}

export const PageWrapper = ({children, pageTitle, hasHeader = false}: PageWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen text-drkr-black">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasHeader && <Header/>}

      {/* <BreakpointHelper/> */}
      {children}
    </div>
  )
}