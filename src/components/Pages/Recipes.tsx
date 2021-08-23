import Link from 'next/link'

import {SITEMAP} from 'consts'
import {RecipePageContent, RecipesContent} from 'types'
import {getRecipeContent} from 'content'

export const Recipes = ({heading, texts}: RecipePageContent) => {
  const recipes: RecipesContent = getRecipeContent()

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto">

      <section id="intro" className="text-drkr-black">
        <h1 className="text-5xl sm:text-6xl mb-4 text-center headline-font">
          {heading}
        </h1>
        <div className="text-sm xs:text-base mb-4 body-font">
          {texts.map((text, index) => (
            <p className="mb-3" key={`text-${index}`}>{text}</p>
          ))}
        </div>
      </section>

      <section id="recipe-links" className="w-full mt-4 headline-spaced-font text-xl underline ">
        {recipes.map((recipe, index) => (
          <div className="mb-4">
            <Link href={`${SITEMAP.RECIPES}/${recipe.path}`}>
              <a className="drkr-focus text-drkr-hover">
                {recipe.name}
              </a>
            </Link>
          </div>
        ))}
      </section>
    </main>
  )
}