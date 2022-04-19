import { Resolvers } from './.graphclient'
import { print } from 'graphql'

const resolvers: Resolvers = {
  Query: {
    findUserEns: async (root, { name }, ctx, info) => {
      const users = await ctx.ENS.Query.ENS_domains({
        root,
        args: { where: { name } },
        context: ctx,
        info,
        selectionSet: (selectionSetFromRoot) => {
          ctx.logger.info(print(selectionSetFromRoot))
          return /* GraphQL */ `{ owner ${print(selectionSetFromRoot)} }`
        },
        valuesFromResults: (results) => {
          ctx.logger.info(JSON.stringify(results))
          return results.map((result) => result.owner)
        },
      })
      console.log(JSON.stringify(users))
      const user = users[0]?.owner || null
      return user
    },
  },
}

export default resolvers
