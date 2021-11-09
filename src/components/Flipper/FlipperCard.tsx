import { ReactElement } from 'react'

interface FlipperCardProps {
  unflippedColor: string
  flippedColor: string
  isFlipped: boolean
  id: string
}

export const FlipperCard = ({
  unflippedColor,
  flippedColor,
  isFlipped,
  id,
}: FlipperCardProps): ReactElement => {
  const frontAndBackCardStyles = `absolute w-full h-full backface-hidden`
  return (
    <div className={`sq-4 perspective-500`} id={id}>
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
