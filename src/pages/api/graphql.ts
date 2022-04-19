import { createServer } from '@graphql-yoga/node'
import { getBuiltGraphClient } from '../../../.graphclient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mesh = await getBuiltGraphClient()
  const server = createServer({
    plugins: mesh.plugins,
    endpoint: '/api/graphql',
  })

  return server.requestListener(req, res)
}
