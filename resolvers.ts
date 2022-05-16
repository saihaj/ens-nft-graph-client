import { Resolvers } from './.graphclient'
import { print } from 'graphql'

const resolvers: Resolvers = {
  Query: {
    findUser: async (root, { input }, context, info) => {
      const { address, name } = input

      if (address) {
        return context.NFT.Query.NFT_account({ root, args: { id: address.toLowerCase() }, context, info })
      }

      return context.ENS.Query.ENS_domains({
        root,
        args: { where: { name } },
        context,
        info,
        selectionSet: (selectionSetFromRoot) => /* GraphQL */ `{ owner ${print(selectionSetFromRoot)} }`,
        valuesFromResults: (results) => results?.[0]?.owner,
      })
    },
  },
}

export default resolvers
