import Head from 'next/head'

import {Lock} from 'icons/Icons'
import {Modal} from 'components/Modal/Modal'
import {useModal} from 'components/Modal/Modal.hooks'
import {Button} from 'components/Button/Button'
import {BreakpointHelper} from 'components/BreakpointHelper/BreakpointHelper'

export default function Home() {
  const {openModal, isOpen, closeModal} = useModal()

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>andydierker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreakpointHelper/>

      <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 mt-20 text-drkr-black">
        <div className="max-w-md">
          <img className="rounded-full border-8 border-drkr-black" src="/me4.jpg"/>
        </div>
        <div className="mt-4 sm:mt-8 text-center text-drkr-black">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl headline">andy dierker</h1>
          <h2 className="text-1xl xs:text-2xl body mt-4">frontend software type of guy</h2>
        </div>
      </main>

      <Modal isOpen={isOpen} closeModal={closeModal}/>
    </div>
  )
}
