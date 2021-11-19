export type PlayerOrComputer = 'player' | 'computer'
export type TurnPhase = 'selectPiece' | 'selectSquare' | 'confirmSelection'
export type GamePiece = 'small' | 'medium' | 'large'
export type Squares =
  | 'r1-c1'
  | 'r1-c2'
  | 'r1-c3'
  | 'r2-c1'
  | 'r2-c2'
  | 'r2-c3'
  | 'r3-c1'
  | 'r3-c2'
  | 'r3-c3'

export interface GamePiecesRemaining {
  small: number
  medium: number
  large: number
}

export interface SquareState {
  owner: PlayerOrComputer
  piece: GamePiece
}

export interface BoardState {
  'r1-c1': SquareState | null
  'r1-c2': SquareState | null
  'r1-c3': SquareState | null
  'r2-c1': SquareState | null
  'r2-c2': SquareState | null
  'r2-c3': SquareState | null
  'r3-c1': SquareState | null
  'r3-c2': SquareState | null
  'r3-c3': SquareState | null
}

export interface WinnableSquare {
  square: Squares
  minimumPieceRequired: GamePiece
}
