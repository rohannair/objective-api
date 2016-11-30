'use strict';

import router from 'koa-router';
import { graphqlKoa } from 'graphql-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

import { isAuthed } from '../../middleware';

import Schema from './schema';
import Resolvers from './resolvers';

const executableSchema = makeExecutableSchema({
  graphiql: true,
  pretty: true,
  typeDefs: Schema,
  resolvers: Resolvers,
  debug: true
});

export default router()
  .use(isAuthed)
  .post('/', (ctx, next) => graphqlKoa({
    schema: executableSchema,
    context: ctx
  })(ctx, next)
);
