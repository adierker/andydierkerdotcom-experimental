import { ReactElement, useState, useEffect } from 'react'

import axios from 'axios'
import { useRouter, NextRouter } from 'next/router'

import { Heading, PageWrapper } from 'components'
import { EXTERNAL_ENDPOINTS } from 'consts'
import { Animal } from 'types'

const DogDetail = (): ReactElement => {
  const [dog, setDog] = useState<Animal | null>(null)

  const router: NextRouter = useRouter()
  const { id: dogId, token } = router.query

  // useEffect to fetch dog data or retrieve it from cache
  useEffect(() => {
    // FETCH DOG DETAILS FUNCTION, WE CALL THIS IF DOG DOESNT EXIST IN CACHE
    const fetchDogDetails = async (thisDogsId): Promise<any> => {
      let responseData: any
      await axios
        .get(EXTERNAL_ENDPOINTS.PETFINDER + `/${thisDogsId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          responseData = response?.data?.animal
        })

      const transformedDogData = {
        id: responseData.id,
        url: responseData.url,
        type: responseData.type,
        breeds: responseData.breeds,
        animalName: /[0-9]/.test(responseData.name)
          ? 'No name :('
          : responseData.name,
        age: responseData.age,
        gender: responseData.gender,
        description: responseData.description,
        photos: responseData.photos,
      }

      setDog(transformedDogData)
    }

    if (!dog && dogId) {
      const cachedDogs = JSON.parse(window.localStorage.getItem('cachedDogs'))
      let thisDogInCache

      if (cachedDogs) {
        thisDogInCache = cachedDogs.find((dog) => {
          return dog.id.toString() === dogId
        })
      }

      // CHECK TO SEE IF DOG ALREADY EXISTS IN CACHE
      if (cachedDogs && thisDogInCache) {
        setDog(thisDogInCache)
      } else {
        // IF THE DOG ISNT IN THE CACHE, CALL THIS FUNCTION TO FETCH IT
        fetchDogDetails(dogId)
      }
    }
  }, [dog, dogId])

  // THIS USEEFFECT UPDATES THE CACHE WHEN WE MAKE A CHANGE
  useEffect(() => {
    if (dog) {
      const cachedDogs = JSON.parse(window.localStorage.getItem('cachedDogs'))

      // the current cache doesnt exist - we need to create it
      if (cachedDogs === null) {
        window.localStorage.setItem('cachedDogs', JSON.stringify([dog]))
      }
      // the currect cache DOES exist
      else {
        const thisDogInCacheIndex = cachedDogs.findIndex((dog) => {
          return dog.id.toString() === dogId
        })
        // IF THIS DOG IS ALREADY IN THE CACHE, FIND THEIR ENTRY AND DELETE IT, THEN ADD IT AGAIN TO THE FRONT
        if (thisDogInCacheIndex > -1) {
          cachedDogs.splice(thisDogInCacheIndex, 1)
          cachedDogs.push(dog)
        }
        // CACHE EXISTS, BUT THIS IS A NEW DOG IN IT
        else {
          // if cache is full (3 items), remove the oldest item (the first one)
          if (cachedDogs.length >= 3) {
            cachedDogs.shift()
          }
          // then push in the new item to the cache
          cachedDogs.push(dog)
          window.localStorage.setItem('cachedDogs', JSON.stringify(cachedDogs))
        }
      }
    }
  }, [dog, dogId])

  return (
    <PageWrapper pageTitle="Dog Cacher">
      <>
        {dog === null && <div>nulldog</div>}
        {dog && (
          <>
            <Heading text={dog.animalName} className="text-center mt-10" />
            <div className="w-full">
              <a className="mx-auto" href={dog.url}>
                {dogId}
              </a>
              <div className="mx-auto">{dog.type}</div>
              <div className="mx-auto">{dog.age}</div>
              <div className="mx-auto">{dog.gender}</div>
              <div className="mx-auto">{dog.description}</div>
              <div className="mx-auto">{dog.breeds?.primary}</div>
            </div>
          </>
        )}
      </>
    </PageWrapper>
  )
}

export default DogDetail
