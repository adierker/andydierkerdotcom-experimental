import { ReactElement, useState, useEffect } from 'react'

import { Button, FlipperGrid } from 'components'

export const FontCreator = (): ReactElement => {
  const [flippedIds, setFlippedIds] = useState<string[]>([])

  useEffect(() => {
    console.log(flippedIds)
  }, [flippedIds])

  // set these to the height/width of the font you are designing
  const gridHeight = 7
  const gridWidth = 7

  const flipCard = (cardId: string) => {
    const flipped = flippedIds
    const isCardAlreadyFlipped = flipped.includes(cardId)
    isCardAlreadyFlipped
      ? flipped.splice(flipped.indexOf(cardId), 1)
      : flipped.push(cardId)
    setFlippedIds([...Array.from(new Set(flipped))])
  }

  return (
    <div className="p-4">
      <FlipperGrid
        width={gridWidth}
        height={gridHeight}
        flippedIds={flippedIds}
        flipCard={flipCard}
      />
      <Button text="reset" className="mt-8" onClick={() => setFlippedIds([])} />
    </div>
  )
}

export default FontCreator
