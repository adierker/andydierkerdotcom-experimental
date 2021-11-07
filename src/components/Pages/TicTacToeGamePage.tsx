import { ReactElement } from 'react'

import { TicTacToe, Container } from 'components'

export const TicTacToeGamePage = (): ReactElement => {
  return (
    <Container className="text-center">
      <TicTacToe />
    </Container>
  )
}

export default TicTacToeGamePage
