import { Fragment, useEffect } from 'react'

import { useFieldArray, FieldError } from 'react-hook-form'

import {Button, Input, Textarea} from 'components'
import {PlainX} from 'icons'


interface IngredientFieldArrayProps {
  nestIndex: number
  control: any
  register: any
}

export const IngredientFieldArray = ({
  nestIndex,
  control,
  register
}: IngredientFieldArrayProps) => {
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

  // this is all still a mess and isn't working at all
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
                    label="Num"
                    hideErrorSection={true}
                    {...register(`ingredientGroupings.${nestIndex}.ingredients.${index}.num` as const)}
                  />
                </div>
                <div className="flex-1 ml-2">
                  <Input
                    id={`unit-${index}`}
                    label="Unit"
                    hideErrorSection={true}
                    {...register(`ingredientGroupings.${nestIndex}.ingredients.${index}.unit` as const)}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="ml-8 flex-1">
                  <Input
                    id={`ingredient-${index}`}
                    label="Ingredient"
                    labelClassName="mt-2"
                    // error={fieldErrors?.[index]?.[fieldKey]}
                    // iconWrapperClassName={index !== 0 && 'mt-2'}
                    {...register(`ingredientGroupings.${nestIndex}.ingredients.${index}.ingredient` as const)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="ml-3 text-center drkr-focus text-drkr-hover cursor-pointer"
                onClick={() => removeIngredient(index)}
              >
                <PlainX/>
              </button>
            </div>
          </div>


          {ingredientFields.length > 1 && <hr className="ml-8 border-t-3 border-drkr-mid-gray mt-3 mb-8"/>}
        </div>
      ))}
      <div className="flex">
        <Button
          text="Add Ingredient"
          onClick={() => appendIngredient({})}
          className="focus-visible:bg-drkr-black block ml-auto mr-8"
        />
      </div>
    </div>
  )
}