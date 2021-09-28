import { DB_COLLECTIONS } from 'consts'

export type CollectionsType = typeof DB_COLLECTIONS[keyof typeof DB_COLLECTIONS]
