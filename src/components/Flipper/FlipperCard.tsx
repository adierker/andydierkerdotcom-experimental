import { ReactElement } from 'react'

interface FlipperCardProps {
  unflippedColor: string
  flippedColor: string
  isFlipped: boolean
}

export const FlipperCard = ({
  unflippedColor,
  flippedColor,
  isFlipped,
}: FlipperCardProps): ReactElement => {
  const frontAndBackCardStyles = `absolute w-full h-full backface-hidden`
  return (
    <div className={`sq-64 perspective-500`}>
      <div
        className={`absolute w-full h-full content-shadow content-transition ${
          isFlipped && 'flip-transition rotated-x'
        }`}
      >
        <div className={`${frontAndBackCardStyles} ${unflippedColor}`} />
        <div
          className={`${frontAndBackCardStyles} ${flippedColor} rotated-x`}
        />
      </div>
    </div>
  )
}

export default FlipperCard
