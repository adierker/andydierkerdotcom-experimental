import { ReactElement, useState, useEffect } from 'react'

import { Button, Input, PageWrapper, FlipperGrid } from 'components'
import { getRandom } from 'utils'

export const monogram = {
  width: 5,
  height: 9,
  chars: {
    t: [
      '2-2',
      '1-2',
      '3-1',
      '3-2',
      '3-3',
      '3-4',
      '4-2',
      '5-2',
      '6-2',
      '7-3',
      '7-4',
      '7-5',
    ],
    x: ['7-1', '6-2', '5-3', '6-4', '7-5', '4-4', '3-5', '4-2', '3-1'],
    y: [
      '3-1',
      '4-1',
      '5-1',
      '6-1',
      '7-2',
      '7-3',
      '7-4',
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '8-5',
      '9-4',
      '9-3',
      '9-2',
    ],
  },
}

export const FlipperPage = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [text, setText] = useState<string>('')

  const gridHeight = 9
  const gridWidth = 80

  useEffect(() => {
    console.log(flippedIds)
  }, [flippedIds])

  useEffect(() => {
    console.log(text)
  }, [text])

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

  const flipCard = (cardId: string) => {
    const flipped = flippedIds
    const isCardAlreadyFlipped = flipped.includes(cardId)
    isCardAlreadyFlipped
      ? flipped.splice(flipped.indexOf(cardId), 1)
      : flipped.push(cardId)
    setFlippedIds([...Array.from(new Set(flipped))])
  }

  const updateText = (value: string) => {
    if (!value) {
      return
    }
    const chars = value.split('')
    if (value === 't') {
      const char = monogram.chars.t
      setFlippedIds(char)
    }
  }

  return (
    <PageWrapper pageTitle="flipper">
      <div className="p-4">
        <FlipperGrid
          width={gridWidth}
          height={gridHeight}
          flippedIds={flippedIds}
          flipCard={flipCard}
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
      </div>
    </PageWrapper>
  )
}

export default FlipperPage
