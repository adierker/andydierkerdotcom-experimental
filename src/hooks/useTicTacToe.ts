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

const pieceAIsBiggerThanPieceB = (a: GamePiece, b: GamePiece): boolean => {
  const indexOfA = GamePieceHierarchy.indexOf(a)
  const indexOfB = GamePieceHierarchy.indexOf(b)
  return indexOfA > indexOfB
}

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

type OwnedSquares = OwnedSquare[]

interface OwnedSquare {
  square: Squares
  owner: TurnType
  piece: GamePiece
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
    getOwnedSquares()
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

  const getOwnedSquares = (): OwnedSquares => {
    const squaresWithOwners = Object.entries(boardState)
      .filter((entryKeyAndValue) => {
        const squareOwnerAndPiece = entryKeyAndValue[1]
        return squareOwnerAndPiece?.owner
      })
      .map(([square, { owner, piece }]) => ({
        square,
        owner,
        piece,
      }))
    console.log('squaresWithOwners:', squaresWithOwners)
    return squaresWithOwners as OwnedSquares
  }

  useEffect(() => {
    if (currentTurn === 'computer') {
      console.log('detected computers turn...')
      const allSquares = Object.keys(boardState)
      let validTurn = null

      const takeComputersTurn = () => {
        let playerIsAboutToWin = null
        let computerHasAChanceToWin = null

        const ownedSquares = getOwnedSquares()
        const playerOwnedSquares = ownedSquares.filter(
          ({ owner }) => owner === 'player'
        )
        const computerOwnedSquares = ownedSquares.filter(
          ({ owner }) => owner === 'computer'
        )
        // TODO: determine if either player or computer has 2 in a row or 2 in a column

        if (computerHasAChanceToWin) {
          // TODO: make the move that would win
        } else if (playerIsAboutToWin) {
          // TODO: make the move that blocks the player
        } else {
          // make a random move
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
