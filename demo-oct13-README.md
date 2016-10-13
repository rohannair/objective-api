https://gist.github.com/rohannair/a467b4573a06d25927a7d652a1380436

When creating a new seed, do so in cardinals-api/db/seeds
Seed steps:

- `$ npm run db:recreate`
- `$ psql qdb`
- `> vacuum;`
- `> \q`
- `$ npm run db:seed`

Scenario 1:
Seeds 0 and 1

Scenario 2:
Seed 2

Scenario 3
Seed 3
