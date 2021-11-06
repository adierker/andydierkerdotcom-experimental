import { ReactElement } from 'react'

import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsResult,
} from 'next'

import { Container, Heading, PageWrapper, EditRecipeForm } from 'components'
import { SITEPATHS, DB_COLLECTIONS } from 'consts'
import { ModalContextProvider } from 'contexts'
import { getCollectionFromFirestore, getDocumentFromFirestore } from 'services'
import { transformRecipeContentToRecipeFormData } from 'transformers'
import { RecipeContent, RecipeListContent, RecipeFormData } from 'types'
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
  const recipeFormData: RecipeFormData =
    transformRecipeContentToRecipeFormData(props)

  return (
    <ModalContextProvider>
      <PageWrapper
        pageTitle={`admin | edit ${recipeContent.name.toLowerCase()}`}
        hasNavigation={true}
        backText={'Edit Recipes'}
        backPath={SITEPATHS.EDIT_RECIPE}
      >
        <Container>
          <Heading text={`Edit ${recipeContent.name}`} />
          <EditRecipeForm {...recipeFormData} />
        </Container>
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default EditRecipe
