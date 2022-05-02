import '../styles/globals.css'
import { createClient, Provider } from 'urql'
import { graphExchange } from '@graphprotocol/client-urql'
import * as GraphClient from '../../.graphclient'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [graphExchange(GraphClient)],
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
