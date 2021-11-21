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
import { getRandom, getNextBiggestPiece, pieceAIsBiggerThanPieceB } from 'utils'

const defaultPieces = {
  small: 10,
  medium: 2,
  large: 2,
}

const startingBoardState = {
  'r1-c1': { owner: null, piece: null },
  'r1-c2': { owner: null, piece: null },
  'r1-c3': { owner: null, piece: null },
  'r2-c1': { owner: null, piece: null },
  'r2-c2': { owner: null, piece: null },
  'r2-c3': { owner: null, piece: null },
  'r3-c1': { owner: null, piece: null },
  'r3-c2': { owner: null, piece: null },
  'r3-c3': { owner: null, piece: null },
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

export const useTicTacToe = (): UseTicTacToeHook => {
  const [currentTurn, setCurrentTurn] = useState<PlayerOrComputer>('player')
  const [currentPhase, setCurrentPhase] = useState<TurnPhase>('selectPiece')

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

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

  const [computerWinnableSquares, setComputerWinnableSquares] = useState<
    WinnableSquare[]
  >([])
  const [playerWinnableSquares, setPlayerWinnableSquares] = useState<
    WinnableSquare[]
  >([])

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

  const gameOver = (message: string) => {
    alert(message)
  }

  const evaluateBoard = () => {
    let thereIsAWinner: PlayerOrComputer | null = null

    const checkRowsAndCols = () => {
      const rowsAndCols = ['r1', 'r2', 'r3', 'c1', 'c2', 'c3']
      rowsAndCols.forEach((rowOrCol) => {
        const owners = {
          player: 0,
          computer: 0,
          null: 0,
        }
        const squaresInThisRowOrCol = Object.entries(boardState).filter(
          ([square]) => square.includes(rowOrCol)
        )
        squaresInThisRowOrCol.forEach(([square, { owner, piece }]) => {
          owners[owner] += 1
        })
        if (owners.player === 3) {
          thereIsAWinner = 'player'
          return
        } else if (owners.computer === 3) {
          thereIsAWinner = 'computer'
          return
        } else if (owners.null >= 2) {
          // there are still two unclaimed squares in this row -
          // no one can win in the next turn with this row
          // so we can skip it
          return
        } else if (owners.computer === 2) {
          // if computer owns 2 square, they can potentially win in this row
          const computerWinnableSquares: WinnableSquare[] = []
          squaresInThisRowOrCol.forEach(([square, { owner, piece }]) => {
            if (owner !== 'computer' && piece !== 'large') {
              computerWinnableSquares.push({
                square: square as Squares,
                minimumPieceRequired: getNextBiggestPiece(piece),
              })
            }
          })
          setComputerWinnableSquares(computerWinnableSquares)
        } else if (owners.player === 2) {
          // if player owns 2 squares, they can potentially win in this row
          const playerWinnableSquares: WinnableSquare[] = []
          squaresInThisRowOrCol.forEach(([square, { owner, piece }]) => {
            if (owner !== 'player' && piece !== 'large') {
              playerWinnableSquares.push({
                square: square as Squares,
                minimumPieceRequired: getNextBiggestPiece(piece),
              })
            }
          })
          setPlayerWinnableSquares(playerWinnableSquares)
        }
      })
    }

    checkRowsAndCols()

    if (thereIsAWinner) {
      setIsGameOver(true)
      gameOver(`${thereIsAWinner} wins!`)
    }
  }

  // make sure you validate that this is a valid move before calling this function
  // or it will blow up
  const makeMove = (
    square: Squares,
    owner: PlayerOrComputer,
    piece: GamePiece
  ) => {
    setBoardState({
      ...boardState,
      [square]: {
        owner,
        piece,
      },
    })
    if (owner === 'computer') {
      setComputerPieces({
        ...computerPieces,
        [piece]: computerPieces[piece] - 1,
      })
    } else {
      setPlayerPieces({
        ...playerPieces,
        [piece]: playerPieces[piece] - 1,
      })
    }
  }

  useEffect(() => {
    if (isGameOver) {
      return
    }

    setComputerWinnableSquares([])
    setPlayerWinnableSquares([])

    evaluateBoard()

    if (currentTurn === 'computer') {
      const allSquares = Object.keys(boardState)
      let validTurnHasBeenMade = null

      const takeComputersTurn = () => {
        if (computerWinnableSquares.length > 0) {
          const { square, minimumPieceRequired } = computerWinnableSquares[0]
          // make the move required to win
          if (computerPieces[minimumPieceRequired] > 0) {
            validTurnHasBeenMade = true
            makeMove(square, 'computer', minimumPieceRequired)
          } else {
            setComputerWinnableSquares(computerWinnableSquares.slice(1))
          }
          return
        } else if (playerWinnableSquares.length > 0) {
          // block the player's win
          const { square, minimumPieceRequired } = playerWinnableSquares[0]
          if (computerPieces[minimumPieceRequired] > 0) {
            validTurnHasBeenMade = true
            makeMove(square, 'computer', minimumPieceRequired)
          } else {
            setPlayerWinnableSquares(playerWinnableSquares.slice(1))
          }
          return
        } else {
          const randomlyChosenSquareId = getRandom(allSquares)
          const randomlyChosenSquare = boardState[randomlyChosenSquareId]
          if (randomlyChosenSquare.owner === null) {
            validTurnHasBeenMade = true
            makeMove(randomlyChosenSquareId, 'computer', 'small')
          } else if (randomlyChosenSquare.owner === 'player') {
            if (
              randomlyChosenSquare.piece === 'small' &&
              computerPieces.medium > 0
            ) {
              validTurnHasBeenMade = true
              makeMove(randomlyChosenSquareId, 'computer', 'medium')
            } else if (
              randomlyChosenSquare.piece === 'medium' &&
              computerPieces.large > 0
            ) {
              validTurnHasBeenMade = true
              makeMove(randomlyChosenSquareId, 'computer', 'large')
            }
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
