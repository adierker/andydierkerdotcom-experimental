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
