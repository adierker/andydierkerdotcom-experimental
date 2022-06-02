import { createContext, useContext, ReactElement } from 'react'

import { usePagination, UsePaginationHookInterface } from 'hooks'

interface PaginationContextProviderProps {
  children: ReactElement
}

const PaginationContext = createContext(null)
export const usePaginationContext = (): UsePaginationHookInterface =>
  useContext(PaginationContext)

export const PaginationContextProvider = ({
  children,
}: PaginationContextProviderProps): ReactElement => {
  const {
    countPerPage,
    totalCount,
    currentPage,
    totalPages,
    setCountPerPage,
    setTotalCount,
    setCurrentPage,
    setTotalPages,
  } = usePagination()
  return (
    <PaginationContext.Provider
      value={{
        countPerPage,
        totalCount,
        currentPage,
        totalPages,
        setCountPerPage,
        setTotalCount,
        setCurrentPage,
        setTotalPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
