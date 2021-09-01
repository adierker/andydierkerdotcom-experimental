import {PageWrapper, RecipeListPage} from 'components'
import {getPageContent} from 'services'
import {RecipeListPageContent} from 'types'

export const getStaticProps = async () => {
  const recipesPageContent = await getPageContent('/recipes') as RecipeListPageContent
  // raw data must be converted to json before being sent through nextjs as props
  const jsonRecipesPageContent = JSON.parse(JSON.stringify(recipesPageContent))

  return {
    props: jsonRecipesPageContent,
    revalidate: true
  }
}

export const Recipes = (props: RecipeListPageContent) => {
  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <RecipeListPage {...props}/>
    </PageWrapper>
  )
}

export default Recipes