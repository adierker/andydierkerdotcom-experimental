import { ReactElement } from 'react'

interface ButtonProps {
  text: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
  className?: string
}

const defaults = {
  flex: 'inline-flex justify-center',
  border: 'border border-transparent shadow-sm',
  focus: 'drkr-focus',
  padding: 'px-4 py-2',
  typography: 'text-xl headline-spaced-font',
  colors: 'bg-drkr-black text-drkr-white',
  hover: 'bg-drkr-hover',
}

const defaultClasses = Object.values(defaults).join(' ')

export const Button = ({
  text,
  type,
  onClick,
  className,
  ...rest
}: ButtonProps): ReactElement => {
  return (
    <button
      type={type || 'button'}
      className={`${defaultClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  )
}
