import {useState, useEffect, DependencyList} from 'react'

export const useEffectAsync = <T> (
  func: () => Promise<T>, 
  dependencyArray?: DependencyList, 
  initialData?: T,
) => {
  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  useEffect(() => {
    let fetchCanceled = false
    const fetchData = async () => {
      setError(undefined)
      setIsLoading(true)
      try {
        const result = await func()
        if (!fetchCanceled) {
          setIsLoading(false)
          setData(result)
        }
      } catch (error) {
        if (!fetchCanceled) {
          setError(error)
        }
      }
    }

    fetchData()

    // if multiple async calls are triggered, we only want to return the most-recent result
    // this useEffect cleanup func will cancel previous useEffect calls and prevent them from being saved with setData
    // see: https://overreacted.io/a-complete-guide-to-useeffect/#speaking-of-race-conditions
    return () => {
      fetchCanceled = true
    }
  }, dependencyArray)

  return {data, error, isLoading}
}