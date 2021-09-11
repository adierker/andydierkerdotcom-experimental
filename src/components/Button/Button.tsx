import classnames from 'classnames'

interface ButtonProps {
  text: string
  onClick: () => void
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

export const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(defaultClasses, className)}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
