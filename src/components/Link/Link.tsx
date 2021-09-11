import { ReactElement, ReactNode } from 'react'

import Link from 'next/link'

interface ExternalLinkProps {
  children: ReactNode
  href?: string
  className?: string
  newTab?: boolean
  useDefaultStyles?: boolean
}

// NOTE: newTab defaults to TRUE for external links!
export const ExternalLink = ({
  href,
  className,
  newTab = true,
  children,
  useDefaultStyles = true,
}: ExternalLinkProps): ReactElement => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href || ''}
      className={`${useDefaultStyles && 'drkr-link'} ${className}`}
      target={newTab ? '_blank' : ''}
      rel={newTab ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )
}

interface InternalLinkProps {
  children: ReactNode
  href: string
  className?: string
  newTab?: boolean
  useDefaultStyles?: boolean
}

// NOTE: newTab defaults to FALSE for internal links!
export const InternalLink = ({
  href,
  className,
  newTab = false,
  children,
  useDefaultStyles = true,
}: InternalLinkProps): ReactElement => {
  return (
    <Link href={href}>
      <a
        className={`${useDefaultStyles && 'drkr-link'} ${className}`}
        target={newTab ? '_blank' : ''}
        rel={newTab ? 'noopener noreferrer' : ''}
      >
        {children}
      </a>
    </Link>
  )
}
