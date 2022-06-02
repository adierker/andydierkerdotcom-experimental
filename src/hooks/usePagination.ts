import { useState, Dispatch, SetStateAction } from 'react'

export interface UsePaginationHookInterface {
  countPerPage: number
  totalCount: number
  currentPage: number
  totalPages: number
  setCountPerPage: Dispatch<SetStateAction<number>>
  setTotalCount: Dispatch<SetStateAction<number>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setTotalPages: Dispatch<SetStateAction<number>>
}

export const usePagination = (): UsePaginationHookInterface => {
  const [countPerPage, setCountPerPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  return {
    countPerPage,
    totalCount,
    currentPage,
    totalPages,
    setCountPerPage,
    setTotalCount,
    setCurrentPage,
    setTotalPages,
  }
}
