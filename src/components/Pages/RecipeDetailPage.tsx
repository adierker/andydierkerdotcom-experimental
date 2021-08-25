import {RecipeContent, Ingredient} from 'types'

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
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto text-base body-font">
      <section id="intro" className="text-drkr-black">
        <h1 className="text-5xl sm:text-6xl mb-6 text-center headline-font">
          {name}
        </h1>
        <div className="text-base mb-10 body-font">
          {description}
        </div>
        <div className="text-4xl mb-6 headline-font">
          Ingredients
        </div>
        <ul>
          {ingredients.map(({num, unit, ingredient}: Ingredient) => {
            const isPlural = num && (typeof num === 'number') && (num > 1)
            return (
              <li className="flex mb-2">
                <span className="flex-1">{num && num.toString()}</span>
                <span className="flex-1">{unit && `${unit}${isPlural ? 's' : ''}`}</span>
                <span className="flex-1">{ingredient}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}