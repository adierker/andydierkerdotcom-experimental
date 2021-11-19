import { useState, Dispatch, SetStateAction, useEffect } from 'react'

import {
  PlayerOrComputer,
  TurnPhase,
  GamePiece,
  Squares,
  GamePiecesRemaining,
  BoardState,
  WinnableSquare,
} from 'types'
import { getRandom } from 'utils'

export const GamePieceHierarchy = ['small', 'medium', 'large']

const pieceAIsBiggerThanPieceB = (a: GamePiece, b: GamePiece): boolean => {
  const indexOfA = GamePieceHierarchy.indexOf(a)
  const indexOfB = GamePieceHierarchy.indexOf(b)
  return indexOfA > indexOfB
}

const defaultPieces = {
  small: 10,
  medium: 2,
  large: 2,
}

const startingBoardState = {
  'r1-c1': null,
  'r1-c2': null,
  'r1-c3': null,
  'r2-c1': null,
  'r2-c2': null,
  'r2-c3': null,
  'r3-c1': null,
  'r3-c2': null,
  'r3-c3': null,
}

interface UseTicTacToeHook {
  currentPhase: TurnPhase
  currentTurn: PlayerOrComputer
  setCurrentTurn: Dispatch<SetStateAction<PlayerOrComputer>>
  playerPieces: GamePiecesRemaining
  computerPieces: GamePiecesRemaining
  selectedPiece: GamePiece | null
  selectedSquare: Squares | null
  handleSquareClick: (Squares) => void
  handlePieceClick: (GamePiece) => void
  invalidSelectionMessage: string | null
  boardState: BoardState
  submitSelection: () => void
}

// TODO: these properties are placeholders and don't do anything, and will need to be replaced
// we don't need to track hasGameStarted at all - we'll just use a new URL
export const useTicTacToe = (): UseTicTacToeHook => {
  const [currentTurn, setCurrentTurn] = useState<PlayerOrComputer>('player')
  const [currentPhase, setCurrentPhase] = useState<TurnPhase>('selectPiece')

  const [playerPieces, setPlayerPieces] =
    useState<GamePiecesRemaining>(defaultPieces)
  const [computerPieces, setComputerPieces] =
    useState<GamePiecesRemaining>(defaultPieces)

  const [selectedPiece, setSelectedPiece] = useState<GamePiece | null>(null)
  const [selectedSquare, setSelectedSquare] = useState<Squares | null>(null)

  const [invalidSelectionMessage, setInvalidSelectionMessage] = useState<
    string | null
  >(null)

  const [boardState, setBoardState] = useState<BoardState>(startingBoardState)

  const [computerWinnableSquares, setComputerWinnableSquares] =
    useState<WinnableSquare | null>(null)
  const [playerWinnableSquares, setPlayerWinnableSquares] =
    useState<WinnableSquare | null>(null)

  const handlePieceClick = (piece: GamePiece) => {
    if (!piece || currentTurn !== 'player') {
      return null
    }
    if (playerPieces[piece] < 1) {
      setInvalidSelectionMessage(`No pieces of that size remaining.`)
      return null
    }
    setSelectedPiece(piece)
    setSelectedSquare(null)
    setCurrentPhase('selectSquare')
    setInvalidSelectionMessage(null)
  }

  const handleSquareClick = (square: Squares) => {
    if (
      !square ||
      currentTurn !== 'player' ||
      currentPhase === 'selectPiece' ||
      selectedPiece === null
    ) {
      return null
    }

    console.log('boardState:', boardState)
    console.log('square:', square)

    if (
      boardState[square] === null ||
      pieceAIsBiggerThanPieceB(selectedPiece, boardState[square].piece)
    ) {
      setSelectedSquare(square)
      setCurrentPhase('confirmSelection')
      setInvalidSelectionMessage(null)
    } else {
      setInvalidSelectionMessage(
        'Your selected piece needs to be bigger than the current occupying piece to replace it.'
      )
    }
  }

  const nextTurn = () => {
    setCurrentTurn(currentTurn === 'player' ? 'computer' : 'player')
    setCurrentPhase('selectPiece')
    setSelectedSquare(null)
    setSelectedPiece(null)
  }

  const submitSelection = () => {
    if (!selectedSquare || !selectedPiece) {
      setInvalidSelectionMessage('Something broke. Choose something else.')
    }
    const selectionIsValid = true
    if (selectionIsValid) {
      setBoardState({
        ...boardState,
        [selectedSquare]: {
          owner: currentTurn,
          piece: selectedPiece,
        },
      })
      setPlayerPieces({
        ...playerPieces,
        [selectedPiece]: playerPieces[selectedPiece] - 1,
      })
      nextTurn()
    }
  }

  const evaluateBoard = () => {}

  useEffect(() => {
    if (currentTurn === 'computer') {
      const allSquares = Object.keys(boardState)
      let validTurnHasBeenMade = null

      const takeComputersTurn = () => {
        const randomlyChosenSquareId = getRandom(allSquares)
        const randomlyChosenSquare = boardState[randomlyChosenSquareId]
        if (randomlyChosenSquare === null) {
          validTurnHasBeenMade = true
          setBoardState({
            ...boardState,
            [randomlyChosenSquareId]: {
              owner: 'computer',
              piece: 'small',
            },
          })
        } else if (randomlyChosenSquare.owner === 'player') {
          if (
            randomlyChosenSquare.piece === 'small' &&
            computerPieces.medium > 0
          ) {
            validTurnHasBeenMade = true
            setBoardState({
              ...boardState,
              [randomlyChosenSquareId]: {
                owner: 'computer',
                piece: 'medium',
              },
            })
            setComputerPieces({
              ...computerPieces,
              medium: computerPieces.medium - 1,
            })
          } else if (
            randomlyChosenSquare.piece === 'medium' &&
            computerPieces.large > 0
          ) {
            validTurnHasBeenMade = true
            setBoardState({
              ...boardState,
              [randomlyChosenSquareId]: {
                owner: 'computer',
                piece: 'large',
              },
            })
            setComputerPieces({
              ...computerPieces,
              large: computerPieces.large - 1,
            })
          }
        }
        if (!validTurnHasBeenMade) {
          takeComputersTurn()
        }
      }

      takeComputersTurn()
      nextTurn()
    }
  }, [currentTurn])

  return {
    currentPhase,
    currentTurn,
    handleSquareClick,
    handlePieceClick,
    setCurrentTurn,
    playerPieces,
    selectedPiece,
    selectedSquare,
    computerPieces,
    invalidSelectionMessage,
    boardState,
    submitSelection,
  }
}

export default useTicTacToe
