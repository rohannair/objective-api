require('dotenv').config({silent: true});
const path = require('path');

const dbString = process.env.DATABASE_URL
? `${process.env.DATABASE_URL}?ssl=true`
: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;

console.log(dbString);

module.exports = {
  client: 'pg',
  connection: dbString,
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
