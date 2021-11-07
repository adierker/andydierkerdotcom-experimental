import { ReactElement } from 'react'

import { PageWrapper, TicTacToeIntroPage } from 'components'
import { ModalContextProvider } from 'contexts'

export const TicTacToeIntro = (): ReactElement => {
  return (
    <ModalContextProvider>
      <PageWrapper pageTitle="tic tac toe" hasNavigation={true}>
        <TicTacToeIntroPage />
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default TicTacToeIntro
