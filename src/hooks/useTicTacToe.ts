import { useState, Dispatch, SetStateAction } from 'react'

interface UseTicTacToeHook {
  hasGameStarted: boolean
  setHasGameStarted: Dispatch<SetStateAction<boolean>>
}

// TODO: these properties are placeholders and don't do anything, and will need to be replaced
// we don't need to track hasGameStarted at all - we'll just use a new URL
export const useTicTacToe = (): UseTicTacToeHook => {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false)

  return {
    hasGameStarted,
    setHasGameStarted,
  }
}
