import '../styles/globals.css'
import '../styles/antd.css'

import { SessionProvider } from "next-auth/react"
import Wrapper from '../components/Wrapper'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <SessionProvider session={session}>
    <Wrapper><Component {...pageProps} /></Wrapper>
  </SessionProvider>

}

export default MyApp
