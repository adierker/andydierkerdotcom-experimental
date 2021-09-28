import { ReactElement } from 'react'

import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsResult,
} from 'next'

import { PageWrapper, EditRecipeForm } from 'components'
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

export const EditRecipe = (props: RecipeContent): ReactElement => {
  const recipeContent = props

  return (
    <PageWrapper
      pageTitle={`admin | edit ${recipeContent.name.toLowerCase()}`}
      hasHeader={true}
      backText={'Edit Recipes'}
      backPath={SITEPATHS.EDIT_RECIPE}
    >
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl mb-8 text-center headline-font">
          {`Edit ${recipeContent.name}`}
        </h1>
        <EditRecipeForm {...recipeContent} />
      </main>
    </PageWrapper>
  )
}

export default EditRecipe
