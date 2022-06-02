import { ReactElement, useState, useEffect } from 'react'

import axios, { AxiosResponse } from 'axios'

import {
  Button,
  PageWrapper,
  Heading,
  AnimalCollection,
  Loader,
} from 'components'
import { EXTERNAL_ENDPOINTS } from 'consts'
import { useEffectAsync } from 'hooks'
import { Animal } from 'types'

// use this to generate a new Oauth token:
// curl -d "grant_type=client_credentials&client_id=SKVFZTtXTuoif4a1OQrDxfQl9unshcUkVRMP0uAqzAsr9xoOzm&client_secret=cS10BtgoFNHUQWCopOGJ79mCv8PXAsPFXDfatWpz" https://api.petfinder.com/v2/oauth2/token

// Oauth token (will expire, regenerate with above):

const transformApiDataToAnimalData = (arrayOfAnimalObjs: any): Animal[] => {
  if (!arrayOfAnimalObjs || arrayOfAnimalObjs.length < 1) {
    return []
  }
  return arrayOfAnimalObjs.map((a) => ({
    id: a.id,
    url: a.url,
    type: a.type,
    breeds: a.breeds,
    animalName: /[0-9]/.test(a.name) ? 'No name' : a.name,
    age: a.age,
    gender: a.gender,
    description: a.description,
    photos: a.photos,
  }))
}

const fetchAnimals = async (): Promise<any> => {
  let responseData: AxiosResponse<any>
  await axios
    .get(EXTERNAL_ENDPOINTS.PETFINDER + '?type=dog', {
      headers: {
        Authorization: `Bearer ${PETFINDER_OAUTH_TOKEN}`,
      },
    })
    .then((response) => {
      responseData = response?.data?.animals
    })
  const transformedAnimals = transformApiDataToAnimalData(responseData)
  return transformedAnimals
}

const PETFINDER_OAUTH_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJTS1ZGWlR0WFR1b2lmNGExT1FyRHhmUWw5dW5zaGNVa1ZSTVAwdUFxekFzcjl4b096bSIsImp0aSI6Ijg4ODlhNjc4MDMyNmE2NDYxNmI5NGQ0Nzc5ZjRjOTg1NzM5ZTViYjk5ZjRjYjk5ZTZiNDU4YjE2ZjBlMWZkNGJjYWFkYzdhOTdjZGFjYjEyIiwiaWF0IjoxNjU0MTYwNjM2LCJuYmYiOjE2NTQxNjA2MzYsImV4cCI6MTY1NDE2NDIzNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.sIb6pEO9ynCn2C2OZ1rOXZkKy3RGRYh01IXPWIAp9ItfzEXy0n-XI6gWyX3fFDfkdhG25-X4Bj_tWLt3VBbZrUev509yvcvvNBcG3cQdSPyVt8Arw6gJ5WChSwtwHZkLY5QoyHDsxZCRHW4_7gOmCSmT-034CzgBC-xWxMDPHx7i3N7K_fuk1mb59RfS5TxNIYZFMt19LLnNpOeI71JhIxjfvFQkIJvcOgeplWkwQw5LQZepSLAwFK_HbNv7lmPT3T8nk0MPQai8v0169Tm-fWIazXysBkby3FInNxNGHEBynZl_6X0PuDnowZ6LVOI1Px4SMrDBkrUbz3nRKInY6A'
export const InterviewPrepPage = (): ReactElement => {
  const [animals, setAnimals] = useState<Animal[]>([])

  const { data, error, isLoading } = useEffectAsync(fetchAnimals, [
    fetchAnimals,
  ])

  useEffect(() => {
    if (data !== undefined) {
      setAnimals(data)
    }
  }, [data])

  return (
    <PageWrapper pageTitle="hello">
      <>
        <Heading text="Here Are Some Dogs" className="text-center mt-10" />
        {error && <div>there was some kind of error...</div>}
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="sq-48" />
          </div>
        )}
        {!isLoading && animals.length && <AnimalCollection animals={animals} />}
      </>
    </PageWrapper>
  )
}

export default InterviewPrepPage
