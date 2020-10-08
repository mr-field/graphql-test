const { GraphQLServer} = require('graphql-yoga')

let users = [
{
  id: 0,
  email: 'cc@smt.org',
  name: 'Cosimo'
},
{
  id: 1,
  email: 'rk@smt.org',
  name: 'Rasmia'
},
{
  id: 2,
  email: 'sim@smt.org',
  name: 'Sim'
}
]

let idCount = users.length

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(e => e.id == id)
    },

    Mutation: {
      addUser: (parent, args) => {
        const user = {
          id: idCount++,
          name: args.name,
          email: args.email
        }
        users.push(user)
        return user
      },
      deletedUser: (parent, args) => {
        let toDelete = users.find(e => e.id == args.id)
        users.splice(users.indexOf(toDelete), 1)
        return toDelete
      },
      updateUser: (parent, args) => {
        let toUpdate = users.find(e => e.id == args.id)
        toUpdate.name = args.name
        toUpdate.email = args.email
        return toUpdate
      }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))