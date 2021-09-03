import {GetStaticPropsResult} from 'next'

import {PageWrapper, RecipeListPage} from 'components'
import {getDocumentFromFirestore} from 'services'
import {RecipeListPageContent} from 'types'
import {convertContentToGetStaticPropsResult} from 'utils'
import {COLLECTIONS} from 'consts'

export const getStaticProps = async (): Promise<GetStaticPropsResult<RecipeListPageContent>> => {
  const recipeListPageContent = await getDocumentFromFirestore<RecipeListPageContent>(COLLECTIONS.PAGES, '/recipes')
  return convertContentToGetStaticPropsResult<RecipeListPageContent>(recipeListPageContent)
}

export const Recipes = (props: RecipeListPageContent) => {
  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <RecipeListPage {...props}/>
    </PageWrapper>
  )
}

export default Recipes