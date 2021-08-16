export const BreakpointHelper = () => {
  const sharedStyles = "w-full text-drkr-white hidden justify-center headline-spaced py-1 text-2xl"
  return (
    <>
      <div className={`${sharedStyles} flex sm:block bg-drkr-black`}>too small for any breakpoint</div>
      <div className={`${sharedStyles} sm:flex md:hidden bg-drkr-green`}>sm breakpoint</div>
      <div className={`${sharedStyles} md:flex lg:hidden bg-drkr-dark-green`}>md breakpoint</div>
      <div className={`${sharedStyles} lg:flex xl:hidden bg-drkr-yellow`}>lg breakpoint</div>
      <div className={`${sharedStyles} xl:flex 2xl:hidden bg-drkr-orange`}>xl breakpoint</div>
      <div className={`${sharedStyles} 2xl:flex bg-drkr-red`}>2xl breakpoint</div>
    </>
  )
}