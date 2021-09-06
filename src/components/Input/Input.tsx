import {forwardRef} from 'react'
import {RegisterOptions} from 'react-hook-form'

interface InputProps {

}

export const Input = forwardRef<HTMLInputElement, any>((props, ref) => {
  const {label, error, id, ...rest} = props
  return (
    <>
      <label 
        htmlFor={id} 
        className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block`}
      >
        {label}
      </label>
      <input 
        id={id}
        ref={ref}
        autoComplete="off"
        className={`drkr-focus border ${error ? 'border-drkr-green' : 'border-drkr-mid-gray'} border-2 h-10 px-2 focus-visible:bg-drkr-white focus-visible:border-drkr-black focus-visible:ring-offset-0 body-font w-full`}
        {...rest}
      />
      <div className="min-h-5 mr-1 mt-1 text-sm text-drkr-green text-right">{error && error.message}</div>
    </>
  )
})