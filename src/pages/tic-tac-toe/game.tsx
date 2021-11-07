import { ReactElement } from 'react'

import { PageWrapper, TicTacToeGamePage } from 'components'
import { ModalContextProvider } from 'contexts'

export const TicTacToeGame = (): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper pageTitle="tic tac toe">
        <TicTacToeGamePage />
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default TicTacToeGame
