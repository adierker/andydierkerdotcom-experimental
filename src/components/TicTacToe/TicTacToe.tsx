import { ReactElement } from 'react'

import { useTicTacToe } from 'hooks'

export const TicTacToe = (): ReactElement => {
  const {
    currentPhase,
    currentTurn,
    playerPieces,
    selectedPiece,
    selectedSquare,
    handlePieceClick,
    handleSquareClick,
  } = useTicTacToe()
  const squareStyles =
    'flex items-center justify-center h-32 text-2xl bg-drkr-green headline-spaced-font'
  const circleStyles = `bg-drkr-green rounded-full inline-block mr-2 mb-2`
  return (
    <>
      <section
        id="game-board"
        className="grid grid-cols-3 grid-rows-3 gap-3 mb-4"
      >
        <div
          id="r1c1"
          className={`${squareStyles} ${
            selectedSquare === 'r1c1' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r1c1')}
        >
          r1c1
        </div>
        <div
          id="r1c2"
          className={`${squareStyles} ${
            selectedSquare === 'r1c2' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r1c2')}
        >
          r1c2
        </div>
        <div
          id="r1c3"
          className={`${squareStyles} ${
            selectedSquare === 'r1c3' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r1c3')}
        >
          r1c3
        </div>
        <div
          id="r2c1"
          className={`${squareStyles} ${
            selectedSquare === 'r2c1' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r2c1')}
        >
          r2c1
        </div>
        <div
          id="r2c2"
          className={`${squareStyles} ${
            selectedSquare === 'r2c2' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r2c2')}
        >
          r2c2
        </div>
        <div
          id="r2c3"
          className={`${squareStyles} ${
            selectedSquare === 'r2c3' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r2c3')}
        >
          r2c3
        </div>
        <div
          id="r3c1"
          className={`${squareStyles} ${
            selectedSquare === 'r3c1' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r3c1')}
        >
          r3c1
        </div>
        <div
          id="r3c2"
          className={`${squareStyles} ${
            selectedSquare === 'r3c2' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r3c2')}
        >
          r3c2
        </div>
        <div
          id="r3c3"
          className={`${squareStyles} ${
            selectedSquare === 'r3c3' && 'border-4'
          }`}
          onClick={() => handleSquareClick('r3c3')}
        >
          r3c3
        </div>
      </section>
      <section id="game-pieces" className="flex flex-col items-center">
        <div
          id="small"
          className={`flex items-center ${
            selectedPiece === 'small' && 'border-4'
          }`}
          onClick={() => handlePieceClick('small')}
        >
          <div className={`${circleStyles} sq-8`} /> x 100
        </div>
        <div
          id="medium"
          className={`flex items-center ${
            selectedPiece === 'medium' && 'border-4'
          }`}
          onClick={() => handlePieceClick('medium')}
        >
          <div className={`${circleStyles} sq-12`} /> x {playerPieces.medium}
        </div>
        <div
          id="large"
          className={`flex items-center ${
            selectedPiece === 'large' && 'border-4'
          }`}
          onClick={() => handlePieceClick('large')}
        >
          <div className={`${circleStyles} sq-20`} /> x {playerPieces.large}
        </div>
      </section>
      <section id="turn-indicator">turn: {currentTurn}</section>
      <section id="phase-indicator">phase: {currentPhase}</section>
    </>
  )
}

export default TicTacToe
