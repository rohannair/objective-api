require('dotenv').config({silent: true});
const path = require('path');

/* eslint-disable no-unused-vars no-console */
const log = require('debug')('app:log');
log.log = console.log.bind(console);
/* eslint-enable no-unused-vars no-console */

const dbString = process.env.DATABASE_URL
? `${process.env.DATABASE_URL}?ssl=true`
: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;

log('⚡  DATABASE', dbString);

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
};
