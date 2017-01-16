# Objective API
[![CircleCI](https://circleci.com/gh/objectiveiq/objective-api/tree/master.svg?style=svg&circle-token=42eac88d34f022807d23b144d8fcf660733171a6)](https://circleci.com/gh/objectiveiq/objective-api/tree/master)

## Installation
### Dependencies
1. Node 6.9 LTS -- [n recommended](https://github.com/tj/n)
2. [Yarn](https://github.com/yarnpkg/yarn)
3. Postgres -- [Postgres.app recommended](http://postgresapp.com)

### Set Up
1. `$ yarn`
2. Set up Postgres
    - `$ createdb qdb`
    - `$ psql qdb`
    - `> CREATE ROLE root WITH LOGIN PASSWORD 'playbooks'`;
    - Exit
3. Provision and seed  database
    - `yarn run db:migrate`
    - `yarn run db:seed`
4. Create a `.env` file and get keys
5. Start application

### Yarn Commands
These are all found in `package.json` scripts. Run them with `yarn run <script name>`

#### `start`
Builds and start the production app.
- codebase has `async/await` and some future-ES features and  need to transpile to the Node LTS target
- uses [forever](https://github.com/foreverjs/forever) to run the app
- uses `NODE_ENV`, `DEBUG`, `WEB_CONCURRENCY`, and `PORT` from the environment

#### `dev`
Starts the development app, which is transpiled on the fly with `babel-node`
- Uses [Nodemon](https://github.com/remy/nodemon) for live reloading app
- uses `NODE_ENV`, `DEBUG`, `WEB_CONCURRENCY`, and `PORT` from `package.json`

#### `clean`
Cleans the prod folder

#### `build`
Cleans and runs `build:transpile`

#### `build:transpile`
Build step for transpiled app

#### `db:destroy`
Runs sql to reset the db by deleting the schema and recreating it

#### `db:migrate`
Runs all knex migrations

#### `db:create:migration` and `db:create:seed`
Wraps knex to create migration and seed files according to the knexfile.js. Migration creation gives it a timestamp to organize migrations sequentially.

#### `db:recreate`
Runs `db:destroy` and `db:migrate`

#### `db:seed`
Runs the seed task

#### `lint`
Runs eslint on the `app` folder

#### `lint:fix`
Theoretically fixes small linting issues according to eslint

#### `test`
In theory this will allow us to run tests one day... in theory. *sigh*

## ToDo
- [x] Heroku setup
- [ ] Heroku deploy instructions
- [x] New customer creation
- [ ] Write up stuff for codemods (`jscodeshift -t codemods/transforms/requires-to-imports.js app/**/*.js`)
