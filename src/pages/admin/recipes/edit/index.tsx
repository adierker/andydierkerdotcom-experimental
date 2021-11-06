import { ReactElement } from 'react'

import { GetStaticPropsResult } from 'next'

import { PageWrapper, RecipeListPage } from 'components'
import { DB_COLLECTIONS, SITEPATHS } from 'consts'
import { ModalContextProvider } from 'contexts'
import { getDocumentFromFirestore, getCollectionFromFirestore } from 'services'
import {
  RecipeListPageContent,
  RecipeListContent,
  RecipeListPageProps,
} from 'types'
import { convertContentToGetStaticPropsResult } from 'utils'

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<RecipeListPageProps>
> => {
  const recipeListPageContent =
    await getDocumentFromFirestore<RecipeListPageContent>(
      DB_COLLECTIONS.PAGES,
      'edit-recipes'
    )
  const recipeList = await getCollectionFromFirestore<RecipeListContent>(
    DB_COLLECTIONS.RECIPES
  )
  const recipePath = SITEPATHS.EDIT_RECIPE
  return convertContentToGetStaticPropsResult<RecipeListPageProps>({
    recipeListPageContent,
    recipeList,
    recipePath,
  })
}

export const EditRecipes = (props: RecipeListPageProps): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper
        pageTitle="admin | edit recipes"
        hasNavigation={true}
        backText={'Admin'}
        backPath={SITEPATHS.ADMIN}
      >
        <RecipeListPage {...props} />
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default EditRecipes
