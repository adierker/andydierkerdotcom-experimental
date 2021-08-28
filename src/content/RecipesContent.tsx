import {
  RecipeContent,
  RecipeListContent,
  RecipeListPageContent,
} from 'types'
import {ExternalLink} from 'components'

export const getRecipeListPageContent = (): RecipeListPageContent => ({
  heading: 'Recipes',
  texts: [
    "I didn't come up with ANY of these recipes on my own, my wife and I found them online and over time have tweaked the preparation or ingredients to our liking. So I built this app to keep track of our adjustments.",
    "You might want to lower your expectations, most of these recipes fall in the 'extremely easy-to-prepare weeknight dinner' category, not a lot of fancy stuff to be found here."
  ]
})

export const getRecipeListContent = (): RecipeListContent => ([
  {
    name: 'Salsa Chicken',
    path: 'salsa-chicken',
    description: (
      <>
        <p className="mb-3">
          This recipe is easy-as-hell and makes great leftovers. For the most part, you dump stuff in a bowl and just check on it every few minutes. It's also pretty customizable, you can add jalapenos, use different salsas, hot sauces, what you want.
        </p>
        <p className="mb-3">
          I can't take credit though... this is pretty much exactly the recipe from Budget Bytes with minimal changes. Check out that recipe <ExternalLink href="https://www.budgetbytes.com/salsa-chicken-meal-prep-bowls/">here</ExternalLink>.
        </p>
      </>
    ),
    url: 'https://www.budgetbytes.com/salsa-chicken-meal-prep-bowls/',
    isScalable: true,
    defaultServings: 6,
    ingredients: [
      {
        name: 'Rice', 
        items: [
          {num: 1.5,    unit: 'cup',    ingredient: 'white rice'},
          {num: 3,      unit: 'cup',    ingredient: 'water'},
          {                             ingredient: 'salt'},
        ]
      },
      {
        name: 'Salsa chicken', 
        items: [
          {num: 2,      unit: 'lb',     ingredient: 'chicken breast'},
          {num: 24,     unit: 'oz',     ingredient: 'salsa'},
          {num: 0.75,   unit: 'cup',    ingredient: 'chicken broth'},
          {num: 1.5,    unit: 'tsp',    ingredient: 'chili powder'},
          {                             ingredient: 'salt'},
        ]
      },
      {
        name: 'Roasted bell peppers', 
        items: [
          {num: 4.5,                    ingredient: 'red bell pepper'},
          {                             ingredient: 'olive oil'},
          {                             ingredient: 'salt'},
        ]
      },
      {
        name: 'Toppings', 
        items: [
          {num: 6,      unit: 'tbsp',   ingredient: 'sour cream'},
          {                             ingredient: 'sliced green onions'},
          {                             ingredient: 'hot sauce'},
        ]
      },
    ],
    instructions: [
      `Preheat the oven to 425ºF.`,
      `Cook the rice: add rice, water, a squirt of olive oil and some salt to small pot. Put it on a cold burner uncovered, turn to high heat. When the rice and water is boiling, turn the burner to low, cover the pot and let it simmer for 15 minutes (do not open the lid to check on it). After 15 minutes, leave the lid on and remove the pot from the burner and let sit for 10 minutes.`,
      `While the rice is cooking, add the chicken breasts to the dutch oven along with the salsa, chicken broth, and chili powder. Give everything a stir.`,
      `Place a lid on the pot and bring it to a boil over high heat. Once the liquid starts boiling, turn the heat down to low and let the chicken simmer over low for 30 minutes. Make sure it's simmering the whole time, adjusting the heat slightly if needed.`,
      `While the rice and chicken are cooking, prepare the bell peppers. Slice the bell peppers into 1/2-inch-wide strips. Place them on a baking sheet and drizzle with cooking oil. Toss the peppers to coat them in oil, then sprinkle with a pinch of salt.`,
      `Roast the peppers in the preheated oven until they are browned on the edges (about 30 minutes), stirring once half way through.`,
      `After the chicken has simmered for 30 minutes, remove it from the salsa mixture and use two forks to shred the meat. Return the shredded chicken to the pot of salsa and stir to combine.`,
      `Once the rice has rested, the chicken has been shredded, and the peppers have finished roasting, it's time to build the bowls.`,
      `Add about 3/4 cup rice to each container, followed by 1/4 of the roasted peppers, and 1/4 of the shredded chicken. Spoon the salsa mixture from the pot over the shredded chicken in the containers. This will act as a sauce to help moisten the entire dish. Top with sliced green onions, a dollop of sour cream, hot sauce, and salt. Serve immediately or refrigerate for up to 4 days.`,
    ]
  },
  {
    name: 'Jerk Chicken with Pineapple Black Bean Salsa',
    path: 'jerk-chicken-pineapple-black-bean-salsa',
    description: (
      <>
        <p className="mb-3">Jerk chicken with pineapple black bean salsa recipe based on the one from Budget Bytes.</p>
      </>
    ),
    url: 'https://www.budgetbytes.com/jerk-chicken-with-pineapple-black-bean-salsa/',
    isScalable: true,
    defaultServings: 6,
    ingredients: [
      {
        name: 'Rice',
        items: [
          {num: 1.5,    unit: 'cup',    ingredient: 'white or jasmine rice'},
          {num: 3,      unit: 'cup',    ingredient: 'water'},
          {                             ingredient: 'salt'},
        ]
      },
      {
        name: 'Pineapple black bean salsa',
        items: [
          {num: 3,      unit: 'cup',            ingredient: 'pineapple tidbits'},
          {num: 1.5,    unit: '15 oz can',      ingredient: 'black beans'},
          {num: 0.5,    unit: 'cup',            ingredient: 'diced red onion'},
          {num: 0.75,   unit: 'cup',            ingredient: 'chopped cilantro'},
          {num: 1.5,                            ingredient: 'lime'},
          {                                     ingredient: 'crushed red pepper flakes'},
        ]
      },
      {
        name: 'Jerk chicken',
        items: [
          {num: 2,      unit: 'lb',             ingredient: 'chicken breast'},
          {                                     ingredient: 'jerk seasoning'},
          {                                     ingredient: 'olive oil'},
        ]
      },
      {
        name: 'Toppings',
        items: [
          {num: 1.5,                            ingredient: 'lime'},
          {                                     ingredient: 'sliced green onions'},
          {                                     ingredient: 'hot sauce'},
        ]
      },
    ],
    instructions: [
      `Cook the rice: add rice, water, a squirt of olive oil and some salt to small pot. Put it on a cold burner uncovered, turn to high heat. When the rice and water is boiling, turn the burner to low, cover the pot and let it simmer for 15 minutes (do not open the lid to check on it). After 15 minutes, leave the lid on and remove the pot from the burner and let sit for 10 minutes.`,
      `While the rice is cooking, prepare the pineapple black bean salsa. Coarsely chop the pineapple tidbits into smaller pieces, similar in size to the black beans. Place the chopped pineapple, rinsed black beans, diced red onion, and chopped cilantro in a large bowl.`,
      `Squeeze the juice of half the lime over the ingredients in the bowl. Also add salt and red pepper flakes. Stir the ingredients together, give it a taste, and add more salt or lime juice if needed. Any unused lime will be cut into wedges for squeezing over the chicken before serving.`,
      `Next, prepare the jerk chicken. Pat the chicken breasts dry with a paper towel. Place a piece of plastic wrap over the chicken to eliminate splatter, then gently pound the chicken breasts into an even thickness using either a rolling pin or a mallet. Sprinkle the jerk seasoning over both sides of the chicken and use your hands to rub it into the surface, making sure they're completely coated.`,
      `Add the cooking oil to a large skillet, or preheat your grill. Once hot, add the chicken and cook until well browned on both sides, and the chicken is completely cooked through (about 7 minutes each side). It should no longer be pink in the center and the juices should run clear. For extra safety, use an instant read meat thermometer and cook until the internal temperature reaches 165ºF.`,
      `Transfer the cooked chicken to a clean cutting board and let it rest for five minutes. After five minutes, slice the chicken into 1/2-wide strips.`,
      `To serve, place about a cup of cooked rice on a plate, or in your meal prep container, top with about a cup of the pineapple black bean salsa, and a few strips of the jerk chicken. Slice the remaining lime into wedges and squeeze fresh juice over the chicken just before eating.`,
    ]
  }
])

export const getRecipeContent = (path: string): RecipeContent => {
  const recipes = getRecipeListContent()
  const matchingRecipes = recipes.filter(recipe => recipe.path === path)
  if (matchingRecipes.length > 1) {
    throw `Multiple recipes found for given path: ${path}`
  }
  if (matchingRecipes.length < 1) {
    throw `No recipes found for given path: ${path}`
  }
  return matchingRecipes[0]
}