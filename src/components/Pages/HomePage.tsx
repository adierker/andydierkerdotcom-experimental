import { HomePageContent } from 'types'
import { ExternalLink } from 'components'
import { useModalContext } from 'contexts'
import { onClickOpenLink } from 'utils'
import { LINKS, SOCIALS_MAP } from 'consts'

export const HomePage = ({
  heading,
  subheading,
  links,
  socials,
}: HomePageContent) => {
  const { openModal } = useModalContext()

  return (
    <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 py-10 sm:py-20 text-drkr-black">
      <section id="avatar" className="max-w-xxs xs:max-w-xs">
        <img
          className="rounded-full border-4 border-drkr-black"
          src="/me.jpg"
        />
      </section>

      <section
        id="heading"
        className="mt-4 sm:mt-8 text-center text-drkr-black"
      >
        <h1 className="text-4xl xs:text-5xl sm:text-6xl headline-font">
          {heading}
        </h1>
        <h2 className="text-2xl xs:text-2xl body-font mt-2 xs:mt-4">
          {subheading}
        </h2>
      </section>

      <section
        id="links"
        className="flex flex-col sm:flex-row items-center justify-center w-full mt-4 headline-spaced-font text-2xl underline "
      >
        {links.map((link, index) => {
          const isFirstItem = index === 0
          const isLastItem = links.length === index + 1

          let classes = ''
          if (isFirstItem) {
            classes = 'mr-0 sm:mr-4'
          } else if (isLastItem) {
            classes = 'mt-2 sm:mt-0'
          } else {
            classes = 'mt-2 sm:mt-0 mr-0 sm:mr-4'
          }

          const { type, linkTo } = link.link
          let onClick = () => {}
          if (type === LINKS.MODAL) {
            onClick = () => openModal(linkTo)
          } else if (type === LINKS.EXTERNAL) {
            onClick = () => onClickOpenLink(linkTo, true)
          }

          return (
            <button
              type="button"
              className={`text-center drkr-focus text-drkr-hover ${classes}`}
              onClick={onClick}
              key={`link-${index}`}
            >
              {link.text}
            </button>
          )
        })}
      </section>

      <section id="socials" className="flex flex-row mt-8 sm:mt-6">
        {socials.map((social, index) => {
          const Icon = SOCIALS_MAP[social.icon]
          const classes = socials.length === index + 1 ? '' : 'mr-6 sm:mr-10'
          return (
            <ExternalLink
              href={social.url}
              key={`social-${index}`}
              className={`drkr-focus ${classes} ${
                social.isRound && 'rounded-full'
              }`}
            >
              <Icon className="sq-10 flex-1 text-drkr-hover" />
            </ExternalLink>
          )
        })}
      </section>
    </main>
  )
}
