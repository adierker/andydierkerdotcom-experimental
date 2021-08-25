import { SITEPATHS } from 'consts'
import { InternalLink } from 'components'
import { SitePathsType } from 'types'
import { ChevronLeft } from 'icons'

interface HeaderProps {
  backText?: string
  backPath?: SitePathsType
}

export const Header = ({ backText, backPath }: HeaderProps) => {
  return (
    <nav className="flex py-3 justify-between items-center border-b-2 border-drkr-black">
      {backPath && (
        <div className="flex-1">
          <div className="pl-1 xs:pl-4">
            <InternalLink
              href={backPath}
              className="drkr-focus rounded-md flex items-center w-[fit-content]"
              useDefaultStyles={false}
            >
              <ChevronLeft className="sq-6 xs:sq-8" />
              <span className="text-sm xs:text-lg sm:text-2xl headline-spaced-font">
                {backText}
              </span>
            </InternalLink>
          </div>
        </div>
      )}

      <div className="flex-auto flex justify-center">
        <InternalLink
          href={SITEPATHS.HOME}
          className="drkr-focus rounded-full"
          useDefaultStyles={false}
        >
          <img
            className="sq-16 xs:sq-20 sm:sq-24 rounded-full border-2 border-drkr-black text-drkr-hover hover:border-drkr-green"
            src="/me.jpg"
          />
        </InternalLink>
      </div>

      {backPath && <span className="flex-1"/>}
    </nav>
  );
};
