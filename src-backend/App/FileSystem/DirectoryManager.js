const fs = require('fs-extra');
const path = require('path');

module.exports = class DirectoryManager {
  constructor(app) {
    this.app = app;
    this.documentsDir = path.join(this.app.getPath('documents'), 'Stremos');
    this.dataDir = path.join(this.documentsDir, 'data');
    this.preferencesDir = path.join(this.documentsDir, 'preferences');
  }

  ensureApplicationDirectoriesExist() {
    this.ensureDirectoryExists(this.documentsDir);
    this.ensureDirectoryExists(this.dataDir);
    this.ensureDirectoryExists(this.preferencesDir);
  }

  ensureDirectoryExists(targetDir) {
    try {
      fs.statSync(targetDir);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        if (this.makeDirectory(targetDir)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  makeDirectory(targetDir) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      return true;
    } catch (err) {
      return err;
    }
  }
};
