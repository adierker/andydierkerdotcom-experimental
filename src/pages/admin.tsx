import { ReactElement, Fragment, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'

import { PageWrapper, Input, Radio, Button, Textarea, FieldArray } from 'components'
import { REGEX } from 'consts'
import { PlainX } from 'icons'

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
  scalable: yup.string().required(`Scalability is required.`).nullable(true),
  descriptions: yup.array().of(
    yup.object().shape({
      paragraph: yup
        .string()
        .required(`Any visible Description field is required.`),
    })
  ),
  // this looks correct to me, eventually
  ingredientGroupings: yup.array().of(
    yup.object().shape({
      groupingName: yup.string().required(`Ingredient grouping name is required.`),
      ingredients: yup.array().of(
        yup.object().shape({
          num: yup.string().matches(REGEX.NUMBERS_AND_DECIMALS, `Must be a number.`),
          unit: yup.string(),
          ingredient: yup.string().required(`Ingredient is required.`)
        })
      )
    })
  ),
  instructions: yup.array().of(
    yup.object().shape({
      step: yup.string().required(`Any visible Instruction field is required.`),
    })
  ),
})

export const Admin = (): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })
  const onSubmit = (data) => console.log(data)

  console.log(watch())

  const {
    fields: descriptionFields,
    append: appendParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    control,
    name: 'descriptions',
  })

  // this is completely unimplemented so far
  const {
    fields: ingredientGroupingsFields,
    append: appendGrouping,
    remove: removeGrouping,
  } = useFieldArray({
    control,
    name: 'ingredientGroupings',
  })

  // this will need to move to a sub-component, like this: https://codesandbox.io/s/react-hook-form-usefieldarray-nested-arrays-x7btr
  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  })

  const {
    fields: instructionFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'instructions',
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
            label="Recipe name *"
            error={errors.name}
            {...register('name')}
          />

          <Input
            id="path"
            label="Path/URL *"
            error={errors.path}
            {...register('path')}
          />

          <Input
            id="url"
            label="Original recipe URL *"
            error={errors.url}
            {...register('url')}
          />

          <Radio
            id="scalable"
            label="Scalable? *"
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            error={errors.scalable}
            {...register('scalable', { required: true })}
          />

          <FieldArray
            fields={descriptionFields}
            fieldErrors={errors.descriptions}
            label="Descriptions *"
            fieldName="descriptions"
            fieldKey="paragraph"
            appendFunction={appendParagraph}
            removeFunction={removeParagraph}
            buttonLabel="Add Paragraph"
            register={register}
            inputOrTextarea="textarea"
          />

          <FieldArray
            fields={instructionFields}
            fieldErrors={errors.instructions}
            label="Instructions *"
            passThruLabelClassName="mt-6"
            fieldName="instructions"
            fieldKey="step"
            appendFunction={appendStep}
            removeFunction={removeStep}
            buttonLabel="Add Step"
            register={register}
            inputOrTextarea="textarea"
          />




        {/* {ingredientGroupingsFields.map((field, index) => (
            <Fragment key={field.id}>
              <Input
                id={`ingredientGroupings-${index}`}
                label={index === 0 && 'Ingredient Groupings *'}
                // error={errors.ingredientGroupings?.[index]?.paragraph}
                labelClassName="mt-6"
                iconWrapperClassName={index !== 0 && 'mt-2'}
                icon={
                  index !== 0 && (
                    <button
                      type="button"
                      className="ml-3 text-center drkr-focus text-drkr-hover cursor-pointer"
                      onClick={() => removeGrouping(index)}
                    >
                      <PlainX className="sq-8" />
                    </button>
                  )
                }
                {...register(`ingredientGroupings.${index}.groupingName` as const)}
              />
              {ingredientGroupingsFields[index].ingredients.map(() => {

              })}
            </Fragment>
          ))}
          <Button
            text="Add Grouping"
            onClick={() => appendGrouping({})}
            className="focus-visible:bg-drkr-black"
          />
 */}


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
