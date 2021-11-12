import { forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

interface InputProps {
  id: string
  label?: string
  error?: FieldError
  className?: string
  labelClassName?: string
  errorClassName?: string
  hideErrorSection?: boolean
  onChange?: (any) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      id,
      className,
      labelClassName,
      errorClassName,
      onChange,
      hideErrorSection,
      ...rest // used to pass the "name", "onChange", "onBlur", "ref" from react-hook-form "register" as well as any other native HTML props I forgot about
    }: InputProps,
    ref
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={id} className={`drkr-label ${labelClassName}`}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          autoComplete="off"
          spellCheck="false"
          onChange={onChange || null}
          className={`drkr-input-focus border-2 h-10 px-2 body-font w-full ${
            error ? 'border-drkr-green' : 'border-drkr-mid-gray'
          } ${className}`}
          {...rest}
        />
        {!hideErrorSection && (
          <div className={`drkr-error ${errorClassName}`}>
            {error && error.message}
          </div>
        )}
      </>
    )
  }
)

Input.displayName = 'Input'
