import Link from 'next/link'

import {SITEMAP} from 'consts'

export const Header = () => {
  return (
    <nav className="flex py-3 justify-center border-b-2 border-drkr-black">
      <Link href={SITEMAP.HOME}>
        <a className="drkr-focus rounded-full">
          <img className="h-16 w-16 rounded-full border-2 border-drkr-black text-drkr-hover hover:border-drkr-green" src="/me.jpg"/>
        </a>
      </Link>
    </nav>
  )
}