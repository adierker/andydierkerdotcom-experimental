import Head from 'next/head'

import {Recipes, BreakpointHelper} from 'components'
import {getRecipeContent} from 'content'

export default function RecipePage() {

  const recipeContent = getRecipeContent()

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>andydierker.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BreakpointHelper/> */}
      <Recipes {...recipeContent}/>
    </div>
  )
}
