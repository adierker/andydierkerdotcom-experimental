import {Fragment, forwardRef} from 'react'
import {FieldError} from 'react-hook-form'

interface RadioProps {
  id: string
  label: string
  options: {
    value: string
    label: string
  }[]
  error?: FieldError
  className?: string
  labelClassName?: string
  errorClassName?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  id,
  label, 
  error, 
  options,
  className, 
  labelClassName,
  errorClassName,
  ...rest // used to pass the "name", "onChange", "onBlur", "ref" from react-hook-form "register" as well as any other native HTML props I forgot about
}: RadioProps, ref) => {
  return (
    <fieldset>
      <legend className={`drkr-label ${labelClassName}`}>
        {label}
      </legend>
      <div className="flex flex-row items-center">
        {options.map(({value, label: inputLabel}, index) => {
          const isLastOption = index === options.length - 1
          const idKeyAndHtmlFor = `${id}-${inputLabel}`
          // the ref here doesn't seem to do anything but React complains if I remove forwardRef entirely
          return (
            <Fragment key={idKeyAndHtmlFor}>
              <input
                id={idKeyAndHtmlFor}
                value={value}
                type="radio"
                ref={ref} 
                className={`appearance-none ${error ? 'border-drkr-green' : 'border-drkr-mid-gray'} sq-10 min-w-10 border-2 rounded-full bg-drkr-white checked:bg-drkr-green radio-inset cursor-pointer drkr-radio-focus ${className}`}
                {...rest}
              />
              <label htmlFor={idKeyAndHtmlFor} className={`body-font ml-3 ${!isLastOption && 'mr-5'}`}>
                {inputLabel}
              </label>
            </Fragment>
          )
        })}
      </div>
      <div className={`drkr-error ${errorClassName}`}>
        {error && error.message}
      </div>
    </fieldset>
  )
})