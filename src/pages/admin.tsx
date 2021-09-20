import { ReactElement } from 'react'

import { PageWrapper, AddRecipeForm } from 'components'
import { ModalContextProvider } from 'contexts'

export const Admin = (): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
        <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl mb-8 text-center headline-font">
            Add New Recipe
          </h1>
          <AddRecipeForm />
        </main>
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default Admin
