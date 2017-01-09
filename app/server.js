require('babel-core/register')({
  sourceMap: 'inline'
})
require('babel-polyfill')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

const app = require('./index')
const chalk = require('chalk')
const debug = require('debug')
// const convert = require('koa-convert');

// const throng = require('throng');
// const os = require('os');
// const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;

///////////// Debugging /////////////
const log = debug('app:log')
/* eslint-disable no-console */
log.log = console.log.bind(console)
/* eslint-enable no-console */

const error = debug('app:error')

function start(id) {
  app.listen(PORT, function(err) {
    if (err) return error(err)

    log(`⚡  Worker ${id} running at ${chalk.white.bold(`http://${HOST}:${PORT}`)}`)
  })
}

// function startMaster() {
//   log(`⚡  Master running at ${chalk.white.bold(`http://${HOST}:${PORT}`)}`);
// }

// throng({
//   workers: WORKERS,
//   lifetime: Infinity,
//   start,
//   master: startMaster
// });

start('1')
