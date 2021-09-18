import * as yup from 'yup'

import { REGEX } from 'consts'

export const ADD_RECIPE_FORM_RESOLVER = yup.object().shape({
  name: yup.string().required(`Name is required.`),
  path: yup
    .string()
    .required(`Path is required.`)
    .matches(
      REGEX.LOWERCASE_AND_NUMBERS_AND_DASHES,
      `Only lowercase letters, numbers, and dashes are allowed.`
    ),
  url: yup
    .string()
    .required(`URL is required.`)
    .matches(REGEX.URL, `Must be a valid URL.`),
  defaultServings: yup
    .string()
    .required(`Default servings is required.`)
    .matches(REGEX.NUMBERS, 'Must be a number.'),
  scalable: yup.string().required(`Scalability is required.`).nullable(true),
  descriptions: yup.array().of(
    yup.object().shape({
      paragraph: yup
        .string()
        .required(`Any visible Description field is required.`),
    })
  ),
  ingredientGroupings: yup.array().of(
    yup.object().shape({
      groupingName: yup
        .string()
        .required(`Any visible Ingredient Grouping field is required.`),
      ingredients: yup.array().of(
        yup.object().shape({
          num: yup.string().matches(REGEX.NUMBERS_AND_DECIMALS, {
            message: `Must be a number.`,
            excludeEmptyString: true, //allows an empty string (aka this value is not required, but if a value is entered, must be number or decimal)
          }),
          unit: yup.string(),
          ingredient: yup.string().required(`Ingredient is required.`),
        })
      ),
    })
  ),
  instructions: yup.array().of(
    yup.object().shape({
      step: yup.string().required(`Any visible Instruction field is required.`),
    })
  ),
  notes: yup.array().of(
    yup.object().shape({
      note: yup.string(),
    })
  ),
})
