const fs = require('fs-extra');
const path = require('path');

const SqliteController = require('./SqliteController');

module.exports = class DataController {
  constructor(options, logger, preferenceCtrl) {
    this.options = options;
    this.logger = logger;
    this.preferenceCtrl = preferenceCtrl;

    let appDataDir = path.join(this.preferenceCtrl.appDataLoc, 'AppData');

    this.ensureDataDirectoryIsAvailable(appDataDir);
    this.sqlCtrl = new SqliteController(this.options, this.logger, appDataDir);
  }

  ensureDataDirectoryIsAvailable(dataDir) {
    try {
      fs.statSync(dataDir);
    } catch (err) {
      // TODO(TUCKER)  - I think I need to catch an error here
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  destroy() {}
};
