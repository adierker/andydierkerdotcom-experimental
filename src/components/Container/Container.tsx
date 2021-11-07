import { ReactElement, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  isHomepage?: boolean
}

export const Container = ({
  children,
  className = '',
  isHomepage = false,
}: ContainerProps): ReactElement => {
  const homepageStyles = `
    flex flex-col flex-1 w-full
    items-center justify-start 
    px-10 xs:px-20 
    py-10 sm:py-20 
    text-drkr-black
  `
  const regularPageStyles = `
    flex flex-col w-full 
    px-6 xs:px-16 md:px-0
    py-8
    md:max-w-xl md:mx-auto
  `
  return (
    <main
      className={`
      ${isHomepage ? homepageStyles : regularPageStyles}
      ${className}
    `}
    >
      {children}
    </main>
  )
}
