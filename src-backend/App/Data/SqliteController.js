const fs = require('fs-extra');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const initializeDb = require('../Data/SQL/initializeDB');

module.exports = class SqliteController {
  constructor(options, logger, dataDir) {
    this.loggerCurrentFile = 'SqliteController';
    this.options = options;
    this.logger = logger;

    let dbPath = path.join(dataDir, 'data.db');
    this.isFirstTimeRun = !this.doesDBExist(dbPath);

    this.startDb(dbPath);

    if (this.isFirstTimeRun) {
      this.initializeDatabase()
        .then(data => {
          console.log('init success');
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  }

  startDb(dbPath) {
    this.logger.logInfo(`Starting DB At ${dbPath}`, this.loggerCurrentFile);
    this.db = new sqlite3.Database(dbPath);
  }

  initializeDatabase() {
    this.logger.logInfo(`Initializing DB`, this.loggerCurrentFile);
    return this.executeQuery(initializeDb);
  }

  doesDBExist(dbPath) {
    this.logger.logInfo(
      `Trying To Find DB File At: ${dbPath}`,
      this.loggerCurrentFile,
    );
    try {
      fs.statSync(dbPath);
      return true;
    } catch (err) {
      this.logger.logInfo(`Unable To find DB File`, this.loggerCurrentFile);
      return false;
    }
  }

  executeQuery(query) {
    return new Promise((resolve, reject) => {
      this.db.run(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  destroy() {}
};
