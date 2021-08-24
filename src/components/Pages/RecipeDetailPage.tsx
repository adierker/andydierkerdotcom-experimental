import {RecipeContent} from 'types'

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
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto">
      <section id="intro" className="text-drkr-black">
        <h1 className="text-5xl sm:text-6xl mb-4 text-center headline-font">
          {name}
        </h1>
        <div className="text-base mb-4 body-font">
          {description}
        </div>
      </section>
    </main>
  )
}