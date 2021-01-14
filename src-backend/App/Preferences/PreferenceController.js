const JSONController = require('../Data/JSONController');

const defaultPreferences = require('./defaults/preferences.default');

module.exports = class PreferenceController extends JSONController {
  constructor(app, logger, preferencesDir) {
    super(app, logger, 'PreferenceController', {
      location: preferencesDir,
      fileName: 'preferences.json',
      defaultValue: defaultPreferences,
    });
  }
};
