const path = require('path');

const knex = require('knex');

module.exports = class SqliteController {
  constructor(options, logger, appDataDir) {
    console.log(appDataDir);
    this.options = options;
    this.logger = logger;
    this.db = knex({
      client: 'sqlite3',
      connection: {
        filename: path.join(appDataDir, 'data.db'),
      },
    });

    console.log(this.db);
  }
};
