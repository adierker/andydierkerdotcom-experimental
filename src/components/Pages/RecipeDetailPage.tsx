import {RecipeContent} from 'types'

export const RecipeDetailPage = (recipe: RecipeContent) => {
  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto">
      <section id="intro" className="text-drkr-black">
        {recipe.name}
        {recipe.description}
      </section>
    </main>
  )
}