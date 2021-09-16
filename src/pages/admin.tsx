import { ReactElement, Fragment, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'

import {
  PageWrapper,
  Input,
  Radio,
  Button,
  FieldArray,
  IngredientFieldArray,
} from 'components'
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

  console.log(watch(['ingredientGroupings']))

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

          <FieldArray
            fields={descriptionFields}
            fieldErrors={errors.descriptions}
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

          <FieldArray
            fields={instructionFields}
            fieldErrors={errors.instructions}
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

          {ingredientGroupingsFields.map((field, index) => (
            <Fragment key={field.id}>
              <div className="flex flex-row flex-nowrap items-start">
                <div className="w-full">
                  <Input
                    id={`ingredientGroupings-${index}`}
                    label={'Ingredient Grouping'}
                    error={errors.ingredientGroupings?.[index]?.groupingName}
                    {...register(
                      `ingredientGroupings.${index}.groupingName` as const
                    )}
                  />
                </div>
                {index !== 0 && (
                  <button
                    type="button"
                    className="ml-2 mt-2 text-center drkr-focus text-drkr-hover cursor-pointer self-center"
                    onClick={() => removeGrouping(index)}
                  >
                    <PlainX />
                  </button>
                )}
              </div>
              <div>
                <IngredientFieldArray
                  nestIndex={index}
                  control={control}
                  register={register}
                  error={errors.ingredientGroupings?.[index]}
                />
              </div>
            </Fragment>
          ))}
          <Button
            text="Add Grouping"
            onClick={() => appendGrouping({})}
            className="focus-visible:bg-drkr-black"
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
