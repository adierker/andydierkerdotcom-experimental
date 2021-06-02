import Head from 'next/head'

const Box = ({color}) => {
  return (
    <div className={`${color} h-44 w-44 flex flex-col items-center justify-center text-drkr-white`}>
      <h1 className="text-3xl headline">
        head
      </h1>
      <p className="body">body</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center text-drkr-black">
        <h1 className="text-6xl headline">
          andydierker dot com
        </h1>
        <p className="body">and this is some body text</p>
        <div className="flex flex-row">
          <Box color={'bg-drkr-red'}/>
          <Box color={'bg-drkr-green'}/>
          <Box color={'bg-drkr-dark-green'}/>
          <Box color={'bg-drkr-yellow'}/>
          <Box color={'bg-drkr-orange'}/>
        </div>

      </main>
    </div>
  )
}
