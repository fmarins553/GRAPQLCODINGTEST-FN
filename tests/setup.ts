import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../src/schema';
import { resolvers } from '../src/resolvers';

export const createTestServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({})
  });
};
