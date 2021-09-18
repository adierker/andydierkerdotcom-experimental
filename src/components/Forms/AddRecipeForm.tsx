import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  Input,
  Radio,
  Button,
  FieldArray,
  IngredientsFieldArray,
} from 'components'
import { useModalContext } from 'contexts'
import { ADD_RECIPE_FORM_RESOLVER } from 'resolvers'
import { RecipeContent } from 'types'

// const validateData = (data) => {}

export const AddRecipeForm = (): ReactElement => {
  const [componentHasFinishedInit, setComponentHasFinishedInit] = useState<
    boolean | null
  >(null)

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ADD_RECIPE_FORM_RESOLVER),
  })

  const {
    fields: descriptionFields,
    append: appendParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    control,
    name: 'descriptions',
  })

  const {
    fields: ingredientGroupingsFields,
    append: appendGrouping,
    remove: removeGrouping,
  } = useFieldArray({
    control,
    name: 'ingredientGroupings',
  })

  const {
    fields: instructionFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'instructions',
  })

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: 'notes',
  })

  useEffect(() => {
    if (descriptionFields.length < 1) {
      appendParagraph({})
    }
    if (instructionFields.length < 1) {
      appendStep({})
    }
    if (ingredientGroupingsFields.length < 1) {
      appendGrouping({})
    }
    setComponentHasFinishedInit(false)
  }, [appendParagraph, appendStep, appendGrouping, setComponentHasFinishedInit])

  // componentHasFinishedInit will start as null, then the appendParagraph/appendStep/appendGrouping
  // useEffect above will set it to false, which will trigger this useEffect,
  // and will set the focus to the first input on the page
  useEffect(() => {
    if (componentHasFinishedInit === false) {
      setFocus('name')
      setComponentHasFinishedInit(true)
    }
  }, [componentHasFinishedInit, setComponentHasFinishedInit])

  const { openModal } = useModalContext()

  const onSubmit = (data) => {
    const {
      name,
      path,
      url,
      defaultServings: defaultServingsAsString,
      isScalable: isScalableAsString,
      descriptions: descriptionsNestedInParagraphs,
      ingredientGroupings: formGroupings,
      instructions: instructionsNestedInSteps,
      notes,
    } = data

    console.log('formGroupings:', formGroupings)

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

    console.log('recipe:', JSON.stringify(recipe, undefined, 2))
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="name"
        label="Recipe name"
        error={errors.name}
        {...register('name')}
      />

      <Input
        id="path"
        label="Path/Route"
        error={errors.path}
        {...register('path')}
      />

      <Input
        id="url"
        label="Original recipe URL"
        error={errors.url}
        {...register('url')}
      />

      <hr className="border-t-3 border-drkr-black mt-3 mb-8" />

      <FieldArray
        fields={descriptionFields}
        fieldError={errors.descriptions}
        label="Descriptions"
        fieldName="descriptions"
        fieldKey="paragraph"
        appendFunction={appendParagraph}
        removeFunction={removeParagraph}
        buttonLabel="Add Paragraph"
        register={register}
        inputOrTextarea="textarea"
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <Input
        id="defaultServings"
        label="Default servings"
        error={errors.defaultServings}
        {...register('defaultServings')}
      />

      <Radio
        id="scalable"
        label="Scalable?"
        options={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
        error={errors.scalable}
        {...register('scalable', { required: true })}
      />

      <hr className="border-t-3 border-drkr-black mt-3 mb-8" />

      <IngredientsFieldArray
        ingredientGroupingsFields={ingredientGroupingsFields}
        register={register}
        control={control}
        fieldErrors={errors.ingredientGroupings}
        appendGrouping={appendGrouping}
        removeGrouping={removeGrouping}
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <FieldArray
        fields={instructionFields}
        fieldError={errors.instructions}
        label="Instructions"
        fieldName="instructions"
        fieldKey="step"
        appendFunction={appendStep}
        removeFunction={removeStep}
        buttonLabel="Add Step"
        register={register}
        inputOrTextarea="textarea"
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <FieldArray
        fields={noteFields}
        fieldError={errors.notes}
        label="Notes"
        fieldName="notes"
        fieldKey="note"
        appendFunction={appendNote}
        removeFunction={removeNote}
        buttonLabel="Add Note"
        register={register}
        inputOrTextarea="textarea"
        firstIsRemovable={true}
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <Button
        type="submit"
        text="Submit Recipe"
        className="focus-visible:bg-drkr-black mt-12 w-full !block"
      />
    </form>
  )
}
