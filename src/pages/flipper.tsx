import { ReactElement, useState } from 'react'

import {
  Button,
  Input,
  PageWrapper,
  FlipperGrid,
  FontCreator,
} from 'components'
import { PixelInversionsFont } from 'consts'
import { getRandom } from 'utils'

export const FlipperPage = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])

  const gridHeight = 7
  const gridWidth = 120

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

  const updateText = (value: string) => {
    if (!value) {
      setFlippedIds([])
      return
    }

    const currentFont = PixelInversionsFont
    const chars = value.split('')
    const perCharFontOffset = currentFont.width + 1

    const flippedIds = []
    let currentOffsetCol = 0

    chars.forEach((char) => {
      if (currentFont.chars[char] === undefined) {
        currentOffsetCol += 3
        return
      }
      const cardsForThisChar = currentFont.chars[char]
      const offsetCards = cardsForThisChar.map((card) => {
        const splitRowAndCol = card.split('-')
        const row = splitRowAndCol[0]
        const col = parseInt(splitRowAndCol[1], 10)
        return `${row}-${col + currentOffsetCol}`
      })
      offsetCards.forEach((card) => flippedIds.push(card))
      currentOffsetCol += perCharFontOffset
    })

    setFlippedIds([...Array.from(new Set(flippedIds))])
  }

  return (
    <PageWrapper pageTitle="flipper">
      <div className="p-4">
        <FlipperGrid
          width={gridWidth}
          height={gridHeight}
          flippedIds={flippedIds}
          flipCard={null}
        />
        <Input
          id={'text'}
          className="mt-4"
          onChange={(e) => updateText(e.target.value)}
        />
        <Button
          text="flip random cards"
          className="mt-8"
          onClick={() => generateRandomIdsAndFlipThem(100)}
        />
        <div className="mt-8">
          <FontCreator />
        </div>
      </div>
    </PageWrapper>
  )
}

export default FlipperPage
