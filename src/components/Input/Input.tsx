import {forwardRef} from 'react'
import {RegisterOptions} from 'react-hook-form'

interface InputProps {
  name: string
  onChange: any
  onBlur: any
  label?: string
  className?: string
  labelClassName?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  className,
  labelClassName,
  error,
}: InputProps, 
forwardedRef)  => (
  <>
    {label && (
      <label 
        htmlFor={name} 
        className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block ${labelClassName}`}
      >
        {label}
      </label>
    )}
    <input 
      name={name}
      ref={forwardedRef}
      id={name}
      autoComplete="off"
      className={`drkr-focus border border-drkr-mid-gray border-2 h-10 px-2 mb-4 focus-visible:bg-drkr-white focus-visible:border-drkr-black focus-visible:ring-offset-0 body-font ${className}`}
    />
    {error && <div>error!</div>}
  </>
))