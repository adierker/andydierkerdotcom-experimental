import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsResult,
} from 'next'

import { PageWrapper, RecipeDetailPage } from 'components'
import { RecipeContent, RecipeListContent } from 'types'
import { SITEPATHS, COLLECTIONS } from 'consts'
import { getCollectionFromFirestore, getDocumentFromFirestore } from 'services'
import {
  convertContentToGetStaticPathsResult,
  convertContentToGetStaticPropsResult,
} from 'utils'

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const recipeList = await getCollectionFromFirestore<RecipeListContent>(
      COLLECTIONS.RECIPES
    )
    return convertContentToGetStaticPathsResult(recipeList, 'recipe', 'path')
  }

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<RecipeContent>> => {
  const recipeContent = await getDocumentFromFirestore<RecipeContent>(
    COLLECTIONS.RECIPES,
    `/${params.recipe}`
  )
  return convertContentToGetStaticPropsResult<RecipeContent>(recipeContent)
}

export const Recipe = (props: RecipeContent) => {
  const recipeContent = props

  return (
    <PageWrapper
      pageTitle={`andydierker.com | ${recipeContent.name.toLowerCase()}`}
      hasHeader={true}
      backText={'Recipes'}
      backPath={SITEPATHS.RECIPES}
    >
      <RecipeDetailPage {...recipeContent} />
    </PageWrapper>
  )
}

export default Recipe
