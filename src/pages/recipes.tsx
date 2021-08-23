import Head from 'next/head'

import {Recipes, Header, BreakpointHelper} from 'components'
import {getRecipePageContent} from 'content'

export default function RecipePage() {

  const recipePageContent = getRecipePageContent()

  return (
    <div className="flex flex-col min-h-screen text-drkr-black">
      <Head>
        <title>andydierker.com | recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BreakpointHelper/> */}
      <Header/>

      <Recipes {...recipePageContent}/>
    </div>
  )
}
