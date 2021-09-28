import { RecipeContent, RecipeFormData } from 'types'

export const transformRecipeFormDataToRecipeContent = (
  addRecipeFormData: RecipeFormData
): RecipeContent => {
  const {
    name,
    path,
    url,
    defaultServings: defaultServingsAsString,
    isScalable: isScalableAsString,
    descriptions: descriptionsNestedInParagraphs,
    ingredientGroupings: formGroupings,
    instructions: instructionsNestedInSteps,
    notes: notesNestedInNotes,
  } = addRecipeFormData

  // convert defaultServings to a number (from a string)
  const defaultServings = parseInt(defaultServingsAsString, 10)
  // convert isScalable to an actual boolean (from a string)
  const isScalable = isScalableAsString === 'true' ? true : false
  // convert descriptions to a flat array of strings (from array of objects)
  const descriptions = descriptionsNestedInParagraphs.map((obj) => {
    return obj.paragraph
  })
  // convert ingredients to IngredientGrouping[] from a very different shape
  const ingredients = formGroupings.map((grouping) => {
    const items = grouping.ingredients.map(({ num, unit, ingredient }) => {
      let parsedNum
      // convert the num field to a float (from a string) if it was included
      if (num) {
        parsedNum = parseFloat(parseFloat(num).toFixed(2))
      }
      // num and unit can be undefined, but ingredient is required and is a string
      return {
        num: parsedNum || undefined, // if its 0, make it undefined
        unit: unit || undefined, // if its empty string, make it undefined,
        ingredient,
      }
    })
    // return each grouping as a name and a list of items
    return {
      name: grouping?.groupingName || null,
      items,
    }
  })
  // convert instructions to a flat array of strings (from array of objects)
  const instructions = instructionsNestedInSteps.map((obj) => {
    return obj.step
  })

  // convert notes to a flat array of strings (from array of objects)
  const notes = notesNestedInNotes.map((obj) => {
    return obj.note
  })

  const recipe: RecipeContent = {
    name,
    path,
    url,
    defaultServings,
    isScalable,
    descriptions,
    ingredients,
    instructions,
    notes,
  }

  return recipe
}

export const transformRecipeContentToRecipeFormData = ({
  name,
  path,
  url,
  defaultServings: defaultServingsAsANumber,
  isScalable: isScalableAsABoolean,
  descriptions: descriptionsAsStringArray,
  ingredients: ingredientsAsGroupings,
  instructions: instructionsAsStringArray,
  notes: notesAsStringArray,
}: RecipeContent): RecipeFormData => {
  // convert defaultServings to a string (from a number)
  const defaultServings = defaultServingsAsANumber.toString()

  // convert isScalable to a string from a boolean
  const isScalable = isScalableAsABoolean === true ? 'true' : 'false'

  // convert descriptions to an array of paragraph objects (from an array of strings)
  const descriptions = descriptionsAsStringArray.map((x) => ({
    paragraph: x,
  }))

  // convert ingredientGroupings to an array of grouping objects (from an array of groupings)
  const ingredientGroupings = ingredientsAsGroupings.map((grouping) => ({
    groupingName: grouping.name,
    ingredients: grouping.items.map((item) => ({
      num: item?.num?.toString(),
      unit: item.unit,
      ingredient: item.ingredient,
    })),
  }))

  // convert instructions to an array of step objects (from an array of strings)
  const instructions = instructionsAsStringArray.map((x) => ({
    step: x,
  }))

  // convert instructions to an array of step objects (from an array of strings)
  const notes = notesAsStringArray?.map((x) => ({
    note: x,
  }))

  const formData: RecipeFormData = {
    name,
    path,
    url,
    defaultServings,
    isScalable,
    descriptions,
    ingredientGroupings,
    instructions,
    notes,
  }
  return formData
}
