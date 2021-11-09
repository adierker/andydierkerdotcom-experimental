import { ReactElement, useState } from 'react'

import { Button, Container, PageWrapper, FlipperGrid } from 'components'
import { getRandom } from 'utils'

export const FlipperPage = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])

  const gridHeight = 6
  const gridWidth = 71

  const generateRandomIdsAndFlipThem = (numberToGenerate: number) => {
    const idArray = []
    while (idArray.length <= numberToGenerate) {
      const row = getRandom(gridHeight + 1)
      const col = getRandom(gridWidth + 1)
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
          onClick={() => generateRandomIdsAndFlipThem(100)}
        />
      </div>
    </PageWrapper>
  )
}

export default FlipperPage
