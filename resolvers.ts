import { Resolvers } from './.graphclient'
import { print } from 'graphql'

const resolvers: Resolvers = {
  Query: {
    findUserEns: async (root, { name }, context, info) =>
      context.ENS.Query.ENS_domains({
        root,
        args: { where: { name } },
        context,
        info,
        selectionSet: (selectionSetFromRoot) => /* GraphQL */ `{ owner ${print(selectionSetFromRoot)} }`,
        valuesFromResults: (results) => results?.[0]?.owner,
      }),
  },
}

export default resolvers
