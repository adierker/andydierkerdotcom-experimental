import Head from 'next/head'

import {LinkedIn, Instagram, Github} from 'icons'
import {Modal, BreakpointHelper} from 'components'
import {MODALS} from 'consts'
import {useModal} from 'hooks'
import {openInNewTab} from 'utils'

export default function Home() {
  const {openModal, closeModal, modalContent} = useModal()

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>andydierker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BreakpointHelper/> */}

      <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 text-drkr-black">

        <section id="avatar" className="max-w-xxs xs:max-w-xs mt-10 sm:mt-20">
          <img className="rounded-full border-4 border-drkr-black" src="/me.jpg"/>
        </section>

        <section id="name-and-title" className="mt-4 sm:mt-8 text-center text-drkr-black">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl headline">Andy Dierker</h1>
          <h2 className="text-2xl xs:text-2xl body mt-2 xs:mt-4">frontend software type of guy</h2>
        </section>

        <section id="menu-links" className="flex flex-col sm:flex-row justify-center w-full mt-4 headline-spaced text-2xl underline">
          <button 
            className="text-center mr-0 sm:mr-4 hover:text-drkr-green" 
            type="button" 
            onClick={() => openModal(MODALS.ABOUT)}
          >
            about
          </button>
          <button 
            className="text-center mt-2 sm:mt-0 mr-0 sm:mr-4 hover:text-drkr-green" 
            type="button" 
            onClick={() => openInNewTab('/dierker-resume-2021.pdf')}
          >
            resume
          </button>
          <button 
            className="text-center mt-2 sm:mt-0 mr-0 sm:mr-4 hover:text-drkr-green" 
            type="button" 
            onClick={() => openModal(MODALS.CONTACT)}
          >
            contact
          </button>
          <button 
            className="text-center mt-2 sm:mt-0 hover:text-drkr-green" 
            type="button" 
            onClick={() => openModal(MODALS.PROJECTS)}
          >
            projects
          </button>
        </section>

        <section id="social-buttons" className="flex flex-row mt-8 sm:mt-6">
          <Github className="h-10 w-10 flex-1 mr-6 sm:mr-10 hover:text-drkr-green" url="https://github.com/adierker"/>
          <LinkedIn className="h-10 w-10 flex-1 mr-6 sm:mr-10 hover:text-drkr-green" url="https://www.linkedin.com/in/dierker/"/>
          <Instagram className="h-10 w-10 flex-1 hover:text-drkr-green" url="https://www.instagram.com/dierker/"/>
        </section>

      </main>

      {!!modalContent && (
        <Modal 
          modalContent={modalContent} 
          closeModal={closeModal} 
        />
      )}
    </div>
  )
}
