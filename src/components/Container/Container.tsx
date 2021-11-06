import { ReactElement, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export const Container = ({
  children,
  className = '',
}: ContainerProps): ReactElement => {
  return (
    <main
      className={`
      flex flex-col w-full 
      px-6 xs:px-16 md:px-0
      py-8
      md:max-w-xl md:mx-auto
      ${className}
    `}
    >
      {children}
    </main>
  )
}
