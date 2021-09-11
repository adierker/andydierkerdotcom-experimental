import { ReactElement } from 'react'

import Head from 'next/head'

import { BreakpointHelper, Header } from 'components'
import { SitePathsType } from 'types'

interface PageWrapperProps {
  children: ReactElement
  pageTitle: string
  hasHeader?: boolean
  backText?: string
  backPath?: SitePathsType
}

export const PageWrapper = ({
  children,
  pageTitle,
  hasHeader = false,
  backText,
  backPath,
}: PageWrapperProps): ReactElement => {
  return (
    <div className="flex flex-col min-h-screen text-drkr-black">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasHeader && <Header backText={backText} backPath={backPath} />}

      <BreakpointHelper show={false} />

      {children}
    </div>
  )
}
