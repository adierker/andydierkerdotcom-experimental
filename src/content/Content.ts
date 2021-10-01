import { RecipeContent, CloseModalType, ModalContent } from 'types'

export const ADD_RECIPE_MODALS = {
  confirm: (
    closeModal: CloseModalType,
    submitRecipeToApi: (recipe: RecipeContent) => void,
    recipe: RecipeContent
  ): ModalContent => ({
    id: 'confirm',
    title: 'Submit recipe?',
    content: [
      'This recipe passed validation. Are you sure you would like to add this recipe?',
    ],
    buttons: [
      {
        text: 'Yes',
        onClick: () => {
          closeModal()
          submitRecipeToApi(recipe)
        },
      },
      {
        text: 'No, wait',
        onClick: closeModal,
      },
    ],
  }),
  invalid: (closeModal: CloseModalType): ModalContent => ({
    id: 'invalid',
    title: 'Invalid recipe',
    content: [
      'There is something wrong with the recipe you created.',
      'Go back and check the form.',
    ],
    buttons: [
      {
        text: 'Hmm...',
        onClick: closeModal,
      },
    ],
  }),
  success: (
    closeModal: CloseModalType,
    resetThisForm: () => void
  ): ModalContent => ({
    id: 'success',
    title: 'Recipe added!',
    content: ['Your recipe was added successfully. Good job.'],
    buttons: [
      {
        text: 'Nice',
        onClick: () => {
          closeModal()
          resetThisForm()
        },
      },
    ],
  }),
  failure: (closeModal: CloseModalType): ModalContent => ({
    id: 'failure',
    title: 'Add recipe failed!',
    content: ['Something got all fucked up. What did you do wrong?'],
    buttons: [
      {
        text: 'Oh, okay...',
        onClick: closeModal,
      },
    ],
  }),
}

export const EDIT_RECIPE_MODALS = {
  confirm: (
    closeModal: CloseModalType,
    submitRecipeChangesToApi: (recipe: RecipeContent) => void,
    recipe: RecipeContent
  ): ModalContent => ({
    id: 'confirm',
    title: 'Submit edits?',
    content: [
      'This edited recipe passed validation. Are you sure you would like to edit this recipe?',
    ],
    buttons: [
      {
        text: 'Yes',
        onClick: () => {
          closeModal()
          submitRecipeChangesToApi(recipe)
        },
      },
      {
        text: 'No, wait',
        onClick: closeModal,
      },
    ],
  }),
  confirmPathChange: (
    closeModal: CloseModalType,
    submitRecipeChangesToApi: (recipe: RecipeContent) => void,
    recipe: RecipeContent,
    originalRecipePath: string
  ): ModalContent => ({
    id: 'confirm',
    title: 'Submit edits?',
    content: [
      `You edited this recipe's original path, which will change it's URL.`,
      `${originalRecipePath} will be changed to: ${recipe.path}`,
      `Are you sure you would like to edit this recipe and it's URL/path?`,
    ],
    buttons: [
      {
        text: 'Yes',
        onClick: () => {
          closeModal()
          submitRecipeChangesToApi(recipe)
        },
      },
      {
        text: 'No, wait',
        onClick: closeModal,
      },
    ],
  }),
  confirmDelete: (
    closeModal: CloseModalType,
    submitRecipeDeletionToApi: () => void
  ): ModalContent => ({
    id: 'confirm',
    title: 'Delete recipe?',
    content: [`Are you sure you would like to delete this recipe?`],
    buttons: [
      {
        text: 'Yes',
        onClick: () => {
          closeModal()
          submitRecipeDeletionToApi()
        },
      },
      {
        text: 'No, wait',
        onClick: closeModal,
      },
    ],
  }),
  invalid: (closeModal: CloseModalType): ModalContent => ({
    id: 'invalid',
    title: 'Invalid edit',
    content: [
      `There is something wrong with the recipe you're editing.`,
      'Go back and check the form.',
    ],
    buttons: [
      {
        text: 'Hmm...',
        onClick: closeModal,
      },
    ],
  }),
  success: (
    closeModal: CloseModalType,
    redirect: () => void
  ): ModalContent => ({
    id: 'success',
    title: 'Recipe edited!',
    content: ['Your recipe was edited successfully. Good job.'],
    buttons: [
      {
        text: 'Nice',
        onClick: () => {
          closeModal()
          redirect()
        },
      },
    ],
  }),
  failure: (closeModal: CloseModalType): ModalContent => ({
    id: 'failure',
    title: 'Edit recipe failed!',
    content: ['Something got all fucked up. What did you do wrong?'],
    buttons: [
      {
        text: 'Oh, okay...',
        onClick: closeModal,
      },
    ],
  }),
  successDelete: (
    closeModal: CloseModalType,
    redirect: () => void
  ): ModalContent => ({
    id: 'success',
    title: 'Recipe deleted!',
    content: ['Your recipe was deleted successfully. Good job.'],
    buttons: [
      {
        text: 'Nice',
        onClick: () => {
          closeModal()
          redirect()
        },
      },
    ],
  }),
  failureDelete: (closeModal: CloseModalType): ModalContent => ({
    id: 'failure',
    title: 'Delete recipe failed!',
    content: ['Something got all fucked up. What did you do wrong?'],
    buttons: [
      {
        text: 'Oh, okay...',
        onClick: closeModal,
      },
    ],
  }),
}
