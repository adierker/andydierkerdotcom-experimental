import {LinkedIn, Instagram, Github} from 'icons'
import {HomeContent} from 'types'

export const Home = ({heading, subheading, links}: HomeContent) => {
  return (
    <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 text-drkr-black">
      <section id="avatar" className="max-w-xxs xs:max-w-xs mt-10 sm:mt-20">
        <img className="rounded-full border-4 border-drkr-black" src="/me.jpg"/>
      </section>

      <section id="heading" className="mt-4 sm:mt-8 text-center text-drkr-black">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl headline-font">
          {heading}
        </h1>
        <h2 className="text-2xl xs:text-2xl body-font mt-2 xs:mt-4">
          {subheading}
        </h2>
      </section>

      <section id="links" className="flex flex-col sm:flex-row justify-center w-full mt-4 headline-spaced-font text-2xl underline">
        {links.map((link, index) => (
          <button 
            type="button"
            className={`text-center hover:text-drkr-green ${link.classes}`}
            onClick={link.onClick}
            key={`link-${index}`}
          >
            {link.text}
          </button>
        ))}
      </section>

      <section id="socials" className="flex flex-row mt-8 sm:mt-6">
        <Github className="h-10 w-10 flex-1 mr-6 sm:mr-10 hover:text-drkr-green" url="https://github.com/adierker"/>
        <LinkedIn className="h-10 w-10 flex-1 mr-6 sm:mr-10 hover:text-drkr-green" url="https://www.linkedin.com/in/dierker/"/>
        <Instagram className="h-10 w-10 flex-1 hover:text-drkr-green" url="https://www.instagram.com/dierker/"/>
      </section>
    </main>
  )
}