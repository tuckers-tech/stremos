const fs = require('fs-extra');
const path = require('path');
const Controller = require('../Parents/Controller');

const defaultPreferences = require('./defaults/preferences.default');

module.exports = class PreferenceController extends Controller {
  constructor(app, logger, preferencesDir) {
    super(app, logger, 'PreferenceController');

    this.preferencesFileLocation = path.join(
      preferencesDir,
      'preferences.json',
    );

    this.ensurePreferencesExists(this.preferencesFileLocation);
  }

  ensurePreferencesExists(preferencesFileLocation) {
    this.logInfo(
      `Searching for preferences file at: ${preferencesFileLocation}`,
    );
    try {
      fs.statSync(preferencesFileLocation);
      this.logSuccess('Found preferences file!');
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Doesn't Exist
        this.logWarn('Unable to find preferences file. Trying to create it.');
        this.createDefaultPreferencesFile(preferencesFileLocation);
      }
    }
  }

  createDefaultPreferencesFile(preferencesFileLocation) {
    this.logInfo(`Creating preferences file`);
    fs.outputJSONSync(preferencesFileLocation, defaultPreferences);
  }

  destroy() {}
};
