import { COLLECTIONS } from 'consts'

export type CollectionsType = typeof COLLECTIONS[keyof typeof COLLECTIONS]
