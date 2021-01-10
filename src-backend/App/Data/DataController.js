const fs = require('fs-extra');
const path = require('path');

const SqliteController = require('./SqliteController');

module.exports = class DataController {
  constructor(options, logger, dataDir) {
    this.options = options;
    this.logger = logger;
    this.dataDir = dataDir;

    this.sqlCtrl = new SqliteController(
      this.options,
      this.logger,
      this.dataDir,
    );
  }

  ensureDataDirectoryIsAvailable(dataDir) {
    try {
      fs.statSync(dataDir);
    } catch (err) {
      // TODO(TUCKER)  - I think I need to catch an error here
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  destroy() {
    this.sqlCtrl.destroy();
  }
};
