import { ReactElement } from 'react'

import { useRouter, NextRouter } from 'next/router'

import { Button, Container, Heading } from 'components'
import { SITEPATHS } from 'consts'
import { TIC_TAC_TOE_MODALS } from 'content'
import { useModalContext } from 'contexts'

export const TicTacToeIntroPage = (): ReactElement => {
  const { openCustomModal, closeModal } = useModalContext()
  const router: NextRouter = useRouter()

  return (
    <Container className="text-center">
      <section id="intro">
        <Heading text="Tic Tac Toe" />
        {/* image of the game will go here */}
      </section>
      <section id="buttons">
        <Button
          text="How to play"
          onClick={() =>
            openCustomModal(TIC_TAC_TOE_MODALS.howToPlay(closeModal))
          }
          className="focus-visible:bg-drkr-black mr-3"
        />
        <Button
          text="Start game"
          onClick={() => router.push(SITEPATHS.TIC_TAC_TOE_GAME)}
          className="focus-visible:bg-drkr-black"
        />
      </section>
    </Container>
  )
}
