import {SITEPATHS} from 'consts'
import {RecipeListPageContent, RecipeListContent} from 'types'
import {getRecipeListContentFromApi} from 'services'
import {InternalLink} from 'components'
import {useEffectAsync} from 'hooks'
import {Loader} from 'loaders'

export const RecipeListPage = ({heading, texts}: RecipeListPageContent) => {
  const {data} = useEffectAsync(getRecipeListContentFromApi, [getRecipeListContentFromApi])
  const recipeList: RecipeListContent = data

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto">
      <section id="intro" className="text-drkr-black">
        <h1 className="text-5xl sm:text-6xl mb-4 text-center headline-font">
          {heading}
        </h1>
        <div className="text-base mb-4 body-font">
          {texts.map((text, index) => (
            <p className="mb-3" key={`text-${index}`}>{text}</p>
          ))}
        </div>
      </section>

      <section id="recipe-links" className="w-full mt-4 headline-spaced-font text-xl underline ">
        {recipeList ? recipeList.map((recipe, index) => (
          <div className="mb-4" key={`recipe-${index}`}>
            <InternalLink 
              href={`${SITEPATHS.RECIPES}/${recipe.path}`}
              className="drkr-focus text-drkr-hover"
            >
              {recipe.name}
            </InternalLink>
          </div>
        )) : (
          <Loader className="sq-24 m-auto"/>
        )}
      </section>
    </main>
  )
}