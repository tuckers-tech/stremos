const JSONController = require('../Data/JSONController');
const defaultProjectMetadata = require('./defaults/defaultProjectMetadata');

module.exports = class ProjectMetadataController extends JSONController {
  constructor(app, logger, dataDir) {
    super(app, logger, 'ProjectController', {
      location: dataDir,
      fileName: 'projectMetadata.json',
      defaultValue: defaultProjectMetadata,
    });
  }

  getProjectMetadata() {
    return this.value;
  }

  addProject() {}
};
