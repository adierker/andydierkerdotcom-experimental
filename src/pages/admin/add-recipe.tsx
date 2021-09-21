import { ReactElement } from 'react'

import { PageWrapper, AddRecipeForm } from 'components'
import { SITEPATHS } from 'consts'
import { ModalContextProvider } from 'contexts'

export const AddRecipe = (): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper
        pageTitle="andydierker.com | add new recipe"
        hasHeader={true}
        backText={'Admin'}
        backPath={SITEPATHS.ADMIN}
      >
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

export default AddRecipe
