// Types
import Mutation from './mutation.schema'
import Viewer from './viewer.schema'

// Schema
const Query = `
  type Query {
    viewer: Viewer
  }
`


const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

export default [
  SchemaDefinition,
  Query,
  Mutation,
  Viewer
]
