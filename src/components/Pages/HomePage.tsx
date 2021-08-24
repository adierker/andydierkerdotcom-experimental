import {HomePageContent} from 'types'

export const HomePage = ({heading, subheading, links, socials}: HomePageContent) => {
  return (
    <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 py-10 sm:py-20 text-drkr-black">
      <section id="avatar" className="max-w-xxs xs:max-w-xs">
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

      <section id="links" className="flex flex-col sm:flex-row items-center justify-center w-full mt-4 headline-spaced-font text-2xl underline ">
        {links.map((link, index) => (
          <button 
            type="button"
            className={`text-center drkr-focus text-drkr-hover ${link.className}`}
            onClick={link.onClick}
            key={`link-${index}`}
          >
            {link.text}
          </button>
        ))}
      </section>

      <section id="socials" className="flex flex-row mt-8 sm:mt-6">
        {socials.map((social, index) => (
          <a 
            href={social.url} 
            target="_blank" 
            rel="noopener, noreferrer" 
            key={`social-${index}`}
            className={`drkr-focus ${social.className}`}
          >
            <social.icon 
              className="h-10 w-10 flex-1 text-drkr-hover"
            />
          </a>
        ))}
      </section>
    </main>
  )
}