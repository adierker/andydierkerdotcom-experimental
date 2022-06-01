import { ReactElement } from 'react'

import { AppProps } from 'next/app'

import { initAuth } from 'authorization'

import 'tailwindcss/tailwind.css'
import 'styles/global.css'

initAuth()

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />
}

export default App
