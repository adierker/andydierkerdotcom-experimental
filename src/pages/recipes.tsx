import Head from 'next/head'

import {Recipes, BreakpointHelper} from 'components'
import {getRecipePageContent} from 'content'

export default function RecipePage() {

  const recipePageContent = getRecipePageContent()

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>andydierker.com | recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BreakpointHelper/> */}
      <Recipes {...recipePageContent}/>
    </div>
  )
}
