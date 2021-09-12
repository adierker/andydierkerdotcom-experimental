import { forwardRef, ReactElement } from 'react'

import { FieldError } from 'react-hook-form'

interface TextareaProps {
  id: string
  label?: string
  error?: FieldError
  className?: string
  labelClassName?: string
  iconWrapperClassName?: string
  errorClassName?: string
  icon?: ReactElement
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      id,
      icon,
      className,
      labelClassName,
      iconWrapperClassName,
      errorClassName,
      ...rest // used to pass the "name", "onChange", "onBlur", "ref" from react-hook-form "register" as well as any other native HTML props I forgot about
    }: TextareaProps,
    ref
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={id} className={`drkr-label ${labelClassName}`}>
            {label}
          </label>
        )}
        <div
          className={`flex flex-row flex-nowrap items-start ${iconWrapperClassName}`}
        >
          <textarea
            id={id}
            ref={ref}
            autoComplete="off"
            spellCheck="false"
            className={`drkr-input-focus border-2 h-20 py-2 px-2 body-font w-full ${
              error ? 'border-drkr-green' : 'border-drkr-mid-gray'
            } ${className}`}
            {...rest}
          />
          {icon && icon}
        </div>
        <div className={`drkr-error ${errorClassName}`}>
          {error && error.message}
        </div>
      </>
    )
  }
)

Textarea.displayName = 'Textarea'
