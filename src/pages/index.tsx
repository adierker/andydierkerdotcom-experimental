import Head from 'next/head'

import {LinkedIn, Instagram, Github} from 'icons/Social'
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

      <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 mt-10 xs:mt-20 text-drkr-black">
        <div className="max-w-xxs xs:max-w-xs">
          <img className="rounded-full border-4 border-drkr-black" src="/me4.jpg"/>
        </div>
        <div className="mt-4 sm:mt-8 text-center text-drkr-black">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl headline">Andy Dierker</h1>
          <h2 className="text-2xl xs:text-2xl body mt-2 xs:mt-4">frontend software type of guy</h2>
        </div>
        <div className="flex flex-row justify-between w-1/2 max-w-xxs min-w-max mt-6">
          <Github className="h-8 w-8 xs:h-10 xs:w-10 flex-1" url="https://github.com/adierker"/>
          <LinkedIn className="h-8 w-8 xs:h-10 xs:w-10 flex-1" url="https://www.linkedin.com/in/dierker/"/>
          <Instagram className="h-8 w-8 xs:h-10 xs:w-10 flex-1" url="https://www.instagram.com/dierker/"/>
        </div>
      </main>

      <Modal isOpen={isOpen} closeModal={closeModal}/>
    </div>
  )
}
