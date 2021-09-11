import { useState } from 'react'

export const useServings = (defaultServings: number) => {
  const [servings, setServings] = useState<number>(defaultServings)

  return {
    servings,
    setServings,
  }
}
