import { Dispatch, ReactElement, forwardRef, SetStateAction } from 'react'

interface FlipperCardProps {
  unflippedColor: string
  flippedColor: string
  isFlipped: boolean
  id: string
  flipCard: Dispatch<SetStateAction<string>> | null
}

export const FlipperCard = forwardRef<HTMLDivElement, FlipperCardProps>(
  (
    { unflippedColor, flippedColor, isFlipped, id, flipCard }: FlipperCardProps,
    ref
  ): ReactElement => {
    const frontAndBackCardStyles = `absolute w-full h-full backface-hidden`
    return (
      <div
        className={`perspective-500 flex-grow`}
        id={id}
        ref={ref}
        onClick={() => flipCard(id)}
      >
        {/* add 'content-shadow' class to div below to add shadow */}
        <div
          className={`absolute w-full h-full content-transition content-shadow ${
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
