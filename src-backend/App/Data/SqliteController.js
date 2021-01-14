const fs = require('fs-extra');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const initializeDb = require('../Data/SQL/initializeDB');
const Controller = require('../Parents/Controller');

module.exports = class SqliteController extends Controller {
  constructor(app, logger, dataDir) {
    super(app, logger, 'SQLController\t');
    this.isDatabaseReady = false;

    let dbPath = path.join(dataDir, 'data.db');
    this.isFirstTimeRun = !this.doesDBExist(dbPath);

    this.startDb(dbPath);

    this.logInfo(`First Run: ${this.isFirstTimeRun}`);
    if (this.isFirstTimeRun) {
      this.initializeDatabase(this.db)
        .then(() => {
          this.isDatabaseReady = true;
        })
        .catch(() => this.logError('Unable to initialize database'));
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
      this.logInfo(`Initializing DB`);
      return this.executeQuery(initializeDb)
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  doesDBExist(dbPath) {
    this.logInfo(`Looking For DB File At: ${dbPath}`);
    try {
      fs.statSync(dbPath);
      return true;
    } catch (err) {
      this.logInfo(`Unable To find DB File`);
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
