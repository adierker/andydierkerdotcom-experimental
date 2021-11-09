import { ReactElement, forwardRef } from 'react'

interface FlipperCardProps {
  unflippedColor: string
  flippedColor: string
  isFlipped: boolean
  id: string
}

export const FlipperCard = forwardRef<HTMLDivElement, FlipperCardProps>(
  (
    { unflippedColor, flippedColor, isFlipped, id }: FlipperCardProps,
    ref
  ): ReactElement => {
    const frontAndBackCardStyles = `absolute w-full h-full backface-hidden`
    return (
      <div className={`perspective-500 flex-grow`} id={id} ref={ref}>
        {/* add 'content-shadow' class to div below to add shadow */}
        <div
          className={`absolute w-full h-full content-transition ${
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
)

FlipperCard.displayName = 'FlipperCard'

export default FlipperCard
