const JSONController = require('../Data/JSONController');
const defaultProjectMetadata = require('./defaults/defaultProjectMetadata');

module.exports = class ProjectMetadataController extends JSONController {
  constructor(app, logger, dataDir) {
    super(app, logger, 'ProjectMetadataController', {
      location: dataDir,
      fileName: 'projectMetadata.json',
      defaultValue: defaultProjectMetadata,
    });
  }

  getProjectMetadata() {
    return this.value;
  }

  addProject(projectData) {
    return new Promise((resolve, reject) => {
      this.addElementToArray('projects', projectData)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
};
