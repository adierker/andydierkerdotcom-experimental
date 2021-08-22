import {RecipePageContent} from 'types'
import {getRecipeContent} from 'content'

export const Recipes = ({heading, texts}: RecipePageContent) => {
  const recipes = getRecipeContent()
  console.log('recipes:', recipes)

  return (
    <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 text-drkr-black">
      <section id="intro" className="mt-4 sm:mt-8 text-center text-drkr-black">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl headline-font">
          {heading}
        </h1>
        <h2 className="text-2xl xs:text-2xl body-font mt-2 xs:mt-4">
          {texts.map((text, index) => (
            <p className="" key={`text-${index}`}>{text}</p>
          ))}
        </h2>
      </section>
    </main>
  )
}