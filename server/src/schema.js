import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }
  # This type specifies the entry points into our API. In this case
  # there is only one - "channels" - which returns a list of channels.
  type Query {
    channels: [Channel]    # "[]" means this is a list of channels
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// makeExecutableSchema = turns our type definitions into an executable schema, to which we can add custom resolve functions later.

export { schema };
