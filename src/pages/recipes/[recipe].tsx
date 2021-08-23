import { useRouter, NextRouter } from 'next/router'

import {PageWrapper, Recipe} from 'components'
import {RecipePageContent, Recipe as RecipeType} from 'types'
import {getRecipe} from 'content'

export default function RecipePage({heading, texts}: RecipePageContent) {
  const router: NextRouter = useRouter()
  const {recipe: recipePath} = router.query
  
  let recipeContent: RecipeType
  
  // on first render, recipePath will be undefined (it is a hook)
  if (recipePath) {
    try {
      // router.query returns a string | string[] so we must cast it
      const fetched: RecipeType = getRecipe(recipePath as string)
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
    >
      <Recipe {...recipeContent}/>
    </PageWrapper>
  )
}