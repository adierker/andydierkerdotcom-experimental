import { ReactElement } from 'react'

interface BreakpointHelperProps {
  show: boolean
}

export const BreakpointHelper = ({
  show,
}: BreakpointHelperProps): ReactElement => {
  const sharedStyles =
    'absolute w-full justify-center text-center headline-spaced-font py-1 text-2xl'

  if (!show) {
    return null
  }

  return (
    <>
      <div
        className={`${sharedStyles} flex min:hidden text-drkr-black bg-drkr-white`}
      >
        too small
      </div>
      <div
        className={`${sharedStyles} hidden min:flex xs:hidden text-drkr-black bg-drkr-mid-gray`}
      >
        min breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden xs:flex sm:hidden text-drkr-white bg-drkr-black`}
      >
        xs breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden sm:flex md:hidden text-drkr-white bg-drkr-green`}
      >
        sm breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden md:flex lg:hidden text-drkr-white bg-blue-600`}
      >
        md breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden lg:flex xl:hidden text-drkr-white bg-purple-600`}
      >
        lg breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden xl:flex 2xl:hidden text-drkr-white bg-yellow-600`}
      >
        xl breakpoint
      </div>
      <div
        className={`${sharedStyles} hidden 2xl:flex text-drkr-white bg-red-600`}
      >
        2xl breakpoint
      </div>
    </>
  )
}
