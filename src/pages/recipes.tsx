import { GetStaticPropsResult } from 'next'

import { PageWrapper, RecipeListPage } from 'components'
import { getDocumentFromFirestore, getCollectionFromFirestore } from 'services'
import {
  RecipeListPageContent,
  RecipeListContent,
  RecipeListPageProps,
} from 'types'
import { convertContentToGetStaticPropsResult } from 'utils'
import { COLLECTIONS } from 'consts'

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<RecipeListPageProps>
> => {
  const recipeListPageContent =
    await getDocumentFromFirestore<RecipeListPageContent>(
      COLLECTIONS.PAGES,
      '/recipes'
    )
  const recipeList = await getCollectionFromFirestore<RecipeListContent>(
    COLLECTIONS.RECIPES
  )
  return convertContentToGetStaticPropsResult<RecipeListPageProps>({
    recipeListPageContent,
    recipeList,
  })
}

export const Recipes = (props: RecipeListPageProps) => {
  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <RecipeListPage {...props} />
    </PageWrapper>
  )
}

export default Recipes
