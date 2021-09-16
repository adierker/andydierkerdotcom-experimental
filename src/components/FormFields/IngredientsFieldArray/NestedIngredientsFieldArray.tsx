import { useEffect, ReactElement } from 'react'

import {
  useFieldArray,
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Control,
} from 'react-hook-form'

import { Button, Input } from 'components'
import { PlainX } from 'icons'

interface NestedIngredientsFieldArrayProps {
  nestIndex: number
  control: Control
  register: UseFormRegister<FieldValues>
  fieldErrors: FieldErrors
}

export const NestedIngredientsFieldArray = ({
  fieldErrors,
  nestIndex,
  control,
  register,
}: NestedIngredientsFieldArrayProps): ReactElement => {
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: `ingredientGroupings.${nestIndex}.ingredients`,
  })

  useEffect(() => {
    if (ingredientFields.length < 1) {
      appendIngredient({})
    }
  }, [])

  return (
    <div className="">
      {ingredientFields.map((field, index) => (
        <div key={field.id}>
          <div className="flex flex-row">
            <div className="flex-1">
              <div className="flex flex-row">
                <div className="ml-8 flex-1">
                  <Input
                    id={`num-${index}`}
                    error={fieldErrors?.ingredients?.[index]?.num}
                    label="Num"
                    {...register(
                      `ingredientGroupings.${nestIndex}.ingredients.${index}.num` as const
                    )}
                  />
                </div>
                <div className="flex-1 ml-2">
                  <Input
                    id={`unit-${index}`}
                    label="Unit"
                    {...register(
                      `ingredientGroupings.${nestIndex}.ingredients.${index}.unit` as const
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="ml-8 flex-1">
                  <Input
                    id={`ingredient-${index}`}
                    label="Ingredient"
                    labelClassName="mt-2"
                    error={fieldErrors?.ingredients?.[index]?.ingredient}
                    {...register(
                      `ingredientGroupings.${nestIndex}.ingredients.${index}.ingredient` as const
                    )}
                  />
                </div>
              </div>
            </div>
            {index !== 0 && (
              <div className="flex items-center">
                <button
                  type="button"
                  className="ml-3 text-center drkr-focus text-drkr-hover cursor-pointer"
                  onClick={() => removeIngredient(index)}
                >
                  <PlainX />
                </button>
              </div>
            )}
          </div>

          {ingredientFields.length > 1 && (
            <hr className="border-t-3 border-drkr-mid-gray mx-8 mt-3 mb-8" />
          )}
        </div>
      ))}
      <div className="flex">
        <Button
          text="Add Ingredient"
          onClick={() => appendIngredient({})}
          className={`focus-visible:bg-drkr-black block ml-auto mb-6 mt-1 ${
            ingredientFields.length > 1 ? 'mr-8' : ''
          }`}
        />
      </div>
    </div>
  )
}
