const fs = require('fs-extra');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const initializeDb = require('../Data/SQL/initializeDB');

module.exports = class SqliteController {
  constructor(options, logger, dataDir) {
    this.loggerCurrentFile = 'SqliteController';
    this.isDatabaseReady = false;

    this.options = options;
    this.logger = logger;

    let dbPath = path.join(dataDir, 'data.db');
    this.isFirstTimeRun = !this.doesDBExist(dbPath);

    this.startDb(dbPath);

    if (this.isFirstTimeRun) {
      this.initializeDatabase(this.db)
        .then(data => {
          console.log('init success');
          console.log(data);
          this.isDatabaseReady = true;
        })
        .catch(() =>
          this.logger.logError(
            'Unable to initialize database',
            this.loggerCurrentFile,
          ),
        );
    } else {
      this.isDatabaseReady = true;
    }
  }

  startDb(dbPath) {
    this.logger.logInfo(`Starting DB At ${dbPath}`, this.loggerCurrentFile);
    this.db = new sqlite3.Database(dbPath);
  }

  initializeDatabase() {
    return new Promise((resolve, reject) => {
      this.logger.logInfo(`Initializing DB`, this.loggerCurrentFile);
      return this.executeQuery(initializeDb)
        .then(() => {
          console.log('Upload Data');
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  doesDBExist(dbPath) {
    this.logger.logInfo(
      `Looking For DB File At: ${dbPath}`,
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
      this.db.exec(query, (data, err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(data);
        resolve(data);
      });
    });
  }

  destroy() {}
};
