import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, NextRouter } from 'next/router'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  Input,
  Radio,
  Button,
  FieldArray,
  IngredientsFieldArray,
} from 'components'
import { SITEPATHS } from 'consts'
import { EDIT_RECIPE_MODALS } from 'content'
import { useModalContext } from 'contexts'
import { addRecipeFormSchema } from 'schemas'
import { postEditedRecipeContentToApi, postRecipeDeletionToApi } from 'services'
import { transformRecipeFormDataToRecipeContent } from 'transformers'
import { ApiResponse, RecipeContent, RecipeFormData } from 'types'

export const EditRecipeForm = (props: RecipeFormData): ReactElement => {
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
    resolver: yupResolver(addRecipeFormSchema),
    defaultValues: props,
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

  const { openCustomModal, closeModal } = useModalContext()
  const router: NextRouter = useRouter()

  const originalRecipePath = props.path

  const deleteRecipe = async () => {
    openCustomModal(
      EDIT_RECIPE_MODALS.confirmDelete(closeModal, submitRecipeDeletionToApi)
    )
  }

  const submitRecipeDeletionToApi = async () => {
    console.log('deleting...', originalRecipePath)
    const response: ApiResponse = await postRecipeDeletionToApi(
      originalRecipePath
    )

    if (response?.ok) {
      openCustomModal(
        EDIT_RECIPE_MODALS.successDelete(closeModal, () =>
          router.push(SITEPATHS.EDIT_RECIPE)
        )
      )
    } else {
      openCustomModal(EDIT_RECIPE_MODALS.failureDelete(closeModal))
      console.error('Delete recipe failed.', response)
    }
  }

  const submitRecipeChangesToApi = async (
    recipe: RecipeContent
  ): Promise<void> => {
    const response: ApiResponse = await postEditedRecipeContentToApi(
      recipe,
      originalRecipePath
    )

    if (response?.ok) {
      openCustomModal(
        EDIT_RECIPE_MODALS.success(closeModal, () =>
          router.push(SITEPATHS.EDIT_RECIPE)
        )
      )
    } else {
      openCustomModal(EDIT_RECIPE_MODALS.failure(closeModal))
      console.error('Edit recipe failed.', response)
    }
  }

  const onSubmit = async (formData) => {
    let recipe: RecipeContent
    try {
      recipe = transformRecipeFormDataToRecipeContent(formData)
    } catch (e) {
      openCustomModal(EDIT_RECIPE_MODALS.invalid(closeModal))
      console.error('Edit recipe validation failed.', e)
    }

    const recipePathHasChanged = recipe.path !== originalRecipePath

    if (recipePathHasChanged) {
      openCustomModal(
        EDIT_RECIPE_MODALS.confirmPathChange(
          closeModal,
          submitRecipeChangesToApi,
          recipe,
          originalRecipePath
        )
      )
    } else {
      openCustomModal(
        EDIT_RECIPE_MODALS.confirm(closeModal, submitRecipeChangesToApi, recipe)
      )
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Button
        type="button"
        text="Delete Recipe"
        onClick={deleteRecipe}
        className="focus-visible:bg-drkr-black mb-8 w-full !block"
      />

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
        id="isScalable"
        label="Scalable?"
        options={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
        error={errors.isScalable}
        {...register('isScalable', { required: true })}
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
