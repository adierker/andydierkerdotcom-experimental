interface ButtonProps {
  text: string
}

export const Button ({text}: ButtonProps) => {
  return (
    <div>
      {text}
    </div>
  )
}