import Head from 'next/head'

import {Lock} from 'icons/Icons'
import {Modal} from 'components/Modal/Modal'
import {useModal} from 'components/Modal/Modal.hooks'
import {Button} from 'components/Button/Button'

export default function Home() {
  const {openModal, isOpen, closeModal} = useModal()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>andydierker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-between w-full flex-1 px-20 text-drkr-black">
        <div className="text-right mt-12 text-6xl lg:text-8xl headline">
          <h1 className="text-drkr-green">andy</h1>
          <h1 className="text-drkr-dark-green">dierker</h1>
          <h1 className="text-drkr-yellow">dot</h1>
          <h1 className="text-drkr-orange">com</h1>
        </div>

        <Button text="hello" onClick={() => null}/>

        <Lock 
          onClick={openModal}
          className="text-drkr-green h-14 w-14 lg:h-24 lg:w-24 mb-12 lg:mb-16 cursor-pointer"
        />
      </main>

      <Modal isOpen={isOpen} closeModal={closeModal}/>
    </div>
  )
}
