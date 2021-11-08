import { useState, Dispatch, SetStateAction, useEffect } from 'react'

import { shuffleArray, getRandom } from 'utils'

type TurnType = 'player' | 'computer'
type TurnPhase = 'selectPiece' | 'selectSquare' | 'confirmSelection'

interface UseTicTacToeHook {
  currentPhase: TurnPhase
  currentTurn: TurnType
  setCurrentTurn: Dispatch<SetStateAction<TurnType>>
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

type GamePiece = 'small' | 'medium' | 'large'

const GamePieceHierarchy = ['small', 'medium', 'large']

interface GamePiecesRemaining {
  small: number
  medium: number
  large: number
}

const defaultPieces = {
  small: 10,
  medium: 2,
  large: 2,
}

type Squares =
  | 'r1c1'
  | 'r1c2'
  | 'r1c3'
  | 'r2c1'
  | 'r2c2'
  | 'r2c3'
  | 'r3c1'
  | 'r3c2'
  | 'r3c3'

interface SquareState {
  owner: TurnType
  piece: GamePiece
}

interface BoardState {
  r1c1: SquareState | null
  r1c2: SquareState | null
  r1c3: SquareState | null
  r2c1: SquareState | null
  r2c2: SquareState | null
  r2c3: SquareState | null
  r3c1: SquareState | null
  r3c2: SquareState | null
  r3c3: SquareState | null
}

const startingBoardState = {
  r1c1: null,
  r1c2: null,
  r1c3: null,
  r2c1: null,
  r2c2: null,
  r2c3: null,
  r3c1: null,
  r3c2: null,
  r3c3: null,
}

// TODO: these properties are placeholders and don't do anything, and will need to be replaced
// we don't need to track hasGameStarted at all - we'll just use a new URL
export const useTicTacToe = (): UseTicTacToeHook => {
  const [currentTurn, setCurrentTurn] = useState<TurnType>('player')
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

  const handlePieceClick = (piece: GamePiece) => {
    if (!piece || currentTurn !== 'player') {
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
    setSelectedSquare(square)
    setCurrentPhase('confirmSelection')
    setInvalidSelectionMessage(null) // TODO: this is naive
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
      nextTurn()
    }
  }

  useEffect(() => {
    if (currentTurn === 'computer') {
      console.log('detected computers turn...')
      const allSquares = Object.keys(boardState)
      let validTurn = null

      const takeComputersTurn = () => {
        const randomlyChosenSquareId = getRandom(allSquares)
        console.log(boardState)
        const randomlyChosenSquare = boardState[randomlyChosenSquareId]
        console.log(
          `attempting computers turn, randomlyChosenSquare (${randomlyChosenSquareId}):`,
          randomlyChosenSquare
        )
        if (randomlyChosenSquare === null) {
          console.log('empty square! choosing!')
          validTurn = true
          setBoardState({
            ...boardState,
            [randomlyChosenSquareId]: {
              owner: 'computer',
              piece: 'small',
            },
          })
        } else if (randomlyChosenSquare.owner === 'player') {
          console.log('player owns chosen square...')
          if (
            randomlyChosenSquare.piece === 'small' &&
            computerPieces.medium > 0
          ) {
            console.log('found a small piece, replacing it with medium')
            validTurn = true
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
            console.log('found a medium piece, replacing it with large')
            validTurn = true
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
        if (!validTurn) {
          console.log('no valid turn found, trying again...')
          takeComputersTurn()
        }
      }

      takeComputersTurn()

      console.log('next turn!!')
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
