import { ReactElement, useEffect } from 'react'

import { AnimalCard } from 'components'
import { Animal } from 'types'

interface AnimalCollectionProps {
  animals: Animal[]
}

export const AnimalCollection = ({
  animals,
}: AnimalCollectionProps): ReactElement => {
  useEffect(() => {
    console.log('animals:', animals, !!animals)
  }, animals)
  return (
    <div className="flex justify-center flex-wrap mt-24">
      {animals &&
        animals.map((animal) => <AnimalCard animal={animal} key={animal.id} />)}
    </div>
  )
}
