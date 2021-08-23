import {PageWrapper, Recipes} from 'components'
import {getRecipesPageContent} from 'content'

export default function RecipesPage() {
  const recipesPageContent = getRecipesPageContent()

  return (
    <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
      <Recipes {...recipesPageContent}/>
    </PageWrapper>
  )
}
