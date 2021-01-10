const fs = require('fs-extra');
const path = require('path');

const defaultPreferences = require('./defaults/preferences.default');

module.exports = class PreferenceController {
  constructor(options, logger, preferencesDir) {
    this.appDataLoc = preferencesDir;
    this.preferencesFileLocation = path.join(
      preferencesDir,
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
        this.createDefaultPreferencesFile(preferencesFileLocation);
      }
    }
  }

  createDefaultPreferencesFile(preferencesFileLocation) {
    fs.outputJSONSync(preferencesFileLocation, defaultPreferences);
  }

  destroy() {}
};
