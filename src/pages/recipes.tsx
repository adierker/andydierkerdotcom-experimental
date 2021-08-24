import {PageWrapper, RecipeListPage} from 'components'
import {getRecipeListPageContent} from 'content'

export default function Recipes() {
  const recipesPageContent = getRecipeListPageContent()

  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <RecipeListPage {...recipesPageContent}/>
    </PageWrapper>
  )
}
