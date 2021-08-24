import {SITEMAP} from 'consts'
import {InternalLink} from 'components'

export const Header = () => {
  return (
    <nav className="flex py-3 justify-center border-b-2 border-drkr-black">
      <InternalLink 
        href={SITEMAP.HOME}
        className="drkr-focus rounded-full"
        useDefaultStyles={false}
      >
        <img className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 rounded-full border-2 border-drkr-black text-drkr-hover hover:border-drkr-green" src="/me.jpg"/>
      </InternalLink>
    </nav>
  )
}