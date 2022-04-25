import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from 'urql'
import styles from '../styles/Home.module.css'

const query = /* GraphQL */ `
  query UserWithENS {
    findUserEns(name: "saihaj.eth") {
      ERC721tokens {
        contract {
          id
        }
      }
      domains {
        id
      }
    }
  }
`
const tempQuery = /* GraphQL */ `
  query UserWithENS($name: String!) {
    ENS_domains(where: { name: $name }) {
      owner {
        id
        ERC721tokens {
          contract {
            id
            name
          }
        }
      }
    }
  }
`

export default function Home() {
  const [ensName, setEnsName] = useState('saihaj.eth')
  const [{ data, fetching }] = useQuery({
    query: tempQuery,
    variables: {
      name: ensName,
    },
  })

  return (
    <div>
      <input
        title="ENS"
        placeholder="ENS"
        value={ensName}
        onChange={(e) => {
          setEnsName(e.target.value)
        }}
      />
      {!fetching && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
