import {MODALS} from 'consts'

type ModalTypesKeys = keyof typeof MODALS
type ModalTypesValues = typeof MODALS[ModalTypesKeys]
export type ModalTypes = ModalTypesValues | null