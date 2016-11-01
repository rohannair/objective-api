# Quartermaster API (Cardinals)
## Installation
### Dependencies
1. Node 6.9 LTS -- [nvm recommended](https://github.com/creationix/nvm)
2. [Yarn](https://github.com/yarnpkg/yarn)
3. Postgres -- [Postgres.app recommended](http://postgresapp.com)
4. Redis -- Install via Homebrew

### Set Up
1. `$ yarn`
2. Set up Postgres
    - `$ createdb qdb`
    - `$ psql qdb`
    - `> create role root with password 'playbooks'`;
    - Exit
3. Turn on Redis
    - `$ brew services start redis`
4. Provision database
    - `npm run db:migrate`
    - `npm run db:seed`
5. Start application
    - **Dev:** `npm run dev`
    - **Prod:** `npm start`

## ToDo
- [ ] Heroku setup
- [ ] Heroku deploy instructions
- [ ] New customer creation
- [ ] Microservices
- [ ] Write up stuff for codemods (`jscodeshift -t codemods/transforms/requires-to-imports.js app/**/*.js`)

