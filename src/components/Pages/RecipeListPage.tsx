import { ReactElement } from 'react'

import { Heading, InternalLink, Container } from 'components'
import { RecipeListPageProps } from 'types'

export const RecipeListPage = ({
  recipeListPageContent,
  recipeList,
  recipePath,
}: RecipeListPageProps): ReactElement => {
  const { heading, texts } = recipeListPageContent

  return (
    <Container>
      <section id="intro" className="text-drkr-black">
        <Heading text={heading} />
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
    </Container>
  )
}
