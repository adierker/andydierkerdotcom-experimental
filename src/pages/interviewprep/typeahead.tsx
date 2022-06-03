import { ReactElement, useState, useEffect } from 'react'

import axios, { AxiosResponse } from 'axios'

import { PageWrapper, Container, Loader } from 'components'
import { PETFINDER_OAUTH_TOKEN, EXTERNAL_ENDPOINTS } from 'consts'
import { useDebounce } from 'hooks'

export const TypeaheadPage = (): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [results, setResults] = useState<string[]>([])

  const debouncedSearch = useDebounce(inputValue, 500)

  // fetch the data
  useEffect(() => {
    const fetch = async () => {
      setIsSearching(true)
      const response = await axios.get(
        EXTERNAL_ENDPOINTS.PETFINDER + `?name=${debouncedSearch}`,
        {
          headers: {
            Authorization: `Bearer ${PETFINDER_OAUTH_TOKEN}`,
          },
        }
      )
      setIsSearching(false)
      return response.data // this is still a promise!
    }

    if (debouncedSearch) {
      fetch()
        .then((data) => {
          const { animals } = data
          const names = animals.map((animal) => animal.name)
          setResults(names)
        })
        .catch((e) => console.log('error!', e))
    }
  }, [debouncedSearch])

  return (
    <PageWrapper pageTitle="Typeahead practice">
      <Container>
        <div className="flex flex-row align-center">
          <input
            type="text"
            placeholder="Search dog names"
            className="my-8 p-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isSearching && (
            <div className="flex items-center">
              <Loader className="sq-4" />
            </div>
          )}
        </div>
        <div className="mb-4">Results:</div>
        {results.length > 0 && (
          <ul>
            {results.map((name, index) => {
              return <li key={name + index}>{name}</li>
            })}
          </ul>
        )}
      </Container>
    </PageWrapper>
  )
}

export default TypeaheadPage
