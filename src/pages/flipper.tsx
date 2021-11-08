import { ReactElement, useState } from 'react'

import {
  Button,
  Container,
  PageWrapper,
  // FlipperGrid,
  FlipperCard,
} from 'components'

export const FlipperPage = (): ReactElement => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  return (
    <PageWrapper pageTitle="flipper">
      <Container>
        {/* <FlipperGrid /> */}
        <div className="h-96">
          <FlipperCard
            unflippedColor="bg-drkr-white"
            flippedColor="bg-drkr-green"
            isFlipped={isFlipped}
          />
        </div>
        <Button text="flip card" onClick={() => setIsFlipped(!isFlipped)} />
      </Container>
    </PageWrapper>
  )
}

export default FlipperPage
