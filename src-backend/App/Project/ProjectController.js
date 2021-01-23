const Controller = require('../Parents/Controller');
const fs = require('fs-extra');
const path = require('path');
const ProjectFileController = require('./ProjectFileController');
const { generateDefaultProjectJSON } = require('./defaults/defaultProject');
const { sanitizeProjectName } = require('../Utilities/sanitizeProjectName');
module.exports = class ProjectController extends Controller {
  constructor(app, logger) {
    super(app, logger, 'Project Controller');

    this.projectFileController = null;
    this.projectLocation = null;
  }

  createProjectFiles(projectData) {
    return new Promise((resolve, reject) => {
      this.logInfo('Creating Project Files');
      this.logInfo(JSON.stringify(projectData, undefined, 4));

      let sanitizedProjectName = sanitizeProjectName(projectData.projectName);

      let targetParentDir = path.join(
        projectData.projectLocation,
        sanitizedProjectName,
      );

      this.ensureParentProjectControllerExists(targetParentDir)
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  ensureParentProjectControllerExists(targetPath) {
    return new Promise((resolve, reject) => {
      fs.stat(targetPath)
        .then(() => {
          resolve();
        })
        .catch(err => {
          if (err.code === 'ENOENT') {
            try {
              fs.mkdirSync(targetPath, { recursive: true });
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        });
    });
  }

  getProjectData(filter) {
    if (this.isProjectLoaded()) {
      if (filter === '*') {
        return this.projectFileController.value;
      }
    } else {
      this.logWarn(
        'Project Not Initialized! Load Project Before Requesting Project Data!',
      );
      return null;
    }
  }

  isProjectLoaded() {
    if (this.projectFileController === null) {
      return false;
    } else {
      return true;
    }
  }

  setProjectData() {}

  loadProject(projectFileLocation, projectOptions) {
    return new Promise(resolve => {
      this.projectLocation = projectFileLocation;
      this.projectFileController = new ProjectFileController(
        this.app,
        this.logger,
        {
          location: projectFileLocation,
          fileName: 'stremos.project',
          defaultValue: generateDefaultProjectJSON(projectOptions),
        },
      );

      this.projectFileController
        .getProjectData()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  unloadProject() {
    this.projectLocation = null;
    this.projectFileController = null;
  }
};
