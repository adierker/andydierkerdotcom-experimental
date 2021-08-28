import {ReactNode, useState, useEffect, useRef} from 'react'

import {ServingsForm} from 'components'
import {RecipeContent, IngredientGrouping, Ingredient} from 'types'
import {useServings} from 'hooks'
import {ExternalLink} from 'components'

const Heading = ({heading}: {heading: string}) => (
  <h2 className="text-4xl mb-6 headline-font">
    {heading}
  </h2>
)

const Ul = ({children}: {children: ReactNode}) => (
  <ul className="list-disc list-inside mb-4">
    {children}
  </ul>
)

const Li = ({children}: {children: ReactNode}) => (
  <li className="mb-2 ml-4">
    {children}
  </li>
)

export const RecipeDetailPage = ({
  name,
  descriptions,
  url,
  isScalable,
  defaultServings,
  ingredients,
  instructions,
  notes
}: RecipeContent) => {
  const {servings, setServings} = useServings(defaultServings)

  const scalingCoeff: number = servings/defaultServings

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto text-drkr-black text-base body-font">

      <section id="intro" className="mb-10">
        <h1 className="text-5xl sm:text-6xl mb-6 text-center headline-font">
          {name}
        </h1>
        <div>
          {descriptions.map((description, index) => (
            <p className="mb-3" key={`desc-${index}`}>{description}</p>
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
        <Heading heading="Ingredients"/>
        {ingredients.map(({name, items}: IngredientGrouping, groupingIndex) => (
          <div key={`grouping-${groupingIndex}`}>
            {name && <h3 className="mb-2 headline-spaced-font">{name}</h3>}
            <Ul> 
              {items.map(({num, unit, ingredient}: Ingredient, itemIndex) => {
                // toFixed cuts it to 2 decimal places max, parseFloat removes any trailing zeroes: 1.5 instead of 1.50
                const scaledNum = parseFloat((num * scalingCoeff).toFixed(2))
                const isPlural = scaledNum && (typeof scaledNum === 'number') && (scaledNum > 1)
                const suffix = isPlural ? 's' : ''
                return (
                  <Li key={`{${ingredient}-${itemIndex}`}>
                    {num && `${(scaledNum).toString()} `}
                    {/* if there is a unit, pluralize the unit: 2 tbsps lime */}
                    {unit && `${unit}${suffix} `}
                    {/* if there is no unit, pluralize the ingredient instead: 2 limes */}
                    {!unit ? `${ingredient}${suffix}` : `${ingredient}`}
                  </Li>
                )
              })}
            </Ul>
          </div>
        ))}
      </section>

      <section id="instructions" className="mb-10">
        <Heading heading="Instructions"/>
        <Ul>
          {instructions.map((instruction, index) => (
            <Li key={`${instruction}-${index}`}>
              {instruction}
            </Li>
          ))}
        </Ul>
      </section>

    </main>
  )
}