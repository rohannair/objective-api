require('babel-core/register')({
  sourceMap: 'inline'
})

const HOST = process.env.host || 'localhost';
const PORT = process.env.port || 3000;

const app = require('../app');
const chalk = require('chalk');
const debug = require('debug');
const convert = require('koa-convert');

const throng = require('throng');
const os = require('os');
const WORKERS = process.env.WEB_CONCURRENCY || 1 || os.cpus().length;

///////////// Debugging /////////////
const log = debug('app:log');
log.log = console.log.bind(console);

const error = debug('app:error');

function start(id) {
  app.listen(PORT, HOST, function(err) {
    if (err) return error(err);

    log(`⚡  Worker ${id} running at ${chalk.white.bold(`http://${HOST}:${PORT}`)}`);
  });
}

function startMaster() {
  log(`⚡  Master running at ${chalk.white.bold(`http://${HOST}:${PORT}`)}`);
}

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start,
  startMaster
});
