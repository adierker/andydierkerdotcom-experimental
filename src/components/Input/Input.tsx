import {forwardRef} from 'react'

interface InputProps {
  id: string
  defaultValue?: any
  labelText?: string
  className?: string
  labelClassname?: string
  error?: string
  inputRef: any
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  defaultValue,
  labelText,
  className,
  labelClassname,
  error,
  ...otherInputElementProps
}: InputProps, ref) => (
  <>
    {labelText && (
      <label 
        htmlFor={id} 
        className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block ${labelClassname}`}
      >
        {labelText}
      </label>
    )}
    <input 
      id={id}
      ref={ref}
      defaultValue={defaultValue}
      autoComplete="off"
      className={`drkr-focus border border-drkr-mid-gray border-2 h-10 px-2 mb-4 focus-visible:bg-drkr-white focus-visible:border-drkr-black body-font ${className}`}
      {...otherInputElementProps}
    />
    {error && <div>error!</div>}
  </>
))