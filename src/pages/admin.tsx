import { ReactElement } from 'react'

import { PageWrapper, AddRecipeForm } from 'components'
import { ModalContextProvider } from 'contexts'

const ADD_RECIPE_MODALS = [
  {
    id: 'passedValidation',
    title: 'Submit recipe?',
    content: [
      'This recipe passed validation. Are you sure you would like to add this recipe?',
    ],
    buttons: [
      {
        text: 'Add recipe',
        link: {
          type: 'some type of submit will go here i guess',
          linkTo: 'dont know what will go here',
        },
      },
      {
        text: 'Cancel',
        link: {
          type: 'modal',
          linkTo: 'close',
        },
      },
    ],
  },
  {
    id: 'failedValidation',
    title: 'Invalid recipe',
    content: [
      'There is something wrong with the recipe you created.',
      'Go back and check the form.',
    ],
    buttons: [
      {
        text: 'Cancel',
        link: {
          type: 'modal',
          linkTo: 'close',
        },
      },
    ],
  },
  {
    id: 'addRecipeSuccess',
    title: 'Recipe added!',
    content: ['Your recipe was added successfully. Good job.'],
    buttons: [
      {
        text: 'Close',
        link: {
          type: 'modal',
          linkTo: 'close',
        },
      },
    ],
  },
  {
    id: 'addRecipeFailure',
    title: 'Add recipe failed!',
    content: ['Something got fucked up. What did you do wrong?'],
    buttons: [
      {
        text: 'Close',
        link: {
          type: 'modal',
          linkTo: 'close',
        },
      },
    ],
  },
]

export const Admin = (): ReactElement => {
  return (
    <ModalContextProvider modalsContent={ADD_RECIPE_MODALS}>
      <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
        <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl mb-8 text-center headline-font">
            Add New Recipe
          </h1>
          <AddRecipeForm />
        </main>
      </PageWrapper>
    </ModalContextProvider>
  )
}

export default Admin
