import { useState, useEffect } from 'react'

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(null)

  useEffect(() => {
    // update debounced value after delay
    const delayedFunc = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // cleanup function for useEffect
    // cancels the timeout if value or changes or the component unmounts
    return () => {
      clearTimeout(delayedFunc)
    }
  }, [value, delay])

  return debouncedValue
}
