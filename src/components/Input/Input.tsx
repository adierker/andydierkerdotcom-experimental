interface InputProps {
  defaultValue?: any
  labelText?: string
  className?: string
  labelClassname?: string
}

export const Input = ({
  defaultValue = '',
  labelText,
  className = '',
  labelClassname = '',
}: InputProps) => {
  return (
    <>
      {labelText && (
        <label className={`text-2xl headline-font mr-3 ${labelClassname}`}>
          {labelText}
        </label>
      )}
      <input 
        defaultValue={defaultValue}
        className={`drkr-focus border border-drkr-mid-gray border-2 h-10 px-2 focus-visible:bg-drkr-white focus-visible:border-drkr-black ${className}`}
      />
    </>
  )
}