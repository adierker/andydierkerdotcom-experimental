import {useRouter, NextRouter} from 'next/router'

import {PageWrapper, RecipeDetailPage} from 'components'
import {RecipeContent} from 'types'
import {getRecipeContent} from 'content'
import {SITEPATHS} from 'consts'

export default function Recipe() {
  const router: NextRouter = useRouter()
  const {recipe: recipePath} = router.query
  
  let recipeContent: RecipeContent
  
  // on first render, recipePath will be undefined (the useRouter hook needs 1 render to return a value)
  if (recipePath) {
    try {
      // router.query returns a string OR string[] so we must cast it
      const fetched: RecipeContent = getRecipeContent(recipePath as string)
      recipeContent = fetched
    }
    catch (error) {
      console.log('Error while fetching recipe.', error)
    }
  }

  if (!recipePath || !recipeContent) { 
    return null 
  }

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