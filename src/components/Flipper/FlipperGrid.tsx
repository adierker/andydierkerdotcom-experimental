import { ReactElement, useRef } from 'react'

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
  return (
    <div className="flex flex-col">
      {[...new Array(height)].map((_, rowIndex) => (
        <div key={`row-${rowIndex + 1}`} className="flex flex-row">
          {[...new Array(width)].map((_, colIndex) => {
            const cardId = `${rowIndex + 1}-${colIndex + 1}`
            const isFlipped = flippedIds.includes(cardId)
            return (
              <FlipperCard
                id={cardId}
                key={cardId}
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
