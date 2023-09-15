// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // development: {
  //   client: 'pg',
  //   connection: {
  //     database: 'db',
  //     user:     'app',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
    development: {
    client: 'pg',
    connection: 'postgres://app:password@postgres/db'
  },
};
