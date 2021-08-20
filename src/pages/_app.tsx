import 'tailwindcss/tailwind.css'
import 'styles/global.css'

import {ModalContextProvider} from 'contexts'

function MyApp({ Component, pageProps }) {

  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  )
}

export default MyApp
