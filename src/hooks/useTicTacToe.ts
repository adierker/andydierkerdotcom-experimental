import { useState, Dispatch, SetStateAction } from 'react'

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
}

type GamePiece = 'small' | 'medium' | 'large'

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

  const handlePieceClick = (piece: GamePiece) => {
    if (!piece || currentTurn !== 'player') {
      return null
    }
    setSelectedPiece(piece)
    setSelectedSquare(null)
    setCurrentPhase('selectSquare')
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
  }

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
  }
}

export default useTicTacToe
