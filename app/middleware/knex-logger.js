'use strict'

import chalk from 'chalk'

const colored = fn =>
  () => {
    const enabled = chalk.enabled
    chalk.enabled = true
    fn.apply(this, arguments)
    chalk.enabled = enabled
  }

/* eslint-disable no-console */
export default knex =>
  async(ctx, next) => {
    const queries = []

    const captureQueries = builder => {
      const start = process.hrtime()
      const group = []


      builder.on('query', query => {
        group.push(query)
        queries.push(query)
      })

      builder.on('end', () => {
        const diff = process.hrtime(start)
        const ms = diff[0] * 1e3 + diff[1] * 1e-6

        group.forEach((query) => {
          query.duration = ms.toFixed(3)
        })
      })
    }

    const logQueries = colored(() => {
      queries.forEach(query =>
        console.log('%s%s%s %s',
          chalk.yellow.bold('  knex:query '),
          chalk.cyan(query.sql),
          chalk.gray('{' + query.bindings.join(', ') + '}'),
          chalk.magenta(query.duration + 'ms')
      ))
    })

    knex.client.on('start', captureQueries)
    await next()
    knex.client.removeListener('start', captureQueries)
    logQueries()
  }
/* eslint-enable no-console */
