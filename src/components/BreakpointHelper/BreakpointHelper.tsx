interface BreakpointHelperProps {
  show: boolean
}

export const BreakpointHelper = ({show}: BreakpointHelperProps) => {
  const sharedStyles = "absolute w-full justify-center text-center headline-spaced-font py-1 text-2xl"

  if (!show) { 
    return null
  }
  
  return (
    <>
      <div className={`${sharedStyles} flex xs:hidden text-lg text-drkr-black bg-drkr-white`}>too small for any breakpoint</div>
      <div className={`${sharedStyles} hidden xs:flex text-lg text-drkr-white bg-drkr-black`}>xs breakpoint</div>
      <div className={`${sharedStyles} hidden sm:flex md:hidden text-drkr-white bg-drkr-green`}>sm breakpoint</div>
      <div className={`${sharedStyles} hidden md:flex lg:hidden text-drkr-white bg-drkr-dark-green`}>md breakpoint</div>
      <div className={`${sharedStyles} hidden lg:flex xl:hidden text-drkr-white bg-drkr-yellow`}>lg breakpoint</div>
      <div className={`${sharedStyles} hidden xl:flex 2xl:hidden text-drkr-white bg-drkr-orange`}>xl breakpoint</div>
      <div className={`${sharedStyles} hidden 2xl:flex text-drkr-white bg-drkr-red`}>2xl breakpoint</div>
    </>
  )
}