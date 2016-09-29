require('dotenv').config({silent: true});
const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
    ssl: process.env.SSL || false
  },
  pool: {
    min: process.env.DB_POOL_MIN,
    max: process.env.DB_POOL_MAX
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(path.resolve(), 'db', 'migrations')
  },
  seeds: {
    directory: path.join(path.resolve(), 'db', 'seeds')
  }
}
