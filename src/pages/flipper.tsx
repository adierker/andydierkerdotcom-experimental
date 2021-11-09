import { ReactElement, useState } from 'react'

import { Button, Container, PageWrapper, FlipperGrid } from 'components'
import { getRandom } from 'utils'

export const FlipperPage = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])

  const gridHeight = 8
  const gridWidth = 80

  const generateRandomIdsAndFlipThem = (numberToGenerate: number) => {
    const idArray = []
    while (idArray.length <= numberToGenerate) {
      const row = getRandom(gridHeight)
      const col = getRandom(gridWidth)
      const id = `${row}-${col}`
      idArray.push(id)
    }
    const uniqueArray = [...Array.from(new Set(idArray))]
    setFlippedIds(uniqueArray)
  }

  return (
    <PageWrapper pageTitle="flipper">
      <div className="p-4">
        <FlipperGrid
          width={gridWidth}
          height={gridHeight}
          flippedIds={flippedIds}
        />
        <Button
          text="flip card"
          className="mt-8"
          onClick={() => generateRandomIdsAndFlipThem(50)}
        />
      </div>
    </PageWrapper>
  )
}

export default FlipperPage
