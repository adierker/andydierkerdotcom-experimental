import { ReactElement } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { Button, Container, Heading, PageWrapper } from 'components'
import { SITEPATHS } from 'consts'

export const Admin = (): ReactElement => {
  const router: NextRouter = useRouter()
  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasNavigation={true}>
      <Container className="items-center">
        <Heading text="Admin" className="text-center" />
        <div className="flex flex-col w-64">
          <Button
            text="Add recipe"
            onClick={() => router.push(SITEPATHS.ADD_RECIPE)}
            className="focus-visible:bg-drkr-black mb-3"
          />
          <Button
            text="Edit recipes"
            onClick={() => router.push(SITEPATHS.EDIT_RECIPE)}
            className="focus-visible:bg-drkr-black"
          />
        </div>
      </Container>
    </PageWrapper>
  )
}

export default Admin
