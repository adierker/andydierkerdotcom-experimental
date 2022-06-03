import { ReactElement, useState, useEffect } from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import axios, { AxiosResponse } from 'axios'

import { AnimalCard, Loader } from 'components'
import { EXTERNAL_ENDPOINTS } from 'consts'
import { usePaginationContext } from 'contexts'
import { useEffectAsync } from 'hooks'
import { Animal } from 'types'

const transformApiDataToAnimalData = (arrayOfAnimalObjs: any): Animal[] => {
  if (!arrayOfAnimalObjs || arrayOfAnimalObjs.length < 1) {
    return []
  }
  return arrayOfAnimalObjs.map((a) => ({
    id: a.id,
    url: a.url,
    type: a.type,
    breeds: a.breeds,
    animalName: /[0-9]/.test(a.name) ? 'No name :(' : a.name,
    age: a.age,
    gender: a.gender,
    description: a.description,
    photos: a.photos,
  }))
}

const fetchAnimals = async (
  token,
  page = 1,
  countPerPage = 20
): Promise<any> => {
  let responseData: AxiosResponse<any>
  const query = `?type=dog&page=${page}&limit=${countPerPage}`
  const cachedData = window.localStorage.getItem(query)

  // if we have data cached for this query...
  if (cachedData) {
    const parsedData = JSON.parse(cachedData)
    const currentTime = Date.now()

    if (currentTime <= parsedData.invalidateAt) {
      // we have cached data AND it is valid
      return parsedData
    }
  }

  await axios
    .get(EXTERNAL_ENDPOINTS.PETFINDER + query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      responseData = response?.data
    })

  const currentTimePlusFiveMinutes = Date.now() + 5 * 60 * 1000
  window.localStorage.setItem(
    query,
    JSON.stringify({
      ...responseData,
      invalidateAt: currentTimePlusFiveMinutes,
    })
  )
  return responseData
}

interface AnimalCollectionProps {
  oauthToken: string
}

export const AnimalCollection = ({
  oauthToken,
}: AnimalCollectionProps): ReactElement => {
  const [animals, setAnimals] = useState<Animal[]>([])
  const {
    totalCount,
    currentPage,
    totalPages,
    setCountPerPage,
    setTotalCount,
    setCurrentPage,
    setTotalPages,
  } = usePaginationContext()

  const { data, error, isLoading } = useEffectAsync(
    () => fetchAnimals(oauthToken, currentPage || 1),
    [fetchAnimals, currentPage]
  )

  useEffect(() => {
    if (
      data !== undefined &&
      data.animals !== undefined &&
      data.pagination !== undefined
    ) {
      const { animals: animalData, pagination: paginationData } = data
      const transformedAnimals = transformApiDataToAnimalData(animalData)
      setAnimals(transformedAnimals)
      setCountPerPage(paginationData.count_per_page)
      setTotalCount(paginationData.total_count)
      setCurrentPage(paginationData.current_page)
      setTotalPages(paginationData.total_pages)
    }
  }, [data])

  const onPaginationChange = (event, page) => {
    setCurrentPage(page)
  }

  if (error) {
    console.log('error!', error)
  }

  return (
    <div className="mx-auto mt-12">
      {error && <div>there was some kind of error...</div>}
      {isLoading && <Loader className="sq-48" />}
      {!isLoading && (
        <div className="flex flex-wrap justify-center">
          {animals.map((animal) => (
            <AnimalCard
              animal={animal}
              oauthToken={oauthToken}
              key={animal.id}
            />
          ))}
        </div>
      )}
      {!isLoading && totalCount && (
        <div className="flex justify-center mt-4 mb-8">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              onChange={onPaginationChange}
              page={currentPage}
            />
          </Stack>
        </div>
      )}
    </div>
  )
}
