import knex from 'knex'
import { Model } from 'objection'

const db = knex(require('../knexfile'))
Model.knex(db)

export default db
