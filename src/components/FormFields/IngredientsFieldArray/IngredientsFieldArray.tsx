import { ReactElement, Fragment } from 'react'

import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Control,
  FieldArrayMethodProps,
} from 'react-hook-form'

import { Button, Input, NestedIngredientsFieldArray } from 'components'
import { PlainX } from 'icons'

interface IngredientsFieldArrayProps {
  ingredientGroupingsFields: Record<'id', string>[]
  register: UseFormRegister<FieldValues>
  control: Control
  fieldErrors: FieldErrors
  appendGrouping: (
    value: Partial<unknown> | Partial<unknown>[],
    options?: FieldArrayMethodProps
  ) => void
  removeGrouping: (index?: number | number[]) => void
}

export const IngredientsFieldArray = ({
  ingredientGroupingsFields,
  register,
  control,
  fieldErrors,
  appendGrouping,
  removeGrouping,
}: IngredientsFieldArrayProps): ReactElement => {
  return (
    <>
      {ingredientGroupingsFields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="flex flex-row flex-nowrap items-start">
            <div className="w-full">
              <Input
                id={`ingredientGroupings-${index}`}
                label={'Ingredient Grouping'}
                error={fieldErrors?.[index]?.groupingName}
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
            <NestedIngredientsFieldArray
              nestIndex={index}
              control={control}
              register={register}
              fieldErrors={fieldErrors?.[index]}
            />
          </div>
        </Fragment>
      ))}
      <Button
        text="Add Grouping"
        onClick={() => appendGrouping({})}
        className="focus-visible:bg-drkr-black"
      />
    </>
  )
}
