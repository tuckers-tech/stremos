const fs = require('fs-extra');
const path = require('path');
const getParentDirectory = require('../Utilities/getParentDirectory');

const defaultPreferences = require('./defaults/preferences.default');

module.exports = class PreferenceManager {
  constructor(options, logger, appDataLoc) {
    this.preferencesFileLocation = path.join(
      appDataLoc,
      'AppPreferences',
      'preferences.json',
    );
    this.ensurePreferencesExists(this.preferencesFileLocation);
  }

  ensurePreferencesExists(preferencesFileLocation) {
    try {
      fs.statSync(preferencesFileLocation);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Doesn't Exist
        this.ensurePreferencesDirExists(preferencesFileLocation);
        this.createDefaultPreferencesFile(preferencesFileLocation);
      }
    }
  }

  ensurePreferencesDirExists(preferencesFileLocation) {
    let preferencesParent = getParentDirectory(preferencesFileLocation);
    try {
      fs.statSync(preferencesParent);
    } catch (err) {
      // TODO(TUCKER)  - I think I need to catch an error here
      fs.mkdirSync(preferencesParent, { recursive: true });
    }
  }

  createDefaultPreferencesFile(preferencesFileLocation) {
    fs.outputJSONSync(preferencesFileLocation, defaultPreferences);
  }

  destroy() {}
};
