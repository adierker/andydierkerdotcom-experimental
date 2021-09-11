import { useState, Dispatch, SetStateAction } from 'react'

interface UseServingsHook {
  servings: number
  setServings: Dispatch<SetStateAction<number>>
}

export const useServings = (defaultServings: number): UseServingsHook => {
  const [servings, setServings] = useState<number>(defaultServings)

  return {
    servings,
    setServings,
  }
}
