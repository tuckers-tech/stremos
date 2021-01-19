const JSONController = require('../Data/JSONController');

module.exports = class ProjectFileController extends JSONController {
  constructor(app, logger, jsonOptions) {
    super(app, logger, 'ProjectFileController', jsonOptions);
  }
};
