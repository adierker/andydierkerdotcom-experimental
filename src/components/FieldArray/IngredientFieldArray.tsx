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
    <>
      {ingredientFields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="">
            <Input
              id={`num-${index}`}
              label="Num"
              // error={fieldErrors?.[index]?.[fieldKey]}
              // iconWrapperClassName={index !== 0 && 'mt-2'}
              {...register(`ingredientGroupings.${nestIndex}.ingredients.${index}.num` as const)}
            />
          </div>
          <Button
            text="Add Ingredient"
            onClick={() => appendIngredient({})}
            className="focus-visible:bg-drkr-black"
          />
          <button
            type="button"
            className="ml-3 text-center drkr-focus text-drkr-hover cursor-pointer"
            onClick={() => removeIngredient(index)}
          >
            <PlainX className="sq-8" />
          </button>
        </Fragment>
      ))}
    
    </>
  )
}