import { ReactElement, useState, useEffect } from 'react'

import axios, { AxiosResponse } from 'axios'

import { Button, PageWrapper, Heading, AnimalCollection } from 'components'
import { EXTERNAL_ENDPOINTS } from 'consts'
import { useEffectAsync } from 'hooks'
import { Animal } from 'types'

// use this to generate a new Oauth token:
// curl -d "grant_type=client_credentials&client_id=SKVFZTtXTuoif4a1OQrDxfQl9unshcUkVRMP0uAqzAsr9xoOzm&client_secret=cS10BtgoFNHUQWCopOGJ79mCv8PXAsPFXDfatWpz" https://api.petfinder.com/v2/oauth2/token

// Oauth token (will expire, regenerate with above):

const transformApiDataToAnimalData = (arrayOfAnimalObjs: any): Animal[] => {
  console.log('transforming...:', arrayOfAnimalObjs)
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

const PETFINDER_OAUTH_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJTS1ZGWlR0WFR1b2lmNGExT1FyRHhmUWw5dW5zaGNVa1ZSTVAwdUFxekFzcjl4b096bSIsImp0aSI6IjE3YTA3NDIzNmMzYWUyZDliMmQxNTY4NDBjOTI2NDEwYTNkNzhiNTUzZGFiMGUyM2Q3NmJkNGE0MzZkMzdhYTFiMjFhNGQ2Njg0N2JjOWI0IiwiaWF0IjoxNjU0MTU0ODExLCJuYmYiOjE2NTQxNTQ4MTEsImV4cCI6MTY1NDE1ODQxMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Y2in4n5Y0f4jCpyIgemt-AQDUs9MsOBCQgFTjL5ASS54MCORSITteN6BNHzKrl31FV8xJu599U1Het5UpqjtsoZohE6b8c2Mz_7qKhKtag_0NXSLSxV-H_0ze_giEjS9zzpdF0H6Cxyxy7kLzYtcZkeXf1UbJElKne_q69Xhbu0mkYXuPHt7hC6trOjz4FdbiHoit0Snb1yo3ExXoHgZGGr5YnvWuzPyNKXJRAhXi7R6pLsaHyfrWGf9PwqiNTrYm5z-EKbltKSUiBkQG1tTTfWgpRPTL6EEqQ8YLoYcwWkJ5MFwXplXanXk3gUuLXluZXJjBjgtpMaFspebB34wvg'

export const InterviewPrepPage = (): ReactElement => {
  const [animals, setAnimals] = useState<Animal[]>([])

  const fetchAnimals = async (): Promise<any> => {
    let responseData: AxiosResponse<any>

    try {
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
      setAnimals(transformedAnimals)
    } catch (e) {
      console.log('ERROR!', e)
      return e
    }
  }

  return (
    <PageWrapper pageTitle="hello">
      <>
        <Heading text="Find Animals" className="text-center mt-10" />
        <div className="flex justify-center">
          <Button
            text="fetch all animals"
            type="button"
            onClick={fetchAnimals}
          />
        </div>
        {animals.length && <AnimalCollection animals={animals} />}
      </>
    </PageWrapper>
  )
}

export default InterviewPrepPage
