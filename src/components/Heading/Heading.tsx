import { ReactElement } from 'react'

interface HeadingProps {
  text: string
  level?: 1 | 2
  className?: string
}

export const Heading = ({
  text,
  level = 1,
  className,
}: HeadingProps): ReactElement => {
  return level === 1 ? (
    <h1 className={`text-4xl xs:text-5xl mb-8 headline-font ${className}`}>
      {text}
    </h1>
  ) : (
    <h2 className={`text-2xl xs:text-3xl mb-6 headline-font ${className}`}>
      {text}
    </h2>
  )
}

export default Heading
