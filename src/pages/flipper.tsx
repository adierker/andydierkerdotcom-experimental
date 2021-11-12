import { ReactElement, useState, useEffect } from 'react'

import { Button, Input, PageWrapper, FlipperGrid } from 'components'
import { getRandom } from 'utils'

export const monogram = {
  width: 5,
  height: 9,
  chars: {
    a: [
      '7-5',
      '5-5',
      '6-5',
      '4-5',
      '3-5',
      '6-1',
      '5-1',
      '4-1',
      '3-2',
      '3-3',
      '3-4',
      '7-2',
      '7-3',
      '7-4',
    ],
    b: [
      '1-1',
      '2-1',
      '3-1',
      '4-1',
      '5-1',
      '6-1',
      '7-1',
      '7-2',
      '7-3',
      '7-4',
      '6-5',
      '5-5',
      '4-5',
      '3-4',
      '3-3',
      '3-2',
    ],
    c: [
      '6-5',
      '7-4',
      '7-3',
      '7-2',
      '6-1',
      '5-1',
      '4-1',
      '3-2',
      '3-3',
      '3-4',
      '4-5',
    ],
    d: [
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '2-5',
      '1-5',
      '7-4',
      '7-3',
      '7-2',
      '6-1',
      '5-1',
      '4-1',
      '3-2',
      '3-3',
      '3-4',
    ],
    e: [
      '7-4',
      '7-3',
      '7-2',
      '6-1',
      '5-1',
      '4-1',
      '3-2',
      '3-3',
      '3-4',
      '5-2',
      '5-3',
      '5-4',
      '5-5',
      '4-5',
    ],
    f: [
      '1-3',
      '1-4',
      '2-5',
      '2-2',
      '3-2',
      '4-2',
      '4-1',
      '4-3',
      '4-4',
      '5-2',
      '6-2',
      '7-2',
    ],
    g: [
      '9-2',
      '9-3',
      '9-4',
      '8-5',
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '3-4',
      '3-3',
      '3-2',
      '4-1',
      '5-1',
      '6-1',
      '7-2',
      '7-3',
      '7-4',
    ],
    h: [
      '7-1',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
      '2-1',
      '1-1',
      '3-2',
      '3-3',
      '3-4',
      '4-5',
      '5-5',
      '6-5',
      '7-5',
    ],
    i: [
      '7-1',
      '7-2',
      '7-3',
      '7-5',
      '7-4',
      '6-3',
      '5-3',
      '4-3',
      '1-3',
      '3-2',
      '3-3',
    ],
    j: [
      '8-1',
      '9-2',
      '9-3',
      '9-4',
      '8-5',
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '3-4',
      '1-5',
    ],
    k: [
      '7-1',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
      '2-1',
      '1-1',
      '7-5',
      '6-4',
      '5-3',
      '5-2',
      '4-4',
      '3-5',
    ],
    l: ['1-1', '1-2', '2-2', '3-2', '4-2', '5-2', '6-2', '7-3', '7-4', '7-5'],
    m: [
      '7-1',
      '5-1',
      '6-1',
      '4-1',
      '3-1',
      '3-2',
      '3-3',
      '3-4',
      '4-3',
      '5-3',
      '7-3',
      '6-3',
      '7-5',
      '6-5',
      '4-5',
      '5-5',
    ],
    n: [
      '7-1',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
      '3-2',
      '3-3',
      '3-4',
      '4-5',
      '5-5',
      '6-5',
      '7-5',
    ],
    o: [
      '6-1',
      '5-1',
      '4-1',
      '7-2',
      '7-3',
      '7-4',
      '6-5',
      '5-5',
      '4-5',
      '3-2',
      '3-3',
      '3-4',
    ],
    p: [
      '9-1',
      '8-1',
      '7-1',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
      '3-2',
      '3-3',
      '3-4',
      '4-5',
      '5-5',
      '6-5',
      '7-2',
      '7-3',
      '7-4',
    ],
    q: [
      '9-5',
      '8-5',
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '3-4',
      '3-3',
      '3-2',
      '4-1',
      '5-1',
      '6-1',
      '7-2',
      '7-3',
      '7-4',
    ],
    r: ['7-1', '6-1', '5-1', '4-1', '3-1', '4-2', '3-3', '3-4', '4-5'],
    s: [
      '7-1',
      '7-2',
      '7-3',
      '7-4',
      '6-5',
      '5-3',
      '5-4',
      '5-2',
      '4-1',
      '3-2',
      '3-3',
      '3-4',
      '3-5',
    ],
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
    u: [
      '7-5',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '7-4',
      '7-3',
      '7-2',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
    ],
    v: ['7-3', '6-2', '5-1', '6-4', '5-5', '4-5', '3-5', '3-1', '4-1'],
    w: [
      '7-2',
      '7-4',
      '6-3',
      '5-3',
      '6-5',
      '5-5',
      '4-5',
      '3-5',
      '6-1',
      '5-1',
      '4-1',
      '3-1',
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
    z: [
      '7-5',
      '7-4',
      '7-3',
      '7-2',
      '7-1',
      '3-1',
      '3-2',
      '3-3',
      '3-4',
      '3-5',
      '6-2',
      '5-3',
      '4-4',
    ],
  },
}

export const FlipperPage = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [text, setText] = useState<string>('')

  const gridHeight = 9
  const gridWidth = 60

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
    const offset = monogram.width + 1

    let flippedIds = []

    chars.forEach((char, charIndex) => {
      const cards = monogram.chars[char]
      const colOffset = offset * charIndex
      const offsetCards = cards.map((card) => {
        const splitRowAndCol = card.split('-')
        const row = splitRowAndCol[0]
        const col = parseInt(splitRowAndCol[1], 10)
        return `${row}-${col + colOffset}`
      })

      offsetCards.forEach((card) => flippedIds.push(card))
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
