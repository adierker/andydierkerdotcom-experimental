import { ReactElement, ReactNode } from 'react'

import { Container, ExternalLink, Heading, ServingsForm } from 'components'
import { useServings } from 'hooks'
import { RecipeContent, IngredientGrouping, Ingredient } from 'types'

const Ul = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc list-inside mb-4">{children}</ul>
)

export const RecipeDetailPage = ({
  name,
  descriptions,
  url,
  // isScalable,
  defaultServings,
  ingredients,
  instructions,
}: // notes,
RecipeContent): ReactElement => {
  const { servings, setServings } = useServings(defaultServings)

  const scalingCoeff: number = servings / defaultServings

  return (
    <Container>
      <section id="intro" className="mb-10">
        <Heading text={name} />
        <div>
          {descriptions.map((description, index) => (
            <p className="mb-3" key={`desc-${index}`}>
              {description}
            </p>
          ))}
        </div>
        {url && (
          <div>
            Original recipe: <ExternalLink href={url}>here</ExternalLink>.
          </div>
        )}
      </section>

      <section id="controls" className="mb-10">
        <ServingsForm
          defaultServings={defaultServings}
          setServings={setServings}
        />
      </section>

      <section id="ingredients" className="mb-10">
        <Heading text="Ingredients" level={2} />
        {ingredients.map(
          ({ name, items }: IngredientGrouping, groupingIndex) => (
            <div key={`grouping-${groupingIndex}`}>
              {name && <h3 className="mb-2 headline-spaced-font">{name}</h3>}
              <Ul>
                {items.map(
                  ({ num, unit, ingredient }: Ingredient, itemIndex) => {
                    // toFixed cuts it to 2 decimal places max, parseFloat removes any trailing zeroes: 1.5 instead of 1.50
                    const scaledNum = parseFloat(
                      (num * scalingCoeff).toFixed(2)
                    )
                    const isPlural =
                      scaledNum &&
                      typeof scaledNum === 'number' &&
                      scaledNum > 1
                    const suffix = isPlural ? 's' : ''
                    return (
                      <li
                        key={`{${ingredient}-${itemIndex}`}
                        className="mb-2 ml-4"
                      >
                        {num && `${scaledNum.toString()} `}
                        {/* if there is a unit, pluralize the unit: 2 tbsps lime */}
                        {unit && `${unit}${suffix} `}
                        {/* if there is no unit, pluralize the ingredient instead: 2 limes */}
                        {!unit ? `${ingredient}${suffix}` : `${ingredient}`}
                      </li>
                    )
                  }
                )}
              </Ul>
            </div>
          )
        )}
      </section>

      <section id="instructions">
        <Heading text="Instructions" level={2} />
        <Ul>
          {instructions.map((instruction, index) => (
            <li key={`${instruction}-${index}`} className="mb-4">
              {instruction}
            </li>
          ))}
        </Ul>
      </section>
    </Container>
  )
}
