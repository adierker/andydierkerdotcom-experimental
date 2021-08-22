import {RecipePageContent} from 'types'
import {getRecipeContent} from 'content'

export const Recipes = ({heading, texts}: RecipePageContent) => {
  const recipes = getRecipeContent()
  console.log('recipes:', recipes)

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 md:max-w-xl md:mx-auto text-drkr-black">
      <section id="intro" className="mt-4 sm:mt-8 text-drkr-black">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl mb-6 text-center headline-font">
          {heading}
        </h1>
        <div className="text-sm xs:text-base body-font mt-2 xs:mt-4">
          {texts.map((text, index) => (
            <p className="mb-3" key={`text-${index}`}>{text}</p>
          ))}
        </div>
      </section>
    </main>
  )
}