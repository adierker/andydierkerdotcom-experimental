import {forwardRef} from 'react'
import {FieldError} from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  error?: FieldError
  className?: string
  labelClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, 
  error, 
  id, 
  className, 
  labelClassName, 
  ...rest // used to pass the "name", "onChange", "onBlur" from react-hook-form "register" as well as any other native HTML props I forgot about
}: InputProps, ref) => {
  return (
    <>
      <label 
        htmlFor={id} 
        className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block ${labelClassName}`}
      >
        {label}
      </label>
      <input 
        id={id}
        ref={ref}
        autoComplete="off"
        spellCheck="false"
        className={`drkr-input-focus border ${error ? 'border-drkr-green' : 'border-drkr-mid-gray'} border-2 focus-visible:border-drkr-black h-10 px-2  body-font w-full ${className}`}
        {...rest}
      />
      <div className="min-h-5 mr-1 mt-1 text-sm text-drkr-green text-right">{error && error.message}</div>
    </>
  )
})