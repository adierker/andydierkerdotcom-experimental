import { ReactElement } from 'react'

import { Container, Heading, PageWrapper, AddRecipeForm } from 'components'
import { SITEPATHS } from 'consts'
import { ModalContextProvider } from 'contexts'

export const AddRecipe = (): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper
        pageTitle="admin | add new recipe"
        hasNavigation={true}
        backText={'Admin'}
        backPath={SITEPATHS.ADMIN}
      >
        <Container>
          <Heading text="Add New Recipe" />
          <AddRecipeForm />
        </Container>
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default AddRecipe
