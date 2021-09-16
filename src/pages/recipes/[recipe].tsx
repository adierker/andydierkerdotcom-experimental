import { ReactElement } from 'react'

import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsResult,
} from 'next'

import { PageWrapper } from 'components'
import { SITEPATHS, COLLECTIONS } from 'consts'
import { RecipeDetailPage } from 'page'
import { getCollectionFromFirestore, getDocumentFromFirestore } from 'services'
import { RecipeContent, RecipeListContent } from 'types'
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

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<RecipeContent>> => {
  const recipeContent = await getDocumentFromFirestore<RecipeContent>(
    COLLECTIONS.RECIPES,
    `/${params.recipe}`
  )
  return convertContentToGetStaticPropsResult<RecipeContent>(recipeContent)
}

export const Recipe = (props: RecipeContent): ReactElement => {
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
