import { forwardRef, ReactElement, Fragment } from 'react'
import { FieldError } from 'react-hook-form'

import {Button, Input, Textarea} from 'components'
import {PlainX} from 'icons'

// TODO: add types here
interface FieldArrayProps {
  fields: any
  fieldErrors: any
  label: string
  fieldName: string
  fieldKey: string
  appendFunction: any
  removeFunction: any
  buttonLabel: string
  register: any
  passThruLabelClassName?: string
  inputOrTextarea: 'input' | 'textarea'
}

export const FieldArray = (
  (
    {
      fields,
      fieldErrors,
      label,
      fieldName,
      fieldKey,
      appendFunction,
      removeFunction,
      buttonLabel,
      register,
      passThruLabelClassName, // used to add extra spacing 
      inputOrTextarea
    }: FieldArrayProps
  ) => {
    const Component = inputOrTextarea === 'input' ? Input : Textarea
    return (
      <>
        {fields.map((field, index) => (
            <Fragment key={field.id}>
              <Component
                id={`${fieldName}-${index}`}
                label={index === 0 && label}
                labelClassName={passThruLabelClassName || ''}
                error={fieldErrors?.[index]?.[fieldKey]}
                iconWrapperClassName={index !== 0 && 'mt-2'}
                icon={
                  index !== 0 && (
                    <button
                      type="button"
                      className="ml-3 text-center drkr-focus text-drkr-hover cursor-pointer"
                      onClick={() => removeFunction(index)}
                    >
                      <PlainX className="sq-8" />
                    </button>
                  )
                }
                {...register(`${fieldName}.${index}.${fieldKey}` as const)}
              />
            </Fragment>
          ))}
          <Button
            text={buttonLabel}
            onClick={() => appendFunction({})}
            className="focus-visible:bg-drkr-black"
          />
      </>
    )
  }
)
