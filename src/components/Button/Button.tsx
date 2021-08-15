import classnames from 'classnames'

interface ButtonProps {
  text: string
  onClick: () => void
  color?: string
  customClasses?: string
}

const defaults = {
  flex: 'inline-flex justify-center',
  border: 'rounded-md border border-transparent shadow-sm',
  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drkr-green',
  padding: 'px-4 py-2',
  typography: 'text-xl font-medium',
  colors: 'bg-drkr-green text-drkr-white',
  hover: 'hover:bg-opacity-75',
}

const defaultStyles = Object.values(defaults).join(' ')

export const Button = ({
  text,
  onClick,
  color,
  customClasses,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(
        defaultStyles,
        color,
        customClasses
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}