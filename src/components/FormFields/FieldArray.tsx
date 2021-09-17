import { ReactElement } from 'react'

import {
  FieldError,
  FieldArrayMethodProps,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form'

import { Button, Input, Textarea } from 'components'
import { PlainX } from 'icons'

interface FieldArrayProps {
  fields: Record<'id', string>[]
  fieldError: FieldError
  label: string
  fieldName: string
  fieldKey: string
  appendFunction: (
    value: Partial<unknown> | Partial<unknown>[],
    options?: FieldArrayMethodProps
  ) => void
  removeFunction: (index?: number | number[]) => void
  buttonLabel: string
  register: UseFormRegister<FieldValues>
  passThruLabelClassName?: string
  inputOrTextarea: 'input' | 'textarea'
  firstIsRemovable?: boolean
}

export const FieldArray = ({
  fields,
  fieldError,
  label,
  fieldName,
  fieldKey,
  appendFunction,
  removeFunction,
  buttonLabel,
  register,
  passThruLabelClassName, // used to add extra spacing
  inputOrTextarea,
  firstIsRemovable = false,
}: FieldArrayProps): ReactElement => {
  const Component = inputOrTextarea === 'input' ? Input : Textarea
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row flex-nowrap items-start">
          <div className="w-full">
            <Component
              id={`${fieldName}-${index}`}
              className={index !== 0 && 'mt-2'}
              label={index === 0 && label}
              labelClassName={passThruLabelClassName || ''}
              error={fieldError?.[index]?.[fieldKey]}
              {...register(`${fieldName}.${index}.${fieldKey}` as const)}
            />
          </div>
          {(index !== 0 || firstIsRemovable) && (
            <button
              type="button"
              className={`ml-2 text-center drkr-focus text-drkr-hover cursor-pointer ${
                index === 0 ? 'mt-8' : 'mt-2'
              }`}
              onClick={() => removeFunction(index)}
            >
              <PlainX />
            </button>
          )}
        </div>
      ))}
      <Button
        text={buttonLabel}
        onClick={() => appendFunction({})}
        className="focus-visible:bg-drkr-black mt-1"
      />
    </>
  )
}
