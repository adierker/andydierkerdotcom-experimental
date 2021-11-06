import { ReactElement } from 'react'

import { GetStaticPropsResult } from 'next'

import { PageWrapper, RecipeListPage } from 'components'
import { DB_COLLECTIONS, SITEPATHS } from 'consts'
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
      'recipes'
    )
  const recipeList = await getCollectionFromFirestore<RecipeListContent>(
    DB_COLLECTIONS.RECIPES
  )
  const recipePath = SITEPATHS.RECIPES

  return convertContentToGetStaticPropsResult<RecipeListPageProps>({
    recipeListPageContent,
    recipeList,
    recipePath,
  })
}

export const Recipes = (props: RecipeListPageProps): ReactElement => {
  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasNavigation={true}>
      <RecipeListPage {...props} />
    </PageWrapper>
  )
}

export default Recipes
