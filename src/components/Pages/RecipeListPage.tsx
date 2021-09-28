import { ReactElement } from 'react'

import { InternalLink } from 'components'
import { RecipeListPageProps } from 'types'

export const RecipeListPage = ({
  recipeListPageContent,
  recipeList,
  recipePath,
}: RecipeListPageProps): ReactElement => {
  const { heading, texts } = recipeListPageContent

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto">
      <section id="intro" className="text-drkr-black">
        <h1 className="text-5xl sm:text-6xl mb-4 text-center headline-font">
          {heading}
        </h1>
        <div className="text-base mb-4 body-font">
          {texts.map((text, index) => (
            <p className="mb-3" key={`text-${index}`}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section
        id="recipe-links"
        className="w-full mt-4 headline-spaced-font text-xl underline "
      >
        {recipeList.map((recipe, index) => (
          <div className="mb-4" key={`recipe-${index}`}>
            <InternalLink
              href={`${recipePath}/${recipe.path}`}
              className="drkr-focus text-drkr-hover"
            >
              {recipe.name}
            </InternalLink>
          </div>
        ))}
      </section>
    </main>
  )
}
