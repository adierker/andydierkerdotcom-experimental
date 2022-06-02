import { ReactElement, useState, useEffect } from 'react'

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

const fetchAnimals = async (token): Promise<any> => {
  let responseData: AxiosResponse<any>
  await axios
    .get(EXTERNAL_ENDPOINTS.PETFINDER + '?type=dog', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      responseData = response?.data
    })
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
    countPerPage,
    totalCount,
    currentPage,
    totalPages,
    setCountPerPage,
    setTotalCount,
    setCurrentPage,
    setTotalPages,
  } = usePaginationContext()

  const { data, error, isLoading } = useEffectAsync(
    () => fetchAnimals(oauthToken),
    [fetchAnimals]
  )

  useEffect(() => {
    if (
      data !== undefined &&
      data.animals !== undefined &&
      data.pagination !== undefined
    ) {
      console.log('data')
      const { animals: animalData, pagination: paginationData } = data
      const transformedAnimals = transformApiDataToAnimalData(animalData)
      setAnimals(transformedAnimals)
      setCountPerPage(paginationData.count_per_page)
      setTotalCount(paginationData.total_count)
      setCurrentPage(paginationData.current_page)
      setTotalPages(paginationData.total_pages)
    }
  }, [data])

  return (
    <div className="flex justify-center flex-wrap mt-12">
      {error && <div>there was some kind of error...</div>}
      {isLoading && (
        <div className="flex justify-center">
          <Loader className="sq-48" />
        </div>
      )}
      {!isLoading &&
        animals.map((animal) => <AnimalCard animal={animal} key={animal.id} />)}
    </div>
  )
}
