import { ReactElement, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'

import {
  PageWrapper,
  Input,
  Radio,
  Button,
  FieldArray,
  IngredientsFieldArray,
} from 'components'
import { REGEX } from 'consts'

const formSchema = yup.object().shape({
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

export const Admin = (): ReactElement => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })
  const onSubmit = (data) => console.log(data)

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
  }, [])

  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="Recipe name"
            error={errors.name}
            {...register('name')}
          />

          <Input
            id="path"
            label="Path/URL"
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
      </main>
    </PageWrapper>
  )
}

export default Admin
