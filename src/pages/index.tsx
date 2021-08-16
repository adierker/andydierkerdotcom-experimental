import Head from 'next/head'

import {Lock} from 'icons/Icons'
import {Modal} from 'components/Modal/Modal'
import {useModal} from 'components/Modal/Modal.hooks'
import {Button} from 'components/Button/Button'
import {BreakpointHelper} from 'components/BreakpointHelper/BreakpointHelper'

export default function Home() {
  const {openModal, isOpen, closeModal} = useModal()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>andydierker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-1 items-center justify-start w-full px-20 text-drkr-black">
        <BreakpointHelper/>

        <div className="mt-20 max-w-lg">
          <img className="rounded-full border-8 border-drkr-black" src="/me4.jpg"/>
        </div>


        <div className="text-center mt-12 text-drkr-black">
          <h1 className="text-5xl lg:text-8xl headline">andy dierker</h1>
          <h4 className="text-2xl mt-6 body">frontend software type of guy</h4>
          {/* <h1 className="text-drkr-green">andy</h1>
          <h1 className="text-drkr-dark-green">dierker</h1>
          <h1 className="text-drkr-yellow">dot</h1>
          <h1 className="text-drkr-orange">com</h1> */}
        </div>

      </main>

      <Modal isOpen={isOpen} closeModal={closeModal}/>
    </div>
  )
}
