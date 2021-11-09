import { ReactElement, useRef, useState, useEffect } from 'react'

import { FlipperCard } from 'components'

interface FlipperGridProps {
  width: number
  height: number
  flippedIds: string[]
}

export const FlipperGrid = ({
  width,
  height,
  flippedIds,
}: FlipperGridProps): ReactElement => {
  // we want the flippercards in the grid to be square in shape, but still want the grid to be responsive
  // so we need to: 1. let each row fill up all the available width (via flex-grow in the flexbox)
  // 2. then measure the width of each card, and set the height of the row to that number
  const [cardWidth, setCardWidth] = useState<number>(0)
  const firstCardRef = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', getWidthOfFirstCard)
  }, [])

  useEffect(() => {
    getWidthOfFirstCard()
  }, [])

  const getWidthOfFirstCard = () => {
    const newWidth = firstCardRef.current.clientWidth
    setCardWidth(newWidth)
  }

  return (
    <div className="flex flex-col w-full">
      {[...new Array(height)].map((_, rowIndex) => (
        <div
          key={`row-${rowIndex + 1}`}
          className="flex flex-row"
          style={{ height: cardWidth }}
        >
          {[...new Array(width)].map((_, colIndex) => {
            const cardId = `${rowIndex + 1}-${colIndex + 1}`
            const isFlipped = flippedIds.includes(cardId)
            const isFirstCard = cardId === '1-1'
            return (
              <FlipperCard
                id={cardId}
                key={cardId}
                ref={isFirstCard ? firstCardRef : null}
                unflippedColor="bg-drkr-white"
                flippedColor="bg-drkr-green"
                isFlipped={isFlipped}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default FlipperGrid
