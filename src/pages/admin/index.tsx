import { ReactElement } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { PageWrapper, Button } from 'components'
import { SITEPATHS } from 'consts'

export const Admin = (): ReactElement => {
  const router: NextRouter = useRouter()
  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl mb-8 text-center headline-font">
          Admin
        </h1>
        <Button
          text="Add new recipe"
          onClick={() => router.push(SITEPATHS.ADD_RECIPE)}
          className="focus-visible:bg-drkr-black"
        />
      </main>
    </PageWrapper>
  )
}

export default Admin
