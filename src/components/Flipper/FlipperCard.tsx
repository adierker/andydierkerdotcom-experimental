import { ReactElement } from 'react'

import styles from './FlipperCard.module.css'

interface FlipperCardProps {
  unflippedColor: string
  flippedColor: string
  isFlipped: boolean
}

export const FlipperCard = ({
  unflippedColor,
  flippedColor,
  isFlipped,
}: FlipperCardProps): ReactElement => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.front}>front</div>
        <div className={styles.back}>back</div>
      </div>
    </div>
  )
}

export default FlipperCard
