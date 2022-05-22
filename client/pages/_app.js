import { Discordprovider } from '../context/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Discordprovider>
      <Component {...pageProps} />
    </Discordprovider>
  )
}

export default MyApp
