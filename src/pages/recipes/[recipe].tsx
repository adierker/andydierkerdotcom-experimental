import { ReactElement } from 'react'

import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsResult,
} from 'next'

import { PageWrapper, RecipeDetailPage } from 'components'
import { SITEPATHS, DB_COLLECTIONS } from 'consts'
import { getCollectionFromFirestore, getDocumentFromFirestore } from 'services'
import { RecipeContent, RecipeListContent } from 'types'
import {
  convertContentToGetStaticPathsResult,
  convertContentToGetStaticPropsResult,
} from 'utils'

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const recipeList = await getCollectionFromFirestore<RecipeListContent>(
      DB_COLLECTIONS.RECIPES
    )
    return convertContentToGetStaticPathsResult(recipeList, 'recipe', 'path')
  }

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<RecipeContent>> => {
  const recipeContent = await getDocumentFromFirestore<RecipeContent>(
    DB_COLLECTIONS.RECIPES,
    `/${params.recipe}`
  )
  return convertContentToGetStaticPropsResult<RecipeContent>(recipeContent)
}

export const Recipe = (props: RecipeContent): ReactElement => {
  const recipeContent = props

  return (
    <PageWrapper
      pageTitle={`andydierker.com | ${recipeContent.name.toLowerCase()}`}
      hasNavigation={true}
      backText={'Recipes'}
      backPath={SITEPATHS.RECIPES}
    >
      <RecipeDetailPage {...recipeContent} />
    </PageWrapper>
  )
}

export default Recipe
