import {GetStaticPropsResult} from 'next'

import {PageWrapper, RecipeListPage} from 'components'
import {getPageContentFromFirestore} from 'services'
import {RecipeListPageContent} from 'types'
import {convertContentToGetStaticPropsResult} from 'utils'

export const getStaticProps = async (): Promise<GetStaticPropsResult<RecipeListPageContent>> => {
  const recipeListPageContent = await getPageContentFromFirestore('/recipes') as RecipeListPageContent
  return convertContentToGetStaticPropsResult(recipeListPageContent)
}

export const Recipes = (props: RecipeListPageContent) => {
  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <RecipeListPage {...props}/>
    </PageWrapper>
  )
}

export default Recipes