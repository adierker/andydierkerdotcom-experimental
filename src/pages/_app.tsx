import { ReactElement } from 'react'

import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'
import 'styles/global.css'

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />
}

export default App
