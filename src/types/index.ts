import {MODALS} from 'consts'

type ModalKeys = keyof typeof MODALS
type ModalValues = typeof MODALS[ModalKeys]
export type ModalTypes = ModalValues | null