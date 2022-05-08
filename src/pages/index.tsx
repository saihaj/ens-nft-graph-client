import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from 'urql'
import styles from '../styles/Home.module.css'

const query = /* GraphQL */ `
  query User($name: String, $address: String) {
    findUser(input: { name: $name, address: $address }) {
      ERC721tokens {
        contract {
          id
          name
        }
      }
      domains {
        id
        name
      }
    }
  }
`

export default function Home() {
  const [input, setInput] = useState<{ name: string | null; address: string | null }>({
    name: 'saihaj.eth',
    address: null,
  })
  const [{ data, fetching }] = useQuery({
    query: query,
    variables: {
      name: input.name,
      address: input.address,
    },
  })

  return (
    <div>
      <input
        title="ENS or Public Address"
        placeholder="ENS"
        value={input.name || input.address}
        onChange={(e) => {
          const value = e.target.value
          if (value.includes('.eth')) {
            setInput({ name: value, address: null })
          } else {
            setInput({ name: null, address: value })
          }
        }}
      />
      {!fetching && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
