import {MODALS} from 'components/Modal'

type ModalKeys = keyof typeof MODALS
type ModalValues = typeof MODALS[ModalKeys]
export type ModalTypes = ModalValues | null