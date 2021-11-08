import { ReactElement, useEffect } from 'react'

import { Button } from 'components'
import { useTicTacToe } from 'hooks'

const squares = [
  'r1c1',
  'r1c2',
  'r1c3',
  'r2c1',
  'r2c2',
  'r2c3',
  'r3c1',
  'r3c2',
  'r3c3',
]

const pieces = ['small', 'medium', 'large']

const sizes = {
  small: 'sq-8',
  medium: 'sq-12',
  large: 'sq-20',
}

const Square = ({ id, handleSquareClick, isSelected, boardState }: any) => {
  let squareContent = null
  if (boardState[id]) {
    squareContent = boardState[id]
  }
  return (
    <div
      id={id}
      className={`flex items-center justify-center h-32 text-2xl bg-drkr-green headline-spaced-font ${
        isSelected && 'border-4 border-drkr-black'
      }`}
      onClick={() => handleSquareClick(id)}
    >
      {squareContent && (
        <div
          className={`rounded-full ${
            squareContent.owner === 'player' ? 'bg-drkr-white' : 'bg-drkr-black'
          } ${sizes[squareContent.piece]}`}
        />
      )}
    </div>
  )
}

const PiecesRemaining = ({
  id,
  handlePieceClick,
  isSelected,
  remaining,
}: any) => {
  const size = sizes[id]

  return (
    <div
      id={id}
      className={`flex items-center mb-2 ${
        isSelected && 'border-4 border-drkr-black'
      }`}
      onClick={() => handlePieceClick(id)}
    >
      <div className={`bg-drkr-green rounded-full inline-block mr-2 ${size}`} />{' '}
      x {remaining[id]}
    </div>
  )
}

export const TicTacToe = (): ReactElement => {
  const {
    currentPhase,
    currentTurn,
    playerPieces,
    selectedPiece,
    selectedSquare,
    handlePieceClick,
    handleSquareClick,
    boardState,
    submitSelection,
  } = useTicTacToe()

  useEffect(() => {
    console.log('boardState:', boardState)
  }, [])

  return (
    <>
      <section
        id="game-board"
        className="grid grid-cols-3 grid-rows-3 gap-3 mb-4"
      >
        {squares.map((id) => (
          <Square
            id={id}
            key={id}
            handleSquareClick={handleSquareClick}
            isSelected={selectedSquare === id}
            boardState={boardState}
          />
        ))}
      </section>
      <section
        id="controls"
        className="flex w-full items-center justify-center h-12 mb-8"
      >
        {currentPhase === 'confirmSelection' && (
          <Button text="Confirm Selection" onClick={() => submitSelection()} />
        )}
      </section>
      <section id="game-pieces" className="flex flex-col items-center">
        {pieces.map((id) => (
          <PiecesRemaining
            id={id}
            key={id}
            handlePieceClick={handlePieceClick}
            isSelected={selectedPiece === id}
            remaining={playerPieces}
          />
        ))}
      </section>
      <section id="turn-indicator">turn: {currentTurn}</section>
      <section id="phase-indicator">phase: {currentPhase}</section>
    </>
  )
}

export default TicTacToe
