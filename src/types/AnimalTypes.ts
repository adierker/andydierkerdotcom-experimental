export interface Breed {
  primary: string
  secondary: string | null
  mixed: boolean
  unknown: boolean
}

export interface AnimalPhoto {
  small?: string
  medium?: string
  large?: string
  full?: string
}

export interface Animal {
  id: number
  url: string
  type: string
  breeds: Breed
  animalName: string
  age: string
  gender: string
  description: string
  photos: AnimalPhoto[]
}
