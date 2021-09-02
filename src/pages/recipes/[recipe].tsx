import {GetStaticPaths, GetStaticPathsResult, GetStaticPropsResult} from 'next'

import {PageWrapper, RecipeDetailPage} from 'components'
import {RecipeContent, RecipeListContent} from 'types'
import {SITEPATHS} from 'consts'
import {getRecipeListContentFromFirestore, getRecipeContentFromFirestore} from 'services'
import {convertContentToGetStaticPathsResult, convertContentToGetStaticPropsResult} from 'utils'

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const recipeList: RecipeListContent = await getRecipeListContentFromFirestore()
  return convertContentToGetStaticPathsResult(recipeList, 'recipe', 'path')
}

export const getStaticProps = async ({params}): Promise<GetStaticPropsResult<RecipeContent>> => {
  const recipeContent: RecipeContent = await getRecipeContentFromFirestore(`/${params.recipe}`)
  return convertContentToGetStaticPropsResult(recipeContent)
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
      <RecipeDetailPage {...recipeContent}/>
    </PageWrapper>
  )
}

export default Recipe