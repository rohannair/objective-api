import { makeExecutableSchema } from 'graphql-tools';

// Types
import Mutation from './mutation.schema';
import User from './user.schema';

// Resolvers
import resolvers from '../resolvers';

// Schema
const Query = `
  type Query {
    viewer(id: String): User
  }
`;


const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [
  SchemaDefinition,
  Query,
  Mutation,
  User
];
