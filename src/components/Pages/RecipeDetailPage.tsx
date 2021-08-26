import {ReactNode} from 'react'

import {RecipeContent, IngredientGrouping, Ingredient} from 'types'

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

const Li = ({children, key}: {children: ReactNode, key: string}) => (
  <li className="mb-2 ml-4" key={key}>
    {children}
  </li>
)

export const RecipeDetailPage = ({
  name,
  description,
  url,
  isScalable,
  servings,
  ingredients,
  instructions,
  notes
}: RecipeContent) => {
  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto text-drkr-black text-base body-font">
      <section id="intro" className="mb-10">
        <h1 className="text-5xl sm:text-6xl mb-6 text-center headline-font">
          {name}
        </h1>
        <div>
          {description}
        </div>
      </section>
      <section id="ingredients" className="mb-10">
        <Heading heading="Ingredients"/>
        {ingredients.map(({name, items}: IngredientGrouping, groupingIndex) => (
          <div key={`grouping-${groupingIndex}`}>
            {name && <h3 className="mb-2 headline-spaced-font">{name}</h3>}
            <Ul> 
              {items.map(({num, unit, ingredient}: Ingredient, itemIndex) => {
                const isPlural = num && (typeof num === 'number') && (num > 1)
                return (
                  <Li key={`{${ingredient}-${itemIndex}`}>
                    {num && `${num.toString()} `}
                    {unit && `${unit}${isPlural ? 's' : ''} `}
                    {ingredient}
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
          {instructions().map((instruction, index) => (
            <Li key={`${instruction}-${index}`}>
              {instruction}
            </Li>
          ))}
        </Ul>
      </section>
    </main>
  )
}